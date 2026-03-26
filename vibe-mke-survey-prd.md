# PRD: Vibe MKE — Post-Meetup Survey & Live Dashboard

**Product**: Vibe MKE Community Survey App  
**Version**: 1.0  
**Author**: Umesh / Nurturinglabs  
**Date**: March 2026  
**Status**: Ready for Claude Code

---

## 1. Overview

Vibe MKE is Milwaukee's first hands-on AI builder community. After each meetup, organizers need a structured way to collect feedback from attendees, understand their AI tool usage, and track community growth over time. This app consists of two pages:

- **Page 1 — Survey**: A multi-step form attendees fill out after each meetup
- **Page 2 — Dashboard**: A live aggregated view of all responses, visible to the organizer

---

## 2. Goals

- Collect structured post-meetup feedback to improve future events
- Build a profile of the Vibe MKE community (tools used, experience levels, backgrounds)
- Give the organizer a real-time visual dashboard of community trends
- Keep the survey short enough to complete in under 3 minutes

---

## 3. Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL) — for storing survey responses
- **Charts**: Recharts (for dashboard visualizations)
- **Deployment**: Vercel

---

## 4. Information Architecture

```
/                  → Redirects to /survey
/survey            → Multi-step survey form (Page 1)
/dashboard         → Live aggregated dashboard (Page 2)
```

No authentication required for the survey. The dashboard should be protected by a simple passcode (env variable) to prevent public access.

---

## 5. Database Schema

### Table: `survey_responses`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key, auto-generated |
| `created_at` | timestamp | Auto-set on insert |
| `meetup_name` | text | e.g. "Open Vibe — March 2026" |
| `name` | text | Optional |
| `email` | text | Optional |
| `background` | text | Single select value |
| `how_heard` | text | Single select value |
| `overall_rating` | integer | 1–5 |
| `most_valuable` | text | Free text |
| `improvement` | text | Free text |
| `venue_rating` | integer | 1–5 |
| `would_return` | boolean | Yes/No |
| `ai_tools_used` | text[] | Array of tool names |
| `ai_use_cases` | text[] | Array of use case values |
| `tools_curious` | text | Free text |
| `experience_level` | text | Single select value |
| `biggest_challenge` | text | Free text |
| `next_topics` | text[] | Array of topic values |
| `preferred_format` | text | Single select value |
| `other_feedback` | text | Free text |

---

## 6. Page 1 — Survey (`/survey`)

### 6.1 Layout & UX

- Single-page, multi-step form with a **progress bar** at the top (5 steps)
- Each step occupies the full viewport; user clicks "Next" to advance
- Step titles shown above the progress bar
- Back button available on all steps except the first
- Final step has a "Submit" button
- On successful submit: show a full-screen thank-you message with the Vibe MKE name and a short message
- Mobile-first responsive design

### 6.2 Form Steps

#### Step 1 — About You (2 questions)

**Q1: What's your professional background?** *(single select, required)*

Options:
- Software Developer / Engineer
- Business Owner / Entrepreneur
- Product Manager
- Designer / Creative
- Student
- Marketer / Content Creator
- Data / Analytics
- Other

**Q2: How did you hear about Vibe MKE?** *(single select, required)*

Options:
- Meetup.com
- Friend / colleague referral
- LinkedIn
- Twitter / X
- Local community group
- Other

---

#### Step 2 — About This Meetup (4 questions)

**Q3: How would you rate today's meetup overall?** *(star rating 1–5, required)*

**Q4: What was most valuable to you today?** *(free text, optional, placeholder: "e.g. the demo, the people I met, a specific topic...")*

**Q5: What could be improved?** *(free text, optional)*

**Q6: Would you attend another Vibe MKE event?** *(single select, required)*

Options:
- Definitely yes
- Probably yes
- Not sure
- Probably not

---

#### Step 3 — Your AI Tools (3 questions)

**Q7: Which AI tools do you actively use?** *(multi-select, optional)*

Options (checkboxes):
- ChatGPT
- Claude (Anthropic)
- Gemini (Google)
- Copilot (Microsoft)
- Cursor
- Perplexity
- Midjourney / DALL-E / image tools
- ElevenLabs
- Suno / Udio (music)
- Bolt / Lovable / v0 (app builders)
- Zapier AI / Make AI
- Other

**Q8: What are you using AI for?** *(multi-select, optional)*

Options:
- Writing & content
- Coding / development
- Research & summarization
- Image / video creation
- Voice & audio
- Business automation
- Customer support
- Data analysis
- Personal productivity
- Learning & education

**Q9: Any tools you're curious about but haven't tried yet?** *(free text, optional)*

---

#### Step 4 — Your AI Journey (2 questions)

**Q10: How would you describe your current AI experience level?** *(single select, required)*

Options:
- Newcomer — I'm just getting started
- Explorer — I experiment but don't use it daily
- Practitioner — I use AI tools regularly at work or side projects
- Builder — I'm building AI-powered products or automations
- Expert — I work in AI professionally

**Q11: What's your biggest challenge with AI right now?** *(free text, optional, placeholder: "e.g. knowing where to start, keeping up with new tools, applying it to my work...")*

---

#### Step 5 — Next Meetup Input (3 questions)

**Q12: What topics do you want covered at the next meetup?** *(multi-select, optional)*

Options:
- Prompt engineering
- Building AI agents
- Voice AI / conversational apps
- AI for small business
- No-code / low-code AI tools
- Local AI / running models locally
- AI for content creation
- AI in education
- AI ethics & safety
- Live build sessions / workshops

**Q13: What meetup format do you prefer?** *(single select, optional)*

Options:
- Live demo by a speaker
- Hands-on workshop (everyone builds)
- Panel discussion
- Open networking + build session
- Lightning talks (multiple short demos)
- Mix of demo + workshop

**Q14: Anything else you'd like to share?** *(free text, optional)*

---

### 6.3 Validation Rules

- Required fields must be filled before "Next" is clickable
- Email field (if filled) should validate format
- Star rating and single-select questions that are marked required must have a value selected
- Show inline error messages below each field that fails validation

### 6.4 Submission

On submit:
1. POST all form data to Supabase `survey_responses` table
2. Include a hidden field `meetup_name` — hardcoded as a constant at the top of the file so it's easy to update before each event (e.g. `const MEETUP_NAME = "Open Vibe — March 2026"`)
3. Show loading state on the Submit button during API call
4. On success: render full-screen thank-you card
5. On error: show a red error banner with "Something went wrong. Please try again."

### 6.5 Thank-You Screen

- Large Vibe MKE logo/name centered
- Message: "Thanks for your feedback! See you at the next Vibe MKE."
- Sub-message: "Your responses help us build a better community."
- Optional: link to Meetup.com group (configurable via env var)

---

## 7. Page 2 — Dashboard (`/dashboard`)

### 7.1 Access Control

- On load, show a full-screen passcode prompt
- Passcode is stored in env variable `DASHBOARD_PASSCODE`
- On correct passcode, store a flag in `sessionStorage` and render the dashboard
- On incorrect passcode, show "Incorrect passcode" error
- No server-side auth needed — this is a light-weight gate

### 7.2 Layout

- Fixed top navbar with "Vibe MKE Dashboard" title, a meetup selector dropdown (see 7.3), and a "Refresh" button
- Main content area: responsive grid of cards and charts
- Full-width on mobile, 2-column grid on tablet, 3-column on desktop

### 7.3 Meetup Selector

- Dropdown at the top that lists all distinct `meetup_name` values from the database
- Default: "All Meetups"
- When a specific meetup is selected, all charts and numbers filter to that meetup only

### 7.4 Summary Metrics Row

Four metric cards at the top:

| Metric | Description |
|---|---|
| Total Responses | Count of rows |
| Average Rating | Mean of `overall_rating`, shown as X.X / 5 |
| Would Return | % of respondents who answered "Definitely yes" or "Probably yes" |
| Most Common Level | Mode of `experience_level` |

### 7.5 Charts & Visualizations

All charts use **Recharts**. Each chart is in a card with a title.

#### Chart 1 — Overall Rating Distribution
- Type: Bar chart
- X-axis: Rating (1, 2, 3, 4, 5 stars)
- Y-axis: Number of responses
- Color: Single color (brand accent)

#### Chart 2 — Experience Level Breakdown
- Type: Pie chart or donut chart
- Slices: Each experience level option
- Show legend with % labels

#### Chart 3 — AI Tools Used (Top Tools)
- Type: Horizontal bar chart
- Shows top 10 tools by frequency
- X-axis: Count of respondents who selected each tool
- Sorted descending

#### Chart 4 — AI Use Cases
- Type: Horizontal bar chart
- Same pattern as Chart 3 but for use case categories

#### Chart 5 — Professional Background
- Type: Pie or donut chart
- Slices: Each background category

#### Chart 6 — Preferred Format for Next Meetup
- Type: Horizontal bar chart
- Shows format preference frequency

#### Chart 7 — Requested Topics for Next Meetup
- Type: Horizontal bar chart
- Shows topic frequency, sorted descending

#### Chart 8 — Would Return
- Type: Donut chart
- Slices: The 4 "would attend again" options

### 7.6 Free-Text Responses Panel

Below the charts, a collapsible section titled **"What attendees said"** with three sub-panels:

- **Most Valuable** — list of all non-empty `most_valuable` responses, one per card
- **Improvements** — list of all non-empty `improvement` responses
- **Biggest Challenges** — list of all non-empty `biggest_challenge` responses

Each response is shown as a simple card with the text and the timestamp (date only).

### 7.7 Data Table

At the bottom, a paginated table showing all raw responses:

Columns: Date | Name | Background | Rating | Experience Level | Would Return

- Paginated at 20 rows per page
- Clicking a row expands an inline detail view with all fields for that response
- Filterable by meetup name (tied to the top dropdown)

---

## 8. Component Structure (Suggested)

```
/app
  /survey
    page.tsx             ← Survey multi-step form
  /dashboard
    page.tsx             ← Dashboard (passcode-gated)

/components
  /survey
    SurveyProgress.tsx   ← Progress bar + step labels
    Step1About.tsx
    Step2Meetup.tsx
    Step3Tools.tsx
    Step4Journey.tsx
    Step5NextMeetup.tsx
    ThankYou.tsx
  /dashboard
    PasscodeGate.tsx
    MetricCard.tsx
    RatingChart.tsx
    ExperienceChart.tsx
    ToolsChart.tsx
    UseCasesChart.tsx
    BackgroundChart.tsx
    FormatChart.tsx
    TopicsChart.tsx
    WouldReturnChart.tsx
    FreeTextPanel.tsx
    ResponsesTable.tsx

/lib
  supabase.ts            ← Supabase client setup
  constants.ts           ← MEETUP_NAME, tool lists, option arrays
  types.ts               ← TypeScript types for SurveyResponse

/hooks
  useSurveyResponses.ts  ← Fetches and filters response data for dashboard
```

---

## 9. Supabase Setup Notes

```sql
-- Run in Supabase SQL editor

create table survey_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  meetup_name text not null,
  name text,
  email text,
  background text,
  how_heard text,
  overall_rating integer check (overall_rating between 1 and 5),
  most_valuable text,
  improvement text,
  venue_rating integer check (venue_rating between 1 and 5),
  would_return text,
  ai_tools_used text[],
  ai_use_cases text[],
  tools_curious text,
  experience_level text,
  biggest_challenge text,
  next_topics text[],
  preferred_format text,
  other_feedback text
);

-- Enable Row Level Security
alter table survey_responses enable row level security;

-- Allow public inserts (survey submissions)
create policy "Allow public insert"
on survey_responses for insert
to anon
with check (true);

-- Allow authenticated reads (for dashboard via service role key)
create policy "Allow service role select"
on survey_responses for select
to service_role
using (true);
```

---

## 10. Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DASHBOARD_PASSCODE=your_chosen_passcode
NEXT_PUBLIC_MEETUP_GROUP_URL=https://www.meetup.com/vibe-mke/
```

---

## 11. Design Guidelines

- **Color palette**: Dark navy or deep charcoal background for the dashboard; clean white/light for the survey form
- **Accent color**: Electric blue or neon green — something that feels builder/tech without being corporate
- **Font**: Use a modern sans-serif; Geist or similar (Next.js default is fine)
- **Survey form**: Clean, minimal, generous white space — no distractions
- **Dashboard**: Dense but readable; cards with subtle borders, chart labels clearly readable
- **Brand element**: "Vibe MKE" wordmark or simple logo in the top-left of both pages

---

## 12. Out of Scope (v1)

The following are intentionally excluded from v1 and can be added later:

- Email notifications to organizer on new submission
- Attendee email follow-up
- Multi-organizer auth (Auth.js / Supabase Auth)
- Export to CSV from dashboard
- QR code generator for survey link
- Embedding in a Notion page

---

## 13. Success Criteria

- Survey can be completed on mobile in under 3 minutes
- Dashboard loads in under 2 seconds with up to 500 responses
- Charts correctly reflect filtered data when a specific meetup is selected
- No response data is lost on submission; all fields write to Supabase correctly
- Dashboard is not accessible without the correct passcode

---

## 14. Suggested Build Order for Claude Code

1. Set up Next.js 14 project with Tailwind + shadcn/ui
2. Configure Supabase client and run schema migration
3. Build `constants.ts` with all option arrays and `MEETUP_NAME`
4. Build the 5-step survey form, step by step
5. Wire survey submission to Supabase insert
6. Build the thank-you screen
7. Build `useSurveyResponses` hook with filtering logic
8. Build dashboard metric cards
9. Build all Recharts charts one by one
10. Build free-text response panel
11. Build response data table with pagination
12. Add passcode gate to dashboard
13. Polish: loading states, error handling, mobile responsiveness
14. Deploy to Vercel, set env vars

---

*End of PRD*
