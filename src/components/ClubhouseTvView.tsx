import React, { useState, useEffect } from 'react';
import { CLUBHOUSE_TOURNAMENT, LEADERBOARD_USERS } from '../data/mockData';
import { ClubhouseTournament } from '../types';
import { Tv, Flame, Trophy, Volume2, Shield, Heart, Zap, Sparkles } from 'lucide-react';
import { useToast } from './Toast';

export const ClubhouseTvView: React.FC = () => {
  const [tournament, setTournament] = useState<ClubhouseTournament>(CLUBHOUSE_TOURNAMENT);
  const [scoreA, setScoreA] = useState(42);
  const [scoreB, setScoreB] = useState(39);
  const [tickerMessage, setTickerMessage] = useState("🏆 Dublin Grassroots Clubhouse TV • Live 1v1 Joey Chad Skill Tournament • $500 Sponsor Donation Match Active!");
  const [isTvMode, setIsTvMode] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setScoreA(prev => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const triggerCrowdCheer = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch (e) {
      console.error(e);
    }
    showToast('Clubhouse Cheer SFX!', "📢 Crowd sound effect: 'HOORAY! LEGENDARY FOOTWORK!'", 'success');
  };

  return (
    <div className={`space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isTvMode ? 'bg-slate-950 min-h-screen text-white p-6' : ''}`}>
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-green-950 border border-emerald-800/40 p-6 sm:p-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
            <Tv className="w-3.5 h-3.5" />
            <span>Must-Have Feature #3 • Clubhouse Broadcast Kiosk</span>
          </div>

          <button
            onClick={() => setIsTvMode(!isTvMode)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-4 py-2 rounded-2xl flex items-center gap-2 cursor-pointer transition-all shadow-md"
          >
            <Tv className="w-4 h-4 fill-slate-950" />
            <span>{isTvMode ? 'Exit TV Mode' : 'Toggle 16:9 Pitch-Side Kiosk TV Mode'}</span>
          </button>
        </div>

        <h1 className="text-3xl font-black text-white">
          Pitch-Side Clubhouse TV: <span className="text-emerald-400">Dublin Grassroots Arena</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Designed for clubhouse TV displays, pub kiosks, and weekend pitch-side monitors. Streams live 1v1 skill battle leaderboards, sponsor donation tickers, and crowd cheers.
        </p>
      </div>

      {/* Main Broadcast Screen Display */}
      <div className="bg-slate-950 border-4 border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden space-y-6">
        {/* TV Header Badge */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-400 font-bold text-xs uppercase tracking-wider">LIVE CLUBHOUSE BROADCAST</span>
          </div>

          <div className="text-xs text-slate-400 font-semibold">
            Location: <strong className="text-white">{tournament.clubName}</strong>
          </div>
        </div>

        {/* Live Match Scoreboard */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 rounded-2xl border border-emerald-500/40 text-center space-y-4">
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/30">
            Current 1v1 Skill Battle Duel
          </span>

          <div className="grid grid-cols-3 items-center max-w-2xl mx-auto">
            {/* Player A */}
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white">{scoreA}</div>
              <p className="text-xs font-bold text-emerald-400">{tournament.activeMatch.playerA}</p>
              <button
                onClick={() => setScoreA(scoreA + 1)}
                className="mt-1 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer"
              >
                +1 Skill Point
              </button>
            </div>

            {/* VS Badge */}
            <div className="space-y-1">
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-xl">VS</span>
              <p className="text-[10px] text-slate-400 font-bold pt-1">{tournament.activeMatch.timeRemaining} REMAINING</p>
            </div>

            {/* Player B */}
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white">{scoreB}</div>
              <p className="text-xs font-bold text-amber-400">{tournament.activeMatch.playerB}</p>
              <button
                onClick={() => setScoreB(scoreB + 1)}
                className="mt-1 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer"
              >
                +1 Skill Point
              </button>
            </div>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={triggerCrowdCheer}
              className="bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-md"
            >
              <Volume2 className="w-4 h-4" />
              <span>Trigger Clubhouse Cheer Sound FX</span>
            </button>
          </div>
        </div>

        {/* Local Clubhouse Leaderboard */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Clubhouse Skill Rankings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {LEADERBOARD_USERS.slice(0, 3).map((user) => (
              <div key={user.rank} className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-[11px]">
                    #{user.rank}
                  </span>
                  <div>
                    <p className="font-bold text-white">{user.name}</p>
                    <p className="text-[10px] text-slate-400">{user.challengesCompleted} Challenges</p>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold">{user.points} pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Match Pool Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 text-amber-300">
            <Heart className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
            <span>
              <strong className="text-white">Clubhouse Sponsor Donation Match:</strong> Local sponsor Dublin Motors is matching $1 per skill point up to <strong>$500</strong> for Joey's Foundation!
            </span>
          </div>
          <span className="bg-amber-500 text-slate-950 font-black px-3.5 py-1.5 rounded-xl shrink-0">
            $500 Pool Unlocked
          </span>
        </div>

        {/* Live Bottom Ticker */}
        <div className="bg-slate-900 border-t border-slate-800 p-2.5 rounded-xl overflow-hidden whitespace-nowrap text-xs text-emerald-400 font-mono tracking-wide">
          <div className="animate-pulse flex items-center gap-4">
            <span className="bg-emerald-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded uppercase">TICKER</span>
            <span>{tickerMessage}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
