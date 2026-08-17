import React from 'react';
import { Heart, Star, Sparkles, Quote } from 'lucide-react';

export const AboutJoeyView: React.FC = () => {
  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Profile Section */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0B192C] border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <Sparkles className="w-64 h-64 text-emerald-400" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 md:gap-16">
          <div className="shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-emerald-500 overflow-hidden shadow-2xl shadow-emerald-900/40 relative">
            <img 
              src="/media/joey-hero.jpg" 
              alt="Joey Chad" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              <Star className="w-3.5 h-3.5 fill-emerald-300" />
              <span>A Legacy of Inspiration</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white">Joey Chad</h1>
            <p className="text-xl text-emerald-400 font-semibold tracking-wide">Learn. Play. Remember.</p>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed mt-4">
              Joey wasn't just a player; he was a force of nature on the pitch and a kind heart off it. 
              His vision was simple: every child deserves a ball, a safe pitch, and someone who believes in them. 
              Through this platform, his spirit continues to coach, inspire, and lift up the next generation.
            </p>
          </div>
        </div>
      </div>

      {/* Stories and Impact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Quotes Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Quote className="w-5 h-5 text-emerald-400" />
            What They Said
          </h2>
          
          <div className="space-y-4">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 relative">
              <Quote className="w-12 h-12 text-slate-800 absolute top-4 right-4 opacity-50" />
              <p className="text-slate-300 text-sm italic relative z-10 leading-relaxed">
                "I've coached hundreds of kids, but Joey had something different. He had this infectious energy. 
                When he stepped on the pitch, everyone else stood a little taller."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-xs">CM</div>
                <div>
                  <p className="text-white font-bold text-sm">Coach Marcus</p>
                  <p className="text-emerald-400 text-xs">Former Academy Director</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 relative">
              <Quote className="w-12 h-12 text-slate-800 absolute top-4 right-4 opacity-50" />
              <p className="text-slate-300 text-sm italic relative z-10 leading-relaxed">
                "We were losing 2-0 in the cup final. Joey pulled us all into a huddle and just smiled. 
                Ten minutes later, he had scored two and set up the winner. That was Joey."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-xs">DT</div>
                <div>
                  <p className="text-white font-bold text-sm">Daniel T.</p>
                  <p className="text-emerald-400 text-xs">Teammate & Friend</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charity Focus Section */}
        <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-500/30 p-8 rounded-3xl space-y-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4 border border-emerald-500/50">
            <Heart className="w-6 h-6 text-emerald-400 fill-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">The Charity Mission</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            In honor of Joey's legacy, the Joey Chad Foundation is dedicated to two core pillars that defined his life:
          </p>
          
          <ul className="space-y-4 mt-6">
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <span className="text-emerald-400 font-bold">1</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Grassroots Football Access</h3>
                <p className="text-slate-400 text-xs mt-1">Providing equipment, safe pitches, and coaching resources to underprivileged youth communities.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <span className="text-emerald-400 font-bold">2</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Youth Mental Health</h3>
                <p className="text-slate-400 text-xs mt-1">Funding support programs, counselors, and safe spaces for young athletes navigating the pressures of sports and life.</p>
              </div>
            </li>
          </ul>

          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <p className="text-xs text-slate-400 italic">
              "We aren't just building better footballers. We are building stronger, happier people."
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
