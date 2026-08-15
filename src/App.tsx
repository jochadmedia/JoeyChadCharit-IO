import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase/supabaseClient';
import { User, Session } from '@supabase/supabase-js';
import { NavigationTab, CharityStats } from './types';
import { Navbar } from './components/Navbar';
import { JoeyCoachView } from './components/JoeyCoachView';
import { SkillSwapView } from './components/SkillSwapView';
import { MemoryLaneView } from './components/MemoryLaneView';
import { ChallengesView } from './components/ChallengesView';
import { AcademyView } from './components/AcademyView';
import { CharityView } from './components/CharityView';
import { TeamHqView } from './components/TeamHqView';
import { ScoutRadarView } from './components/ScoutRadarView';
import { ClubhouseTvView } from './components/ClubhouseTvView';
import { PreMatchRadarView } from './components/PreMatchRadarView';
import { JuniorGrowthView } from './components/JuniorGrowthView';
import { HeroSlider } from './components/HeroSlider';
import { ToastProvider } from './components/Toast';
import AuthModal from './components/Auth/AuthModal';
import { Heart, Sparkles, Shield, Trophy } from 'lucide-react';
import PlayersList from './components/Football/PlayersList';
import TeamsList from './components/Football/TeamsList';
import MatchesList from './components/Football/MatchesList';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('coach');
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authModal, setAuthModal] = useState({ showAuth: false });
  const [isSignUp, setIsSignUp] = useState(false);
  const [charityStats, setCharityStats] = useState<CharityStats>({
    totalRaised: 128450,
    goal: 250000,
    donorCount: 3420,
    featuredCharity: "Joey Chad Youth Football & Mental Health Initiative",
    recentDonations: [
      { id: "1", name: "Liam O'Connor", amount: 100, message: "For Joey! Keep inspiring the next generation. ⚽", date: "2 mins ago" },
      { id: "2", name: "Dublin Football Academy", amount: 500, message: "Honored to support Joey's legacy.", date: "15 mins ago" },
      { id: "3", name: "Sarah Jenkins", amount: 50, message: "Mastered the rainbow flick today! Love this app.", date: "1 hour ago" },
      { id: "4", name: "Celtic Supporters Club", amount: 250, message: "Football forever. Rest in power Joey.", date: "3 hours ago" }
    ]
  });

  // Fetch live charity stats from Express API
  useEffect(() => {
    fetch('/api/charity/stats')
      .then(res => res.json())
      .then(data => {
        if (data && data.totalRaised) {
          setCharityStats(data);
        }
      })
      .catch(err => console.log('Using default charity stats:', err));

    // Auth State Subscription
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleDonateSubmit = async (name: string, amount: number, message: string) => {
    try {
      const res = await fetch('/api/charity/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, amount, message })
      });
      const data = await res.json();
      if (data && data.updatedStats) {
        setCharityStats(data.updatedStats);
      } else {
        // Fallback state update
        setCharityStats(prev => ({
          ...prev,
          totalRaised: prev.totalRaised + amount,
          donorCount: prev.donorCount + 1,
          recentDonations: [
            { id: Date.now().toString(), name: name || "Anonymous Fan", amount, message: message || "Supporting Joey", date: "Just now" },
            ...prev.recentDonations
          ]
        }));
      }
    } catch (err) {
      console.error('Donation sync error:', err);
    }
  };

  const handleUnlockCharityFromChallenge = (amount: number, challengeTitle: string) => {
    handleDonateSubmit("Joey Challenge Unleashed", amount, `Unlocked from completing "${challengeTitle}"!`);
  };

  const openAuthModal = () => {
    setIsSignUp(false);
    setAuthModal({ showAuth: true });
  };
  const closeAuthModal = () => { setAuthModal({ showAuth: false }); };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#070F1B] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
        {/* Navbar with Charity Banner */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          charityStats={charityStats}
          onOpenDonateModal={() => {
            setActiveTab('charity');
          }}
          user={user}
          onOpenSignIn={openAuthModal}
        />

        {/* Authentication Modal */}
        {authModal.showAuth && (
          <AuthModal
            onClose={closeAuthModal}
            onAuthSuccess={() => {
              closeAuthModal();
            }}
            initialIsSignUp={isSignUp}
            user={user}
          />
        )}

        {/* Joey Chad Legacy Hero Carousel */}
        <HeroSlider
          onNavigateTab={(tab) => setActiveTab(tab)}
          onOpenDonate={() => {
            setActiveTab('charity');
          }}
        />

        {/* Main Content View Switcher */}
        <main className="flex-1">
          {activeTab === 'coach' && <JoeyCoachView />}
          {activeTab === 'team_hq' && <TeamHqView />}
          {activeTab === 'scout_radar' && <ScoutRadarView />}
          {activeTab === 'skillswap' && <SkillSwapView />}
          {activeTab === 'clubhouse_tv' && <ClubhouseTvView />}
          {activeTab === 'prematch_radar' && <PreMatchRadarView />}
          {activeTab === 'junior_growth' && <JuniorGrowthView />}
          {activeTab === 'ar_memory' && <MemoryLaneView />}
          {activeTab === 'challenges' && (
            <ChallengesView onUnlockCharityDonation={handleUnlockCharityFromChallenge} />
          )}
          {activeTab === 'academy' && <AcademyView />}
          {activeTab === 'charity' && (
            <CharityView charityStats={charityStats} onDonateSubmit={handleDonateSubmit} />
          )}
          {/* New Football Management Views */}
          {activeTab === 'players' && <PlayersList />}
          {activeTab === 'teams' && <TeamsList />}
          {activeTab === 'matches' && <MatchesList />}
        </main>

        {/* Footer */}
        <footer className="bg-[#050B14] border-t border-slate-800/80 text-slate-400 text-xs py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/60 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 font-black text-slate-950 flex items-center justify-center text-sm">
                  JC
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Joey Chad Football Legacy Platform</p>
                  <p className="text-[11px] text-emerald-400 font-medium">Learn. Play. Remember.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                <button onClick={() => setActiveTab('coach')} className="hover:text-emerald-400 transition-colors">
                  AI Coach
                </button>
                <button onClick={() => setActiveTab('team_hq')} className="hover:text-emerald-400 transition-colors">
                  Team HQ
                </button>
                <button onClick={() => setActiveTab('scout_radar')} className="hover:text-emerald-400 transition-colors">
                  Scout Radar
                </button>
                <button onClick={() => setActiveTab('skillswap')} className="hover:text-emerald-400 transition-colors">
                  SkillSwap
                </button>
                <button onClick={() => setActiveTab('clubhouse_tv')} className="hover:text-emerald-400 transition-colors">
                  Clubhouse TV
                </button>
                <button onClick={() => setActiveTab('prematch_radar')} className="hover:text-emerald-400 transition-colors">
                  Pre-Match
                </button>
                <button onClick={() => setActiveTab('junior_growth')} className="hover:text-emerald-400 transition-colors">
                  Junior Joey
                </button>
                <button onClick={() => setActiveTab('ar_memory')} className="hover:text-emerald-400 transition-colors">
                  AR Pitch
                </button>
                <button onClick={() => setActiveTab('challenges')} className="hover:text-emerald-400 transition-colors">
                  Challenges
                </button>
                <button onClick={() => setActiveTab('academy')} className="hover:text-emerald-400 transition-colors">
                  Academy
                </button>
                <button onClick={() => setActiveTab('charity')} className="hover:text-emerald-400 transition-colors">
                  Charity
                </button>
                {/* New Football Management Tabs */}
                <button onClick={() => setActiveTab('players')} className="hover:text-emerald-400 transition-colors">
                  Players
                </button>
                <button onClick={() => setActiveTab('teams')} className="hover:text-emerald-400 transition-colors">
                  Teams
                </button>
                <button onClick={() => setActiveTab('matches')} className="hover:text-emerald-400 transition-colors">
                  Matches
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
              <p>© 2026 Joey Chad Legacy Foundation. All proceeds support youth sports & mental health charities.</p>
              <p className="flex items-center gap-1">
                <span>Powered by</span>
                <span className="text-emerald-400 font-bold">Google Gemini AI</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}