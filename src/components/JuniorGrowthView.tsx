import React, { useState } from 'react';
import { JUNIOR_GROWTH_TRACKS } from '../data/mockData';
import { Heart, Shield, CheckCircle2, Play, Award, Sparkles, AlertTriangle, Users, Lock } from 'lucide-react';
import { useToast } from './Toast';

export const JuniorGrowthView: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState(JUNIOR_GROWTH_TRACKS[1]); // Default U12
  const [isParentMode, setIsParentMode] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleStartModule = (modTitle: string, modId: string) => {
    setActiveModuleId(modId);
    showToast('Module Started!', `Starting "${modTitle}" for ${selectedAge.ageGroup}. Have fun!`, 'success');

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = `Starting Junior Joey module: ${modTitle}. Remember, focus on fun, light feet, and smiling on the pitch!`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-teal-800/40 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/30">
            <Heart className="w-3.5 h-3.5 fill-teal-300" />
            <span>Must-Have Feature #5 • Junior Joey Companion (U8–U14)</span>
          </div>

          <button
            onClick={() => setIsParentMode(!isParentMode)}
            className="bg-slate-950 hover:bg-slate-900 text-teal-300 border border-teal-500/40 text-xs font-bold px-4 py-2 rounded-2xl flex items-center gap-2 cursor-pointer transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isParentMode ? 'Exit Parent Mode' : 'Switch to Parent & Safety Dashboard'}</span>
          </button>
        </div>

        <h1 className="text-3xl font-black text-white">
          Junior Joey Companion: <span className="text-teal-400">Safe Youth Football Development</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
          Age-appropriate agility tracks, growth-plate safe movement routines, positive sportsmanship guides, and parental safety limits designed specifically for young players aged 6 to 14.
        </p>
      </div>

      {/* Parent Safety Digest vs Youth Track */}
      {isParentMode ? (
        <div className="bg-slate-900 border border-teal-500/40 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Shield className="w-6 h-6 text-teal-400" />
            <div>
              <h2 className="text-lg font-bold text-white">Parent Safety & Workload Monitor</h2>
              <p className="text-xs text-slate-400">Healthy training guidelines protecting young joints, growth plates, and mental well-being.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold block">Recommended Max Daily Training</span>
              <p className="text-2xl font-black text-white">45 Mins / Day</p>
              <p className="text-[10px] text-emerald-400">Safe Workload Active</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold block">Growth Plate Safety Focus</span>
              <p className="text-2xl font-black text-teal-300">100% Low Impact</p>
              <p className="text-[10px] text-slate-400">No heavy weightlifting or high-fall impact drills</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-semibold block">Weekly Encouragement Score</span>
              <p className="text-2xl font-black text-amber-300">98% Positive</p>
              <p className="text-[10px] text-slate-400">Focus on fun, team effort, and sportsmanship</p>
            </div>
          </div>

          <div className="bg-teal-950/30 p-4 rounded-2xl border border-teal-800/40 text-xs text-slate-300 space-y-1">
            <p className="font-bold text-teal-300">Joey Chad's Youth Coaching Motto:</p>
            <p className="italic">"At age 8, 10, or 12, football is about falling in love with the ball and enjoying every second with your friends. Skill follows joy."</p>
          </div>
        </div>
      ) : (
        /* Youth Player Track Selection */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-2 rounded-2xl border border-slate-800">
            {JUNIOR_GROWTH_TRACKS.map((track) => (
              <button
                key={track.id}
                onClick={() => setSelectedAge(track)}
                className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedAge.id === track.id
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {track.ageGroup}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
              <div>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-2.5 py-0.5 rounded uppercase">
                  Active Age Track
                </span>
                <h2 className="text-lg font-black text-white mt-1">{selectedAge.ageGroup} • {selectedAge.focus}</h2>
              </div>
              <span className="text-xs bg-slate-950 text-slate-300 px-3 py-1 rounded-xl font-bold border border-slate-800">
                Max Daily Limit: {selectedAge.maxDailyMins} Mins
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedAge.modules.map((mod) => {
                const isActive = activeModuleId === mod.id;
                return (
                  <div key={mod.id} className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between ${
                    isActive ? 'bg-teal-950/60 border-teal-500 shadow-lg shadow-teal-900/30' : 'bg-slate-950 border-slate-800'
                  }`}>
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center text-2xl font-black">
                        {mod.icon}
                      </div>
                      <h3 className="text-sm font-bold text-white">{mod.title}</h3>
                      <p className="text-xs text-slate-400">{mod.desc}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs">
                      <span className="text-teal-400 font-semibold">{mod.duration}</span>
                      <button
                        onClick={() => handleStartModule(mod.title, mod.id)}
                        className={`font-bold px-3 py-1.5 rounded-xl text-[11px] flex items-center gap-1 cursor-pointer transition-colors ${
                          isActive
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-teal-600 hover:bg-teal-500 text-white'
                        }`}
                      >
                        <Play className={`w-3 h-3 ${isActive ? 'fill-slate-950' : 'fill-white'}`} />
                        <span>{isActive ? 'In Progress' : 'Start'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
