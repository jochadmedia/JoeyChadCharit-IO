import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { Mail, Calendar, LogOut, Pencil } from 'lucide-react';
import { supabase } from '../../lib/supabase/supabaseClient';
import ProfileEdit from './ProfileEdit';

interface ProfileListProps {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  onEditProfile?: () => void;
}

const ProfileList: React.FC<ProfileListProps> = ({ user, isLoading, error }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState<UserProfile | null>(user);

  // Sync local state if parent user prop changes (e.g. after login)
  React.useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // App.tsx onAuthStateChange handles redirect to 'coach' tab
  };

  const handleSave = (updatedUser: UserProfile) => {
    setLocalUser(updatedUser);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-3 text-slate-300">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16 text-red-400">
        <p>Error loading profile: {error}</p>
      </div>
    );
  }

  if (!localUser) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-400">
        <p>No user profile found. Please sign in.</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <ProfileEdit
        user={localUser}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl space-y-6 text-white">
      <div className="text-center space-y-3">
        <div className="w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center mx-auto text-4xl font-black text-slate-950 shadow-lg">
          {(localUser.displayName || localUser.email).charAt(0).toUpperCase()}
        </div>
        <h2 className="text-3xl font-black text-white">{localUser.displayName || 'Guest Player'}</h2>
        <p className="text-emerald-400 text-sm">@{localUser.email.split('@')[0]}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="text-xs text-slate-400">Email Address</p>
            <p className="text-sm font-medium">{localUser.email}</p>
          </div>
        </div>
        {localUser.createdAt && (
          <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs text-slate-400">Member Since</p>
              <p className="text-sm font-medium">{new Date(localUser.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile button */}
      <button
        onClick={() => setIsEditing(true)}
        className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-2xl transition-colors border border-slate-700 cursor-pointer"
      >
        <Pencil className="w-4 h-4" />
        Edit Profile
      </button>

      {/* Sign Out button */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-900/40 cursor-pointer"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>
    </div>
  );
};

export default ProfileList;
