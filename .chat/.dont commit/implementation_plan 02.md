# Mobile-First App Transformation

This plan details how we will restructure the Joey Chad Football platform to feel like a true, native mobile application while retaining its powerful desktop web experience. 

## User Review Required

> [!IMPORTANT]
> The biggest change will be replacing the horizontal scrolling top-tabs with a **Bottom Navigation Bar** (like a real mobile app) on phone screens.
> We will put the 4 most critical tabs on the bottom bar, and the rest in a "Menu" drawer. 
> 
> My proposed 4 core tabs for the bottom bar are:
> 1. **Coach** (Home)
> 2. **Challenges**
> 3. **About Joey**
> 4. **Charity**
> 
> Does this selection make sense, or would you prefer different core tabs on the bottom bar?

## Proposed Changes

### 1. Global Navigation (Navbar.tsx)
We will fundamentally change how navigation works based on screen size.

#### [MODIFY] [Navbar.tsx](file:///c:/Users/admin/Desktop/HERMES_PROJECT/joey-chad-football-io/src/components/Navbar.tsx)
- **Desktop (`md:` and above):** Keep the current top horizontal tab strip.
- **Mobile (`md:hidden`):** 
  - Hide the top horizontal tab strip completely to save vertical screen space.
  - Make the remaining top header (with the logo and user profile) ultra-glassy, using heavy backdrop blur and translucent backgrounds to mimic native iOS apps when scrolling.
  - Introduce a fixed **Bottom Tab Bar** sticking to the bottom edge of the phone screen.
  - Introduce a **Mobile Menu Drawer**: A button on the bottom bar that opens a sleek, full-screen overlay containing all the other tabs (Team HQ, Scout Radar, SkillSwap, etc.).

### 2. Layout Structure (App.tsx)
We need to ensure content doesn't get hidden behind the new bottom navigation bar.

#### [MODIFY] [App.tsx](file:///c:/Users/admin/Desktop/HERMES_PROJECT/joey-chad-football-io/src/App.tsx)
- Add `pb-20 md:pb-0` to the main application wrapper. This adds padding to the bottom of the screen on mobile devices so you can scroll all the way down without the new Bottom Tab Bar blocking the footer.

### 3. Touch Optimization & Grids
Most of our views (like `ChallengesView` and `AboutJoeyView`) already use Tailwind CSS grid correctly to stack into single columns on mobile. However, we will do a sweep during implementation to ensure:
- Buttons have minimum height of `44px` for touch targets.
- Font sizes are legible on small screens without zooming.
- Padding on mobile (`px-4`) is consistent so content breathes nicely on small screens.

## Verification Plan

### Manual Verification
- We will test the UI by shrinking the browser window to mobile width.
- Verify the bottom tab bar appears and the top tab strip disappears.
- Verify the Mobile Menu Drawer opens, works, and closes smoothly.
- Ensure all pages can be scrolled to the very bottom without being obscured.
