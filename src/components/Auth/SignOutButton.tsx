import React from 'react';
import { supabase } from '../../lib/supabase/supabaseClient';

const SignOutButton: React.FC = () => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      console.log('Sign out successful!');
      // You might want to redirect the user after sign-out
      // window.location.href = '/';
    }
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};

export default SignOutButton;