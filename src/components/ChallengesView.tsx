import React, { useState } from 'react';
import { SKILL_CHALLENGES, LEADERBOARD_USERS } from '../data/mockData';
import { SkillChallenge } from '../types';
import { Trophy, CheckCircle2, Heart, Award, Flame, Star, Shield, Swords, X, Users, Zap } from 'lucide-react';

interface ChallengesViewProps {
  onUnlockCharityDonation: (amount: number, challengeTitle: string) => void;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({ onUnlockCharityDonation }) => {
  const [challenges, setChallenges] = useState<SkillChallenge[]>(SKILL_CHALLENGES);
  const [userPoints, setUserPoints] = useState(450);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [activeBattle, setActiveBattle] = useState(false);

  const BADGES = [
    { title: "Wall Pass Prodigy", unlocked: true, icon: "⚽", desc: "Completed 100-Touch Wall Pass Drill" },
    { title: "Rainbow Master", unlocked: true, icon: "🌈", desc: "Executed Joey's signature move" },
    { title: "Crossbar Sniper", unlocked: false, icon: "🎯", desc: "Hit crossbar 3 times in 5 tries" },
    { title: "Air Juggle Champion", unlocked: false, icon: "🔥", desc: "Reached 50 consecutive juggles" },
    { title: "Charity Hero", unlocked: true, icon: "❤️", desc: "Unlocked $20+ for Joey's Foundation" },
    { title: "Legion #7 Legacy", unlocked: false, icon: "⭐", desc: "Complete 10 total daily challenges" }
  ];

  const toggleChallengeCompletion = (challengeId: string) => {
    setChallenges(prev =>
      prev.map(c => {
        if (c.id === challengeId) {
          const newCompleted = !c.completed;
          if (newCompleted) {
            setUserPoints(p => p + c.points);
            onUnlockCharityDonation(c.charityUnlockAmount, c.title);
          } else {
            setUserPoints(p => Math.max(0, p - c.points));
          }
          return { ...c, completed: newCompleted };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-950 via-[#0B192C] to-emerald-950 border border-amber-800/40 p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
          <Trophy className="w-3.5 h-3.5" />
          <span>Product Idea #4 • Gamification & Charity Battles</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          The Joey Challenge: <span className="text-amber-400">Complete Drills, Unlock Charity Donations</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Complete daily football challenges inspired by Joey Chad’s career milestones. Every completed challenge directly unlocks sponsor-matched donations to Joey’s charity!
        </p>
      </div>

      {/* User Stats Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xl">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Your Total XP Points</p>
            <p className="text-2xl font-black text-white">{userPoints} XP</p>
          </div>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xl">
            <Heart className="w-6 h-6 fill-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Unlocked For Charity</p>
            <p className="text-2xl font-black text-emerald-400">$40.00</p>
          </div>
        </div>

        <div
          onClick={() => setShowBadgeModal(true)}
          className="bg-slate-900 hover:bg-slate-850 p-5 rounded-3xl border border-slate-800 flex items-center justify-between gap-4 cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-black text-xl group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold">Legacy Badges Earned</p>
              <p className="text-2xl font-black text-white">3 / 6</p>
            </div>
          </div>
          <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-2 py-1 rounded-xl">
            View All
          </span>
        </div>
      </div>

      {/* 1v1 Skill Battle Bar */}
      <div className="bg-slate-900 border border-amber-500/30 p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">1v1 Multiplayer Skill Battles</h3>
            <p className="text-xs text-slate-400">Challenge a friend or random athlete to a 60-second juggles/flicks duel.</p>
          </div>
        </div>

        <button
          onClick={() => {
            setActiveBattle(true);
            setTimeout(() => {
              alert("1v1 Match Found! Opponent: Mateo Silva (Spain). Battle starting!");
            }, 1000);
          }}
          className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black px-5 py-2.5 rounded-2xl text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md shrink-0"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>{activeBattle ? 'Finding Match...' : 'Start 1v1 Skill Battle'}</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Challenge Cards */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            Active Skill Challenges
          </h2>

          <div className="space-y-3">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`p-5 rounded-3xl border transition-all space-y-3 ${
                  challenge.completed
                    ? 'bg-slate-950/80 border-emerald-500/60'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold bg-slate-800 text-amber-300 px-2 py-0.5 rounded">
                      {challenge.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{challenge.title}</h3>
                  </div>

                  <button
                    onClick={() => toggleChallengeCompletion(challenge.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      challenge.completed
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{challenge.completed ? 'Completed!' : 'Mark Done'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300">{challenge.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs">
                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">Target</span>
                    <span className="text-white font-semibold">{challenge.targetCount}</span>
                  </div>

                  <div className="bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <span className="text-[9px] text-amber-400 font-bold uppercase block">Joey's Record</span>
                    <span className="text-amber-300 font-semibold">{challenge.joeyRecord}</span>
                  </div>

                  <div className="bg-emerald-950/40 p-2 rounded-xl border border-emerald-800/40 col-span-2 sm:col-span-1">
                    <span className="text-[9px] text-emerald-400 font-bold uppercase block">Charity Reward</span>
                    <span className="text-emerald-300 font-bold">+${challenge.charityUnlockAmount} Donated</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Global Charity Leaderboard */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                Global Charity Leaderboard
              </h3>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                LIVE UPDATES
              </span>
            </div>

            <div className="space-y-2.5">
              {LEADERBOARD_USERS.map((user) => (
                <div
                  key={user.rank}
                  className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center ${
                      user.rank === 1 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {user.rank}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white flex items-center gap-1">
                        <span>{user.avatar}</span>
                        <span>{user.name}</span>
                      </p>
                      <p className="text-[10px] text-slate-400">{user.country} • {user.challengesCompleted} Drills</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold text-amber-400">{user.points} XP</p>
                    <p className="text-[10px] text-emerald-400 font-semibold">${user.charityRaised} Raised</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legacy Badges Showcase Modal */}
      {showBadgeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 relative shadow-2xl">
            <button
              onClick={() => setShowBadgeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded uppercase">
                Joey Chad Legacy Trophy Room
              </span>
              <h3 className="text-xl font-black text-white">Your Earned Achievements</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
              {BADGES.map((b, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-2xl border text-center space-y-1.5 ${
                    b.unlocked
                      ? 'bg-slate-950 border-emerald-500/60'
                      : 'bg-slate-950/40 border-slate-800 opacity-50'
                  }`}
                >
                  <div className="text-2xl">{b.icon}</div>
                  <p className="text-xs font-bold text-white">{b.title}</p>
                  <p className="text-[10px] text-slate-400">{b.desc}</p>
                  <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    b.unlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {b.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
