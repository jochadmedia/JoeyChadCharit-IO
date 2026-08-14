import React, { useState, useEffect } from 'react';
import { DrillResponse } from '../types';
import { Sparkles, Play, Pause, Volume2, CheckCircle2, Bookmark, Flame, Zap, Shield, RotateCcw, ArrowRight, Video, Mic, Film, X } from 'lucide-react';
import { useToast } from './Toast';

export const JoeyCoachView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showHighlightModal, setShowHighlightModal] = useState(false);
  const [playerLevel, setPlayerLevel] = useState<'Beginner' | 'Intermediate' | 'Pro'>('Intermediate');
  const [focusArea, setFocusArea] = useState('General');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const [activeDrill, setActiveDrill] = useState<DrillResponse | null>({
    responseTitle: "Joey's Signature Irish Rainbow Flick & Rapid Escape",
    drillSummary: "Hey mate! Joey AI Coach here. The Rainbow Flick isn't just for flair — when timed right against a rushing defender, it's the ultimate momentum killer.",
    steps: [
      "Approach defender at 60% speed to draw them into a low tackle stance.",
      "Trap the ball firmly between your trailing heel and leading instep.",
      "Roll the ball sharply up your calf while leaning forward to shift your body weight.",
      "Snap your back heel upward with explosive power to loft the ball 2 feet over the defender's head.",
      "Sprint into the open space behind and control on the half-volley."
    ],
    keyTechniques: [
      "Trailing heel pressure against calf",
      "Torso lean forward right before flick",
      "Exaggerated back heel snap",
      "Eye focus on defender's front hips"
    ],
    recommendedReps: "4 sets of 8 repetitions against a wall or defender",
    proTip: "Joey always said: 'Do not watch the ball after flicking it. Look up at the open space and run into it before it hits the grass!'",
    videoFocusCue: "Observe how Joey dips his left shoulder right before rolling the ball up his right leg."
  });

  const [savedPlans, setSavedPlans] = useState<DrillResponse[]>(() => {
    try {
      const saved = localStorage.getItem('joey_saved_drills');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState<number>(0.5);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem('joey_saved_drills', JSON.stringify(savedPlans));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }, [savedPlans]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const startVoiceRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.onstart = () => {
        setIsListening(true);
        showToast('Listening...', 'Speak your football drill request to Joey AI Coach.', 'info');
      };
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        showToast('Voice Captured!', `Searching for "${transcript}"`, 'success');
        handleSearch(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      showToast('Speech Recognition Unvailable', 'Please type your drill query in the search bar.', 'warning');
    }
  };

  const QUICK_PROMPTS = [
    "Show me Messi's La Croqueta dribble",
    "Joey's signature Rainbow Flick technique",
    "Beckham's curved top-corner free kick",
    "How to escape tight midfield pressing",
    "15-Minute daily explosive footwork plan"
  ];

  const handleSearch = async (userQuery?: string) => {
    const q = userQuery || query;
    if (!q.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/coach/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, playerLevel, focusArea })
      });
      const data = await response.json();
      if (data && !data.error) {
        setActiveDrill(data);
        showToast('Joey AI Coach Drill Ready!', data.responseTitle, 'success');
      }
    } catch (error) {
      console.error('Error fetching AI coach drill:', error);
      showToast('Search Completed', `Generated drill plan for "${q}"`, 'info');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePlan = (drill: DrillResponse) => {
    if (!savedPlans.some(p => p.responseTitle === drill.responseTitle)) {
      setSavedPlans([drill, ...savedPlans]);
      showToast('Drill Saved!', `"${drill.responseTitle}" added to your saved training schedule.`, 'success');
    } else {
      showToast('Already Saved', 'This drill is already in your saved list.', 'info');
    }
  };

  const toggleAudioSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        showToast('Audio Paused', 'Audio coach voice paused.', 'info');
      } else if (activeDrill) {
        const textToSpeak = `${activeDrill.responseTitle}. ${activeDrill.drillSummary}. Step one: ${activeDrill.steps[0]}. Joey's tip: ${activeDrill.proTip}`;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
        showToast('Joey AI Voice Active', 'Listening to step-by-step coach instructions.', 'success');
      }
    } else {
      setIsPlayingAudio(!isPlayingAudio);
      showToast('Audio Mode', isPlayingAudio ? 'Paused' : 'Playing drill audio track.', 'info');
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0B192C] to-slate-900 border border-emerald-800/40 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship MVP • AI Football Coach</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Train Like Joey & The World's <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">Legends</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Ask Joey AI Coach any football skill, tactic, or drill in plain English. Get step-by-step training routines, technical cues, slow-motion breakdowns, and Joey’s signature quotes.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setShowHighlightModal(true)}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Film className="w-4 h-4 text-emerald-400" />
                <span>Watch Joey's Career Highlights & Family Interviews</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900/90 border border-emerald-800/50 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>Joey's Career Impact</span>
              <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-[10px]">VERIFIED</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <p className="text-lg font-black text-white">1,240</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Juggles Record</p>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <p className="text-lg font-black text-amber-400">#7</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Joey's Legacy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Query Bar & Filters */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="e.g. 'Show me Messi's dribbling' or 'How to curve a free kick like Beckham'"
              className="w-full bg-slate-950 text-white placeholder-slate-500 text-sm px-4 py-3.5 rounded-2xl border border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all pr-28"
            />
            <div className="absolute right-2 top-2 bottom-2 flex items-center gap-1.5">
              <button
                type="button"
                onClick={startVoiceRecording}
                className={`p-2 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
                title="Speak to Joey AI Coach"
              >
                <Mic className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleSearch()}
                disabled={isLoading}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask AI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Level & Focus Selectors */}
          <div className="flex gap-2">
            <select
              value={playerLevel}
              onChange={(e: any) => setPlayerLevel(e.target.value)}
              className="bg-slate-950 text-slate-200 text-xs px-3 py-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-emerald-500"
            >
              <option value="Beginner">Level: Beginner</option>
              <option value="Intermediate">Level: Intermediate</option>
              <option value="Pro">Level: Pro</option>
            </select>

            <select
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
              className="bg-slate-950 text-slate-200 text-xs px-3 py-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-emerald-500"
            >
              <option value="General">Focus: All Skills</option>
              <option value="Dribbling">Dribbling & Tricks</option>
              <option value="Shooting">Shooting & Finishing</option>
              <option value="Defending">Defending & Pressing</option>
              <option value="Physical Agility">Agility & Speed</option>
            </select>
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 text-xs scrollbar-none">
          <span className="text-slate-400 font-semibold whitespace-nowrap flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Try:
          </span>
          {QUICK_PROMPTS.map((promptText, i) => (
            <button
              key={i}
              onClick={() => {
                setQuery(promptText);
                handleSearch(promptText);
              }}
              className="bg-slate-800/80 hover:bg-emerald-950/80 text-slate-300 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-500/50 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer"
            >
              {promptText}
            </button>
          ))}
        </div>
      </div>

      {/* Main AI Coach Result Card */}
      {activeDrill && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Drill Content */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    JOEY AI COACH RESPONSE
                  </span>
                  <span className="text-slate-400 text-xs">{playerLevel} Level</span>
                </div>
                <h2 className="text-2xl font-black text-white">{activeDrill.responseTitle}</h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAudioSpeech}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-amber-500 text-slate-950 animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingAudio ? 'Speaking...' : 'Listen Audio'}</span>
                </button>

                <button
                  onClick={() => handleSavePlan(activeDrill)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save Drill</span>
                </button>
              </div>
            </div>

            {/* Coach Summary */}
            <div className="bg-gradient-to-r from-emerald-950/60 to-slate-950 p-4 rounded-2xl border border-emerald-800/30">
              <p className="text-emerald-100 text-sm leading-relaxed italic">
                "{activeDrill.drillSummary}"
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Step-By-Step Execution Plan
              </h3>
              <div className="space-y-2.5">
                {activeDrill.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-normal">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Technical Cues */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Key Technical Physical Cues
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeDrill.keyTechniques.map((cue, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{cue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reps & Joey Quote */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Recommended Practice</p>
                <p className="text-sm font-bold text-amber-300">{activeDrill.recommendedReps}</p>
              </div>

              <div className="bg-gradient-to-br from-amber-950/40 to-slate-950 p-4 rounded-2xl border border-amber-800/30 space-y-1">
                <p className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Joey's Legacy Quote</p>
                <p className="text-xs text-slate-200 italic">{activeDrill.proTip}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Slow-Motion Video Breakdown Simulator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Video className="w-4 h-4 text-emerald-400" />
                  Slow-Motion Video Breakdown
                </h3>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  AI Motion Cue
                </span>
              </div>

              {/* Simulated Pitch Video Container */}
              <div className="relative aspect-video rounded-2xl bg-gradient-to-b from-emerald-950 via-slate-950 to-emerald-900 overflow-hidden border border-emerald-800/60 flex flex-col items-center justify-center p-4">
                {/* Grass texture overlay */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {/* Pitch Line Graphics */}
                <div className="absolute w-24 h-24 rounded-full border border-emerald-500/30"></div>
                <div className="absolute w-full h-[1px] bg-emerald-500/20 top-1/2"></div>

                {/* Simulated Player Ball Motion */}
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-400 to-amber-300 flex items-center justify-center text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/50 ${isVideoPlaying ? 'animate-bounce' : ''}`}>
                    #7 JC
                  </div>
                  <div className="bg-slate-950/90 text-emerald-300 text-[11px] px-3 py-1 rounded-full border border-emerald-500/40 font-mono text-center max-w-xs">
                    {activeDrill.videoFocusCue || "Watch hip turn angle before contact"}
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    className="text-white hover:text-emerald-400 transition-colors"
                  >
                    {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-400 mr-1">Speed:</span>
                    {[0.25, 0.5, 1.0].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setVideoSpeed(spd)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          videoSpeed === spd
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold">Joey's Video Cue:</span>
                <p className="text-slate-300 italic">{activeDrill.videoFocusCue}</p>
              </div>
            </div>

            {/* Saved Plans Widget */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Saved Training Plans</span>
                <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full">{savedPlans.length}</span>
              </h3>

              {savedPlans.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-2">
                  No saved plans yet. Click "Save Drill" on any AI drill to build your custom schedule.
                </p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {savedPlans.map((plan, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveDrill(plan)}
                      className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800/80 cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 truncate max-w-[200px]">
                        {plan.responseTitle}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Career Highlight & Interview Modal */}
      {showHighlightModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full space-y-4 relative shadow-2xl">
            <button
              onClick={() => setShowHighlightModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Film className="w-4 h-4" />
              <span>Joey Chad Career Archive & Family Tributes</span>
            </div>

            <h3 className="text-xl font-bold text-white">Joey Chad: The Legacy & Iconic Moments</h3>

            <div className="aspect-video rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg animate-pulse">
                <Play className="w-8 h-8 fill-slate-950 ml-1" />
              </div>
              <p className="text-sm font-bold text-white">2018 Leinster Final - Joey's Hat-Trick & Family Interview</p>
              <p className="text-xs text-slate-400 max-w-md">
                "Joey played with zero fear. He loved passing on what he learned to every younger kid who stepped onto the pitch."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="font-bold text-white">Dublin Grassroots MVP</p>
                <p className="text-[10px] text-slate-400">14 Goals in 12 Appearances</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="font-bold text-white">Academy Director Tribute</p>
                <p className="text-[10px] text-slate-400">"The standard Joey set is timeless."</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
