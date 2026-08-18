# Goal Description
We will deploy the current auth and UI fixes to Vercel, and implement a series of UX improvements focused on adding value, securing the AI generation tools behind an authentication wall, and honoring Joey Chad's legacy through an emotionally impactful Hero section and a dedicated "About" page.

## User Review Required
Please review the proposed subscription tiers below. We want to make sure the naming and the "value" proposition aligns with your vision of not being aggressive, but still encouraging donations.

## Open Questions
> [!IMPORTANT]
> **Video and Audio Generation:** You mentioned you aren't sure if the app's plan covers realistic video/audio generation. 
> Currently, the codebase is set up for text-based AI (Gemini). Generating realistic video and audio requires entirely different API services (like HeyGen for video, or ElevenLabs for audio), which can be complex and expensive.
> **Action required:** If you have the "Idea Blueprint" document that details exactly what kind of video/audio generation is expected, please upload it here so I can review it and advise on technical feasibility!

> [!NOTE]
> **Joey Chad Media:** Please upload the pictures and videos of Joey Chad you mentioned so I can integrate them into the Hero section and the new About page!

## Proposed Changes

### 1. Version Control & Deployment
I will commit our recent successful changes (Google Auth, Magic Link, Profile UI, Title updates) and push them to GitHub. This will automatically trigger Vercel to build and deploy the live version.

### 2. Gated AI Features (Auth Wall)
I will modify the application logic so that any attempt to use the "Joey AI Coach" or generation tools will first check if the user is logged in.
- If not logged in: The AuthModal will pop up prompting them to sign in or create an account.
- If logged in: They will proceed to the tool based on their subscription tier.

### 3. Subscription Tiers Definition
We will introduce a UI component that gently explains the value of subscribing/donating. 
Proposed Tiers:
*   **Rookie (Free):** Basic access to the platform, community features, and limited AI Coach queries.
*   **Legacy Supporter (Donation/Subscription):** Unlimited AI Coach access, advanced scouting radar features, and a special badge on their profile showing their support for the Joey Chad Youth Football & Mental Health Initiative.

### 4. Hero Section Redesign
I will update the main Hero section of the app to prominently feature the media (picture/video) of Joey Chad. The layout will be designed to evoke emotion and impact immediately upon visiting the site, pairing the media with the core mission statement.

### 5. "About Joey Chad" Page
#### [NEW] src/components/AboutJoey.tsx
I will create a dedicated page to honor his legacy. This page will feature:
*   A timeline or story format of his journey.
*   Quotes and comments from previous teammates and coaches.
*   Information about the charity and the mental health initiative.
*   A clean, respectful, and inspiring design.

#### [MODIFY] src/App.tsx
I will add routing and navigation links in the header/footer to ensure the "About" page is easily accessible.

## Verification Plan

### Automated Tests
- Build test (`npm run build`) to ensure the new pages and routing do not break the Vercel deployment.

### Manual Verification
- I will ask you to verify the Hero section looks correct once your uploaded media is placed.
- We will test the Auth Wall by trying to access the AI tools while logged out.
- We will verify the live Vercel link once the GitHub push completes.
