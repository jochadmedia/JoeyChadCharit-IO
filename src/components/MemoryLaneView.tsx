import React, { useState, useEffect, useRef } from 'react';
import { MEMORY_LOCATIONS } from '../data/mockData';
import { MemoryLocation, TributeMessage } from '../types';
import { MapPin, Camera, Heart, MessageSquare, Compass, Sparkles, Send, Flame, Shield } from 'lucide-react';

export const MemoryLaneView: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<MemoryLocation>(MEMORY_LOCATIONS[0]);
  const [isArActive, setIsArActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isArActive && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.play().catch(() => {});
          }
        })
        .catch(err => console.log('Camera feed fallback to simulated AR:', err));
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isArActive]);
  const [tributes, setTributes] = useState<TributeMessage[]>([
    { id: '1', author: 'Sean Murphy', locationId: 'dublin-grassroots', message: 'Rest in peace Joey. Saw you score 3 here in 2015. Unforgettable footwork!', timestamp: '2 hours ago', likes: 24 },
    { id: '2', author: 'Clara Hughes', locationId: 'dublin-grassroots', message: 'Inspiring my young lad every day to practice his rainbow flicks here.', timestamp: '5 hours ago', likes: 18 },
    { id: '3', author: 'Leinster Youth Club', locationId: 'leinster-academy', message: 'Joey’s shirt #7 hangs with pride in our clubhouse.', timestamp: '1 day ago', likes: 52 }
  ]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const locationTributes = tributes.filter(t => t.locationId === selectedLocation.id);

  const handleAddTribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const item: TributeMessage = {
      id: Date.now().toString(),
      author: newAuthor.trim() || 'Anonymous Fan',
      locationId: selectedLocation.id,
      message: newMessage,
      timestamp: 'Just now',
      likes: 1
    };
    setTributes([item, ...tributes]);
    setNewMessage('');
    setNewAuthor('');
  };

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0B192C] to-slate-900 border border-emerald-800/40 p-6 sm:p-8 space-y-3">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
          <Compass className="w-3.5 h-3.5" />
          <span>Product Idea #3 • Joey's Memory Lane AR</span>
        </div>
        <h1 className="text-3xl font-black text-white">
          Augmented Reality & <span className="text-emerald-400">Geolocated Memory Pitch</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Step onto the pitch where Joey played. Point your camera at key pitch locations to trigger 3D AR holograms of Joey’s legendary moves and leave tribute messages on the digital wall.
        </p>
      </div>

      {/* AR Field Simulator & Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Pitch AR Viewer */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase">{selectedLocation.category}</span>
              <h2 className="text-xl font-black text-white">{selectedLocation.title}</h2>
            </div>

            <button
              onClick={() => setIsArActive(!isArActive)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                isArActive
                  ? 'bg-amber-500 text-slate-950 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>{isArActive ? 'Exit AR Hologram' : 'Launch 3D AR View'}</span>
            </button>
          </div>

          {/* AR Pitch Stage View */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 group">
            {isArActive ? (
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
              />
            ) : null}
            
            <img
              src={selectedLocation.image}
              alt={selectedLocation.title}
              className={`w-full h-full object-cover transition-all duration-700 ${isArActive ? 'opacity-30 brightness-50 blur-[1px]' : ''}`}
            />

            {/* AR Hologram Overlay */}
            {isArActive ? (
              <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-20 h-20 rounded-full border-2 border-emerald-400/80 bg-emerald-500/20 flex items-center justify-center animate-spin">
                  <div className="w-12 h-12 rounded-full bg-emerald-400/80 animate-ping"></div>
                </div>

                <div className="bg-slate-950/90 border border-emerald-500/60 p-4 rounded-2xl max-w-sm space-y-2">
                  <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    3D Hologram Activated
                  </span>
                  <p className="text-xs font-bold text-white">{selectedLocation.arTriggerPrompt}</p>
                  <p className="text-[11px] text-emerald-300 italic">"{selectedLocation.joeyHighlight}"</p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex flex-col justify-end p-5">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedLocation.locationName}</span>
                  <span className="text-slate-400">• {selectedLocation.year}</span>
                </div>
                <p className="text-xs text-slate-200">{selectedLocation.description}</p>
              </div>
            )}
          </div>

          {/* Location Details Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Joey's Career Highlight</span>
              <p className="text-xs font-bold text-amber-300">{selectedLocation.joeyHighlight}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Community Tributes</span>
              <p className="text-xs font-bold text-emerald-300">{selectedLocation.tributeCount} Fan Messages Left</p>
            </div>
          </div>
        </div>

        {/* Right Column: Location Pins & Tribute Wall */}
        <div className="lg:col-span-5 space-y-6">
          {/* Location Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Select Memory Pitch Location
            </h3>
            <div className="space-y-2">
              {MEMORY_LOCATIONS.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-950 border-emerald-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{loc.title}</p>
                      <p className="text-[10px] text-slate-400">{loc.locationName}</p>
                    </div>
                    <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-emerald-300 font-semibold">
                      {loc.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Digital Tribute Wall */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              Digital Tribute Wall
            </h3>

            {/* Leave a tribute form */}
            <form onSubmit={handleAddTribute} className="space-y-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Your Name (e.g. Liam, Dublin FC)"
                className="w-full bg-slate-900 text-white placeholder-slate-500 text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write a tribute to Joey..."
                  className="flex-1 bg-slate-900 text-white placeholder-slate-500 text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Tribute List */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {locationTributes.map((tribute) => (
                <div key={tribute.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-emerald-400">{tribute.author}</span>
                    <span className="text-slate-500">{tribute.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-200">{tribute.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
