import React from 'react';
import { Heart, Star, Sparkles, Quote, MapPin, Globe, Church, Users } from 'lucide-react';

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
              src="/media/joey-about-hero.jpg" 
              alt="Joey Emmanuel Chad" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/media/joey-hero.jpg' // Fallback to original
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              <Star className="w-3.5 h-3.5 fill-emerald-300" />
              <span>A Legacy of Inspiration</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Joey Emmanuel Chad
            </h1>
            <p className="text-xl text-emerald-400 font-semibold tracking-wide">2006 – 2026</p>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed mt-4">
              A 20-year-old rising football talent from the Ogbodo family of Enugu, Nigeria, who called Dublin, Ireland his home. 
              Joey was a force of nature on the pitch and a "kind soul" off it, whose promising career was tragically cut short 
              just as he achieved a major professional milestone in Europe.
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6 pt-4 border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <MapPin className="w-4 h-4 text-emerald-500" />
                Dublin, Ireland
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Globe className="w-4 h-4 text-amber-500" />
                Ytterhogdals IK & Old County
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Church className="w-4 h-4 text-blue-500" />
                Mercy Christian Fellowship
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stories and Impact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Tributes & Faith */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Photos Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg aspect-square">
              <img 
                src="/media/joey-action-1.jpg" 
                alt="Joey Chad Playing" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg aspect-square">
              <img 
                src="/media/joey-action-2.jpg" 
                alt="Joey Chad Smiling" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Quote className="w-5 h-5 text-emerald-400" />
            "Never just a player — he was family."
          </h2>
          
          <div className="space-y-4">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 relative shadow-xl">
              <Quote className="w-12 h-12 text-slate-800 absolute top-4 right-4 opacity-50" />
              <p className="text-slate-300 text-sm italic relative z-10 leading-relaxed">
                "Joey was a young vibrant star with the kindest soul and a beautiful spirit. He had a smile that could brighten any room. Our relationship went far beyond football. He was family."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center font-bold text-emerald-400 text-xs">CA</div>
                <div>
                  <p className="text-white font-bold text-sm">Christopher Akpaloo</p>
                  <p className="text-emerald-400 text-xs">Football Agent & Mentor</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 relative shadow-xl">
              <Quote className="w-12 h-12 text-slate-800 absolute top-4 right-4 opacity-50" />
              <p className="text-slate-300 text-sm italic relative z-10 leading-relaxed">
                "A devastating loss. Joey shared the same dreams and aspirations as thousands of young talents we promote. His story is a poignant reminder of unfulfilled dreams and the fragility of life."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-900/50 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-xs">BS</div>
                <div>
                  <p className="text-white font-bold text-sm">@BALLERZSCOUT</p>
                  <p className="text-blue-400 text-xs">Global Football Media (Tribute reached 5,000+ fans)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Church className="w-5 h-5 text-amber-400" />
              A Foundation of Faith
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Joey was a young man of profound faith and a deeply involved member of his religious community. 
              As a dedicated member of Christ Embassy Ireland and Mercy Christian Fellowship, he served on the 
              technical team and in the youth church. He was remembered as a "soul winner" who loved evangelism 
              and spreading good news through his faith.
            </p>
          </div>
        </div>

        {/* Right Column: Charity Focus Section */}
        <div className="lg:col-span-5 h-full">
          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-500/30 p-8 rounded-3xl space-y-6 h-full flex flex-col">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-2 border border-emerald-500/50">
              <Heart className="w-6 h-6 text-emerald-400 fill-emerald-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-white">The Memorial Legacy</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Following his tragic passing, the global and local communities united to support the Ogbodo family. 
              The massive outpouring of grief turned into action through a memorial fundraiser organized by his agent.
            </p>
            
            <div className="bg-slate-950/50 rounded-2xl p-5 border border-slate-800 space-y-4 my-6">
              <div className="flex items-end justify-between border-b border-slate-800 pb-3">
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Community Support</p>
                  <p className="text-3xl font-black text-emerald-400 mt-1">€11,000+</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white flex items-center gap-1">
                    <Users className="w-4 h-4 text-amber-400" />
                    440
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase">Donors Worldwide</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">Key Supporters:</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    Bluebell Football Club
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    Mercy Christian Church & Christ Embassy
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    IPOB Ireland & Local Community Groups
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    Vistra Ltd
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-white font-bold text-sm mb-2">Our Ongoing Mission</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                The funds raised helped cover memorial expenses and eased the immediate financial burden on Joey's family. 
                Today, this platform exists to carry his vision forward: supporting youth mental health and providing 
                grassroots football access, ensuring Joey's passion continues to touch lives.
              </p>
            </div>

            <div className="pt-6 border-t border-emerald-500/20 mt-auto">
              <p className="text-xs text-emerald-400 font-bold italic text-center">
                "Rest easy, Joey. You'll always have a place in our heart."
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
