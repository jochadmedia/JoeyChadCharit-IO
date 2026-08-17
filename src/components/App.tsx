import React, { useState } from 'react';
import { NavigationTab } from '../types';
import { HeroSlider } from './HeroSlider';
import { JoeyCoachView } from './JoeyCoachView';
import { SkillSwapView } from './SkillSwapView';
import { MemoryLaneView } from './MemoryLaneView';
import { ChallengesView } from './ChallengesView';
import { AcademyView } from './AcademyView';
import { CharityView } from './CharityView';
import { TeamHqView } from './TeamHqView';
import { ScoutRadarView } from './ScoutRadarView';
import { ClubhouseTvView } from './ClubhouseTvView';
import { PreMatchRadarView } from './PreMatchRadarView';
import { JuniorGrowthView } from './JuniorGrowthView';
import { ToastProvider } from './Toast';
import { ErrorBoundary } from './ErrorBoundary';
import { profileService } from '../lib/auth/profileService';
import ProfileList from './Profile/ProfileList';
import { UserProfile } from '../types';

declare global {
  interface Window {
    firebase: any;
  }
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('coach');
  const [user, setUser] = useState<any>(null);
  const [authModal, setAuthModal] = useState({ showSignIn: false, showSignUp: false });

  const renderActiveView = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileList user={user} isLoading={false} error={null} />;
      case 'coach':
        return <JoeyCoachView />;
      case 'skillswap':
        return <SkillSwapView />;
      case 'ar_memory':
        return <MemoryLaneView />;
      case 'challenges':
        return <ChallengesView onUnlockCharityDonation={() => {}} />;
      case 'academy':
        return <AcademyView />;
      case 'charity':
        return <CharityView charityStats={{ totalRaised: 0, goal: 0, donorCount: 0, featuredCharity: '', recentDonations: [] }} onDonateSubmit={() => {}} />;
      case 'team_hq':
        return <TeamHqView />;
      case 'scout_radar':
        return <ScoutRadarView />;
      case 'clubhouse_tv':
        return <ClubhouseTvView />;
      case 'prematch_radar':
        return <PreMatchRadarView />;
      case 'junior_growth':
        return <JuniorGrowthView />;
      default:
        return <HeroSlider onNavigateTab={setActiveTab} onOpenDonate={() => setActiveTab('charity')} />;
    }
  };

  return <ToastProvider><ErrorBoundary>{renderActiveView()}</ErrorBoundary></ToastProvider>;
};
export default App;