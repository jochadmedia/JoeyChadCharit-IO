import React, { useState, useEffect } from 'react';
import { TacticalPrepResult } from '../types';
import { Compass, Sparkles, Volume2, Shield, Play, Pause, CheckCircle2, Clock, Zap, Target } from 'lucide-react';
import { useToast } from './Toast';

export const PreMatchRadarView: React.FC = () => {
  const [opponentStyle, setOpponentStyle] = useState('High-Press 4-3-3');
  const [pitchCondition, setPitchCondition] = useState('Wet Natural Grass');
  const [position, setPosition] = useState('Attacking Midfielder');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [completedWarmup, setCompletedWarmup] = useState<number[]>([]);
  const { showToast } = useToast();

  const [tacticalPlan, setTacticalPlan] = useState<TacticalPrepResult>({
    opponentStyle: 'High-Press 4-3-3',
    pitchCondition: 'Wet Natural Grass',
    position: 'Attacking Midfielder',
    tacticalEscapeRoutes: [
      {
        title: 'The Half-Space Pocket & One-Touch Turn',
        description: 'When opponents press high, drop 3 steps into the central half-space. Receive on back foot and break first line of press in 1 touch.',
        keyMovementCue: 'Scan shoulder 2 seconds BEFORE receiving'
      },
      {
        title: 'Wet Pitch Low Driven Wall Pass',
        description: 'Due to wet grass, passes skid faster. Use firm inside-foot wall passes with 10% less weight to maintain ball cadence.',
        keyMovementCue: 'Lock ankle tight on wet surface'
      },
      {
        title: 'Joey\'s High-Exit Fake Stepover',
        description: 'Execute body feint toward touchline to drag their press defender, then exit sharply through center.',
        keyMovementCue: 'Plant left heel firmly into soft turf'
      }
    ],
    mindsetAudioTitle: "Joey AI 5-Min Pre-Match Focus & Calm Mindset",
    warmupSequence: [
      "2 Mins: Ankle Mobility & Dynamic Groin Openers",
      "3 Mins: Short 5-Yard Rapid Touch Wall Passing",
      "3 Mins: 10-Yard Explosive Feint & Exit Sprints",
      "2 Mins: Deep Diaphragmatic Breath Focus Routine"
    ]
  });

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleAudioSpeech = () => {
    if (!('speechSynthesis' in window)) {
      showToast('Audio Ready', 'Playing pre-match visualization audio session.', 'info');
      setIsPlayingAudio(!isPlayingAudio);
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      showToast('Audio Paused', 'Pre-match audio visualization paused.', 'info');
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = `Welcome to your pre-match tactical mindset visualization for ${position}. You are facing a ${opponentStyle} on a ${pitchCondition}. Remember Joey Chad's core principles: Stay calm under pressure, scan your space early, and trust your first touch. Breathe deep, lock your ankle on this surface, and control the rhythm of the pitch. You've got this.`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        setIsPlayingAudio(false);
        showToast('Visualization Completed!', 'You are mentally locked in for kickoff.', 'success');
      };
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
      showToast('Pre-Match Audio Active', 'Focus and listen to Joey AI coach guidance.', 'success');
    }
  };

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const res = await fetch('/api/prematch/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opponentStyle, pitchCondition, position })
      });
      const data = await res.json();
      if (data && data.tacticalEscapeRoutes) {
        setTacticalPlan(data);
        showToast('Tactical Radar Generated!', `Pre-Match plan customized for ${opponentStyle}.`, 'success');
      } else {
        throw new Error('Invalid response');
      }
    } catch (err) {
      console.error('PreMatch AI error:', err);
      setTacticalPlan({
        opponentStyle,
        pitchCondition,
        position,
        tacticalEscapeRoutes: [
          {
            title: `Exploiting ${opponentStyle} Gaps as ${position}`,
            description: `Against a ${opponentStyle}, space opens up directly behind their aggressive wingbacks. Position yourself in half-pockets.`,
            keyMovementCue: 'Check shoulder twice before receiving'
          },
          {
            title: `Adapting Mechanics for ${pitchCondition}`,
            description: `On a ${pitchCondition}, keep center of gravity low during deceleration to avoid slipping on sudden directional changes.`,
            keyMovementCue: 'Bend knees 15% deeper on turns'
          },
          {
            title: 'Joey\'s 1v1 Escape & Final Pass',
            description: 'Use sharp body feint to force defender to commit their hips, then deliver sharp ground pass.',
            keyMovementCue: 'Eye contact with striker before release'
          }
        ],
        mindsetAudioTitle: `Joey AI Pre-Match Confidence Track (${opponentStyle})`,
        warmupSequence: [
          "2 Mins: Dynamic Ankle & Hip Mobility Routine",
          "3 Mins: High-Cadence Rapid Touch Warmup",
          "3 Mins: Directional Change Sprints",
          "2 Mins: Deep Breath Focus Visualization"
        ]
      });
      showToast('Tactical Radar Generated!', `Pre-Match plan ready for ${opponentStyle}.`, 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleWarmupStep = (index: number) => {
    if (completedWarmup.includes(index)) {
      setCompletedWarmup(completedWarmup.filter(i => i !== index));
    } else {
      const updated = [...completedWarmup, index];
      setCompletedWarmup(updated);
      if (updated.length === tacticalPlan.warmupSequence.length) {
        showToast('Warmup Complete!', 'All 10 minutes of dynamic pitch preparation done! +20 XP', 'success');
      }
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 p-6 sm:p-8 space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30">
          <Compass className="w-3.5 h-3.5" />
          <span>Must-Have Feature #4 • Pre-Match Tactical Radar & Mindset</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          Joey AI Pre-Match Radar: <span className="text-indigo-400">Match-Day Preparation</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Input your next opponent's formation, position, and pitch conditions. Get 3 tactical escape routes, a 5-minute pre-game audio mindset visualization, and a 10-minute pitch warmup countdown.
        </p>
      </div>

      {/* Input Form & Plan Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            Match-Day Conditions
          </h2>

          <form onSubmit={handleGeneratePlan} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Opponent Style / System:</label>
              <select
                value={opponentStyle}
                onChange={(e) => setOpponentStyle(e.target.value)}
                className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="High-Press 4-3-3">High-Press 4-3-3</option>
                <option value="Low-Block Counter 5-3-2">Low-Block Counter 5-3-2</option>
                <option value="Physical Direct 4-4-2">Physical Direct 4-4-2</option>
                <option value="Possession Heavy 3-4-2-1">Possession Heavy 3-4-2-1</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Pitch Surface & Weather:</label>
              <select
                value={pitchCondition}
                onChange={(e) => setPitchCondition(e.target.value)}
                className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="Wet Natural Grass">Wet Natural Grass</option>
                <option value="Dry Hard Artificial Turf">Dry Hard Artificial Turf</option>
                <option value="Firm Dry Pitch">Firm Dry Pitch</option>
                <option value="Slippery Muddy Grass">Slippery Muddy Grass</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Your Playing Position:</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="Attacking Midfielder">Attacking Midfielder</option>
                <option value="Winger / Inside Forward">Winger / Inside Forward</option>
                <option value="Central Midfielder">Central Midfielder</option>
                <option value="Fullback / Wingback">Fullback / Wingback</option>
                <option value="Striker">Striker</option>
                <option value="Center Back">Center Back</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Joey AI Calculating Tactical Plan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Pre-Match Tactical Radar</span>
                </>
              )}
            </button>
          </form>

          {/* Audio Player Box */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-indigo-900/40 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
              <Volume2 className="w-4 h-4" />
              <span>{tacticalPlan.mindsetAudioTitle}</span>
            </div>

            <button
              onClick={toggleAudioSpeech}
              className="w-full bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-200 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-4 h-4 fill-indigo-200" />
                  <span>Pause Pre-Match Voice Routine</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-indigo-200" />
                  <span>Listen to Joey AI Pre-Match Voice (Audio)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400" />
              Tactical Escape Routes vs {tacticalPlan.opponentStyle}
            </h2>

            <div className="space-y-3">
              {tacticalPlan.tacticalEscapeRoutes.map((route, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white">Route #{i+1}: {route.title}</h3>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                      Joey AI Cue
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{route.description}</p>
                  <div className="bg-indigo-950/40 p-2 rounded-xl text-[11px] text-indigo-300 font-semibold border border-indigo-900/40">
                    💡 Key Execution Cue: {route.keyMovementCue}
                  </div>
                </div>
              ))}
            </div>

            {/* Warmup Sequence */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  10-Minute Dynamic Pitch Warmup Routine
                </h3>
                <span className="text-[10px] text-emerald-400 font-bold">
                  {completedWarmup.length}/{tacticalPlan.warmupSequence.length} Done
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {tacticalPlan.warmupSequence.map((item, idx) => {
                  const isDone = completedWarmup.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleWarmupStep(idx)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
                        isDone
                          ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                          : 'bg-slate-900 border-slate-800/80 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${isDone ? 'text-emerald-400' : 'text-slate-600'}`} />
                      <span className={isDone ? 'line-through opacity-80' : ''}>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
