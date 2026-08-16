import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { profileService } from '../../lib/auth/profileService';
import { Save, X, Loader2 } from 'lucide-react';

interface ProfileEditProps {
  user: UserProfile;
  onSave: (updatedUser: UserProfile) => void;
  onCancel: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ user, onSave, onCancel }) => {
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      const updated = await profileService.updateProfileData(user.id, {
        displayName: displayName.trim() || null,
      });

      if (updated) {
        onSave(updated);
      } else {
        // Optimistic update if Supabase returns null (RLS / not-in-table case)
        onSave({ ...user, displayName: displayName.trim() || null });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-900 border border-emerald-800/40 rounded-3xl shadow-2xl space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-white">Edit Profile</h2>
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Cancel editing"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Display Name */}
        <div>
          <label htmlFor="displayName" className="block text-sm font-semibold text-slate-300 mb-1.5">
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g. Joey Fan #1"
            maxLength={50}
            disabled={isSaving}
            className="w-full px-4 py-2.5 bg-slate-800/60 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-500 text-sm disabled:opacity-50"
          />
          <p className="text-[11px] text-slate-500 mt-1">{displayName.length}/50 characters</p>
        </div>

        {/* Email — read only */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full px-4 py-2.5 bg-slate-800/30 border border-slate-800 rounded-xl text-slate-500 text-sm cursor-not-allowed"
          />
          <p className="text-[11px] text-slate-500 mt-1">Email cannot be changed here.</p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-2xl transition-colors shadow-lg shadow-emerald-900/40 cursor-pointer"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-2xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
