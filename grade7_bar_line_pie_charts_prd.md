# Product Requirements Document (PRD)

## Bar, Line & Pie Charts — Reading, Building & Choosing Data Displays | Grade 7 Math

### Intellia SG | Global Grade 7 Mathematics Curriculum

---

## 1. Executive Summary

This document defines the product requirements for **"Global Data Explorers — Bar, Line & Pie Charts"**, an interactive, gamified, simulation-based lesson module for **Grade 7 students (age 12–13)**. It teaches how to **read, construct, compare and choose between bar charts (single and double), line graphs, and pie charts**, including calculating pie-chart sector angles and spotting misleading graphs.

The module is a standalone **React (Vite + JSX)** web application that **strictly mirrors the UI shell, phase structure and interaction patterns** of the reference product:

- Reference site: **<https://grade5-time-intervals.vercel.app/>**
- Reference repository: **<https://github.com/p1pachare-cloud/Grade5-Time-Intervals>** (its PRD, TRD and `audio_generation_pipeline.md` are the structural templates for this document)
- Upstream lineage of that reference: `equal-tau.vercel.app` / `github.com/dsamyak/equal`

The module is uploaded to the Intellia course catalogue at the location the team specified:

```
https://intelliasg.com/courses/grade-3-math
```

> **Note on URL:** the upload target is the `grade-3-math` course page as provided. The module content itself is Grade 7. If the catalogue later gets a dedicated Grade 7 path (e.g. `/courses/grade-7-math/lessons/bar-line-pie-charts/`), only the embed URL changes; nothing in the app depends on it.

Audio narration follows the provided **ElevenLabs pipeline** (`audio_generation_pipeline.md`): Voice **Alice**, Voice ID `Xb7hH8MSUJpSbSDYk0k2`, Model `eleven_multilingual_v2`, per-style voice settings, pre-generated static `.mp3` assets plus a dynamic fallback, and the strict rule that **only paragraph text and questions are narrated — never titles, headings or world names.**

The lesson uses a global, multicultural story — **John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima, Diego, Chloe, Ravi, Amara, Kwame, Olga** — in which a club of friends from ten countries rescues a broken "Data Wall" before a live World Youth Festival broadcast.

**Pedagogical model — Learn first, then Simulate, then Practise.** Students meet each chart type through story-led **Concept Cards** (learn), explore it in four **simulation stations** (do), and only then unlock the **100-question randomized IntelliPlay™ challenge** (practise). The lesson follows Intellia's proven **6-phase journey: INTRO → WONDER → STORY (learn) → SIMULATE → PLAY → REFLECT.**

**Randomization principle:** every practice question is **procedurally generated** (fresh data, fresh context, fresh numbers) — there is no fixed answer key a student can memorize.

---

## 2. Product Vision & Goals

**Vision:** To make data displays feel like a detective adventure — helping 12–13 year olds confidently read the story a graph is telling, build accurate charts by hand, calculate pie-chart angles, and challenge charts that mislead — through a simulation-first, story-driven, fully randomized gamified experience.

**Goals**

| Goal                        | Metric                                                                  |
| --------------------------- | ----------------------------------------------------------------------- |
| Learning Completion         | ≥85% of students complete all 6 phases                                  |
| Learn-Phase Engagement      | ≥90% view all Concept Cards before entering Simulate                    |
| Practice Engagement         | ≥90% attempt at least 10 practice questions                             |
| Score Achievement           | Average Play score ≥75% on first attempt                                |
| Session Duration            | Average engagement ≥20 minutes per session                              |
| Curriculum Alignment        | 100% aligned to global Grade 7 data-representation standards (Section 4) |
| Phase Progression           | ≥80% reach Play phase in a single session                               |
| Simulation Interaction Rate | ≥95% attempt all 4 simulation stations                                  |
| Randomization Integrity     | 0 identical question sets across sessions; 0 duplicate questions within a session |
| Misconception Reduction     | ≥30% fewer "scale/axis" and "percent-vs-angle" errors between World 1 and World 10 |

---

## 3. Target Users

**Primary: Grade 7 Students (Age 12–13)**

- Comfortable with fractions, percentages, ratio, decimals and basic angle measurement (protractor, angles at a point = 360°)
- Ready for abstract reasoning: proportional thinking (part ÷ whole × 360°), scale reasoning, and critical reading of graphs
- Motivated by badges, streaks, leaderboards-of-self (personal bests), a strong story arc and "gotcha" detective moments
- International/global classroom context — familiar with sports, weather, apps, food, transport, social media and global events

**Secondary: Parents & Teachers**

- Assign as classwork, homework or enrichment
- Expect visible alignment to recognized syllabi (Section 4)
- Monitor completion via in-lesson phase indicators and the end-of-lesson summary card

---

## 4. Curriculum Alignment — Global Grade 7 Mathematics

**Topic:** Bar Charts, Line Graphs & Pie Charts
**Programme:** Intellia Grade 7 Math — Statistics & Data Handling
**Upload location:** `https://intelliasg.com/courses/grade-3-math`

**Source frameworks (topic-relevant strands only; cross-mapped, not copied):**

| Framework                        | Relevant strand                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| U.S. Common Core                 | Grade 6–7 Statistics & Probability — displaying and interpreting numerical data (6.SP), data-driven comparison (7.SP) |
| UK National Curriculum           | Key Stage 3 Statistics — construct and interpret tables, bar charts, pie charts and time-series line graphs        |
| Singapore MOE Lower Secondary    | Secondary 1 Data Analysis — bar graphs, line graphs, pie charts; interpreting and comparing displays              |
| Australian Curriculum (v9)       | Year 7 Statistics — interpret and compare data displays; choose displays that suit the data                        |
| CBSE / NCERT                     | Class 7 Data Handling — bar graphs, double bar graphs; pie chart (circle graph) concepts as extension              |
| ICSE                             | Class 7 Data Handling — bar graphs, pie charts (circle graphs), line graphs                                        |

> *Editorial note for the content team:* strand names above are cross-mapped at topic level. Before publishing to the catalogue, verify the exact standard codes against each board's current document; codes are deliberately not hard-wired into the app so a re-map never requires a code change.

**Learning Objectives Covered:**

| LO   | Description                                                                                           |
| ---- | ----------------------------------------------------------------------------------------------------- |
| LO1  | Identify the parts of a chart: title, axes, axis labels, scale, key/legend, categories, sectors        |
| LO2  | Read exact and estimated values from a bar chart, including scales that count in 2s, 5s, 10s, 20s, 50s |
| LO3  | Compare bars: greatest/least, difference, total, "how many more", ratio-style comparison               |
| LO4  | Read and interpret a **double bar chart** using a key                                                  |
| LO5  | Choose an appropriate scale and construct a bar chart from a data table                                |
| LO6  | Read values from a line graph, including **interpolating** between plotted points                      |
| LO7  | Describe trends over time: increase, decrease, steepest change, peak, trough, constant                 |
| LO8  | Construct a line graph (plot points, choose scale, join points) from a time-series table               |
| LO9  | Interpret a pie chart: sectors as fractions/percentages of a whole; total = 100% = 360°                |
| LO10 | Calculate sector angles: angle = (frequency ÷ total) × 360°; and reverse (frequency from angle)         |
| LO11 | Find a missing sector, missing total, or missing frequency using the 360° / 100% constraint            |
| LO12 | Choose the most suitable display (bar vs line vs pie) for a given data situation and justify it        |
| LO13 | Detect misleading displays: truncated axis, uneven scale, missing labels, pie sectors not summing to 100% |
| LO14 | Solve multi-step, real-world problems that combine two or more displays                                |

**Concrete → Pictorial → Abstract (CPA) Progression:**

- **Concrete:** Students *physically manipulate* the display — dragging bar tops, tapping to plot points, rotating a protractor dial to cut a sector
- **Pictorial:** Data table ↔ chart side-by-side views that highlight the same value in both
- **Abstract:** Formula and reasoning statements — `angle = (frequency ÷ total) × 360°`, `percent = angle ÷ 360 × 100`, "rate of change = change in value ÷ change in time"

**Number & Data Ranges:**

- **Easy:** Whole-number data, scale in 1s/2s/5s/10s, 3–4 categories, gridlines on every value
- **Medium:** Scales in 20s/25s/50s, values that fall *between* gridlines, double bar charts, 5–6 categories, percentages that are multiples of 5, pie totals that divide 360 exactly
- **Hard:** Scales in 100s/200s, interpolation, multi-step problems, missing-total pies, fractions of a circle, misleading-graph critique, charts that require combining two displays

**Vocabulary Focus:** "bar chart", "double bar chart", "line graph", "time series", "pie chart", "sector", "angle", "axis", "scale", "interval", "key", "frequency", "total", "trend", "increase", "decrease", "steepest", "interpolate", "truncated", "misleading", "proportion", "percentage"

---

## 5. The 6-Phase Learner Journey (Intellia Model)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ INTRO SCREEN → Progress Map (6-step visual tracker, top bar)               │
│ Welcome: "Hello, Explorer! Ready to master Bar, Line & Pie Charts? 📊🌍"   │
│ Lesson badge shown (locked). 6 glowing phase dots visible.                 │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1 — WONDER (≈1–2 min)                                                │
│                                                                            │
│ Hook: "Mike in New York is staring at the festival's Data Wall. Three      │
│ charts are glowing, but every label has vanished! One chart shows how the  │
│ crowd changed through the day. Which one is it?"                           │
│                                                                            │
│ Visual: three unlabeled mini-charts (bar / line / pie) pulsing on a        │
│ giant screen; student TAPS the one they think shows change over time       │
│ Narration (ElevenLabs): Alice voice reads the hook warmly                  │
│ → Mascot "Plotty" (a friendly chart-robot) reacts to the guess             │
│ → "Let's discover which chart tells which story!"                          │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2 — STORY + LEARN (≈4–6 min) — "The Global Data Explorers Club"      │
│                                                                            │
│ 8 illustrated story panels. Panels 3, 4, 5, 6 and 7 are each followed by  │
│ a CONCEPT CARD (learn-first): a short annotated explainer the student      │
│ must open before "Next" enables. See Section 6.                            │
│                                                                            │
│ → Illustrated story panels (animated slide-in), ElevenLabs narration       │
│ → Key vocabulary highlighted as it is spoken                              │
│ → World map background with pins on each character's city                 │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3 — SIMULATE (≈8–10 min)                                             │
│                                                                            │
│ 4 Interactive Stations — student must complete all 4 to advance            │
│  A — Bar Builder      (Concrete)  drag bar tops, choose a scale            │
│  B — Trend Tracker    (Concrete→Pictorial) plot & probe a line graph       │
│  C — Pie Slicer       (Pictorial→Abstract) protractor dial cuts sectors    │
│  D — Chart Doctor     (Abstract)  choose the chart / catch the misleading  │
│                                                                            │
│ → Mascot Plotty reacts to each completed station                           │
│ → ElevenLabs narrates each station instruction and feedback                │
│ → Every round of every station is randomly generated                       │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4 — PLAY (≈10–14 min)                                                │
│                                                                            │
│ IntelliPlay™ Level: 100 procedurally generated questions across            │
│ 10 worlds (each world = a real-world global landmark)                      │
│ 10 questions per world; a world unlocks at ≥5/10 correct                   │
│ Stars (1–3), XP, badges and streak fire counter active                     │
│ → Mastery gates the world map; encouragement-first feedback                │
│ → PLAY is locked until all 4 simulation stations are complete              │
└────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 5 — REFLECT (≈1–2 min)                                               │
│                                                                            │
│ Journal prompt: "Think of something in your own life you could measure     │
│ for a week. Which chart would you use, and why?"                           │
│ Or: LearnFlow AI chat — type/speak your understanding                      │
│ Lesson complete badge unlocks here. Summary of XP + badges shown.          │
│ → "Share with your teacher!" button (screenshot / export)                  │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Phase 2 — Story & Learn-First Content (Detailed)

### 6.1 The Story — "The Global Data Explorers Club"

**Cast (global):** John (Toronto), Mike (New York), Sarah (London), Emma (Sydney), Liam (Cape Town), Sofia (Paris), Noah (Berlin), Aisha (Cairo), Carlos (Rio de Janeiro), Yuki (Tokyo), Priya (Mumbai), Diego (Mexico City), plus Kwame (Accra), Amara (Lagos), Olga (Reykjavik) as cameo experts.

**Mascot:** **Plotty**, a friendly chart-robot whose face is a tiny pie chart, whose arms are bar-shaped, and whose antenna draws a wiggly line.

**Plot arc (interesting, mystery-driven):** In one hour the World Youth Festival goes live in ten cities at once. The giant **Data Wall** that will show live results has glitched: bars have lost their heights, lines are tangled, pie slices are swapped and the labels are gone. The Global Data Explorers Club, connected by video call, has to repair every chart — city by city — before the broadcast starts. Each repair teaches the class one big idea, and the final repair reveals who has been secretly changing the charts (a "trickster" who draws misleading graphs — exposed in Panel 7).

### 6.2 Story Panels + Concept Cards

| #  | Panel (narrated paragraph text)                                                                                                                                       | Follows with                                |
| -- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| P1 | "John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki are the Global Data Explorers. They live in ten different countries, but they meet on video calls to solve data mysteries." | —                                           |
| P2 | "Tonight is the World Youth Festival. But the giant Data Wall has glitched! The bars, lines, and circles are all scrambled, and the clock is ticking."                | —                                           |
| P3 | "In Sydney, Emma counts how many students joined each activity. Football has forty, dance has twenty-five, chess has fifteen, and art has thirty. Each activity gets its own bar. The taller the bar, the bigger the number!" | **Concept Card 1 — Bar Charts**             |
| P4 | "Liam in Cape Town notices something. Two schools took part, so each activity needs two bars, one for each school. A key tells us which colour belongs to which school." | **Concept Card 2 — Double Bar Charts & Scales** |
| P5 | "In Cairo, Aisha checks the temperature at the outdoor stage every two hours. When the temperature rises, her line climbs. When it falls, her line drops. A line graph shows how things change over time." | **Concept Card 3 — Line Graphs & Trends**   |
| P6 | "Sofia in Paris asks two hundred students to vote for their favourite festival snack. Together, all the votes make one whole circle. Every snack gets a slice, and the whole circle is three hundred and sixty degrees." | **Concept Card 4 — Pie Charts & Angles**    |
| P7 | "But wait! Diego in Mexico City spots a trickster chart. Its bars start at fifty instead of zero, so a tiny difference looks huge. Explorers must always check the scale before they trust a chart." | **Concept Card 5 — Choosing & Checking Charts** |
| P8 | "With Plotty's help, every chart on the Data Wall lights up. The festival can begin! But first, the Explorers want to see if you can fix the charts too." | —                                           |

> Story panel text is **paragraph content and is narrated 1:1** (see Section 10). Panel titles and Concept Card titles are **not** narrated.

### 6.3 Concept Cards (Learn-First Explainers)

Each card is a single scrollable/tappable screen with an **animated annotated diagram**, ≤3 short paragraphs, and a **"Try it" micro-check** (one tap question) that must be answered correctly before "Next" enables. This enforces learning *before* simulation.

**Card 1 — Bar Charts**
- Animated anatomy: title, x-axis (categories), y-axis (numbers), scale, gridlines, bars
- Highlights: bars have equal widths and equal gaps; bar height = value; **read across from the bar top to the axis**
- Worked example: bar ends halfway between 20 and 30 on a scale of 10 → 25
- Micro-check: "Which bar is tallest?" (random data)

**Card 2 — Double Bar Charts & Scales**
- Animated legend/key; two bars per category; comparing within and between categories
- **Scale intervals:** how choosing 1, 2, 5, 10, 20, 50 changes the picture; "pick an interval so the tallest bar fits in about 5–10 gridlines"
- Micro-check: "What does the orange bar show?" (key reading)

**Card 3 — Line Graphs & Trends**
- Anatomy: time on the x-axis, quantity on the y-axis; points plotted then **joined**
- Vocabulary: increase / decrease / constant / peak / trough; **steeper line = faster change**
- **Interpolation:** reading a value between two plotted points (midpoint of 20 and 30 is 25)
- Warn: line graphs suit *continuous change over time* — not separate categories
- Micro-check: "Between which two times did it rise fastest?" (random data)

**Card 4 — Pie Charts & Angles**
- Anatomy: whole circle = total = 100% = 360°; each sector = a share of the whole
- **Formulas shown as animated steps:**
  `angle = (frequency ÷ total) × 360°`
  `percent = (frequency ÷ total) × 100`
  `frequency = (angle ÷ 360°) × total`
- Worked example: 30 out of 120 votes → ¼ of the circle → 90°
- Common misconception callout: **"Angles are NOT the same as percentages"** (25% → 90°, not 25°)
- Micro-check: "A sector is 90°. What fraction of the pie is it?"

**Card 5 — Choosing & Checking Charts**
- Decision helper (drag-flow): *Comparing separate categories → bar; change over time → line; parts of a whole → pie*
- Pie caution: too many sectors, or values that are not parts of one whole → use bar instead
- **Misleading-graph checklist:** ① Does the axis start at zero (for bars)? ② Is the scale even? ③ Are labels and units present? ④ Do pie sectors add up to 100%?
- Micro-check: "Which chart best shows the number of steps you walk each day for a week?" (random scenario)

---

## 7. Phase 3 — Simulation Design (Detailed)

All four stations are **randomly generated per round**. Each station has **3 rounds** (Station A has 4) with increasing difficulty. Every station provides: an on-screen **data table ↔ chart link** (hover/tap a table cell to highlight the matching bar/point/sector), a "Show me a hint" button, Plotty feedback, and ElevenLabs instruction narration.

### 7.1 Station A — "Bar Builder" (Concrete)

**Visual:** A data table (e.g. "Festival Activities — students per activity") sits beside an empty chart frame with axes. A **scale selector** offers 3 intervals. Bars start at height 0.

**Interaction:**

1. Student picks the **scale interval** (wrong choices show a Plotty warning: "That scale is too small — the bars won't fit!" or "too big — every bar looks the same!")
2. Student **drags each bar top** up or down (snap to gridline; half-gridline snap in harder rounds); tap-to-select + ± nudge buttons as a touch/keyboard fallback
3. Live **tooltip** shows the value as the bar moves; the matching table row lights up
4. Submit when all bars are set

**Feedback:** Correct bars turn green and "pop"; incorrect bars show a red outline and a ghost marker at the correct height *only on the second attempt*.

**Rounds (randomized instances of these templates):**

- Round 1: 4 categories, scale of 5, all values on gridlines
- Round 2: 5 categories, scale of 10, one value at a half-gridline (e.g. 35)
- Round 3: **Double bar chart** — 4 categories × 2 series with a key; scale of 10 or 20
- Round 4: **Choose the scale yourself** — data range up to 480; pick from 20/50/100 and justify (multi-choice) before building

### 7.2 Station B — "Trend Tracker" (Concrete → Pictorial)

**Visual:** A time-series table (hours of the day, months, or weeks) and a blank line-graph grid.

**Interaction:**

1. **Plot phase:** tap the grid to place each point (snaps to nearest gridline intersection; wrong placements shake). Points auto-join with an animated line once all are placed
2. **Probe phase:** a draggable **"Time Probe"** vertical slider moves along the x-axis; the graph shows the exact reading, or an **estimate** when between plotted points (interpolation)
3. **Trend phase:** the student taps the segment matching a prompt ("Tap where the temperature rose fastest")

**Rounds:**

- Round 1: Plot 5 points (whole-number values, scale of 5); tap the highest point
- Round 2: Plot 6 points; probe a between-points value (interpolation, midpoint only)
- Round 3: Plot 7 points, one **outlier**; find the steepest segment, then estimate a between-points value (non-midpoint, e.g. one quarter of the way)

### 7.3 Station C — "Pie Slicer" (Pictorial → Abstract)

**Visual:** A blank circle with a **protractor overlay** and a **rotating radius line**. Beside it, a data table of frequencies with a running "total".

**Interaction:**

1. Student first **calculates each angle** using an on-screen calculator strip (formula card reachable via a "Show formula" button)
2. Student **rotates the radius** to the calculated angle; the sector fills with a colour **and a pattern** (colour-blind safe) and is labelled
3. Repeat until the circle is full; a **360° counter** shows what remains; a final check confirms the sectors sum to 360°

**Rounds:**

- Round 1: Percent → angle (e.g. 25% → 90°, 50% → 180°, 10% → 36°); 3 sectors
- Round 2: Frequency + total → angle (e.g. 30 of 120 → 90°); 4 sectors
- Round 3: **Missing sector** — 3 sectors given, student must work out the final angle (360° minus the others) *and* its frequency

### 7.4 Station D — "Chart Doctor" (Abstract)

**Part 1 — Chart Chooser (drag & drop):** 6 real-world scenario cards (e.g. "Ravi's daily step count for 7 days", "How Priya splits her weekly pocket money", "Number of goals scored by 5 teams") are dragged into three buckets: **Bar / Line / Pie**. Tap-tap fallback for accessibility.

**Part 2 — Spot the Trick:** A "trickster chart" is shown with one or two deliberate flaws. Student taps the flawed region(s) and picks the flaw type from a list:
- Bar axis does not start at zero (truncated axis)
- Uneven scale intervals
- Missing title/axis label/unit/key
- Pie sectors sum to more or less than 100%
- Line graph used for unrelated categories

**Rounds:** 3 rounds; Round 1 → one clear flaw; Round 2 → one subtle flaw; Round 3 → two flaws, student finds both.

**Badge link:** *Sharp Eye* is earned for finishing Station D with no wrong selection.

---

## 8. Phase 4 — Question Bank (100 Procedurally Generated Questions)

### 8.1 Question Types (10 types × 10 questions = 100 per session)

| Type | Description                                                     | Example (values are always regenerated)                                                               |
| ---- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Q1   | Read a value from a bar chart (incl. between gridlines)          | "The bar for Chess ends halfway between 20 and 30. How many students joined Chess?"                    |
| Q2   | Compare bars — greatest/least, difference, total, "how many more" | "How many more students chose Football than Art?"                                                     |
| Q3   | Interpret a double bar chart using the key                       | "Which month had the biggest gap between School A and School B?"                                      |
| Q4   | Read/interpolate a value on a line graph                         | "At 3 p.m. the reading is halfway between the 2 p.m. and 4 p.m. points. What is the temperature?"     |
| Q5   | Describe a trend / find the steepest change / rate of change     | "Between which two hours did the crowd grow fastest?" / "What was the change per hour from 2 to 5?"   |
| Q6   | Pie chart: fraction/percentage → quantity                        | "Sofia asked 200 students. The 'Pretzel' sector is 25%. How many students chose Pretzel?"              |
| Q7   | Pie chart: calculate a sector angle (or frequency from an angle) | "Out of 60 votes, 15 chose Samosa. What is the angle of the Samosa sector?"                            |
| Q8   | Missing sector / missing total on a pie chart                    | "Three sectors measure 90°, 120° and 60°. What is the angle of the fourth sector?"                     |
| Q9   | Choose the best chart type and justify                           | "Kwame wants to show how a plant's height changed each week. Which chart is best?"                     |
| Q10  | Spot the misleading chart (True/False or "what's wrong?")         | "This bar chart's axis starts at 80. Is the chart a fair comparison? True or False."                   |

### 8.2 World × Question-Type Distribution

Each world has **10 questions**; each type appears **exactly 10 times** across the session. Worlds *emphasize* a skill but never exclusively test it (all concepts are taught before Play begins).

| World | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Σ  |
| ----- | -- | -- | -- | -- | -- | -- | -- | -- | -- | --- | -- |
| W1    | 6  | 4  | –  | –  | –  | –  | –  | –  | –  | –   | 10 |
| W2    | 2  | 3  | 5  | –  | –  | –  | –  | –  | –  | –   | 10 |
| W3    | 1  | 1  | 2  | –  | –  | –  | –  | –  | 3  | 3   | 10 |
| W4    | –  | –  | –  | 6  | 4  | –  | –  | –  | –  | –   | 10 |
| W5    | –  | –  | –  | 2  | 5  | –  | –  | –  | 1  | 2   | 10 |
| W6    | –  | –  | –  | –  | –  | 6  | 2  | –  | 2  | –   | 10 |
| W7    | –  | –  | –  | –  | –  | 2  | 6  | 2  | –  | –   | 10 |
| W8    | –  | –  | –  | –  | –  | –  | –  | 6  | 2  | 2   | 10 |
| W9    | –  | 1  | 1  | 1  | –  | 1  | –  | 1  | 2  | 3   | 10 |
| W10   | 1  | 1  | 2  | 1  | 1  | 1  | 2  | 1  | –  | –   | 10 |
| **Σ** | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10  | **100** |

### 8.3 Difficulty Progression (by World)

| World | Easy | Medium | Hard |
| ----- | ---- | ------ | ---- |
| W1    | 10   | 0      | 0    |
| W2    | 7    | 3      | 0    |
| W3    | 4    | 5      | 1    |
| W4    | 6    | 4      | 0    |
| W5    | 2    | 6      | 2    |
| W6    | 5    | 5      | 0    |
| W7    | 2    | 6      | 2    |
| W8    | 1    | 5      | 4    |
| W9    | 0    | 5      | 5    |
| W10   | 0    | 3      | 7    |
| **Total** | **37** | **42** | **21** |

### 8.4 What "Random" Means Here

1. **Fresh data every time.** Categories, values, scales, totals and contexts are generated per question from constrained templates — not picked from a fixed list of answered questions.
2. **Constraint-safe numbers.** Pie totals are always chosen so angles are whole numbers (totals such as 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180); percentages are multiples of 5 (easy/medium) or 2.5-free values (hard); bar values land on gridlines or exactly on half-gridlines when the question says "halfway".
3. **Seeded per session.** A session seed makes a session *reproducible for QA/bug reports* while remaining different for each student session.
4. **No repeats.** A per-session uniqueness signature (type + parameters) forbids duplicate questions; charts of the same shape must differ in context or data.
5. **Randomized presentation.** MCQ option order, colours, category order and context skin (festival stall, sports team, weather station, app usage…) are all shuffled.
6. **Plausible distractors.** Wrong options are built from *real misconceptions* (Section 8.5), never random junk.

### 8.5 Distractor Design (Misconception-Based)

| Type | Built-in wrong answers                                                                                                        |
| ---- | ----------------------------------------------------------------------------------------------------------------------------- |
| Q1   | Reads the gridline *below*/*above* instead of the midpoint; reads the wrong category's bar; ignores the scale (reads "2" for "20") |
| Q2   | Adds instead of subtracts; compares the wrong pair; reports the *larger value* instead of the *difference*                    |
| Q3   | Reads the wrong series (key mix-up); compares across categories instead of within                                             |
| Q4   | Picks the nearest plotted point rather than interpolating; picks the x-value instead of the y-value                            |
| Q5   | Chooses the highest point instead of the steepest segment; confuses "increase" with "fastest increase"                        |
| Q6   | Uses the percent as a raw count; divides by 100 instead of multiplying by total ÷ 100                                          |
| Q7   | Gives the percentage instead of the angle; gives 360 − angle; uses total ÷ frequency (inverted)                               |
| Q8   | Sums instead of subtracting from 360; subtracts from 100 instead of 360; forgets one given sector                              |
| Q9   | Picks pie for change over time; picks line for unrelated categories                                                           |
| Q10  | "Looks fine because the bars look different" (ignores the axis); overlooks missing units/labels                               |

### 8.6 Global Context — Names, Places & Objects Used in Word Problems

**Names (global set):** John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, Yuki, Priya, Fatima, Diego, Chloe, Ravi, Amara, Kwame, Olga

**Cities/Landmarks:** Sydney, Cape Town, Tokyo, Cairo, London, Paris, Mumbai, Rio de Janeiro, New York, Reykjavik

**Data contexts (all age-appropriate):** festival activities, snack votes, temperatures, rainfall, steps per day, screen time, books read, bus riders, team goals, plant height, water usage, recycling collected, app downloads, music genres, favourite sports, class survey results

### 8.7 Language & Notation Requirements

- Numbers in narrated question text are written so they read naturally aloud (e.g. "two hundred students", "ninety degrees", "twenty-five percent") — see the 1:1 parity rule in Section 10.5
- Angles on screen use the ° symbol in visuals and the words "degrees" in question text
- Axis labels always include units; charts always have a title
- Vocabulary: "bar chart", "double bar chart", "line graph", "pie chart", "sector", "key", "scale", "interval", "trend"

---

## 9. Gamification Design

### 9.1 Reward System

- **Stars (⭐):** Earned per 10-question world (1–3 stars based on score)
- **XP Points:** 10 XP correct first try | 7 XP second try | 5 XP with a hint used
- **Streak 🔥:** Fire counter for consecutive correct answers
- **Streak Bonus:** +5 XP per correct answer when streak ≥ 5
- **Personal best:** the end screen compares this run with the student's previous best on this device (no leaderboard, no other students' data)

### 9.2 Badges (Unlockable)

- 🏅 **"Chart Rookie"** — Complete Wonder + Story (including all 5 Concept Cards)
- 🛠️ **"Graph Builder"** — Complete all 4 Simulation stations
- 🥇 **"Data Champion"** — Score ≥80% on Play phase
- 💎 **"Perfect Chart"** — Score 10/10 in any world
- 🔥 **"Streak Star"** — Achieve a streak of 10 consecutive correct answers
- 🌍 **"Global Explorer"** — Complete all 6 phases (lesson complete badge)
- 🎯 **"Sharp Eye"** — Finish Station D with no wrong selection
- 📐 **"Angle Ace"** — Get 5 pie-angle questions (Q7) correct on the first try
- 📈 **"Trend Spotter"** — Get 5 line-graph questions (Q4/Q5) correct on the first try
- 🕵️ **"Trick Catcher"** — Correctly identify 5 misleading charts (Q10)

### 9.3 Feedback Mechanics

**✅ Correct:**
- Bounce animation on the answer card + mascot happy mood
- ElevenLabs celebration audio: "Amazing! You read that chart perfectly! You are a Data Explorer superstar!"
- XP floats up from the answer card (+10 / +7 / +5)
- Streak fire counter increments

**❌ Incorrect (Attempt 1):**
- Gentle shake animation + ElevenLabs: "Not quite! Let's look at the chart again."
- **Hint 1** activates: the relevant chart part is highlighted (e.g. the correct axis, the key, or the total sector)

**❌ Incorrect (Attempt 2):**
- Stronger shake + **Hint 2**: animated step-by-step demonstration (e.g. a dotted line traces from bar top to axis; or the formula fills in step by step)
- ElevenLabs: "Watch closely! Let's work it out step by step."

**❌ Incorrect (Attempt 3):**
- Answer revealed with an animated explanation (Plotty explains)
- ElevenLabs: full explanation read aloud
- No score penalty — encouragement only

No negative scoring. Encouragement-first approach always.

### 9.4 World Map (IntelliPlay™ Level Progression — Global Landmarks)

1. **World 1 — "Sydney Opera House Bay"** — reading single bar charts (easy)
2. **World 2 — "Cape Town Table Mountain"** — comparing bars, double bar charts
3. **World 3 — "Tokyo Neon Tower"** — scales, double bars, first chart-choice and misleading-axis questions
4. **World 4 — "Cairo Weather Station"** — reading line graphs, interpolation
5. **World 5 — "London Tower Bridge Trends"** — trends, steepest change, rate of change
6. **World 6 — "Paris Café Pie Parlour"** — pie charts as fractions and percentages
7. **World 7 — "Mumbai Spice Market"** — pie sector angles
8. **World 8 — "Rio Carnival Missing Slice"** — missing sectors, missing totals
9. **World 9 — "New York Data Wall"** — choosing and critiquing charts, mixed skills
10. **World 10 — "Reykjavik Northern Lights Finale"** — boss world, multi-step mixed hard

**Unlock gate:** ≥5/10 correct (1-star minimum) required to advance to the next world.
**3 stars in a world** unlocks a hidden "Bonus Challenge" (3 extra generated questions).
A world may be **replayed** for a fresh, newly generated set of 10 questions.

### 9.5 Mascot (Plotty — Data Explorer Companion)

- **Character:** A friendly chart-robot with a pie-chart face, bar-shaped arms and a line-graph antenna
- **Mood States:** idle | curious | happy | thinking | celebrating | encouraging
- **Appearances:** Wonder hook, Story narration, Concept Cards, Simulation feedback, Reflect phase
- **Reactions:** Correct answer, badge unlock, streak milestone, world completion
- **Audio:** All mascot speech via ElevenLabs Alice voice

---

## 10. Audio & Narration Design

Fully aligned with `audio_generation_pipeline.md`.

### 10.1 Pipeline Summary

- **Voice Provider:** ElevenLabs
- **Voice Name:** Alice (Clear, Engaging Educator)
- **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **Pre-generation:** `scripts/generate_audio.js` → static `.mp3` in `public/assets/audio/`
- **Mapping:** auto-generated `src/utils/audioMap.js` (exact text → file path)
- **Cleanup:** `scripts/clean_audio.js` removes orphaned audio files
- **Dynamic fallback (essential for this module):** because every practice question is randomly generated, question text cannot all be pre-recorded. Question narration uses the pipeline's **dynamic request path** (`/api/elevenlabs` proxy) with a persistent browser cache, plus a **"warm pool"** of pre-generated common question texts (see TRD §9.4)
- **API key handling:** the key must live on the server (proxy) in production; a `VITE_`-prefixed key is only for local development, since Vite embeds such variables in the public bundle

### 10.2 Content Policy — Paragraphs & Questions ONLY

> **IMPORTANT:** Audio is generated ONLY for paragraph/story text, concept-card paragraphs and question text. Titles, headings, world names, station names and section labels are **never** narrated.

### 10.3 Speech Styles Mapped to ElevenLabs Settings

| Style                       | Stability | Similarity Boost | Style | Speaker Boost | Use case                          |
| --------------------------- | --------- | ---------------- | ----- | ------------- | --------------------------------- |
| `celebration`               | 0.12      | 0.45             | 0.75  | ✅             | Badge unlock, world complete      |
| `encouragement`             | 0.16      | 0.50             | 0.65  | ✅             | Correct/again feedback            |
| `question`                  | 0.20      | 0.55             | 0.55  | ✅             | Practice question read-aloud      |
| `emphasis`                  | 0.16      | 0.50             | 0.60  | ✅             | Key vocabulary highlight, trickster reveal |
| `thinking`                  | 0.24      | 0.60             | 0.35  | ✅             | Wonder hook, Plotty thinking      |
| `statement` / `instruction` | 0.20      | 0.55             | 0.50  | ✅             | Story narration, concept cards, instructions |

### 10.4 Narration Script Examples

**Phase 1 (Wonder) — style: thinking**
> "Mike in New York is staring at the festival's Data Wall. Three charts are glowing, but every label has vanished."
> "One chart shows how the crowd changed through the day. Which one is it?"
> "Let's discover which chart tells which story!"

**Phase 2 (Story, Panel 3) — style: statement**
> "In Sydney, Emma counts how many students joined each activity. Football has forty, dance has twenty-five, chess has fifteen, and art has thirty."

**Phase 2 (Concept Card 4) — style: emphasis**
> "Remember, angles are not the same as percentages! Twenty-five percent of a circle is ninety degrees."

**Phase 3 (Station C) — style: instruction**
> "Work out the angle first. Then turn the radius to cut the slice!"
> "Only one sector is missing. How many degrees are left in the circle?"

**Phase 4 (Question example) — style: question**
> "Out of sixty votes, fifteen chose samosa. What is the angle of the samosa sector?"

**Phase 4 (Correct feedback) — style: celebration**
> "Amazing! You read that chart perfectly! You are a Data Explorer superstar!"

**Phase 5 (Reflect) — style: thinking**
> "What an adventure today! Can you tell me one thing you learned about bar, line, and pie charts?"

### 10.5 Strict 1:1 Parity Rule

Every on-screen narrated string in `narration.js` must match the UI text **exactly** (same words, punctuation, capitalization). For **generated** questions, the text builder produces one string that is used both for display and for narration — parity is guaranteed by construction. Any static UI text change requires updating both `generate_audio.js`'s `phrases` array and `narration.js`.

---

## 11. UX & Visual Design Requirements

### 11.1 Visual Theme

- **Brand:** Intellia — Think. Explore. Become.
- **Reference UI (strict match):** `https://grade5-time-intervals.vercel.app/` and repo `github.com/p1pachare-cloud/Grade5-Time-Intervals`
- **Rule:** the **app shell is copied, not re-designed** — Top Bar, Progress Map (6 dots), phase container, Bottom Bar (XP / stars / streak / navigation), Sidebar phase map, Intro screen, Mascot component, Feedback overlay, World Map, Badge panel, buttons, cards, shadows, spacing, animations and transitions must be visually identical to the reference. Only **domain content** (chart components, story, questions, mascot artwork, world backdrops) changes
- **Colours:** inherit the reference palette (primary brand blue, gold/yellow rewards, coral/red for wrong-answer states, white cards, soft shadows). Chart series colours come from a **colour-blind-safe categorical palette** and every sector/bar series also carries a **pattern or direct label** so meaning never depends on colour alone
- **Typography:** rounded, playful — same family as the reference (Nunito or Fredoka)
- **Illustrations:** cartoon-style, globally inclusive character designs; landmark backdrops (Sydney Opera House, Table Mountain, Tokyo Tower, Pyramids/Cairo skyline, Tower Bridge, Eiffel Tower, Gateway of India, Christ the Redeemer, Statue of Liberty, Northern Lights)

### 11.2 Layout Structure (mirrors the reference)

- **Top Bar:** Intellia logo | Lesson title "Bar, Line & Pie Charts" | 6-phase dot tracker
- **Main Area:** Phase content (fills screen, responsive, smooth phase transitions)
- **Bottom Bar:** XP counter | Star count | Streak fire | Phase navigation arrows
- **Sidebar:** Hidden on mobile; shown on tablet+ as a vertical phase map

### 11.3 Chart Components — Primary Visual System

Used throughout all phases; **all are custom inline-SVG React components** (no third-party chart library) so every element can be animated, highlighted, dragged and narrated:

- **BarChart** — single/double bars, adjustable scale, gridlines, key, drag handles, half-gridline snap, value tooltips
- **LineChart** — plotted points, joined segments, time probe, steepest-segment highlight, outlier marker
- **PieChart** — sectors with pattern fills, protractor overlay, rotating radius, live remaining-degrees counter, percentage & angle labels
- **DataTable** — synchronized with the chart (hover/tap link)
- **ChartFrame** — shared title/axis-label/legend/units wrapper (enforces "every chart has a title and units")
- Hidden-value ("?") markers use a dashed outline; charts animate (grow/draw/sweep) on first render and on update

### 11.4 Accessibility

- Large tap targets (minimum 44×44px on all interactive elements)
- WCAG AA colour contrast; **never colour-only encoding** (patterns + labels)
- All narration via ElevenLabs (premium, consistent voice); captions always visible
- Keyboard navigable (Tab + Enter/Space; arrow keys nudge bar heights, points and radius angle)
- Every chart exposes a **screen-reader data table** and an `aria-label` summary
- No mandatory time pressure; optional timer toggle in challenge mode only
- Drag interactions always have a tap/keyboard equivalent
- Respects `prefers-reduced-motion` (animations shortened, not removed, so feedback remains clear)

### 11.5 Responsive Design

- Primary: Desktop browser (1024px+) and tablet (768px+) — classroom context
- Secondary: iPad/tablet
- Tertiary: Mobile (375px+) — stacked single-column layout; charts scale via `viewBox`, tables scroll horizontally

---

## 12. Content Requirements

### 12.1 Simulation Visuals

- Bar Builder: draggable bar tops, scale selector chips, data table with highlight-link
- Trend Tracker: grid with tap-to-plot, draggable probe, segment highlight
- Pie Slicer: circle + protractor overlay + rotating radius + running total
- Chart Doctor: scenario cards, three drop buckets, tap-to-flag trickster chart

### 12.2 Question Generation Coverage

- All 10 question types × 10 = 100 unique generated question objects per session
- **Generator modules** (one per type) produce chart data, question text, options, hints and explanation from a seeded RNG
- No two sessions present the same set or order (session seed + Fisher–Yates shuffle)
- MCQ distractors always misconception-based (Section 8.5)

### 12.3 Word Problem Formats

**Read/compare sense:**
> "[Name] in [City] counted how many [items] were chosen at the festival. How many more [items A] than [items B] were chosen?"

**Pie calculation sense:**
> "Out of [total] votes, [n] chose [item]. What is the angle of the [item] sector?"

**Missing value sense:**
> "Three sectors measure [a] degrees, [b] degrees and [c] degrees. What is the angle of the fourth sector?"

**Choose-a-chart sense:**
> "[Name] wants to show [situation]. Which chart is the best choice, and why?"

### 12.4 Audio Script Parity (Strict 1:1 Rule)

Every on-screen text string that is narrated must match `narration.js` exactly — same words, same punctuation. Generated question text is built once and reused for display and audio.

---

## 13. Success Criteria (v1.0)

| Criterion                                                       | Target     |
| --------------------------------------------------------------- | ---------- |
| All 100 questions generated randomly with zero in-session duplicates | ✅ Required |
| All 4 simulation stations functional (randomized rounds)        | ✅ Required |
| All 5 Concept Cards gate progression to Simulate                | ✅ Required |
| All 6 phases navigable end-to-end                               | ✅ Required |
| Gamification (XP, stars, 10 badges) working                     | ✅ Required |
| World map 10-world progression logic correct                    | ✅ Required |
| Pie angles & percentages always whole numbers by construction   | ✅ Required |
| ElevenLabs audio plays for all static narration                 | ✅ Required |
| Dynamic question narration works with cache + warm pool         | ✅ Required |
| Mobile/tablet/desktop responsive layout                         | ✅ Required |
| Global Grade 7 syllabus coverage confirmed                      | ✅ Required |
| Loads in < 3 seconds (Vite production build)                    | ✅ Required |
| WCAG AA accessible (incl. non-colour encoding)                  | ✅ Required |
| UI shell matches grade5-time-intervals.vercel.app structure     | ✅ Required |
| Hosted correctly at the Intellia upload location                | ✅ Required |

---

## 14. Out of Scope (v1.0)

- Teacher dashboard / backend analytics
- Student login / account persistence across devices
- Multiplayer or class competition features
- Parent progress report emails
- Print worksheet generation
- Histograms, scatter plots, box plots, stem-and-leaf plots (covered in later modules)
- Mean/median/mode calculation (may appear only as incidental context, never assessed)
- Free-drawing charts with pen input (structured drag/plot interactions only)
- Assessment against the full statistics curriculum (broader test engine)

---

**Document Version:** 1.0 | September 2026
**Product:** Intellia — Grade 7 Math, Bar, Line & Pie Charts
**Lesson Title:** Global Data Explorers — Bar, Line & Pie Charts
**Curriculum:** Global Grade 7 Mathematics (Common Core, UK NC KS3, Singapore MOE, Australian Curriculum, CBSE, ICSE cross-aligned at topic level)
**Reference UI:** <https://grade5-time-intervals.vercel.app/>
**Reference Repo:** <https://github.com/p1pachare-cloud/Grade5-Time-Intervals>
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`) — per `audio_generation_pipeline.md`
**Upload Location:** <https://intelliasg.com/courses/grade-3-math>
