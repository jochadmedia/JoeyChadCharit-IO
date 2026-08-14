import React, { useState } from 'react';
import { CharityStats } from '../types';
import { Heart, ShieldCheck, Users, DollarSign, Send, CheckCircle2, Award, Sparkles } from 'lucide-react';

interface CharityViewProps {
  charityStats: CharityStats;
  onDonateSubmit: (name: string, amount: number, message: string) => void;
}

export const CharityView: React.FC<CharityViewProps> = ({ charityStats, onDonateSubmit }) => {
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('25');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const percentGoal = Math.min(100, Math.round((charityStats.totalRaised / charityStats.goal) * 100));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount) || 10;
    onDonateSubmit(donorName.trim() || 'Anonymous Supporter', numAmount, message);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setDonorName('');
    }, 4000);
  };

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0B192C] to-green-950 border border-emerald-800/40 p-6 sm:p-8 space-y-4 shadow-2xl">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
          <Heart className="w-3.5 h-3.5 fill-emerald-300" />
          <span>100% Non-Profit Integration • Joey Chad Foundation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Honoring Joey Chad: <span className="text-emerald-400">100% Proceeds Support Nominated Charity</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
          Joey’s vision was to inspire young footballers and provide opportunities for youth everywhere. All premium subscriptions, challenge unlocks, and direct donations go straight to youth sports development and mental health initiatives in Joey's name.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
          <p className="text-xs text-slate-400 font-semibold uppercase">Total Funds Raised</p>
          <p className="text-3xl font-black text-emerald-400">${charityStats.totalRaised.toLocaleString()}</p>
          <p className="text-xs text-slate-500">Goal: ${charityStats.goal.toLocaleString()} ({percentGoal}%)</p>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
            <div className="bg-emerald-500 h-full" style={{ width: `${percentGoal}%` }}></div>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
          <p className="text-xs text-slate-400 font-semibold uppercase">Total Donors & Supporters</p>
          <p className="text-3xl font-black text-amber-400">{charityStats.donorCount.toLocaleString()}</p>
          <p className="text-xs text-slate-500">Fans, clubs, and players worldwide</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
          <p className="text-xs text-slate-400 font-semibold uppercase">Nominated Charity Partner</p>
          <p className="text-base font-bold text-white">{charityStats.featuredCharity}</p>
          <p className="text-xs text-emerald-400 font-medium">100% Verified Transparent Ledger</p>
          <button
            onClick={() => alert("Downloading Audited Q1 2026 Non-Profit Financial Report (PDF)...")}
            className="mt-2 text-[10px] bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold px-2.5 py-1 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Download Q1 Financial Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Donation Form */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-emerald-400 fill-emerald-400" />
            Make a Legacy Donation in Joey's Name
          </h2>

          {submitted ? (
            <div className="bg-emerald-950/80 border border-emerald-500/80 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Thank You For Your Support!</h3>
              <p className="text-xs text-emerald-200">
                Your donation has been recorded in Joey's legacy ledger. You are helping keep his dream alive!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Your Name / Club Name:</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Dublin Youth FC or Sarah Jenkins"
                  className="w-full bg-slate-950 text-white text-xs px-3.5 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Select Donation Amount ($ USD):</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {['10', '25', '50', '100'].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setAmount(val)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        amount === val
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Custom amount"
                  className="w-full bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Tribute Message to Joey's Family:</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. 'Keep inspiring young players around the world. Joey's memory lives on!'"
                  rows={3}
                  className="w-full bg-slate-950 text-white text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-900/30 hover:scale-[1.01] transition-all"
              >
                <Heart className="w-4 h-4 fill-slate-950" />
                <span>Confirm Donation of ${amount || 10}</span>
              </button>
            </form>
          )}
        </div>

        {/* Recent Supporters Feed */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            Recent Legacy Supporters
          </h2>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {charityStats.recentDonations.map((d) => (
              <div key={d.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{d.name}</span>
                  <span className="font-black text-emerald-400">${d.amount}</span>
                </div>
                <p className="text-xs text-slate-300 italic">"{d.message}"</p>
                <p className="text-[10px] text-slate-500">{d.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
