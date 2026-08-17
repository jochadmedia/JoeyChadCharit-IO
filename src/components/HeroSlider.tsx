import React, { useState, useEffect } from 'react';
import { NavigationTab } from '../types';
import { Play, Pause, ChevronLeft, ChevronRight, Sparkles, Heart, Trophy, Zap, Shield, Film, X, ArrowRight } from 'lucide-react';
import { useToast } from './Toast';

interface HeroSliderProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenDonate: () => void;
}

interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  quote: string;
  category: 'Match Highlight' | 'Grassroots Legacy' | 'Skill Showcase' | 'Charity Impact';
  imageUrl: string;
  videoUrl?: string;
  primaryCtaLabel: string;
  primaryTab: NavigationTab;
  secondaryCtaLabel: string;
  secondaryTab?: NavigationTab;
  stats: { label: string; value: string }[];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: '2018 Leinster Final • Iconic Moment',
    title: 'Joey Chad’s Unforgettable Hat-Trick & Rainbow Flick',
    subtitle: 'Relive Joey’s legendary semi-final performance at Dublin National Arena that inspired thousands of young athletes across Ireland.',
    quote: '"Speed of thought beats speed of foot. Look up before the ball reaches your boots!"',
    category: 'Match Highlight',
    imageUrl: '/media/joey-hero.jpg',
    videoUrl: '/media/joey-video.mp4',
    primaryCtaLabel: 'Ask Joey AI Coach This Technique',
    primaryTab: 'coach',
    secondaryCtaLabel: 'Explore AR Pitch Memories',
    secondaryTab: 'ar_memory',
    stats: [
      { label: 'Match Goals', value: '3 Goals' },
      { label: 'Dribbles Won', value: '100% (8/8)' },
      { label: 'Pitch Speed', value: '32.4 km/h' }
    ]
  },
  {
    id: 'slide-2',
    badge: 'Joey Chad Legacy Foundation',
    title: '$128,450 Raised for Youth Mental Health & Grassroots Football',
    subtitle: 'Every drill completed and challenge unlocked matches sponsor donations to build community sports facilities and mental health programs.',
    quote: '"Football gave me everything. My dream is for every kid to have a ball, a safe pitch, and someone who believes in them."',
    category: 'Charity Impact',
    imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1600&q=80',
    primaryCtaLabel: 'Support Joey’s Foundation',
    primaryTab: 'charity',
    secondaryCtaLabel: 'View Clubhouse TV Broadcast',
    secondaryTab: 'clubhouse_tv',
    stats: [
      { label: 'Total Raised', value: '$128,450' },
      { label: 'Donors', value: '3,420 Fans' },
      { label: 'Sponsor Match', value: '$500 Pool' }
    ]
  },
  {
    id: 'slide-3',
    badge: 'FIFA-Style AI Motion Radar',
    title: 'Scout Radar & Side-by-Side Legend Technique Comparison',
    subtitle: 'Upload your practice videos to receive instant AI motion feedback, cadence scoring, and side-by-side comparison with Joey Chad & Messi.',
    quote: '"Control your first touch, lock your ankle, and release with authority."',
    category: 'Skill Showcase',
    imageUrl: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1600&q=80',
    primaryCtaLabel: 'Run AI Scout Radar',
    primaryTab: 'scout_radar',
    secondaryCtaLabel: 'Compare Moves in SkillSwap',
    secondaryTab: 'skillswap',
    stats: [
      { label: 'Scout Accuracy', value: '99.2%' },
      { label: 'Turn Velocity', value: '88 OVR' },
      { label: 'Active Athletes', value: '12,400+' }
    ]
  },
  {
    id: 'slide-4',
    badge: 'Safe Youth Football Development',
    title: 'Junior Joey Companion & Dublin Youth U16 Squad HQ',
    subtitle: 'Age-appropriate agility tracks, growth-plate safe movement routines, and coach-to-player homework assignment tools.',
    quote: '"At 8 or 12, football is about falling in love with the game. Joy comes first."',
    category: 'Grassroots Legacy',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80',
    primaryCtaLabel: 'Open Junior Joey Companion',
    primaryTab: 'junior_growth',
    secondaryCtaLabel: 'Go to Team HQ',
    secondaryTab: 'team_hq',
    stats: [
      { label: 'Age Tracks', value: 'U8, U12, U14' },
      { label: 'Workload Safety', value: '100% Verified' },
      { label: 'Active Squads', value: '450 Clubs' }
    ]
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigateTab, onOpenDonate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [selectedVideoSlide, setSelectedVideoSlide] = useState<HeroSlide | null>(null);
  const { showToast } = useToast();

  const currentSlide = HERO_SLIDES[currentIndex];

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleVideoModal = (slide: HeroSlide) => {
    setSelectedVideoSlide(slide);
    showToast('Highlight Video Ready', `Playing footage for "${slide.title}"`, 'info');
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      {/* Main Carousel Frame */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-slate-950 shadow-2xl group min-h-[480px] sm:min-h-[520px] flex flex-col justify-end">
        {/* Slide Image Background with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-1000 transform group-hover:scale-105 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070F1B] via-[#070F1B]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#070F1B] via-transparent to-[#070F1B]/60"></div>
        </div>

        {/* Top Floating Bar */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/40 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentSlide.badge}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800">
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title={isAutoplay ? 'Pause auto-slide' : 'Play auto-slide'}
            >
              {isAutoplay ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Pause Slider</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                  <span className="hidden sm:inline">Autoplay</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 p-6 sm:p-10 space-y-6 max-w-3xl">
          <div className="space-y-3">
            <span className="text-amber-400 text-xs font-black uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 inline-block">
              {currentSlide.category}
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {currentSlide.title}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {currentSlide.subtitle}
            </p>

            <div className="bg-emerald-950/40 border-l-4 border-emerald-500 p-3 rounded-r-xl text-xs text-emerald-200 italic font-medium">
              {currentSlide.quote}
            </div>
          </div>

          {/* Quick Statistics Row */}
          <div className="grid grid-cols-3 gap-3 bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-center max-w-lg">
            {currentSlide.stats.map((stat, i) => (
              <div key={i} className="space-y-0.5">
                <p className="text-xs sm:text-sm font-black text-white">{stat.value}</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onNavigateTab(currentSlide.primaryTab)}
              className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-black px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-950/50"
            >
              <span>{currentSlide.primaryCtaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {currentSlide.secondaryTab && (
              <button
                onClick={() => onNavigateTab(currentSlide.secondaryTab!)}
                className="bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold px-4 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>{currentSlide.secondaryCtaLabel}</span>
              </button>
            )}

            <button
              onClick={() => handleVideoModal(currentSlide)}
              className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold px-4 py-3 rounded-2xl text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Film className="w-4 h-4 text-amber-400" />
              <span>Watch Highlight Footage</span>
            </button>
          </div>
        </div>

        {/* Carousel Navigation Arrows & Indicators */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-2xl bg-slate-900/80 hover:bg-emerald-600 text-white border border-slate-800 transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-emerald-400' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-2xl bg-slate-900/80 hover:bg-emerald-600 text-white border border-slate-800 transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Highlight Preview Modal */}
      {selectedVideoSlide && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full space-y-4 relative shadow-2xl">
            <button
              onClick={() => setSelectedVideoSlide(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <Film className="w-4 h-4" />
              <span>Joey Chad Career Archive Footage</span>
            </div>

            <h3 className="text-xl font-bold text-white">{selectedVideoSlide.title}</h3>

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <img
                src={selectedVideoSlide.imageUrl}
                alt="Video Thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-xl animate-pulse">
                <Play className="w-8 h-8 fill-slate-950 ml-1" />
              </div>
              <div className="relative z-10 bg-slate-950/90 p-3 rounded-2xl border border-slate-800 max-w-md">
                <p className="text-xs font-bold text-amber-300">{selectedVideoSlide.badge}</p>
                <p className="text-xs text-slate-300 mt-1">{selectedVideoSlide.subtitle}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  const tab = selectedVideoSlide.primaryTab;
                  setSelectedVideoSlide(null);
                  onNavigateTab(tab);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer flex items-center gap-2"
              >
                <span>Launch Feature View</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
