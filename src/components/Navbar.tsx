import React from 'react';
import { NavigationTab, CharityStats } from '../types';
import { Sparkles, Trophy, Video, MapPin, Heart, BookOpen, Users, Zap, Tv, Compass, Shield, LogOut, Mail, UserPlus, Star } from 'lucide-react';
import { supabase } from '../lib/supabase/supabaseClient';
import { User } from '@supabase/supabase-js';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  charityStats: CharityStats;
  onOpenDonateModal: () => void;
  user?: User | null;
  onOpenSignIn?: () => void;
  onOpenSignUp?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  charityStats,
  onOpenDonateModal,
  user,
  onOpenSignIn,
  onOpenSignUp
}) => {
  const percentGoal = Math.min(100, Math.round((charityStats.totalRaised / charityStats.goal) * 100));

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const mainNavItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'coach', label: 'Joey AI Coach', icon: <Sparkles className="w-3.5 h-3.5" />, badge: 'AI' },
    { id: 'about', label: 'About Joey', icon: <Star className="w-3.5 h-3.5" /> },
    { id: 'team_hq', label: 'Team HQ', icon: <Users className="w-3.5 h-3.5" />, badge: 'Coach' },
    { id: 'scout_radar', label: 'Scout Radar', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'skillswap', label: 'SkillSwap', icon: <Video className="w-3.5 h-3.5" /> },
    { id: 'clubhouse_tv', label: 'Clubhouse TV', icon: <Tv className="w-3.5 h-3.5" /> },
    { id: 'prematch_radar', label: 'Pre-Match Radar', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'junior_growth', label: 'Junior Joey', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'ar_memory', label: 'Memory Lane AR', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'challenges', label: 'Challenges', icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: 'academy', label: 'Academy', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'charity', label: 'Charity', icon: <Heart className="w-3.5 h-3.5" /> }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B192C]/95 backdrop-blur-md border-b border-emerald-900/50 text-white shadow-xl">
      {/* Top Charity Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-900 text-xs py-1 px-4 flex flex-wrap items-center justify-between border-b border-emerald-700/40">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-emerald-200">100% Charity Platform:</span>
          <span className="text-white font-semibold">Supporting {charityStats.featuredCharity}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-emerald-200">
            <span>Progress:</span>
            <span className="font-bold text-emerald-300">${charityStats.totalRaised.toLocaleString()}</span>
            <span className="text-emerald-400">/ ${charityStats.goal.toLocaleString()} ({percentGoal}%)</span>
          </div>
          <button
            onClick={onOpenDonateModal}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-0.5 rounded-full text-[11px] flex items-center gap-1 transition-all shadow-md transform hover:scale-105 cursor-pointer"
          >
            <Heart className="w-3 h-3 fill-slate-950" />
            Donate & Support
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Tagline */}
          <div
            onClick={() => setActiveTab('coach')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-800 p-0.5 shadow-lg shadow-emerald-900/50 flex items-center justify-center transform group-hover:rotate-3 transition-transform">
              <div className="w-full h-full bg-[#0B192C] rounded-[9px] flex items-center justify-center">
                <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">
                  JC
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  JOEY CHAD
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                  LEGACY
                </span>
              </div>
              <p className="text-[10px] text-emerald-400/90 font-medium tracking-wide">
                Learn. Play. Remember.
              </p>
            </div>
          </div>

          {/* Right Action Quick Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDonateModal}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-900/30 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-emerald-200 fill-emerald-200" />
              <span className="hidden sm:inline">Charity Fund</span>
            </button>
            
            {user ? (
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-emerald-600/30 border-emerald-500 text-white shadow-md shadow-emerald-900/30'
                      : 'bg-slate-800/80 hover:bg-slate-700/90 border-slate-700/50 text-slate-200 hover:text-white'
                  }`}
                  title="View Profile"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-600 overflow-hidden flex items-center justify-center border border-emerald-500 shrink-0">
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="User avatar" className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-xs font-semibold truncate max-w-[100px]">
                    {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                  </span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer border border-slate-700 hover:text-white"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenSignIn}
                className="ml-2 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all shadow shadow-slate-900/20 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tab Strip */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-800/80 scrollbar-none">
          {mainNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-green-700 text-white shadow-md shadow-emerald-900/40'
                    : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.icon}
                {item.label}
                {item.badge && (
                  <span className="bg-amber-500/30 text-amber-300 text-[8px] font-bold px-1 py-0.2 rounded border border-amber-500/40">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

