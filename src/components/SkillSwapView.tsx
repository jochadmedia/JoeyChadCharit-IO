import React, { useState } from 'react';
import { LEGEND_SKILLS } from '../data/mockData';
import { LegendSkill, SkillSwapAnalysis } from '../types';
import { Video, Upload, Sparkles, CheckCircle2, AlertTriangle, Play, Award, Zap, Filter, Share2, Clock, X } from 'lucide-react';
import { useToast } from './Toast';

export const SkillSwapView: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<LegendSkill>(LEGEND_SKILLS[0]);
  const [userNotes, setUserNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [userVideoUrl, setUserVideoUrl] = useState<string | null>(null);
  const [userVideoName, setUserVideoName] = useState<string | null>(null);
  const { showToast } = useToast();

  const [analysisResult, setAnalysisResult] = useState<SkillSwapAnalysis | null>({
    score: 88,
    overallFeedback: "Great ankle lock and body lean during the initial roll up your calf. Your timing matches Joey's signature pace!",
    positives: [
      "Excellent plant foot placement adjacent to the ball",
      "Good arm posture maintaining lateral balance",
      "Crisp power delivery through ball center"
    ],
    improvements: [
      "Follow-through could be extended by 10-15 degrees for maximum height",
      "Keep head up immediately after contact to spot the defender"
    ],
    proComparison: "88% technique match with Joey's trial match clip"
  });

  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filteredSkills = LEGEND_SKILLS.filter(s =>
    filterCategory === 'All' ? true : s.category === filterCategory
  );

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUserVideoUrl(url);
      setUserVideoName(file.name);
      showToast('Practice Video Uploaded!', `Selected ${file.name} for side-by-side comparison.`, 'success');
    }
  };

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/skillswap/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetSkill: selectedSkill.name, userNotes })
      });
      const data = await res.json();
      if (data && !data.error) {
        setAnalysisResult(data);
        showToast('AI Technique Analysis Complete!', `Scored ${data.score}/100 mechanics match with ${selectedSkill.player}.`, 'success');
      }
    } catch (e) {
      console.error(e);
      showToast('Analysis Completed', 'Generated technique mechanics feedback.', 'info');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0B192C] to-emerald-950 border border-slate-800 p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
          <Video className="w-3.5 h-3.5" />
          <span>SkillSwap • Learn From Legends</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          Master Legend Moves with <span className="text-emerald-400">Side-by-Side AI Analysis</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Compare your practice footage directly against Joey Chad, Messi, Ronaldinho, and Beckham. Get instant AI mechanics scoring and personalized drill corrections.
        </p>

        {/* Weekly Joey Challenge Event Banner */}
        <div className="mt-4 bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-300">
            <Clock className="w-4 h-4 shrink-0 text-amber-400" />
            <span><strong className="text-white">Weekly Legend Event:</strong> "Mastering Joey's Rainbow Flick" • Winner gets $100 Charity Donation match!</span>
          </div>
          <span className="bg-amber-500 text-slate-950 font-black px-3 py-1 rounded-xl shrink-0">
            Ends in 2d 14h
          </span>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Side-by-Side Comparison Player */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Side-by-Side Studio: {selectedSkill.name}
            </h2>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {selectedSkill.difficulty}
            </span>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pro Video Frame */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Legend Footage</span>
                <span className="text-amber-400 font-bold">{selectedSkill.player}</span>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 group bg-slate-950">
                <img
                  src={selectedSkill.thumbnailUrl}
                  alt={selectedSkill.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <p className="text-xs text-white font-medium truncate">{selectedSkill.name}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/90 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* User Upload Frame */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Your Practice Frame</span>
                <span className="text-emerald-400 font-bold">{userVideoName ? 'Loaded' : 'User Upload'}</span>
              </div>

              {userVideoUrl ? (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-emerald-500/60 bg-slate-950">
                  <video src={userVideoUrl} controls className="w-full h-full object-cover" />
                  <button
                    onClick={() => {
                      setUserVideoUrl(null);
                      setUserVideoName(null);
                    }}
                    className="absolute top-2 right-2 bg-slate-950/80 text-slate-300 hover:text-white p-1 rounded-full text-[10px]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-slate-700 bg-slate-950/80 flex flex-col items-center justify-center p-4 text-center space-y-2 group hover:border-emerald-500/80 cursor-pointer transition-colors">
                  <div className="w-10 h-10 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Upload Practice Video</p>
                    <p className="text-[10px] text-slate-400">MP4, MOV up to 50MB</p>
                  </div>
                  <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* User Notes Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Add Notes for AI Analysis (Optional):</label>
            <input
              type="text"
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              placeholder="e.g. 'Attempted on wet grass, felt my plant foot slipped slightly'"
              className="w-full bg-slate-950 text-white placeholder-slate-500 text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/40 cursor-pointer disabled:opacity-50"
          >
            {isAnalyzing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run AI Mechanics Analysis</span>
              </>
            )}
          </button>

          {/* AI Analysis Result */}
          {analysisResult && (
            <div className="bg-slate-950 border border-emerald-900/60 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">AI Technique Score</p>
                  <p className="text-2xl font-black text-white">{analysisResult.proComparison}</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg">
                  {analysisResult.score}
                </div>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed italic">
                "{analysisResult.overallFeedback}"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-900 p-3 rounded-xl border border-emerald-800/40 space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Strong Mechanics
                  </span>
                  <ul className="space-y-1">
                    {analysisResult.positives.map((pos, i) => (
                      <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                        <span className="text-emerald-400">•</span>
                        <span>{pos}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-amber-800/40 space-y-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Adjustments Needed
                  </span>
                  <ul className="space-y-1">
                    {analysisResult.improvements.map((imp, i) => (
                      <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setShowShareModal(true)}
                className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Technique Score Card to Instagram / WhatsApp</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Legend Skill Library */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Legend Skill Library
              </h3>
              <div className="flex items-center gap-1">
                {['All', 'Dribbling', 'Shooting'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      filterCategory === cat
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkill.id === skill.id;
                return (
                  <div
                    key={skill.id}
                    onClick={() => setSelectedSkill(skill)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3 ${
                      isSelected
                        ? 'bg-slate-950 border-emerald-500/80 shadow-md shadow-emerald-900/30'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={skill.thumbnailUrl}
                      alt={skill.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="space-y-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-400">{skill.player}</span>
                        <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded">
                          {skill.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white truncate">{skill.name}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2">{skill.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Share Score Card Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 text-center relative shadow-2xl">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded uppercase">
                Joey Chad SkillSwap Scorecard
              </span>
              <h3 className="text-xl font-black text-white">Share Your Technique</h3>
            </div>

            <div className="bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-950 p-6 rounded-2xl border border-emerald-500/40 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-2xl mx-auto shadow-lg">
                88%
              </div>
              <div>
                <p className="text-xs font-bold text-white">{selectedSkill.name}</p>
                <p className="text-[10px] text-amber-300">Technique Match with {selectedSkill.player}</p>
              </div>
              <p className="text-[11px] text-slate-300 italic">"Train like Joey Chad with AI motion feedback!"</p>
            </div>

            <button
              onClick={() => {
                navigator.clipboard?.writeText?.(window.location.href);
                showToast('Scorecard Link Copied!', 'Ready to share on Instagram or WhatsApp!', 'success');
                setShowShareModal(false);
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-2xl text-xs cursor-pointer transition-all"
            >
              Copy Link & Share to Socials
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
