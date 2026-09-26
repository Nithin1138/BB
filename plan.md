# BBPULSE — COMPLETE FINAL MASTER BUILD PROMPT

## 0. EXECUTION MODE

You are not being asked to create a simple landing page, a mockup, or a collection of disconnected screens.

You are building the first complete production-quality version of a real product called:

# BBPulse

Build the frontend, backend structure, database model, authentication flow, moderation system, core interactions, states, and polished desktop website experience.

Treat this as a real startup product that needs to be:

* usable
* beautiful
* fast
* understandable
* maintainable
* scalable
* secure
* production-oriented
* emotionally engaging
* visually memorable

Do not create a generic dashboard.

Do not produce a template-style website.

Do not create fake functionality that looks real but has no underlying state.

Where backend services are not yet connected, create proper typed service boundaries and realistic mock data so the product can run immediately without breaking.

---

# 1. PRODUCT

## Product name

BBPulse

## Product category

Fan intelligence + community platform for Bigg Boss Telugu audiences.

## Launch focus

Bigg Boss Telugu only.

## Product type

A desktop-first web application.

Do not optimize the current version for mobile.

Do not spend implementation effort on mobile navigation or mobile breakpoints.

Desktop is the current design target.

A future mobile redesign will be handled separately.

---

# 2. THE PROBLEM

Bigg Boss fans currently experience the season across fragmented places:

* social media
* messaging groups
* fan polls
* video comments
* scattered discussions
* meme pages
* unofficial prediction pages
* individual fan communities

The information and conversation are fragmented.

A fan may see:

one poll in one place,
one discussion somewhere else,
a meme somewhere else,
a contestant trend somewhere else,
and a prediction somewhere else.

There is no single clean experience that answers:

* What happened today?
* Which contestant is getting attention?
* What are fans currently saying?
* Who are fans supporting?
* What are people debating?
* What is trending up or down?
* Who does the community think is at risk?
* What does my own prediction history look like?

BBPulse brings these behaviors into one product.

---

# 3. PRODUCT IDEA

BBPulse is an independent fan platform where users can:

### Vote

Participate in BBPulse community polls.

### Discuss

Join structured conversations around contestants, episodes, tasks, nominations, memes, and debates.

### Trend

Understand what is gaining or losing attention through a transparent community-based Pulse system.

### Predict

Make community predictions and track personal prediction accuracy.

### Share

Turn important moments into polished shareable cards.

The product should feel like one connected experience rather than five separate features.

---

# 4. CORE PRODUCT LOOP

The central product loop is:

Episode happens

↓

BBPulse publishes the day's context

↓

Fans see the current Pulse

↓

Fans vote

↓

Fans discuss

↓

Today's Debate opens

↓

Trend changes

↓

Fans predict

↓

Users share the moment

↓

New visitors discover BBPulse

↓

They participate

↓

The loop repeats

This loop should influence the entire information architecture.

---

# 5. PRODUCT PROMISE

The product should quickly answer:

**“What is happening with the Bigg Boss Telugu community right now?”**

The experience should move naturally from:

### What happened

to

### What fans think

to

### What is changing

to

### What people predict

Do not turn the product into an analytics-heavy BI system.

This is a consumer entertainment product.

---

# 6. CORE PILLARS

## 6.1 VOTE

Community polling.

Users can:

* view active poll
* select contestant
* submit vote
* see results after voting
* see closing time
* see previous poll history
* share poll result

Voting is unofficial community polling.

It must never look like or claim to be official voting.

---

## 6.2 DISCUSS

Discussion should be inspired by modern community platforms but must have its own identity.

Do not copy another platform's visual design, terminology, hierarchy, or exact interaction patterns.

Users must log in with Google before participating.

Every account receives a unique BBPulse public ID.

Example:

`@nithin24`

Google email is private.

Public identity is the BBPulse ID.

Users can:

* create posts
* comment
* reply
* agree
* disagree
* share
* report
* block users
* post memes
* create discussion polls
* follow contestants
* follow topics

Discussion categories include:

* Opinion
* Episode
* Nomination
* Task
* Debate
* Meme
* Prediction discussion

---

## 6.3 TREND

The Trend experience answers:

**“What is moving?”**

Users can see:

* rising contestants
* falling contestants
* most discussed contestants
* current Pulse
* Pulse changes
* discussion activity
* simple trend history
* current community sentiment
* methodology

The visualization must remain simple.

Use:

* bars
* percentage changes
* small trend lines
* movement arrows
* timeline indicators

Do not create complicated dashboards.

---

## 6.4 PREDICT

Users make community predictions.

Primary hierarchy:

### Community Prediction

Secondary:

### BBPulse Risk Score

The community prediction must always be more visually prominent.

The Risk Score is a secondary community estimate.

Never frame it as:

* official
* guaranteed
* certain
* actual elimination probability
* official audience voting data

V1 uses transparent rule-based calculations.

Do not add machine learning to V1.

---

# 7. USER TYPES

## Visitor

Can:

* browse the website
* view public pages
* view contestants
* view trends
* view discussions
* view poll result information

Must sign in before actions requiring an account.

---

## Registered User

Can:

* vote
* create posts
* comment
* agree/disagree
* submit predictions
* follow contestants
* share
* report
* block
* view profile
* view notification center

---

## Moderator

Can:

* review reported content
* approve/reject content
* review public poll submissions
* remove inappropriate posts
* restrict users
* lock discussions
* manage debate prompts

---

## Admin

Can:

* manage contestants
* manage episodes
* manage polls
* manage debates
* manage trends
* manage moderation
* manage users
* manage featured content
* view analytics
* manage site configuration

---

# 8. AUTHENTICATION

Use Google authentication.

Primary button:

**Continue with Google**

Do not build raw-password authentication.

After successful Google login:

user goes through:

Google authentication
→ BBPulse ID creation
→ optional favorite contestant selection
→ main application

The Gmail address must never appear publicly.

Public profile identity:

`@username`

---

# 9. AGE POLICY

V1 account participation should be restricted to users aged 18 or older.

Add age confirmation during account onboarding.

Keep the UX simple.

Example:

**You must be 18 or older to create a BBPulse account.**

Store only the minimum necessary age-related state.

Do not build complex identity verification unless later required.

All final legal wording must remain configurable.

---

# 10. USERNAME SYSTEM

Every account gets a unique BBPulse ID.

Rules:

* lowercase
* letters
* numbers
* underscore allowed
* unique
* 3–20 characters
* no impersonation of staff
* no abusive names
* no misleading system names

Examples:

`@nithin24`

`@ravi7`

`@keerthi_tv`

Show availability in real time.

---

# 11. BRAND PERSONALITY

The visual personality must be:

* premium
* calm
* modern
* confident
* editorial
* highly polished
* simple
* human
* intelligent
* entertaining without being childish

The product should feel expensive and carefully designed.

Do not make the website visually loud.

Do not use visual effects simply because they are technically possible.

---

# 12. DESIGN LANGUAGE

Create an original visual system.

The design should communicate premium quality through:

* typography
* spacing
* hierarchy
* proportion
* subtle motion
* clean composition
* restrained color
* high-quality data visualization
* consistent interaction

Do not rely on:

* neon
* giant gradients
* excessive glass effects
* excessive shadows
* 3D blobs
* decorative AI visuals
* random abstract shapes
* generic dashboard cards
* excessive pills

---

# 13. COLOR SYSTEM

Primary background:

`#F7F8FA`

White surface:

`#FFFFFF`

Soft surface:

`#F1F3F6`

Border:

`#E5E7EB`

Primary text:

`#111318`

Secondary text:

`#626873`

Muted text:

`#8B919B`

Primary blue:

`#2563EB`

Indigo:

`#5B5CE2`

Positive:

`#10B981`

Warning:

`#F59E0B`

Negative:

`#E45D5D`

Dark feature surface:

`#0F172A`

Use color sparingly.

The base visual language should be mostly neutral with carefully controlled accents.

---

# 14. TYPOGRAPHY

Use a modern highly readable sans-serif.

Primary:

Inter or system equivalent.

Support Telugu using a high-quality Telugu-compatible font.

Typography must handle both English and Telugu gracefully.

Do not force all text into uppercase.

Avoid excessive font weights.

Recommended:

400
500
600
700

---

# 15. DESKTOP LAYOUT

Current version is desktop-first.

Primary target widths:

1280px

1440px

1600px

1920px

Main content maximum width:

1200–1320px

Use a centered page container.

Do not stretch content across the entire viewport.

Maintain generous whitespace.

---

# 16. GLOBAL DESKTOP HEADER

Header:

BBPulse logo

Main navigation:

Home
Discuss
Vote
Trend
Predict

Right:

Search

Notifications

Profile

Optional:

Vote Now

Header should feel light and compact.

Avoid oversized navigation.

Header can be sticky when appropriate.

---

# 17. GLOBAL PAGE STRUCTURE

Use:

Header

Page intro

Primary story/content area

Secondary context area

Footer where appropriate

Do not make every page a dashboard.

Some pages should use editorial layouts.

---

# 18. STORYTELLING DESIGN PRINCIPLE

The most important design concept is storytelling.

The website should guide the user through the day.

Example:

## Home

Tonight

↓

What happened

↓

What fans are saying

↓

Community vote

↓

Today's debate

↓

What is trending

↓

What people predict

↓

Share the moment

---

## Episode

Moment

↓

Reaction

↓

Discussion

↓

Debate

↓

Prediction

---

## Contestant

Journey

↓

Current pulse

↓

Fan response

↓

Recent discussion

↓

Prediction

---

# 19. HOME PAGE

This is the primary product screen.

Do not create a conventional dashboard.

Create an editorial live-season homepage.

---

## HERO

Left:

small label:

`TONIGHT ON BBPULSE`

Large headline:

**The house is split. Fans are choosing sides.**

Short supporting description.

Primary button:

**See Tonight's Pulse**

Secondary:

**Join Discussion**

Right side:

A large visual information panel showing today's most important contestant/moment.

Use original avatar/illustration.

Do not use unlicensed broadcast imagery.

---

# 20. HOME — LIVE PULSE

Section title:

**What fans are feeling right now**

Subtitle:

“Community signals from today's conversations.”

Show 4–5 contestant rows.

Each:

avatar

name

Pulse value

change

tiny sparkline

status

Example:

`Priya`
`72`
`↑ 8%`

Make the leading contestant visually distinct but not oversized.

CTA:

**View all contestants**

---

# 21. HOME — COMMUNITY VOTE

Large section:

**Who are you backing?**

Contestant selection.

Each option:

avatar

name

percentage

selected state

button:

**Vote now**

After voting:

“You voted for Priya.”

Show community result.

CTA:

**Share result**

---

# 22. HOME — FAN REACTION

Title:

**What fans are saying**

Show 3–4 highlighted posts.

Each:

avatar

BBPulse ID

time

post title

short body

Agree

Disagree

Comments

Share

Do not display too much content.

The first line should be readable immediately.

---

# 23. HOME — TODAY'S DEBATE

Feature this prominently.

Large editorial card:

**Today's Debate**

Question:

**Was today's argument justified?**

Display:

Agree 58%

Disagree 42%

CTA:

**Join the debate**

Visual composition should feel like a magazine feature, not a poll widget.

---

# 24. HOME — RISING NOW

Three concise sections:

### Rising

Contestants gaining momentum.

### Falling

Contestants losing attention.

### Most Discussed

Contestants generating conversation.

Each should have:

avatar
name
change
micro trend

---

# 25. HOME — PREDICTION

Main title:

**Who do fans think is at risk?**

Primary:

**Community Prediction**

`64%`

Secondary:

**BBPulse Risk Score**

`71 / 100`

Supporting text:

“Community estimate based on BBPulse signals.”

Never make the Risk Score larger than the Community Prediction.

---

# 26. HOME — SHARE MOMENT

Create a visually beautiful share section.

Headline:

**Share today's Pulse**

Preview of a social card.

Button:

**Create Share Card**

This is a core product feature.

---

# 27. HOME — DAILY STORY END

Finish the homepage with a simple closing statement:

**Come back after tonight's episode.**

Then:

Today's Debate

Prediction

Next poll

This creates continuity between visits.

---

# 28. DISCUSSION HOME

Page title:

**What are fans talking about?**

Top navigation:

Latest

Trending

Following

Then:

Featured discussion

Today's Debate

Live Episode Discussion

Trending topics

Community posts

---

# 29. DISCUSSION STRUCTURE

Do NOT structure the product like a collection of unrelated forums.

Create:

### Contestant Rooms

### Episode Discussions

### Topic Discussions

### Today's Debate

### Memes

This keeps the information architecture simple.

---

# 30. DISCUSSION POST CARD

Each post contains:

avatar

BBPulse ID

timestamp

topic label

title

body preview

Agree

Disagree

Comments

Share

More menu

Use generous whitespace.

Avoid cramped social-feed layouts.

---

# 31. AGREEMENT SYSTEM

Use:

**Agree**

**Disagree**

Do not use traditional voting terminology.

Show counts subtly.

Selected state must be clear.

Do not encourage aggressive popularity contests.

---

# 32. POST DETAIL

Page contains:

author

post title

full content

topic

contestant if applicable

image if applicable

Agree

Disagree

Share

Report

Then:

### Community reaction

Then:

### Comments

Comments should be threaded.

Limit excessive nesting.

Keep reply indentation visually subtle.

---

# 33. CREATE POST

Create a clean writing interface.

Options:

### Opinion

Title

Body

Contestant

Topic

Publish

---

### Fan Poll

Question

Options

Contestant/topic

Publish

---

### Meme

Upload

Caption

Contestant

Publish

---

### Debate

Question

Context

Contestant/topic

Publish

All create flows must include appropriate moderation guidance.

---

# 34. CONTESTANT ROOM

Page:

Contestant header

Avatar

Name

Current Pulse

Trend

Current status

Follow button

Vote button

Predict button

Then tabs:

Latest

Popular

Debates

Memes

Discussion

The room should feel like a fan clubhouse without becoming a traditional forum.

---

# 35. CONTESTANT PROFILE PAGE

This is a signature page.

Top section:

Large avatar

Name

Current Pulse

Trend

Current status

Follow

Vote

Predict

Then:

### Their Story

Create a horizontal or vertical chronological journey.

Examples:

Entered house

First nomination

Major task

Important episode

Recent event

Current status

Each event:

date/episode

short description

signal

---

# 36. CONTESTANT — FAN PULSE

Show:

Community poll

Discussion sentiment

Engagement

Trend

Public Pulse

Use simple visualizations.

---

# 37. CONTESTANT — WHAT FANS ARE SAYING

Show selected discussion posts.

Use:

one strong featured post

two smaller supporting posts

CTA:

**See all discussion**

---

# 38. CONTESTANT — COMMUNITY PREDICTION

Show:

Community Prediction

Main percentage

Number of predictions

Then smaller:

BBPulse Risk Score

Explanation link:

**How this is calculated**

---

# 39. EPISODE HUB

Page title:

**Episode 24**

Episode information:

Date

Status

Duration/context if available

Then a chronological episode story.

---

# 40. EPISODE STORY TIMELINE

Create timeline:

### Moment 1

Nominations

### Moment 2

Task

### Moment 3

Argument

### Moment 4

House reaction

### Moment 5

Today's Debate

### Moment 6

Prediction

Click a moment to open related discussion.

This is a key BBPulse experience.

---

# 41. EPISODE DETAIL

Each episode moment should contain:

headline

short summary

related contestants

community reaction

discussion CTA

prediction CTA where applicable

No copyrighted episode transcript.

Use concise factual descriptions.

---

# 42. LIVE EPISODE MODE

During a live episode:

Top banner:

`LIVE`

Headline:

**Episode 24 is happening**

Main area:

current discussion topic

live fan posts

current pulse

poll

debate

prediction

Use subtle live indicators.

Do not create casino-like visuals.

Do not over-animate the page.

---

# 43. TODAY'S DEBATE PAGE

This should feel editorial and premium.

Hero:

**Was today's argument justified?**

Large split:

Agree

58%

Disagree

42%

Then:

### Why fans agree

Highlighted responses

### Why fans disagree

Highlighted responses

Then:

### Join the conversation

Comment field

---

# 44. TREND PAGE

Headline:

**What's moving?**

Supporting text:

“See where fan attention is rising and falling.”

Sections:

Rising

Falling

Most Discussed

Pulse Timeline

---

# 45. TREND PAGE — RISING

Large simple leaderboard.

Each row:

rank

avatar

contestant

Pulse

change

sparkline

Reason/context

Example:

**+12% attention today**

---

# 46. TREND PAGE — FALLING

Same visual structure.

Use muted negative indicator.

Keep language neutral.

Do not sensationalize.

---

# 47. MOST DISCUSSED

Show:

contestant

discussion count

change

recent discussion title

CTA:

**View discussion**

---

# 48. PULSE HISTORY

Allow users to inspect historical movement.

Use:

7 day

14 day

Season

Simple line chart.

Hover states should show:

date

Pulse

change

related event where available

---

# 49. PUBLIC PULSE METHODOLOGY

Page title:

**How BBPulse Pulse works**

Explain the score simply.

Current formula:

35% Community poll

20% verified public poll observations

20% in-app discussion sentiment

15% normalized engagement

10% trend movement

Display visually.

Include:

“This is an unofficial BBPulse community metric.”

Every contestant page should link here.

---

# 50. PREDICT PAGE

Headline:

**What do you think happens next?**

Primary question:

**Who do you think is most at risk this week?**

Show contestant cards.

Each:

avatar

name

selection state

Submit prediction

After selection:

show community prediction.

---

# 51. PREDICTION RESULT

Show two comparisons:

### Your Prediction

Contestant

### Community Prediction

Percentage

Then:

### Your Accuracy

Accuracy score

Prediction history

Recent results

---

# 52. PREDICTION LEADERBOARD

Page title:

**Prediction Leaderboard**

Columns:

Rank

BBPulse ID

Accuracy

Predictions

Correct

Do not over-gamify.

Keep it editorial and simple.

---

# 53. POLL ROUNDUP

Page:

**What other public polls are showing**

Each entry:

source name

date checked

contestant results

source link

verification label

Every external observation must be clearly attributed.

No automatic scraping.

---

# 54. SUBMIT POLL ROUNDUP

User submits:

URL

optional screenshot

description

Submit

After submission:

**Waiting for review**

Show status.

---

# 55. SEARCH

Create global search.

Search categories:

All

Contestants

Discussions

Episodes

Debates

Users

Show useful results immediately.

Autocomplete.

Recent searches.

Popular searches.

Keep the search interface minimal.

---

# 56. NOTIFICATIONS

Notifications include:

* poll closing
* replies
* comments
* debate opening
* prediction result
* followed contestant update

Do not spam.

Notification importance should be visually prioritized.

---

# 57. PROFILE

Public profile:

avatar

BBPulse ID

member date

posts

comments

memes

predictions

accuracy

followed contestants

activity

Do not expose Gmail.

---

# 58. SETTINGS

Sections:

Account

Notifications

Privacy

Blocked users

Content preferences

Legal

Delete account

Logout

Keep the page highly readable.

---

# 59. REPORT FLOW

Report options:

Spam

Harassment

Personal attack

Defamatory content

Sexual content

Inappropriate content

Other

Confirmation:

**Thanks. This has been sent for review.**

---

# 60. BLOCK FLOW

Confirmation:

**Block @username?**

“You will no longer see this person's posts or comments.”

Buttons:

Cancel

Block

---

# 61. SHARE CARD SYSTEM

This is a major growth engine.

Users can generate cards from:

Vote

Trend

Debate

Prediction

Contestant

Pulse

---

# 62. SHARE CARD VISUALS

Create a dedicated share-card composition.

Each card:

BBPulse wordmark

headline

main metric

contestant avatar

secondary statistic

small disclaimer

website URL

Examples:

### Vote

**Fans are backing Priya**

### Trend

**Priya is rising +14%**

### Debate

**58% of BBPulse fans agree**

### Prediction

**64% think Rahul is at risk**

The generated card must look intentionally designed for social sharing.

It must not just be a screenshot of the webpage.

---

# 63. SHARE CREATOR

Desktop layout:

Left:

card preview

Right:

share controls

Actions:

Download image

Copy link

Share

Social options

Use generated image output.

Allow switching between a small number of carefully designed templates.

Do not create 20 themes.

---

# 64. LANDING PAGE

The public landing page should communicate the concept in seconds.

Hero:

# The fan pulse of Bigg Boss Telugu.

Supporting:

**Vote. Discuss. Track the conversation. Predict what happens next.**

CTA:

**Explore BBPulse**

Secondary:

**See today's Pulse**

Then explain the four pillars.

Then show example product experience.

Then explain:

Community

Pulse

Prediction

Share

Finish with:

**Join the conversation**

---

# 65. LANDING PAGE STORY

The landing page should tell a story:

### Bigg Boss is happening.

↓

### Everyone has an opinion.

↓

### But the conversation is scattered.

↓

### BBPulse brings it together.

↓

### Vote.

↓

### Discuss.

↓

### Track the Pulse.

↓

### Predict.

↓

### Share.

Do not make the landing page excessively long.

---

# 66. AUTH PAGE

Minimal page.

Logo.

Heading:

**Join BBPulse**

Text:

“Create your fan profile and join the conversation.”

Button:

**Continue with Google**

Supporting:

“By continuing, you agree to the Terms and Privacy Policy.”

Age confirmation is required during account creation.

---

# 67. USERNAME SETUP

After Google login:

**Choose your BBPulse ID**

Input:

`@username`

Availability state.

Continue.

Optional:

choose avatar.

Optional:

follow favorite contestant.

Finish.

Do not create a long onboarding process.

---

# 68. 404

Headline:

**This page went off the air.**

Button:

**Go home**

Minimal personality.

---

# 69. ERROR STATES

Generic:

**Something went wrong.**

Secondary:

“Please try again.”

Button:

Try again

Do not display technical error messages to users.

---

# 70. EMPTY STATES

Examples:

No discussions:

**Be the first fan to start the conversation.**

No predictions:

**Your predictions will appear here.**

No notifications:

**You're all caught up.**

No results:

**Nothing matched your search.**

---

# 71. LOADING

Use content skeletons.

Skeleton dimensions should match real components.

Avoid giant centered loading spinners.

---

# 72. MOTION

Use motion only where it improves comprehension.

Examples:

* poll result reveal
* trend line movement
* page transitions
* share card preview
* selected contestant state
* prediction confirmation
* timeline progression

Motion should feel:

quiet
fast
natural

Typical duration:

150–300ms

Avoid:

* bouncing buttons
* constant floating animations
* particle effects
* excessive parallax
* flashy transitions

---

# 73. DESKTOP GRID SYSTEM

Use a strong editorial grid.

Possible:

12-column desktop grid.

Typical layouts:

### Home

7 columns main story

5 columns supporting pulse

### Discussion

8 columns content

4 columns context/trending

### Contestant

8 columns story

4 columns insights

### Trend

9 columns data

3 columns explanation

### Share

7 columns preview

5 columns controls

Do not force every page into exactly the same grid.

---

# 74. CARDS

Cards should be used selectively.

Use cards for:

polls

posts

predictions

trend snippets

Do not place cards around every paragraph.

Some sections should sit directly on the page background.

---

# 75. COMPONENT SYSTEM

Create reusable components.

## Foundation

Container

Stack

Grid

Section

Divider

Text

Icon

---

## Navigation

Header

DesktopNav

Search

NotificationCenter

UserMenu

Breadcrumb

---

## Identity

Avatar

ContestantAvatar

UserAvatar

Username

VerifiedState where applicable

---

## Buttons

PrimaryButton

SecondaryButton

GhostButton

DangerButton

IconButton

---

## Content

PostCard

PostDetail

Comment

CommentThread

DebateCard

EpisodeCard

StoryCard

---

## Poll

PollCard

PollOption

PollResults

VoteButton

PollStatus

---

## Trend

PulseCard

TrendCard

TrendList

Sparkline

TrendArrow

PulseBreakdown

---

## Prediction

PredictionCard

PredictionResult

PredictionHistory

PredictionLeaderboard

RiskScoreCard

---

## Contestant

ContestantHeader

ContestantStory

ContestantTimeline

ContestantStats

ContestantRoom

---

## Sharing

ShareCard

SharePreview

ShareModal

ShareSheet

---

## Moderation

ReportModal

ModerationStatus

ModerationQueueItem

ModerationDecision

---

## System

Toast

Modal

Dialog

Drawer

Tooltip

Skeleton

EmptyState

ErrorState

---

# 76. COMPONENT RULE

All components must have consistent:

* spacing
* typography
* borders
* states
* hover
* focus
* active
* disabled
* loading
* error

Do not write one-off styles for every page.

Build a real design system.

---

# 77. ICON RULE

Use one consistent icon library.

Keep icon sizes controlled.

Typical:

16px

18px

20px

24px

Do not use random icon sources.

---

# 78. FORM DESIGN

Inputs must:

* have labels
* have visible focus
* have clear errors
* support keyboard navigation
* have helpful placeholder text
* use appropriate field sizes

Do not depend on placeholder text as the only label.

---

# 79. ACCESSIBILITY

Build for accessible desktop usage.

Include:

semantic HTML

keyboard navigation

visible focus states

proper headings

ARIA labels where required

accessible color contrast

screen-reader-friendly actions

Do not rely only on color to communicate trend direction.

Example:

Use:

`↑ +8%`

not only green.

---

# 80. BACKEND STACK

Use a clean modern TypeScript stack.

Preferred:

### Frontend

Next.js

React

TypeScript

Tailwind CSS

Custom component system

Motion library for restrained animation

Chart library for simple visualizations

---

### Backend

Next.js server functionality / API routes where practical.

Keep backend modular.

Do not create unnecessary microservices.

---

### Database

PostgreSQL.

Recommended managed setup:

Supabase.

Use database migrations.

Use typed database access.

---

### Authentication

Managed Google OAuth through the chosen auth platform.

---

### Storage

Object storage for uploaded memes/images.

---

### Cache / rate limiting

Redis-compatible service where needed.

Do not introduce Redis everywhere by default.

Use it for:

rate limits

temporary counters

hot dashboard/cache data

---

# 81. APPLICATION ARCHITECTURE

Use a modular monolith.

Suggested domain modules:

auth

users

seasons

contestants

episodes

polls

votes

discussion

comments

debates

memes

predictions

trends

pulse

notifications

moderation

reports

roundups

sharing

admin

analytics

---

# 82. DATABASE TABLES

Create a clean relational model.

Recommended core entities:

## users

id

auth_provider_id

email_private

role

created_at

updated_at

status

---

## profiles

user_id

username

display_name

avatar_url

bio

age_confirmed

created_at

updated_at

---

## seasons

id

name

language

status

start_date

end_date

created_at

---

## contestants

id

season_id

name

slug

avatar_url

short_bio

status

created_at

updated_at

---

## episodes

id

season_id

episode_number

title

air_date

status

summary

created_at

updated_at

---

## episode_events

id

episode_id

title

event_type

description

sort_order

created_at

---

## polls

id

season_id

title

description

status

start_at

end_at

created_at

---

## poll_options

id

poll_id

contestant_id

sort_order

---

## votes

id

poll_id

user_id

option_id

created_at

integrity_status

unique constraints required

---

## posts

id

user_id

season_id

contestant_id

episode_id

category

title

body

image_url

status

created_at

updated_at

---

## comments

id

post_id

user_id

parent_id

body

status

created_at

updated_at

---

## reactions

id

user_id

target_type

target_id

reaction_type

created_at

unique constraints required

---

## debates

id

season_id

episode_id

title

description

status

agree_count

disagree_count

created_at

---

## debate_responses

id

debate_id

user_id

response

comment_id

created_at

---

## predictions

id

user_id

season_id

contestant_id

prediction_type

prediction_value

created_at

resolved_at

result

---

## pulse_snapshots

id

contestant_id

date

poll_score

discussion_score

engagement_score

trend_score

roundup_score

pulse_score

created_at

---

## poll_roundups

id

season_id

submitted_by

source_name

source_url

screenshot_url

status

reviewed_by

reviewed_at

notes

---

## notifications

id

user_id

type

title

message

read_at

created_at

---

## reports

id

reporter_id

target_type

target_id

reason

description

status

created_at

resolved_at

resolved_by

---

## moderation_actions

id

moderator_id

target_type

target_id

action

reason

created_at

---

## follows

id

user_id

target_type

target_id

created_at

---

## share_events

id

user_id

target_type

target_id

channel

created_at

---

# 83. DATABASE RULES

Use:

foreign keys

indexes

unique constraints

created_at timestamps

updated_at timestamps

soft deletion only where appropriate

server-side authorization

Do not trust frontend role values.

---

# 84. AUTHORIZATION

Roles:

user

moderator

admin

sponsor_manager

All privileged operations must be server-side protected.

Never depend on hidden UI elements as security.

---

# 85. VOTING SECURITY

Each poll:

one user

one vote

per poll cycle.

Prevent duplicate vote submissions.

Use:

rate limits

idempotency protection

server-side validation

CAPTCHA where appropriate

suspicious activity detection

Do not silently manipulate legitimate results.

If moderation adjusts data due to suspected manipulation, provide an integrity note where appropriate.

---

# 86. DISCUSSION MODERATION

Content can pass through:

automatic basic filter

↓

flagged queue

↓

human moderator review

↓

action

Possible actions:

approve

remove

restrict

lock

escalate

---

# 87. CONTENT RULES

Discussion should focus on:

* in-show behavior
* episodes
* tasks
* nominations
* gameplay
* debates
* fan opinions

Do not design interaction patterns that encourage:

* personal-life speculation
* harassment
* serious unverified allegations
* sexualized accusations
* defamatory claims

Report access must always be easy to find.

---

# 88. USER-GENERATED CONTENT

The system must support:

posts

comments

memes

polls

debate responses

poll-roundup submissions

The legal terms should define:

* user ownership of submitted content
* permission for BBPulse to host and display content
* permission for BBPulse to generate share cards containing user content
* permission needed for redistribution workflows
* moderation/takedown rights

Final legal language must remain configurable and must be reviewed before public launch.

---

# 89. MEDIA RULES

Do not use unlicensed official broadcast images, footage, stills, logos, or transcripts.

Use:

original avatars

licensed assets

user-submitted content with appropriate permissions

approved generated artwork

Do not use copyrighted broadcast material as decoration.

---

# 90. DATA SOURCE POLICY

V1 data sources:

* first-party BBPulse polls
* manually reviewed public poll submissions
* first-party user discussions
* first-party engagement data
* manually/admin-entered season/episode information

Do not build unauthorized web scraping.

Do not build official-voting scraping.

Do not create a scraper architecture “for later”.

External integrations can be added in a later phase through permitted APIs or partnerships.

---

# 91. PUBLIC PULSE CALCULATION

V1 formula:

35% community poll

20% verified public poll observations

20% in-app discussion sentiment

15% normalized engagement

10% trend movement

Keep the calculation transparent.

Create a server-side calculation utility.

Allow configuration in admin.

Store snapshots so historical Pulse can be displayed.

---

# 92. V1 SENTIMENT

Do not build ML sentiment.

Use an explainable rule-based approach initially.

Possible categories:

positive

negative

neutral

mixed

Keep implementation deterministic and versioned.

---

# 93. RISK SCORE

V1 is a transparent community estimate.

Possible inputs:

poll support

poll movement

discussion sentiment

discussion movement

mention volume

engagement

nomination status

task-related context

controversy flag

historical patterns where available

Store each score snapshot.

Display:

**BBPulse Risk Score**

not:

official prediction

guaranteed outcome

actual voting probability

---

# 94. ADMIN DASHBOARD

Admin dashboard should be functional.

Overview:

Current season

Active poll

Today's debate

Reported content

Pending roundup submissions

User activity

Trending contestants

---

# 95. ADMIN — POLLS

Create

Edit

Open

Close

Archive

View results

View suspicious activity

Add integrity note

---

# 96. ADMIN — CONTESTANTS

Create

Edit

Archive

Update status

Update nomination status

Attach episode moments

Manage avatar

Manage biography

---

# 97. ADMIN — EPISODES

Create episode

Add summary

Add events

Publish

Unpublish

Create Today's Debate

Attach contestants

---

# 98. ADMIN — DEBATES

Create debate

Schedule

Publish

Close

Feature responses

Lock

Moderate responses

---

# 99. ADMIN — MODERATION

Dashboard sections:

New reports

High priority

Pending review

Resolved

Escalated

Each moderation item should expose:

content

author

reason

history

actions

---

# 100. ADMIN — ROUNDUP

Review submission:

source URL

submitted screenshot

source name

date

content summary

Approve

Reject

Request correction

---

# 101. ADMIN — USERS

Search users.

View:

username

account status

join date

post count

report count

moderation history

Actions:

restrict

suspend

restore

---

# 102. NOTIFICATION ENGINE

Design backend events for:

poll closing

reply received

comment received

debate published

prediction resolved

followed contestant update

Keep notification delivery extensible.

Do not implement excessive notification triggers.

---

# 103. SHARE ENGINE

Share generation must be reusable.

Input:

entity type

entity id

template type

headline

metric

secondary text

contestant avatar

disclaimer

brand mark

URL

Output:

social image

share metadata

share URL

---

# 104. SEO

Public pages should be search-engine friendly.

Use:

meaningful URLs

metadata

Open Graph tags

descriptive titles

structured page hierarchy

server-rendered content where appropriate

Examples:

`/`

`/contestants`

`/contestants/[slug]`

`/episodes/[episode]`

`/trend`

`/vote`

`/predict`

`/discuss`

`/debate/[slug]`

---

# 105. ROUTING

Implement clear route organization.

Public:

/

/login

/contestants

/contestants/[slug]

/episodes

/episodes/[episode]

/trend

/pulse

/vote

/predict

/discuss

/discuss/[post]

/debates/[slug]

/roundup

/search

/u/[username]

/settings

---

Authenticated:

/app

/app/profile

/app/notifications

/app/create

/app/predictions

/app/bookmarks if implemented

Admin:

/admin

/admin/polls

/admin/contestants

/admin/episodes

/admin/debates

/admin/moderation

/admin/users

/admin/roundup

/admin/settings

---

# 106. STATE MANAGEMENT

Use simple predictable state management.

Prefer:

server state for server data

local component state for local UI state

URL state for filters/search where useful

Do not introduce a large global state library unless necessary.

---

# 107. API DESIGN

Create typed service methods.

Examples:

getCurrentSeason()

getContestants()

getContestantPulse()

getActivePoll()

submitVote()

getDiscussionFeed()

createPost()

getPost()

createComment()

reactToPost()

createPrediction()

getPredictionResults()

getTrendData()

createReport()

blockUser()

getNotifications()

generateShareCard()

Do not scatter direct database queries throughout UI components.

---

# 108. CODE ORGANIZATION

Use a clean structure.

Example:

`app/`

`components/`

`features/`

`lib/`

`server/`

`db/`

`types/`

`hooks/`

`styles/`

`public/`

Group complex functionality by domain where practical.

---

# 109. TYPE SAFETY

Use strict TypeScript.

Avoid:

`any`

unless absolutely unavoidable.

Create:

database types

API types

form types

component prop types

domain models

---

# 110. VALIDATION

Use schema validation for:

forms

API payloads

query parameters

usernames

poll submissions

predictions

reports

Do validation server-side.

---

# 111. SECURITY

Implement:

HTTPS

secure cookies

CSRF protection where applicable

rate limits

server-side authorization

input validation

output escaping

secure headers

content security policy where practical

secret management

safe file uploads

image validation

file-size limits

MIME validation

---

# 112. IMAGE UPLOAD SECURITY

For meme uploads:

validate file type

validate size

sanitize metadata

remove EXIF

malware scan integration point

NSFW/unsafe content moderation integration point

store outside executable paths

generate optimized thumbnails

---

# 113. PERFORMANCE

Target a fast desktop experience.

Use:

server rendering where beneficial

code splitting

lazy loading

optimized images

compressed assets

minimal client JavaScript

cached public data where appropriate

Do not load the entire application bundle for every page.

---

# 114. DESIGN PERFORMANCE RULE

The visual quality must never depend on:

huge images

video backgrounds

heavy 3D effects

large animation libraries

unnecessary client-side computation

Keep the experience elegant and fast.

---

# 115. RESPONSIVE SCOPE

IMPORTANT:

Do not spend implementation time building the mobile version now.

The current release is desktop-first.

Still write components cleanly enough that the later redesign will be possible.

Do not create mobile-only navigation.

Do not create a bottom mobile tab bar.

Do not create mobile breakpoints just for the sake of completeness.

The next phase will redesign the experience for smaller screens.

---

# 116. RESPONSIVE PREPARATION

Use:

fluid container tokens

semantic components

flexible grids

clean component boundaries

avoid hard-coded widths everywhere

But optimize visual composition for desktop.

---

# 117. DESIGN STATES

Every important interaction must have:

default

hover

active

selected

disabled

loading

success

error

empty

---

# 118. HOVER INTERACTIONS

Desktop interactions should feel refined.

Examples:

Post card:

slight background lift

Subtle action emphasis

Contestant row:

very small translation or surface shift

Buttons:

subtle state transition

Links:

clear hover

Avoid dramatic scaling.

---

# 119. DATA VISUALIZATION PRINCIPLE

Charts should tell a story.

Every chart needs:

clear title

clear metric

clear timeframe

simple interpretation

Do not display charts merely because data exists.

---

# 120. TREND SPARKLINES

Use tiny sparklines in lists.

Do not put full charts everywhere.

Example:

`Priya 72 ↑ 8%  /sparkline/`

The sparkline should remain visually secondary.

---

# 121. PULSE VISUAL LANGUAGE

Use:

number

movement

small visual line

status

Do not use huge gauges everywhere.

The interface should remain editorial.

---

# 122. PREMIUM VISUAL MOMENTS

Create a few high-quality signature interactions.

### Home

Daily storyline

### Contestant

Journey timeline

### Episode

Event timeline

### Prediction

Community vs personal prediction

### Share

Beautiful card creation

These are the main “wow” moments.

---

# 123. DO NOT USE GENERIC UI PATTERNS

Do not automatically create:

12 statistic cards

giant dashboard headers

rainbow charts

purple AI badges

generic “AI powered” panels

fake analytics metrics

excessive pill controls

huge rounded rectangles

random illustrations

decorative graphs

---

# 124. CONTENT DESIGN

Use human, concise language.

Good:

**What's happening tonight?**

Bad:

**Advanced contextual engagement intelligence dashboard**

Good:

**What fans are saying**

Bad:

**Real-time community discourse analytics**

Good:

**What do you think happens next?**

Bad:

**Predictive outcome evaluation**

---

# 125. NO AI BRANDING

The product itself should not constantly advertise technology.

Do not write:

AI-powered

AI intelligence

AI prediction

AI engine

machine intelligence

unless a future feature specifically requires it.

The value should come from the experience.

---

# 126. NO REFERENCE LANGUAGE

IMPORTANT FOR CODE AND UI:

Do not mention external products, websites, design systems, inspiration sources, competitor names, reference designs, or source materials in:

* component names
* comments
* variable names
* user-facing UI
* placeholder text
* metadata
* documentation inside the application
* code comments

Do not add comments such as:

“Copied from...”

“Inspired by...”

“Based on...”

“Reference...”

Do not include external reference links inside the codebase unless they are required for an actual API integration.

The application should present itself as an original product.

---

# 127. NO FAKE CONTENT REFERENCES

For prototype/demo content:

Use fictionalized contestant/demo information and original visual assets.

Do not add external image URLs that may disappear.

Prefer local/generated placeholder assets.

---

# 128. DEMO DATA

Seed realistic demo data.

Create:

8–12 fictional contestants

20–40 discussion posts

comments

debates

poll results

prediction records

trend snapshots

notifications

reports

moderation examples

Use believable names and natural writing.

Avoid repetitive AI-sounding content.

---

# 129. DEMO DATA QUALITY

Content should feel like real users wrote it.

Create different personalities:

supportive

critical

funny

analytical

casual

argumentative but respectful

Use varied sentence lengths.

Do not make every post perfectly written.

---

# 130. DESIGN PERSONALITY

BBPulse should feel alive.

Use small contextual details:

“2h ago”

“Trending now”

“Updated 12 min ago”

“Poll closes tonight”

“18 fans discussing this”

But do not flood the page with statistics.

---

# 131. HOMEPAGE PRIORITY

Visual hierarchy must be:

1. Today's story
2. Community Pulse
3. Vote
4. Discussion
5. Today's Debate
6. Trend
7. Community Prediction
8. Share

The Risk Score must never overpower Community Prediction.

---

# 132. USER JOURNEY — FIRST VISIT

Visitor lands on homepage.

Understands product in seconds.

Explores current story.

Views contestant.

Views discussion.

Clicks vote.

Login appears.

Continue with Google.

Choose BBPulse ID.

Return to vote.

Vote succeeds.

Share result.

This should be smooth.

---

# 133. USER JOURNEY — RETURNING USER

Open website.

View today's story.

See Pulse movement.

Vote.

Read discussions.

Join Today's Debate.

Make prediction.

See notification.

Share result.

---

# 134. SUPERFAN JOURNEY

Home

→ contestant

→ journey

→ episode event

→ discussion

→ debate

→ prediction

→ profile

---

# 135. MODERATOR JOURNEY

Login

→ moderation dashboard

→ reports

→ review content

→ action

→ see updated moderation state

Admin actions must be fast.

---

# 136. LEGAL UX

Show independent-platform disclaimer in appropriate public locations.

Do not make it visually dominant.

Create legal pages:

Terms

Privacy

Community Guidelines

Content Policy

Grievance

Independent Platform Notice

---

# 137. DELETION

Users must be able to initiate account deletion.

Give a clear confirmation step.

Do not hide the option.

Where legally required, retain only the minimum necessary records.

---

# 138. BLOCKING

Blocked users should not appear in:

feed

comments

discussion views

search where applicable

The backend must enforce blocking.

---

# 139. REPORTING

Reports must create backend records.

Do not make the report button decorative.

Moderator status:

pending

reviewing

resolved

dismissed

escalated

---

# 140. FOLLOWING

Users can follow:

contestants

possibly topics

Following affects:

feed

notifications

personalization

Keep this feature simple.

---

# 141. FEED RANKING

Initial discussion feed can use simple deterministic ranking.

Possible signals:

recent

engagement

followed contestant

featured

debate relevance

Do not implement a complicated recommendation engine.

---

# 142. TREND RANKING

Use transparent calculations.

Do not hide all ranking logic inside opaque models.

Allow admin inspection.

---

# 143. POLL ROUNDUP REVIEW

User submits source.

Moderator checks source.

Moderator records result.

Published entry contains:

source

date

result

verification status

Do not display unverified submissions publicly.

---

# 144. SPONSORED CONTENT PREPARATION

Prepare component support for future sponsored content.

Example fields:

isSponsored

sponsorName

sponsorLogo

sponsorLabel

But do not make sponsorship dominate V1.

Always show a clear “Sponsored” label when used.

---

# 145. ANALYTICS EVENTS

Track useful product events:

page_view

login_started

login_completed

username_created

contestant_viewed

poll_viewed

vote_started

vote_completed

discussion_opened

post_created

comment_created

agree_clicked

disagree_clicked

prediction_started

prediction_completed

share_started

share_completed

debate_opened

follow_created

report_submitted

Do not track unnecessary personal information.

---

# 146. PRODUCT METRICS

Track:

daily active users

weekly active users

poll participation

discussion participation

posts per user

comments per post

debate participation

prediction participation

share generation

share clicks

return visits

moderation reports

poll manipulation flags

These metrics help evaluate the product after launch.

---

# 147. V1 SUCCESS

V1 should succeed if users repeatedly do this:

visit

→ understand today's story

→ vote

→ discuss

→ return for debate

→ predict

→ share

The goal is not to maximize feature count.

The goal is to create a strong repeatable season experience.

---

# 148. BUILD ORDER

Implement in this order.

## Phase 1 — Foundation

Project setup

Design tokens

Typography

Color

Global layout

Header

Navigation

Database

Authentication

---

## Phase 2 — Core content

Home

Contestants

Contestant profile

Episodes

Episode timeline

---

## Phase 3 — Vote

Poll

Voting

Results

Integrity

---

## Phase 4 — Discussion

Feed

Post

Post detail

Comments

Agree/Disagree

Contestant rooms

Create post

Meme posting

---

## Phase 5 — Debate

Today's Debate

Debate interaction

Debate comments

---

## Phase 6 — Trend

Pulse calculation

Trend page

Trend history

Methodology

---

## Phase 7 — Prediction

Prediction

Community prediction

Risk Score

Prediction history

Leaderboard

---

## Phase 8 — Share

Share card

Share preview

Share generation

---

## Phase 9 — User system

Profile

Following

Notifications

Settings

Block/report

---

## Phase 10 — Admin

Dashboard

Moderation

Polls

Contestants

Episodes

Debates

Roundups

Users

---

## Phase 11 — Refinement

Loading states

Empty states

Error states

Accessibility

Performance

Visual polish

Animation polish

Security pass

---

# 149. DESIGN REVIEW

After implementation, review every page.

Ask:

Does this feel premium?

Is the main action obvious?

Can a first-time user understand the screen quickly?

Is there too much information?

Is the hierarchy clear?

Is whitespace being used intentionally?

Does the page tell a story?

Are there unnecessary cards?

Are colors restrained?

Are interactions subtle?

Does the product feel like one coherent system?

---

# 150. CODE QUALITY REVIEW

Before considering the build complete:

No duplicated component logic.

No excessive inline styling.

No hard-coded repeated values.

No insecure client-only authorization.

No fake API success states.

No untyped server data.

No unnecessary dependencies.

No dead code.

No unexplained generated files.

No external reference material hidden inside comments or components.

---

# 151. FINAL VISUAL STANDARD

The final website should look like a serious premium consumer startup.

The quality should come from:

* excellent typography
* precise spacing
* beautiful composition
* simple controls
* subtle motion
* editorial storytelling
* restrained color
* strong information hierarchy
* believable content
* consistent interaction

The product should feel:

**clean enough to trust**

**beautiful enough to remember**

**simple enough to use immediately**

**interesting enough to return to every episode**

---

# 152. FINAL PRODUCT STRUCTURE

BBPulse should ultimately feel like:

## HOME

What happened today.

## VOTE

What the community chose.

## DISCUSS

What fans are saying.

## TREND

What is changing.

## PREDICT

What fans think happens next.

## SHARE

What users want others to see.

Everything connects.

---

# 153. FINAL COMMAND TO ANTIGRAVITY

Build BBPulse as a complete working desktop-first website.

Do not stop at the homepage.

Do not build placeholder-only pages.

Do not create disconnected mockups.

Build:

* complete routing
* complete design system
* reusable components
* realistic data
* authentication flow
* Google login
* BBPulse IDs
* profile system
* contestant system
* episode system
* poll system
* vote integrity
* discussion system
* posts
* comments
* Agree/Disagree
* contestant rooms
* memes
* Today's Debate
* trend system
* Public Pulse
* transparent methodology
* community predictions
* Risk Score
* prediction history
* leaderboard
* share card system
* notifications
* search
* reporting
* blocking
* moderation
* admin dashboard
* Poll Roundup
* settings
* legal pages
* loading states
* empty states
* error states
* accessibility states
* security boundaries

Use a modular architecture.

Use PostgreSQL.

Use managed Google authentication.

Use typed APIs.

Use strict TypeScript.

Use reusable components.

Use original visual language.

Keep desktop as the current optimization target.

Do not build the mobile redesign now.

Do not add ML in V1.

Do not add unauthorized scraping.

Do not build official voting integration.

Do not use unlicensed official media.

Do not copy another product's visual system.

Do not reference external products or source material inside the application code, component names, comments, placeholder content, UI copy, or metadata.

Do not over-design.

Do not turn the product into a generic analytics dashboard.

Do not fill every area with cards.

Do not use decorative effects without purpose.

Do not sacrifice usability for visual novelty.

The finished result should feel like a real, polished, premium entertainment product designed by an excellent product team.

The most important experience is:

**Tonight → Pulse → Vote → Discuss → Debate → Trend → Predict → Share**

Build the product around that story.

Make every page feel connected to it.

Make the experience simple.

Make the visual system refined.

Make the interactions satisfying.

Make the product feel alive during the season.

Build it as if real users will open it every night.

