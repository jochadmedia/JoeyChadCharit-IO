import React, { useState, useEffect } from 'react';
import { SquadMember, SquadAssignment } from '../types';
import { Users, ClipboardList, CheckCircle2, AlertCircle, Plus, Send, Award, Heart, Shield, Sparkles } from 'lucide-react';
import { useToast } from './Toast';

export const TeamHqView: React.FC = () => {
  const [role, setRole] = useState<'Coach' | 'Player'>('Coach');
  const [members, setMembers] = useState<SquadMember[]>([]);
  const [assignments, setAssignments] = useState<SquadAssignment[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDueDate, setNewDueDate] = useState('This Friday');
  const [completedAssignmentIds, setCompletedAssignmentIds] = useState<string[]>([]);
  const { showToast } = useToast();

  const fetchSquadData = async () => {
    try {
      const res = await fetch('/api/team/squad');
      const data = await res.json();
      if (data && data.members && data.assignments) {
        setMembers(data.members);
        setAssignments(data.assignments);
      }
    } catch (err) {
      console.error('Error fetching squad data:', err);
    }
  };

  useEffect(() => {
    fetchSquadData();
  }, []);

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch('/api/team/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          category: 'Coach Homework',
          dueDate: newDueDate,
          repsGoal: '3 Sets x 50 Reps'
        })
      });
      const data = await res.json();
      if (data && data.assignment) {
        setAssignments([data.assignment, ...assignments]);
        showToast('Homework Assigned!', `"${newTitle}" sent to all squad members.`, 'success');
      }
    } catch (err) {
      console.error('Error assigning drill:', err);
      showToast('Assignment Created', `"${newTitle}" assigned to squad.`, 'info');
    } finally {
      setNewTitle('');
      setShowAssignModal(false);
    }
  };

  const handleCompleteHomework = (assignmentId: string, currentTitle: string) => {
    if (completedAssignmentIds.includes(assignmentId)) {
      showToast('Already Completed', 'You have already logged completion for this drill.', 'info');
      return;
    }

    setCompletedAssignmentIds([...completedAssignmentIds, assignmentId]);
    setAssignments(assignments.map(a => {
      if (a.id === assignmentId) {
        return { ...a, completedCount: Math.min(a.totalSquad, a.completedCount + 1) };
      }
      return a;
    }));
    showToast('Drill Completed!', `Logged completion for "${currentTitle}". +15 XP added to your player card!`, 'success');
  };

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0B192C] to-emerald-950 border border-emerald-800/40 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
            <Users className="w-3.5 h-3.5" />
            <span>Must-Have Feature #1 • Joey's Team HQ</span>
          </div>

          {/* Role Switcher Toggle */}
          <div className="bg-slate-950 p-1 rounded-2xl border border-slate-800 flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setRole('Coach')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                role === 'Coach' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Coach Portal
            </button>
            <button
              onClick={() => setRole('Player')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                role === 'Player' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Player Squad View
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-black text-white">
          Grassroots Squad Portal: <span className="text-emerald-400">Dublin Youth U16s</span>
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
          Assign Joey AI drills as squad homework, track player execution between pitch practices, and unlock sponsor-matched charity donations for Joey's Foundation as a team.
        </p>
      </div>

      {/* Squad Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold uppercase">Active Squad Members</span>
          <p className="text-3xl font-black text-white">{members.length} Players</p>
          <p className="text-[11px] text-emerald-400 font-medium">100% Team Participation Active</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Drills Completed</span>
          <p className="text-3xl font-black text-amber-400">63 Drills This Month</p>
          <p className="text-[11px] text-slate-400">Avg 10.5 drills / player</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold uppercase">Team Charity Raised</span>
          <p className="text-3xl font-black text-emerald-400">$320.00</p>
          <p className="text-[11px] text-emerald-300">Sponsor Matched by Dublin Motors</p>
        </div>
      </div>

      {/* Assignments & Roster Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Homework Assignments */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-emerald-400" />
              Active Squad Homework Assignments
            </h2>

            {role === 'Coach' && (
              <button
                onClick={() => setShowAssignModal(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Assign Drill</span>
              </button>
            )}
          </div>

          <div className="space-y-3">
            {assignments.map((assignment) => {
              const isDone = completedAssignmentIds.includes(assignment.id);
              return (
                <div key={assignment.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] bg-slate-800 text-amber-300 font-bold px-2 py-0.5 rounded">
                        {assignment.category}
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1">{assignment.title}</h3>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded font-semibold border border-emerald-500/20">
                      Due: {assignment.dueDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>Target: {assignment.repsGoal}</span>
                    <span className="font-bold text-white">
                      {assignment.completedCount} / {assignment.totalSquad} Players Done
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-500"
                      style={{ width: `${(assignment.completedCount / assignment.totalSquad) * 100}%` }}
                    ></div>
                  </div>

                  {role === 'Player' && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleCompleteHomework(assignment.id, assignment.title)}
                        disabled={isDone}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                          isDone
                            ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isDone ? 'Homework Completed' : 'Log Completion (+15 XP)'}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Squad Player Roster */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Squad Roster & Activity
          </h2>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {members.map((member) => (
              <div key={member.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{member.avatar}</span>
                  <div>
                    <p className="text-xs font-bold text-white">{member.name}</p>
                    <p className="text-[10px] text-slate-400">{member.position} • {member.drillsCompleted} Drills</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    member.status === 'Top Performer'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : member.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {member.status}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">{member.lastActive}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assign Drill Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 relative shadow-2xl">
            <h3 className="text-lg font-bold text-white">Assign Joey AI Drill to Squad</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Drill Name / Routine:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Joey's Rainbow Flick & Sudden Exit"
                  className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Due Date:</label>
                <input
                  type="text"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  placeholder="e.g. Friday before match"
                  className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 bg-slate-800 text-slate-300 py-2.5 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl font-bold cursor-pointer"
                >
                  Send Homework to Squad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
