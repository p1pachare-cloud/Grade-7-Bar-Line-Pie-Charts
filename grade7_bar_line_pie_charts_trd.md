# Technical Requirements Document (TRD)

## Bar, Line & Pie Charts — Reading, Building & Choosing Data Displays | Grade 7 Math

### Intellia SG | Global Grade 7 Mathematics Curriculum

---

## 1. Technical Overview

This document specifies the architecture, component design, state management, data models, procedural question generation, simulation logic, gamification, audio pipeline and quality standards for **"Global Data Explorers — Bar, Line & Pie Charts"**, an interactive lesson module for Grade 7 Math.

The module is a **React 18 application (Vite + JSX)**. Its **application shell is cloned from** `https://github.com/p1pachare-cloud/Grade5-Time-Intervals` (live: `https://grade5-time-intervals.vercel.app/`) so the UI is structurally and visually identical; only the domain layer (chart components, generators, story, narration) is new.

It will be uploaded at:

```
https://intelliasg.com/courses/grade-3-math
```

Audio narration uses **ElevenLabs exclusively**, implementing the pipeline documented in `audio_generation_pipeline.md` (static pre-generation + dynamic fallback + eager preload + queue management), extended with a persistent cache and a "warm pool" because practice questions are randomly generated.

### 1.1 What is reused vs. new

| Reused from `Grade5-Time-Intervals` (do not redesign)                      | New for this module                                             |
| -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `App.jsx` shell, reducer pattern, `App.css` tokens, Tailwind/PostCSS config | `BarChart`, `LineChart`, `PieChart`, `DataTable`, `ChartFrame`   |
| `IntroScreen`, `ProgressMap`, top/bottom bar, sidebar phase map             | `ConceptCard` system (learn-first gating)                        |
| `Mascot` (re-skinned as Plotty), `FeedbackOverlay`                          | 4 simulation stations                                            |
| Gamification: `XPTracker`, `StarRating`, `BadgePanel`, `StreakCounter`, `WorldMap` | Question **generators** (10) + seeded RNG + uniqueness guard |
| `useAudio`, `audioMap`, `generate_audio.js`, `clean_audio.js`               | IndexedDB audio cache, warm-pool script, proxy hardening         |
| `useLocalStorage`, `shuffle`, `scoring`, `badgeEngine` patterns             | `chartMath.js`, `palette.js`, `datasets.js`, `misleading.js`      |

> **Implementation instruction:** start by copying the reference repository, then delete `timeMath.js`, clock components, `questionBank.js`, and time-specific narration; keep everything else and adapt. Before renaming any shell component, diff against the reference's `src/` to confirm the actual file names — this TRD uses the names documented in the reference TRD.

---

## 2. Technology Stack

| Layer            | Technology                                             | Rationale                                               |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------------- |
| UI Framework     | React 18 (JSX, Vite)                                   | Matches reference repo                                  |
| State Management | `useReducer` (global) + `useState` (local)             | Sufficient for single-module complexity                 |
| Styling          | Tailwind + CSS (`App.css`)                             | Matches reference repo (`tailwind.config.js` present)   |
| Icons            | Lucide React                                           | Consistent with reference                               |
| Animation        | CSS keyframes/transitions (+ `requestAnimationFrame` for drag) | No extra dependency; 60 fps SVG                 |
| Charts           | **Custom inline SVG React components**                 | Full control of drag, snap, highlight, patterns, a11y   |
| Randomness       | Seeded PRNG (`mulberry32`) + Fisher–Yates              | Reproducible QA sessions, unique per student            |
| Persistence      | `localStorage` (progress) + `IndexedDB` (audio blobs)  | No backend needed                                       |
| Audio            | ElevenLabs API via `/api/elevenlabs` proxy + HTML5 `Audio` | Per pipeline doc; key stays server-side in prod     |
| Build Tool       | Vite                                                   | Matches reference (`vite.config.js`)                    |
| Testing          | Vitest + React Testing Library + axe-core              | Unit, snapshot and a11y checks                          |
| Hosting          | Vercel (static build + one serverless function)        | Matches reference deployment                            |

> No charting library (Recharts, Chart.js, D3-render) is used for the pedagogical charts. Libraries hide the geometry students must learn (scale, gridlines, angles) and make custom drag/probe/protractor interactions difficult.

---

## 3. Project Structure (mirrors reference repo)

```
bar-line-pie-charts/
├── public/
│   └── assets/
│       ├── audio/                          # Pre-generated .mp3 (static + warm pool)
│       └── images/
│           ├── plotty-idle.svg  plotty-happy.svg  plotty-thinking.svg
│           ├── plotty-celebrate.svg  plotty-encourage.svg  plotty-curious.svg
│           └── backdrops/  sydney.svg capetown.svg tokyo.svg cairo.svg london.svg
│                           paris.svg mumbai.svg rio.svg newyork.svg reykjavik.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx                             # Root, useReducer global state
│   ├── App.css                             # Global styles (mirrors reference tokens)
│   ├── components/
│   │   ├── IntroScreen.jsx
│   │   ├── ProgressMap.jsx                 # 6-phase dot tracker
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx             # Phase 1: tap-the-chart hook
│   │   │   ├── StoryPhase.jsx              # Phase 2: 8 panels + 5 concept cards
│   │   │   ├── SimulatePhase.jsx           # Phase 3: 4-station wrapper
│   │   │   ├── PlayPhase.jsx               # Phase 4: IntelliPlay quiz engine
│   │   │   └── ReflectPhase.jsx            # Phase 5: journal + completion
│   │   ├── learn/
│   │   │   ├── ConceptCard.jsx             # Shell: anatomy diagram + paragraphs + micro-check
│   │   │   ├── BarConceptCard.jsx
│   │   │   ├── DoubleBarConceptCard.jsx
│   │   │   ├── LineConceptCard.jsx
│   │   │   ├── PieConceptCard.jsx
│   │   │   └── ChooseCheckConceptCard.jsx
│   │   ├── simulations/
│   │   │   ├── BarBuilderStation.jsx       # Station A
│   │   │   ├── TrendTrackerStation.jsx     # Station B
│   │   │   ├── PieSlicerStation.jsx        # Station C
│   │   │   └── ChartDoctorStation.jsx      # Station D
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx        # Dispatcher → type component
│   │   │   ├── ReadBarQ.jsx                # Q1
│   │   │   ├── CompareBarsQ.jsx            # Q2
│   │   │   ├── DoubleBarQ.jsx              # Q3
│   │   │   ├── LineReadQ.jsx               # Q4
│   │   │   ├── LineTrendQ.jsx              # Q5
│   │   │   ├── PieQuantityQ.jsx            # Q6
│   │   │   ├── PieAngleQ.jsx               # Q7
│   │   │   ├── PieMissingQ.jsx             # Q8
│   │   │   ├── ChooseChartQ.jsx            # Q9
│   │   │   ├── MisleadingQ.jsx             # Q10
│   │   │   └── HintOverlay.jsx
│   │   ├── charts/
│   │   │   ├── ChartFrame.jsx              # title, axis labels, units, legend, sr-table
│   │   │   ├── BarChart.jsx
│   │   │   ├── LineChart.jsx
│   │   │   ├── PieChart.jsx
│   │   │   ├── Protractor.jsx              # overlay + rotating radius
│   │   │   ├── DataTable.jsx               # linked highlight with charts
│   │   │   └── ChartLegend.jsx
│   │   ├── gamification/
│   │   │   ├── XPTracker.jsx  StarRating.jsx  BadgePanel.jsx
│   │   │   ├── StreakCounter.jsx  WorldMap.jsx
│   │   └── shared/
│   │       ├── Mascot.jsx                  # Plotty, mood states
│   │       ├── FeedbackOverlay.jsx
│   │       ├── DragHandle.jsx              # pointer + keyboard drag primitive
│   │       └── NumberPad.jsx               # numeric answer input
│   ├── data/
│   │   ├── storyContent.js                 # panels + concept-card copy
│   │   ├── worldPlan.js                    # world × type × difficulty matrix
│   │   ├── datasets.js                     # contexts, categories, units, name/city pools
│   │   └── misleadingFlaws.js              # flaw catalogue for Q10 / Station D
│   ├── generators/
│   │   ├── index.js                        # generateSession(seed), generateQuestion(...)
│   │   ├── q01_readBar.js  q02_compareBars.js  q03_doubleBar.js
│   │   ├── q04_lineRead.js  q05_lineTrend.js
│   │   ├── q06_pieQuantity.js  q07_pieAngle.js  q08_pieMissing.js
│   │   ├── q09_chooseChart.js  q10_misleading.js
│   │   ├── distractors.js                  # misconception-based wrong answers
│   │   └── validate.js                     # self-checking of every generated question
│   ├── hooks/
│   │   ├── useAudio.js  useGameState.js  useLocalStorage.js  useDrag.js
│   └── utils/
│       ├── prng.js                         # mulberry32 + helpers
│       ├── shuffle.js                      # seeded Fisher–Yates
│       ├── chartMath.js                    # scale, angles, sectors, interpolation
│       ├── palette.js                      # colour-blind-safe colours + patterns
│       ├── scoring.js  badgeEngine.js
│       ├── audio.js                        # narrate(), getAudioUrl(), queue mgmt
│       ├── audioMap.js                     # AUTO-GENERATED
│       ├── audioCache.js                   # IndexedDB blob cache
│       └── narration.js                    # static phase scripts (1:1 with UI)
├── scripts/
│   ├── generate_audio.js                   # static phrases → .mp3 + audioMap.js
│   ├── generate_warm_pool.js               # seeded sessions → common question audio
│   ├── clean_audio.js
│   └── verify_parity.js                    # UI text vs narration.js vs phrases[]
├── api/
│   └── elevenlabs.js                       # serverless proxy (key stays server-side)
├── tests/                                  # Vitest suites (see §16)
├── index.html  package.json  vite.config.js  tailwind.config.js  postcss.config.js
└── .gitignore                              # includes .env.local
```

---

## 4. Application State Architecture

### 4.1 Global State (`App.jsx` — `useReducer`)

```js
const initialState = {
  // Navigation
  phase: 'intro',            // 'intro'|'wonder'|'story'|'simulate'|'play'|'reflect'|'results'
  storyPanel: 0,             // 0–7 (8 panels)
  conceptCardsSeen: [false, false, false, false, false],   // learn-first gate
  currentSimStation: 0,      // 0=BarBuilder 1=TrendTracker 2=PieSlicer 3=ChartDoctor
  simStationsComplete: [false, false, false, false],
  simRound: 0,

  // Randomization
  sessionSeed: null,         // uint32, set at LOAD_QUESTIONS
  questionSet: [],           // 100 generated Question objects
  currentQuestion: 0,        // 0–99
  currentWorld: 0,           // 0–9
  worldScores: Array(10).fill(null),
  worldAttempt: Array(10).fill(0),   // replay counter → new seed per replay
  hintsUsed: 0,
  attemptCount: 0,           // attempts on current question (max 3)

  // Gamification
  xp: 0, totalStars: 0, streak: 0, maxStreak: 0,
  badges: [],
  counters: {                // badge progress
    angleFirstTry: 0,        // Q7 correct on attempt 1
    trendFirstTry: 0,        // Q4/Q5 correct on attempt 1
    trickCaught: 0,          // Q10 correct
  },
  stationDPerfect: true,

  // Session metadata
  phaseComplete: { wonder:false, story:false, simulate:false, play:false, reflect:false },
  sessionId: crypto.randomUUID(),
  personalBest: { xp: 0, stars: 0 },

  // Settings
  audioEnabled: true,
  musicEnabled: false,
  reducedMotion: false,      // initialised from prefers-reduced-motion
};
```

### 4.2 Reducer Actions

```js
const ACTIONS = {
  SET_PHASE, NEXT_STORY_PANEL, MARK_CONCEPT_CARD_SEEN,
  ADVANCE_SIM_STATION, COMPLETE_SIM_STATION, NEXT_SIM_ROUND, FLAG_STATION_D_ERROR,
  LOAD_QUESTIONS, REGENERATE_WORLD,
  ANSWER_CORRECT, ANSWER_INCORRECT, USE_HINT, NEXT_QUESTION,
  UNLOCK_BADGE, COMPLETE_PHASE,
  TOGGLE_AUDIO, TOGGLE_MUSIC,
  RESTORE_SESSION, RESET_SESSION,
};
```

### 4.3 Guard Rules (enforced in the reducer, not only in the UI)

```js
case ACTIONS.SET_PHASE: {
  const next = action.payload;
  // Learn-first gate: cannot enter SIMULATE until all 5 concept cards are seen
  if (next === 'simulate' && !state.conceptCardsSeen.every(Boolean)) return state;
  // Practice gate: cannot enter PLAY until all 4 stations are complete
  if (next === 'play' && !state.simStationsComplete.every(Boolean)) return state;
  return { ...state, phase: next };
}
```

### 4.4 Answer Logic

```js
case ACTIONS.ANSWER_CORRECT: {
  const q = state.questionSet[state.currentQuestion];
  const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
  const worldIndex = Math.floor(state.currentQuestion / 10);
  const worldScores = [...state.worldScores];
  worldScores[worldIndex] = (worldScores[worldIndex] || 0) + 1;

  const first = state.attemptCount === 0;
  const counters = { ...state.counters };
  if (first && q.type === 'pie_angle')                       counters.angleFirstTry++;
  if (first && (q.type === 'line_read' || q.type === 'line_trend')) counters.trendFirstTry++;
  if (q.type === 'misleading')                               counters.trickCaught++;

  return {
    ...state,
    xp: state.xp + xpEarned,
    streak: state.streak + 1,
    maxStreak: Math.max(state.maxStreak, state.streak + 1),
    worldScores, counters,
    totalStars: calcTotalStars(worldScores),
    hintsUsed: 0, attemptCount: 0,
  };
}
case ACTIONS.ANSWER_INCORRECT:
  return { ...state, streak: 0, attemptCount: state.attemptCount + 1 };
```

---

## 5. Chart Math Engine (`utils/chartMath.js`)

All geometry lives in one pure, unit-tested module. Components only render what this module computes.

```js
// ---------- Scales ----------
const STEPS = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000];

/** Smallest "nice" step giving between minTicks and maxTicks gridlines for a max value */
export function niceScale(maxValue, { minTicks = 4, maxTicks = 10 } = {}) {
  const step =
    STEPS.find(s => Math.ceil(maxValue / s) <= maxTicks && Math.ceil(maxValue / s) >= minTicks)
    ?? STEPS.find(s => Math.ceil(maxValue / s) <= maxTicks)
    ?? STEPS[STEPS.length - 1];
  const top = Math.ceil(maxValue / step) * step;
  return { step, top, ticks: top / step };
}

/** Value → pixel y inside the plot area (origin bottom-left, axis always starts at 0 unless a flaw is being demonstrated) */
export const valueToY = (v, top, plotH, yBase = 0) => plotH - ((v - yBase) / (top - yBase)) * plotH;
export const yToValue = (y, top, plotH, yBase = 0) => yBase + ((plotH - y) / plotH) * (top - yBase);

/** Snap a dragged value to the nearest gridline (or half-gridline when allowHalf) */
export function snapValue(v, step, allowHalf = false) {
  const unit = allowHalf ? step / 2 : step;
  return Math.round(v / unit) * unit;
}

// ---------- Pie ----------
export const angleOf = (freq, total) => (freq / total) * 360;
export const percentOf = (freq, total) => (freq / total) * 100;
export const freqFromAngle = (angle, total) => (angle / 360) * total;
export const angleFromPercent = pct => (pct / 100) * 360;

/** Totals for which every whole-number frequency yields a whole-number angle */
export const NICE_PIE_TOTALS = [20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180];

export function sectorsFromValues(values) {
  const total = values.reduce((a, b) => a + b, 0);
  let start = 0;
  return values.map(v => {
    const sweep = angleOf(v, total);
    const s = { start, end: start + sweep, sweep, value: v, percent: percentOf(v, total) };
    start += sweep;
    return s;
  });
}

/** 0° = 12 o'clock, clockwise */
export function polar(cx, cy, r, deg) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

export function sectorPath(cx, cy, r, startDeg, endDeg) {
  const sweep = Math.min(endDeg - startDeg, 359.999);     // full-circle guard
  const [x1, y1] = polar(cx, cy, r, startDeg);
  const [x2, y2] = polar(cx, cy, r, startDeg + sweep);
  const large = sweep > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
}

// ---------- Line ----------
/** Linear interpolation of y at x between plotted points (points sorted by x) */
export function interpolate(points, x) {
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = [points[i].x, points[i].y];
    const [x1, y1] = [points[i + 1].x, points[i + 1].y];
    if (x >= x0 && x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  }
  return null;
}

/** Index of the segment with the largest |Δy/Δx| (ties → earliest) */
export function steepestSegment(points) {
  let best = { i: 0, rate: -Infinity };
  for (let i = 0; i < points.length - 1; i++) {
    const rate = Math.abs((points[i + 1].y - points[i].y) / (points[i + 1].x - points[i].x));
    if (rate > best.rate + 1e-9) best = { i, rate };
  }
  return best;
}
```

**Rules enforced by tests:** every generated pie has `sum(sweeps) === 360` (±1e-9); every generated angle answer is an integer; every generated interpolation answer is representable in the on-screen precision (integer or one decimal).

---

## 6. Question Data Model

### 6.1 Question Schema

```ts
interface Question {
  id: string;                    // "Q7_w6_03"
  type: QuestionType;
  world: number;                 // 0–9
  difficulty: 1 | 2 | 3;
  seed: number;                  // sub-seed used to generate it (bug-report reproducibility)
  signature: string;             // uniqueness key, see §10.2

  // Rendering
  questionText: string;          // display AND narration string (1:1 by construction)
  visual: 'bar' | 'doubleBar' | 'line' | 'pie' | 'scenario' | 'trickster' | 'none';
  chart: ChartSpec | null;       // full data to draw (see below)
  context: { name: string; city: string; skin: string };  // festival, weather, etc.

  // Answering
  answerMode: 'mcq' | 'numeric' | 'trueFalse' | 'tapRegion';
  options?: string[];            // 4 options, shuffled, always includes correctAnswer
  correctAnswer: string | number;
  tolerance?: number;            // numeric mode only (default 0)
  unit?: string;                 // 'students', '°', '%', '°C' …

  // Support
  hint1: string;                 // after 1 wrong attempt
  hint2: string;                 // after 2 wrong attempts (drives step animation)
  explanation: string;           // after 3 fails (read aloud)
  misconceptionTags?: string[];  // for analytics/QA, e.g. ['percent_vs_angle']
}

type QuestionType =
  | 'read_bar' | 'compare_bars' | 'double_bar'
  | 'line_read' | 'line_trend'
  | 'pie_quantity' | 'pie_angle' | 'pie_missing'
  | 'choose_chart' | 'misleading';

type ChartSpec =
  | { kind: 'bar';  title: string; xLabel: string; yLabel: string; unit: string;
      categories: string[]; series: { name: string; values: number[] }[];
      scale: { step: number; top: number; yBase: number }; highlight?: number[] }
  | { kind: 'line'; title: string; xLabel: string; yLabel: string; unit: string;
      points: { x: number; xLabel: string; y: number }[];
      scale: { step: number; top: number; yBase: number }; probeX?: number }
  | { kind: 'pie';  title: string; unit: string;
      categories: string[]; values: (number | null)[]; total: number | null;
      hiddenIndex?: number; showAngles: boolean; showPercents: boolean };
```

### 6.2 Sample Generated Instances

```js
// Q7 — pie_angle (world 6, difficulty 2)
{
  id: "Q7_w6_03", type: "pie_angle", world: 6, difficulty: 2,
  questionText: "Out of sixty votes, fifteen chose samosa. What is the angle of the samosa sector?",
  visual: "pie",
  chart: { kind: 'pie', title: "Favourite festival snack", unit: "votes",
           categories: ["Samosa","Pretzel","Empanada","Falafel"],
           values: [15, 20, 10, 15], total: 60, showAngles: false, showPercents: false },
  answerMode: "mcq",
  options: ["90°", "25°", "270°", "15°"],
  correctAnswer: "90°",
  unit: "°",
  hint1: "The whole circle is 360 degrees. What fraction of the votes chose samosa?",
  hint2: "Fifteen out of sixty is one quarter. One quarter of 360 is 90.",
  explanation: "Fifteen divided by sixty is one quarter, and one quarter of 360 degrees is 90 degrees.",
  misconceptionTags: ["percent_vs_angle","inverted_ratio","complement_angle"]
}

// Q4 — line_read with interpolation (world 4, difficulty 2)
{
  id: "Q4_w4_05", type: "line_read", world: 4, difficulty: 2,
  questionText: "The temperature at 2 p.m. is 20 degrees and at 4 p.m. is 30 degrees. What was the temperature at 3 p.m.?",
  visual: "line",
  chart: { kind: 'line', title: "Outdoor stage temperature", xLabel: "Time", yLabel: "Temperature (°C)",
           unit: "°C", points: [/* 2pm=20, 4pm=30 … */], scale: { step: 5, top: 40, yBase: 0 }, probeX: 3 },
  answerMode: "mcq", options: ["20°C","25°C","30°C","15°C"], correctAnswer: "25°C",
  hint1: "3 p.m. is exactly halfway between 2 p.m. and 4 p.m.",
  hint2: "Halfway between 20 and 30 is 25.",
  explanation: "3 p.m. is halfway between the 2 p.m. and 4 p.m. readings, so the value is halfway between 20 and 30: 25 degrees."
}
```

---

## 7. Chart Components

### 7.1 `ChartFrame.jsx` (shared wrapper — enforces pedagogy rules)

Responsibilities: renders title, axis labels with units, legend (key), the plot area padding and the **screen-reader data table**. A chart **cannot render without** `title`, `unit` and axis labels unless `flaw` explicitly says to omit them (Station D / Q10 only).

```jsx
const ChartFrame = ({ spec, flaw, children }) => (
  <figure role="group" aria-labelledby={spec.id}>
    <figcaption id={spec.id}>{flaw?.type === 'missing_title' ? null : spec.title}</figcaption>
    <svg viewBox="0 0 640 400" role="img" aria-label={summarise(spec)} preserveAspectRatio="xMidYMid meet">
      {children}
    </svg>
    {spec.series?.length > 1 && <ChartLegend series={spec.series} />}
    <table className="sr-only">{/* full data table for assistive tech */}</table>
  </figure>
);
```

### 7.2 `BarChart.jsx`

```jsx
const BarChart = ({
  spec,                   // ChartSpec kind 'bar'
  mode = 'view',          // 'view' | 'build' | 'select'
  values,                 // controlled values in build mode
  onValueChange,          // (seriesIdx, catIdx, newValue) => void
  allowHalfSnap = false,
  highlight = [],         // category indices to glow
  flaw = null,            // { type:'truncated_axis', yBase:80 } for Q10/Station D
  animate = true,
}) => { /* geometry from chartMath; pattern fills from palette */ };
```

- Bars are `<rect>`s with equal width and gap; heights come from `valueToY`
- **Build mode:** each bar top has a `DragHandle` (pointer events + `ArrowUp/ArrowDown` nudge by one `step`, `Shift+Arrow` by half-step when allowed); dragging shows a live tooltip and highlights the matching `DataTable` row
- **Double bars:** series 2 uses a different **colour and pattern**; legend is always rendered
- **Flaw injection:** `flaw.type === 'truncated_axis'` sets `yBase > 0`, and the y-axis label still prints the true tick numbers (so students can *see* it starts at 80)

### 7.3 `LineChart.jsx`

```jsx
const LineChart = ({ spec, mode='view', plotted, onPlot, probeX, onProbeChange,
                     highlightSegment, flaw=null, animate=true }) => { /* … */ };
```

- **Plot mode:** clicking/tapping the grid snaps to the nearest gridline intersection and calls `onPlot(x, y)`; wrong placements (more than half a step from the target) shake and are rejected
- **Probe:** `probeX` renders a vertical guide; the readout shows the exact value when probeX equals a plotted x, otherwise the interpolated estimate labelled "estimate"
- **Trend highlight:** `highlightSegment` draws a thicker, coloured segment with an arrow
- **Draw animation:** stroke-dashoffset transition (respects reduced motion)

### 7.4 `PieChart.jsx` + `Protractor.jsx`

```jsx
const PieChart = ({ spec, mode='view', revealed, onSectorTap,
                    radiusAngle, onRadiusAngleChange, showProtractor=false,
                    flaw=null }) => { /* sectors via sectorPath(); patterns from palette */ };
```

- Sectors are `<path>`s with pattern fills, direct labels and optional angle/percent badges
- **Slicer mode:** a draggable radius (`DragHandle` using `atan2`), with **±1° keyboard nudge** and **±5° with Shift**; the protractor overlay (0–180 scale, both directions) rotates with the start edge of the sector being cut
- A live **remaining-degrees** counter (`360 − sum(placed)`) is always visible
- **Flaw injection:** `flaw.type === 'sum_not_100'` renders sectors that add to 90% or 110% with percent badges that make the error checkable

### 7.5 `DataTable.jsx`

Shares a `hoverKey` (`{seriesIdx, catIdx}`) with the chart through React context, so hovering/tapping a table cell highlights the matching bar/point/sector and vice-versa.

### 7.6 `palette.js` (colour-blind-safe + non-colour cues)

```js
// Okabe–Ito-derived categorical palette, each paired with an SVG <pattern> id
export const SERIES = [
  { color: '#0072B2', pattern: 'solid'      },
  { color: '#E69F00', pattern: 'diagonal'   },
  { color: '#009E73', pattern: 'dots'       },
  { color: '#CC79A7', pattern: 'crosshatch' },
  { color: '#56B4E9', pattern: 'horizontal' },
  { color: '#D55E00', pattern: 'vertical'   },
];
```

Every sector/bar series is rendered with **color + pattern + direct label or legend**.

---

## 8. Simulation Station Specs

All station rounds come from `generators/` with the station's own seed (`hash(sessionSeed, 'sim', station, round)`), so rounds are random but reproducible from the seed.

### 8.1 Station A — `BarBuilderStation.jsx`

```js
const [round, setRound] = useState(makeBarBuilderRound(seed, state.simRound));
// round: { table:{categories, values|series}, scaleOptions:[5,10,20], correctScale, allowHalf, isDouble, chooseScale }
const [chosenScale, setChosenScale] = useState(round.chooseScale ? null : round.correctScale);
const [barValues, setBarValues] = useState(zeroedBars(round));
```

**Flow:** (1) if `chooseScale`, pick a scale → validated by `isGoodScale(max, step)` (`4 ≤ ceil(max/step) ≤ 10`) with explanatory feedback for too-small / too-large; (2) drag bars; (3) submit → per-bar correctness.

**Completion:** every `snapValue(bar) === target` (exact equality on snapped values). Attempt 2 reveals ghost markers. Round generation rules:

| Round | Categories | Scale       | Special                                       |
| ----- | ---------- | ----------- | --------------------------------------------- |
| 1     | 4          | 5           | All on gridlines                              |
| 2     | 5          | 10          | One value at a half-gridline (`allowHalf`)     |
| 3     | 4 × 2 series | 10 or 20  | Double bar chart with key                     |
| 4     | 5          | learner-chosen from {20, 50, 100} | Max value 200–480; wrong scale explained |

### 8.2 Station B — `TrendTrackerStation.jsx`

```js
const [plotted, setPlotted] = useState([]);            // {x,y}
const [phase, setPhase] = useState('plot');             // 'plot' | 'probe' | 'trend'
const [probeX, setProbeX] = useState(null);
```

- **Plot:** accept a click only if it snaps to the *expected* next point (order enforced left → right); on completion the line draws in
- **Probe:** ask for a value at a target x; answer via `NumberPad`; check with `Math.abs(answer - interpolate(points, x)) <= tolerance` (tolerance 0 for midpoint rounds, 0.5 for quarter-way)
- **Trend:** student taps a segment; correct iff `segmentIndex === steepestSegment(points).i` (data generator guarantees a unique steepest segment — no ties)

| Round | Points | Task                                              |
| ----- | ------ | ------------------------------------------------- |
| 1     | 5      | Plot; tap the highest point                       |
| 2     | 6      | Plot; midpoint interpolation                      |
| 3     | 7 (1 outlier) | Plot; steepest segment; quarter-way estimate |

### 8.3 Station C — `PieSlicerStation.jsx`

```js
const [placed, setPlaced] = useState([]);      // [{index, angle}]
const [pendingAngle, setPendingAngle] = useState(0);
const remaining = 360 - placed.reduce((s, p) => s + p.angle, 0);
```

**Flow per sector:** (1) student types the calculated angle into `NumberPad` (formula card available); (2) rotates the radius to that angle (snap to whole degrees; tolerance ±1° for drag imprecision); (3) `PieChart` fills the sector. Rejected inputs show hint text derived from the *misconception tag* of the wrong value (e.g. "That's the percentage — remember to multiply the fraction by 360").

| Round | Task                                                   |
| ----- | ------------------------------------------------------ |
| 1     | Percent → angle, 3 sectors (25%, 50%, 25% families)     |
| 2     | Frequency + total → angle, 4 sectors (nice totals)      |
| 3     | 3 sectors given; compute the missing fourth *and* its frequency |

### 8.4 Station D — `ChartDoctorStation.jsx`

**Part 1 (Chooser):** 6 scenario cards from `scenarioBank` (each tagged `bar` | `line` | `pie`, drawn without repeats from ≥24 tagged scenarios). Drop into buckets via HTML5 drag-and-drop **and** tap-tap fallback. 5/6 correct required to proceed; wrong drops explain why (e.g. "Steps over a week change over time → line").

**Part 2 (Spot the Trick):** `misleadingFlaws.js` provides flaw injectors:

```js
export const FLAWS = {
  truncated_axis:  { apply: (spec, rng) => ({ ...spec, yBase: pickBase(spec, rng) }), label: 'The axis does not start at zero' },
  uneven_scale:    { apply: (spec)      => ({ ...spec, tickOverride: unevenTicks(spec) }), label: 'The scale intervals are uneven' },
  missing_labels:  { apply: (spec, rng) => dropOne(spec, ['title','xLabel','yLabel','unit'], rng), label: 'A label or unit is missing' },
  pie_sum_wrong:   { apply: (spec, rng) => tweakPercents(spec, rng),                              label: 'The sectors do not add up to 100%' },
  wrong_chart_type:{ apply: (spec)      => asLineForCategories(spec),                             label: 'A line graph is used for separate categories' },
};
```

Each round applies 1 or 2 flaws to a freshly generated base chart. **Tap regions** (axis, title, key, sector) are defined as SVG hit areas; success = all injected flaws identified with correct label. Any wrong flag sets `stationDPerfect = false` (Sharp Eye badge).

---

## 9. Audio Pipeline (ElevenLabs — Per `audio_generation_pipeline.md`)

### 9.1 Voice Configuration

- **Voice Name:** Alice — **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2` — **Model:** `eleven_multilingual_v2`
- **Local dev key:** `VITE_ELEVENLABS_API_KEY` in `.env.local` (read by scripts and, in dev only, by the client)
- **Production key:** `ELEVENLABS_API_KEY` (no `VITE_` prefix) as a Vercel environment variable, used only inside `api/elevenlabs.js`

> **Security note:** Vite inlines every `VITE_*` variable into the browser bundle. A key exposed that way can be extracted and abused by anyone who opens dev tools. The pipeline document allows either the `/api/elevenlabs` proxy or a direct call; for a public, embedded course page, **use the proxy in production** and keep the direct call for local development.

### 9.2 Speech Style Settings

| Style                       | Stability | Similarity Boost | Style | Speaker Boost |
| --------------------------- | --------- | ---------------- | ----- | ------------- |
| `celebration`               | 0.12      | 0.45             | 0.75  | ✅             |
| `encouragement`             | 0.16      | 0.50             | 0.65  | ✅             |
| `question`                  | 0.20      | 0.55             | 0.55  | ✅             |
| `emphasis`                  | 0.16      | 0.50             | 0.60  | ✅             |
| `thinking`                  | 0.24      | 0.60             | 0.35  | ✅             |
| `statement` / `instruction` | 0.20      | 0.55             | 0.50  | ✅             |

```js
export const STYLE_SETTINGS = {
  celebration:   { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:      { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:      { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:      { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:     { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction:   { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};
```

### 9.3 Static Pre-generation (`scripts/generate_audio.js`)

Covers everything that does **not** change between students: Wonder hook, 8 story panels, concept-card paragraphs and micro-check prompts, station instructions and feedback, generic correct/incorrect/hint lines, badge announcements, world-complete lines and Reflect prompts. Behaviour is exactly as in the pipeline doc: reads `phrases[]` (`text`, `style`), applies per-style settings, saves slugified `.mp3` files into `public/assets/audio/`, regenerates `src/utils/audioMap.js`, rate-limits at 500 ms per call.

```js
const phrases = [
  // Phase 1 — Wonder
  { text: "Mike in New York is staring at the festival's Data Wall. Three charts are glowing, but every label has vanished.", style: 'thinking' },
  { text: "One chart shows how the crowd changed through the day. Which one is it?", style: 'question' },
  { text: "Let's discover which chart tells which story!", style: 'encouragement' },

  // Phase 2 — Story panels
  { text: "John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki are the Global Data Explorers. They live in ten different countries, but they meet on video calls to solve data mysteries.", style: 'statement' },
  { text: "Tonight is the World Youth Festival. But the giant Data Wall has glitched! The bars, lines, and circles are all scrambled, and the clock is ticking.", style: 'statement' },
  { text: "In Sydney, Emma counts how many students joined each activity. Football has forty, dance has twenty-five, chess has fifteen, and art has thirty. Each activity gets its own bar. The taller the bar, the bigger the number!", style: 'statement' },
  { text: "Liam in Cape Town notices something. Two schools took part, so each activity needs two bars, one for each school. A key tells us which colour belongs to which school.", style: 'statement' },
  { text: "In Cairo, Aisha checks the temperature at the outdoor stage every two hours. When the temperature rises, her line climbs. When it falls, her line drops. A line graph shows how things change over time.", style: 'statement' },
  { text: "Sofia in Paris asks two hundred students to vote for their favourite festival snack. Together, all the votes make one whole circle. Every snack gets a slice, and the whole circle is three hundred and sixty degrees.", style: 'statement' },
  { text: "But wait! Diego in Mexico City spots a trickster chart. Its bars start at fifty instead of zero, so a tiny difference looks huge. Explorers must always check the scale before they trust a chart.", style: 'emphasis' },
  { text: "With Plotty's help, every chart on the Data Wall lights up. The festival can begin! But first, the Explorers want to see if you can fix the charts too.", style: 'statement' },

  // Concept cards (paragraphs only — titles are never narrated)
  { text: "Read across from the top of a bar to the number line. If the bar ends halfway between twenty and thirty, the value is twenty-five.", style: 'statement' },
  { text: "Remember, angles are not the same as percentages! Twenty-five percent of a circle is ninety degrees.", style: 'emphasis' },

  // Phase 3 — Station instructions
  { text: "Drag the top of each bar to the right height. Check the scale first!", style: 'instruction' },
  { text: "Tap the grid to plot each point. Then slide the probe to read a value.", style: 'instruction' },
  { text: "Work out the angle first. Then turn the radius to cut the slice!", style: 'instruction' },
  { text: "Only one sector is missing. How many degrees are left in the circle?", style: 'question' },
  { text: "Sort each story into the best chart. Then spot the trickster!", style: 'instruction' },

  // Phase 4 — Feedback
  { text: "Amazing! You read that chart perfectly! You are a Data Explorer superstar!", style: 'celebration' },
  { text: "Not quite! Let's look at the chart again.", style: 'encouragement' },
  { text: "Watch closely! Let's work it out step by step.", style: 'thinking' },

  // Phase 5 — Reflect
  { text: "What an adventure today! Can you tell me one thing you learned about bar, line, and pie charts?", style: 'thinking' },
  { text: "Lesson complete! You are a Global Data Explorer Champion!", style: 'celebration' },

  // Badges
  { text: "Badge unlocked! You are a Chart Rookie!", style: 'celebration' },
  { text: "Badge unlocked! Graph Builder! You completed all four stations!", style: 'celebration' },
  { text: "Badge unlocked! Data Champion! You scored over eighty percent!", style: 'celebration' },
];
```

### 9.4 Randomized Questions — Dynamic Path + Warm Pool

Random questions cannot all be pre-recorded. The design has three layers (fastest first):

1. **Static map hit** — `audioMap[text]` (story, feedback, and any warm-pool question text)
2. **Persistent cache hit** — IndexedDB `audioCache` keyed by `sha256(text + '|' + style)`; survives page reloads so a returning student never re-requests the same line
3. **Dynamic request** — `POST /api/elevenlabs` with `{ text, style }`; result stored in IndexedDB and in the in-memory `Map`

```js
// src/utils/audio.js (adapted from the pipeline doc's audio.js)
const memCache = new Map();

export async function getAudioUrl(text, style = 'statement') {
  if (audioMap[text]) return audioMap[text];                        // 1. static
  const key = await hash(`${text}|${style}`);
  if (memCache.has(key)) return memCache.get(key);                  // memory
  const cached = await audioCache.get(key);                         // 2. IndexedDB
  if (cached) { const url = URL.createObjectURL(cached); memCache.set(key, url); return url; }

  try {                                                             // 3. dynamic
    const res = await fetch('/api/elevenlabs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, style }),
    });
    if (!res.ok) return null;                                       // silent skip; captions remain
    const blob = await res.blob();
    await audioCache.set(key, blob);
    const url = URL.createObjectURL(blob);
    memCache.set(key, url);
    return url;
  } catch { return null; }                                          // never block UX
}
```

**Latency handling:** when a question is *generated* (not when it is shown), `PlayPhase` calls `getAudioUrl` for the next **3** questions in the background, so dynamic requests finish while the student is answering the current one. This keeps the pipeline's "eager preload" principle and hides the < 2 s API latency.

**Warm pool (`scripts/generate_warm_pool.js`):** runs `generateSession(seed)` for seeds `1…N`, collects question texts, ranks by frequency (templates with common numbers repeat often, e.g. "sixty votes / fifteen chose…"), and sends the top *K* through the same generation routine as `generate_audio.js`, appending to `audioMap.js`. `N` and `K` are CLI arguments so the team can trade repository size against ElevenLabs credits. The pool is optional: **the module works with an empty pool** (everything falls back to dynamic).

**Text normalisation for speech:** to keep 1:1 parity, question text is *written* speech-friendly by the generators — numbers appear as words or plain digits (both read correctly by `eleven_multilingual_v2`), and units are words ("degrees", "percent"), never bare symbols (`°`, `%`) in narrated strings. Chart visuals may use symbols because visuals are not narrated.

### 9.5 Proxy (`api/elevenlabs.js`)

```js
// Vercel serverless function — keeps ELEVENLABS_API_KEY off the client
import { STYLE_SETTINGS } from '../src/utils/styleSettings.js';

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const MAX_CHARS = 400;                              // longest legitimate question text is far below this

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { text, style = 'statement' } = req.body ?? {};
  if (typeof text !== 'string' || !text.trim() || text.length > MAX_CHARS) return res.status(400).end();

  const upstream = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text, model_id: 'eleven_multilingual_v2',
      voice_settings: STYLE_SETTINGS[style] ?? STYLE_SETTINGS.statement,
    }),
  });
  if (!upstream.ok) return res.status(502).end();

  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(Buffer.from(await upstream.arrayBuffer()));
}
```

**Abuse controls (required before public launch):** enforce `MAX_CHARS`, restrict `Origin`/`Referer` to the Intellia domain, and add a per-IP rate limit at the platform level. A public unauthenticated TTS endpoint is otherwise a cost-exposure risk.

### 9.6 Playback Engine (per pipeline doc)

- Segment helpers: `say()`, `ask()`, `cheer()`, `emphasize()`, `think()`, `celebrate()`, `instruct()`
- `narrate(segments)` plays sequentially with a `currentQueue` symbol to prevent overlap; `stopNarration()` halts immediately; unmount effects always call it
- While segment *i* plays, `getAudioUrl` is invoked for segment *i + 1*
- Audio failures resolve silently; on-screen text is always the source of truth

### 9.7 Narration Synchronization (1:1 Parity)

> **CRITICAL:** Every narrated on-screen string must match `narration.js` / the generator output **exactly**. Titles, headings, world names and station names are **never** narrated.

- **Static strings:** `scripts/verify_parity.js` (run in CI) extracts every string passed to `say/ask/cheer/…` in `narration.js` and every `text` in `generate_audio.js`, and fails the build on any difference
- **Generated strings:** `questionText` is the single string used for both `<p>` display and `narrate()`; a unit test asserts that `PlayPhase` never passes anything else to `narrate`

---

## 10. Procedural Question Generation & Randomization

### 10.1 Seeded PRNG (`utils/prng.js`)

```js
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const randInt  = (rng, lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));   // inclusive
export const pick     = (rng, arr)    => arr[Math.floor(rng() * arr.length)];
export const pickN    = (rng, arr, n) => shuffleSeeded(rng, arr).slice(0, n);
export const newSessionSeed = () => crypto.getRandomValues(new Uint32Array(1))[0];
export const subSeed = (seed, ...parts) => hash32(`${seed}:${parts.join(':')}`);
```

`Math.random()` is **not** used inside generators — only `newSessionSeed()` uses the crypto source, once per session. Anyone reporting a bug can share the seed and reproduce the exact questions.

### 10.2 World Plan & Session Generation

```js
// data/worldPlan.js — rows = worlds, cols = Q1…Q10 (PRD §8.2). Column sums = 10, row sums = 10.
export const TYPE_ORDER = ['read_bar','compare_bars','double_bar','line_read','line_trend',
                           'pie_quantity','pie_angle','pie_missing','choose_chart','misleading'];
export const WORLD_TYPE_COUNTS = [
  /* W1  */ [6,4,0,0,0,0,0,0,0,0],
  /* W2  */ [2,3,5,0,0,0,0,0,0,0],
  /* W3  */ [1,1,2,0,0,0,0,0,3,3],
  /* W4  */ [0,0,0,6,4,0,0,0,0,0],
  /* W5  */ [0,0,0,2,5,0,0,0,1,2],
  /* W6  */ [0,0,0,0,0,6,2,0,2,0],
  /* W7  */ [0,0,0,0,0,2,6,2,0,0],
  /* W8  */ [0,0,0,0,0,0,0,6,2,2],
  /* W9  */ [0,1,1,1,0,1,0,1,2,3],
  /* W10 */ [1,1,2,1,1,1,2,1,0,0],
];
export const WORLD_DIFFICULTY = [   // [easy, medium, hard]
  [10,0,0],[7,3,0],[4,5,1],[6,4,0],[2,6,2],[5,5,0],[2,6,2],[1,5,4],[0,5,5],[0,3,7],
];
```

```js
// generators/index.js
export function generateWorld(sessionSeed, worldIdx, replay = 0) {
  const rng = mulberry32(subSeed(sessionSeed, 'world', worldIdx, replay));
  const slots = expandSlots(WORLD_TYPE_COUNTS[worldIdx], WORLD_DIFFICULTY[worldIdx], rng); // 10 × {type, difficulty}
  const used = new Set();
  const out = [];
  for (const [i, slot] of shuffleSeeded(rng, slots).entries()) {
    let q, tries = 0;
    do {
      q = GENERATORS[slot.type]({ rng: mulberry32(subSeed(sessionSeed, worldIdx, replay, i, tries)),
                                  difficulty: slot.difficulty, world: worldIdx });
      tries++;
    } while ((used.has(q.signature) || !validate(q)) && tries < 30);
    if (tries >= 30) throw new Error(`Generator exhausted: ${slot.type} w${worldIdx}`);
    used.add(q.signature);
    out.push({ ...q, id: `${q.type}_w${worldIdx + 1}_${String(i + 1).padStart(2, '0')}` });
  }
  return orderByDifficulty(out);       // within a world: easy → hard, so difficulty ramps
}

export const generateSession = seed =>
  Array.from({ length: 10 }, (_, w) => generateWorld(seed, w)).flat();
```

- **Signature** = `type | canonical(chart data) | target` — two questions match only if the chart data *and* the ask are identical, so charts of the same shape with different numbers are allowed
- **Worlds are generated lazily** (world *n* is generated when unlocked) to keep first paint fast; `REGENERATE_WORLD` increments `worldAttempt[n]` so replays get new questions
- **Question order inside a world** ramps easy → hard; slot order is otherwise shuffled

### 10.3 Example Generator — `q07_pieAngle.js`

```js
export function genPieAngle({ rng, difficulty }) {
  const total = pick(rng, difficulty === 1 ? [20, 30, 40, 60, 90] : NICE_PIE_TOTALS);
  const n = difficulty === 3 ? 5 : difficulty === 2 ? 4 : 3;
  const values = randomComposition(rng, total, n, { min: Math.max(2, Math.round(total * 0.08)) });
  const target = randInt(rng, 0, n - 1);
  const ctx = pickContext(rng, 'pie');                  // e.g. snacks, sports, music
  const cats = pickN(rng, ctx.categories, n);
  const mode = difficulty === 3 && rng() < 0.5 ? 'freq_from_angle' : 'angle_from_freq';

  const angle = angleOf(values[target], total);         // integer by NICE_PIE_TOTALS construction
  const text = mode === 'angle_from_freq'
    ? `Out of ${words(total)} ${ctx.unitPlural}, ${words(values[target])} chose ${cats[target]}. What is the angle of the ${cats[target]} sector?`
    : `The ${cats[target]} sector of a pie chart measures ${words(angle)} degrees. The chart shows ${words(total)} ${ctx.unitPlural} altogether. How many ${ctx.unitPlural} chose ${cats[target]}?`;

  const correct = mode === 'angle_from_freq' ? angle : values[target];
  const wrong = misconceptionOptions('pie_angle', { values, total, target, angle, mode }, rng); // 3 distinct, ≠ correct
  return {
    type: 'pie_angle', difficulty, visual: 'pie', answerMode: 'mcq',
    chart: { kind: 'pie', title: ctx.title, unit: ctx.unitPlural, categories: cats, values, total,
             showAngles: false, showPercents: false },
    questionText: text,
    options: shuffleSeeded(rng, [correct, ...wrong]).map(v => fmt(v, mode)),
    correctAnswer: fmt(correct, mode),
    hint1: 'The whole circle is 360 degrees. What fraction of the total is this group?',
    hint2: mode === 'angle_from_freq'
      ? `${values[target]} out of ${total} is ${simplify(values[target], total)} of the circle. Multiply that fraction by 360.`
      : `${angle} out of 360 is ${simplify(angle, 360)} of the circle. Multiply that fraction by ${total}.`,
    explanation: buildPieExplanation({ mode, values, total, target, angle }),
    misconceptionTags: ['percent_vs_angle', 'inverted_ratio', 'complement_angle'],
    signature: `pie_angle|${total}|${values.join(',')}|${target}|${mode}`,
  };
}
```

**Distractor rules (`distractors.js`)** produce values from real errors, de-duplicated and never equal to the answer:

```js
// pie_angle wrong answers
[ Math.round(percentOf(values[target], total)),          // percent instead of angle
  360 - angle,                                            // complement
  Math.round((total / values[target]) * 10),              // inverted ratio (falls back to angle ± step if ≤ 0 or duplicate)
  angleOf(values[(target + 1) % n], total) ]              // neighbouring sector
```

If fewer than 3 distinct distractors survive the filters, the generator tops up with `angle ± k·(360/total)` until it has three.

### 10.4 Generator Contract (`validate.js`) — every question is self-checked

A generated question is accepted only if **all** hold:

1. `options` has 4 distinct entries and contains `correctAnswer` exactly once
2. Independent recomputation of the answer from `chart` (via `chartMath`) equals `correctAnswer`
3. Pie charts: `sum(values) === total` and every angle/percent shown is an integer
4. Bar charts: `scale.top ≥ max(values)` and `4 ≤ scale.top/scale.step ≤ 10` (unless the question is *about* a bad scale)
5. Line charts (Q5): the steepest segment is unique; interpolation targets fall on representable values
6. `questionText` contains no unresolved template tokens (`{`, `}`, `undefined`, `NaN`) and no bare `°`/`%` symbols
7. Character names come from the global pool; the same name never appears twice as a *different* city in one world

Failing generation retries with a new sub-seed (§10.2), so a bad draw is invisible to the student.

### 10.5 Session Persistence (24-hour resume)

```js
const SESSION_KEY = 'intellia_bar_line_pie_v1';

// On mount: restore if < 24 h old (the seed restores the exact same questions)
const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
if (saved && Date.now() - saved.timestamp < 86_400_000) dispatch({ type: ACTIONS.RESTORE_SESSION, payload: saved });

// Persist only what cannot be re-derived — questions are regenerated from sessionSeed
useEffect(() => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    phase: state.phase, storyPanel: state.storyPanel, conceptCardsSeen: state.conceptCardsSeen,
    simStationsComplete: state.simStationsComplete, currentQuestion: state.currentQuestion,
    sessionSeed: state.sessionSeed, worldAttempt: state.worldAttempt,
    xp: state.xp, streak: state.streak, maxStreak: state.maxStreak,
    badges: state.badges, counters: state.counters, worldScores: state.worldScores,
    phaseComplete: state.phaseComplete, personalBest: state.personalBest, timestamp: Date.now(),
  }));
}, [state]);
```

Wrap all storage access in `try/catch` (private-mode Safari and blocked storage must not crash the lesson; the module simply runs without resume).

---

## 11. Gamification Implementation

### 11.1 XP (`utils/scoring.js`)

```js
export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}
```

### 11.2 Stars & World Unlock

```js
export function calcStars(correct) {
  if (correct >= 9) return 3;   // ≥90%
  if (correct >= 7) return 2;   // ≥70%
  if (correct >= 5) return 1;   // ≥50% — unlock gate
  return 0;
}
export const canUnlockWorld = ws => ws !== null && ws >= 5;
export const calcTotalStars = scores => scores.reduce((s, ws) => s + (ws !== null ? calcStars(ws) : 0), 0);
```

### 11.3 Badge Engine (`utils/badgeEngine.js`)

```js
export const BADGES = [
  { id:'chart_rookie',   label:'🏅 Chart Rookie',   condition: s => s.phaseComplete.wonder && s.phaseComplete.story && s.conceptCardsSeen.every(Boolean) },
  { id:'graph_builder',  label:'🛠️ Graph Builder',  condition: s => s.simStationsComplete.every(Boolean) },
  { id:'data_champion',  label:'🥇 Data Champion',  condition: s => s.worldScores.reduce((a, w) => a + (w || 0), 0) >= 80 },
  { id:'perfect_chart',  label:'💎 Perfect Chart',  condition: s => s.worldScores.some(w => w === 10) },
  { id:'streak_star',    label:'🔥 Streak Star',    condition: s => s.maxStreak >= 10 },
  { id:'global_explorer',label:'🌍 Global Explorer',condition: s => Object.values(s.phaseComplete).every(Boolean) },
  { id:'sharp_eye',      label:'🎯 Sharp Eye',      condition: s => s.simStationsComplete[3] && s.stationDPerfect },
  { id:'angle_ace',      label:'📐 Angle Ace',      condition: s => s.counters.angleFirstTry >= 5 },
  { id:'trend_spotter',  label:'📈 Trend Spotter',  condition: s => s.counters.trendFirstTry >= 5 },
  { id:'trick_catcher',  label:'🕵️ Trick Catcher',  condition: s => s.counters.trickCaught >= 5 },
];
export const checkBadges = st => BADGES.filter(b => !st.badges.includes(b.id) && b.condition(st)).map(b => b.id);
```

Badge announcements use pre-generated `celebration` audio; badges without a recorded line show the toast silently (no dynamic TTS for badges).

---

## 12. Animation & Interaction (matches reference styling)

Reuse the reference's keyframes (`bounceIn`, `shake`, `floatUp`, `pulseGlow`, `celebrate`, `slideInUp`) unchanged. Add chart-specific ones:

```css
@keyframes barGrow    { from { transform: scaleY(0); } to { transform: scaleY(1); } }   /* transform-origin: bottom */
@keyframes lineDraw   { from { stroke-dashoffset: var(--len); } to { stroke-dashoffset: 0; } }
@keyframes sectorSweep{ from { clip-path: polygon(50% 50%, 50% 0, 50% 0); } to { clip-path: circle(75% at 50% 50%); } }
@keyframes ghostPulse { 0%,100% { opacity: .35; } 50% { opacity: .8; } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
/* Stagger: bars/points/sectors animate with delay: calc(var(--i) * 90ms) */
```

Drag interactions use Pointer Events (`pointerdown/move/up` with `setPointerCapture`) so one code path serves mouse, touch and pen; `touch-action: none` on drag handles only.

---

## 13. Component Prop Contracts

| Component            | Props                                                                                              | Returns                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `ChartFrame`         | `{ spec, flaw?, children }`                                                                        | `<figure>` with title, legend, sr-only data table     |
| `BarChart`           | `{ spec, mode?, values?, onValueChange?, allowHalfSnap?, highlight?, flaw?, animate? }`            | SVG bar/double-bar chart                              |
| `LineChart`          | `{ spec, mode?, plotted?, onPlot?, probeX?, onProbeChange?, highlightSegment?, flaw?, animate? }`  | SVG line graph                                        |
| `PieChart`           | `{ spec, mode?, revealed?, onSectorTap?, radiusAngle?, onRadiusAngleChange?, showProtractor?, flaw? }` | SVG pie with optional protractor                 |
| `DataTable`          | `{ spec, hoverKey, onHover }`                                                                      | Table linked to the chart                             |
| `ConceptCard`        | `{ card, onSeen }`                                                                                 | Card with diagram, narrated paragraphs, micro-check   |
| `NumberPad`          | `{ value, onChange, onSubmit, allowDecimal?, unit? }`                                               | Large tap-friendly numeric input (≥44×44 px keys)     |
| `Mascot`             | `{ mood: 'idle'\|'curious'\|'happy'\|'thinking'\|'celebrating'\|'encouraging' }`                    | Plotty SVG + mood animation class                     |
| `QuestionRenderer`   | `{ question, onAnswer, hints }`                                                                    | Type-specific question component                      |
| `FeedbackOverlay`    | `{ isCorrect, explanation?, xpEarned, onContinue }`                                                | Animated overlay (bounceIn / shake)                   |
| `WorldMap`           | `{ worldScores, currentWorld, onSelectWorld }`                                                     | Horizontal world list with stars and locks            |
| `BadgePanel`         | `{ badges, newBadgeId? }`                                                                          | Badge grid + unlock toast                             |

---

## 14. Performance Requirements

| Metric                              | Target                                    |
| ----------------------------------- | ----------------------------------------- |
| Initial load time                   | < 2 s (Vite production build)             |
| Time to first meaningful paint      | < 1 s                                     |
| Question generation (per world of 10) | < 30 ms on a mid-range tablet           |
| Drag interaction frame rate         | 60 fps                                    |
| Memory usage                        | < 80 MB                                   |
| Bundle size (gzipped)               | < 600 KB (no chart library)               |
| Lighthouse Performance / Accessibility | ≥ 90 / ≥ 90                            |
| Static audio TTFB                   | ~0 ms (static `.mp3`)                     |
| Dynamic audio TTFB                  | < 2 s (hidden by 3-question look-ahead)   |
| Repository audio size               | Budgeted via warm-pool `K` parameter      |

Techniques: lazy-generate worlds; `React.memo` on chart subcomponents keyed by spec signature; CSS transforms for bar/point movement instead of re-layout; audio assets requested with `preload="auto"` only for the next segment.

---

## 15. Browser & Device Support

| Environment           | Support Level |
| --------------------- | ------------- |
| Chrome 110+ (desktop) | Full          |
| Safari 15+ (iPad/Mac) | Full          |
| Firefox 110+          | Full          |
| Edge 110+             | Full          |
| Android Chrome        | Full          |
| iOS Safari 15+        | Full          |
| IE 11                 | Not supported |

Notes: iOS/Safari requires a user gesture before audio playback — the Intro screen's "Start" button unlocks audio (`audioContext.resume()` / a silent `Audio().play()`). Primary test devices: desktop Chrome (1280 px+) and a 768 px touch tablet.

---

## 16. Quality & Testing Standards

**Unit (Vitest)**
- `chartMath`: `niceScale` on 200 random maxima; `snapValue`; `sectorPath` at 0°, 90°, 180°, 270°, 359.9°; `interpolate` and `steepestSegment` (incl. tie-free guarantee)
- `prng`: identical seed ⇒ identical sequence; `subSeed` collision sanity check on 100 k combinations

**Generator property tests (the most important suite)**
- For each of the 10 generators × 3 difficulties × 2,000 random seeds: `validate(q)` passes; the answer recomputes from the chart; options are distinct; no unresolved tokens
- **Session integrity:** for 1,000 random seeds, `generateSession` yields exactly 100 questions, type counts equal 10 each, per-world counts and difficulty counts match the plan, and no two `signature`s collide
- **Randomization integrity:** across 1,000 seeds, no two sessions have an identical ordered question list
- **Pie invariants:** every generated pie has integer angles and `Σ sweep = 360`

**Component / snapshot**
- Snapshot `BarChart`, `LineChart`, `PieChart` in view/build modes and with each injected flaw
- Interaction tests: drag + keyboard nudge produce identical values; Station C rejects percent-as-angle with the tailored hint
- Reducer guard tests: cannot enter `simulate` before 5 concept cards seen; cannot enter `play` before 4 stations complete

**Accessibility**
- axe-core on all 6 phases and every chart mode; manual keyboard-only pass; screen-reader pass on one chart of each type (data table announced)
- Colour-blind simulation review (deuteranopia, protanopia, tritanopia): every series remains distinguishable by pattern/label

**Audio**
- `verify_parity.js` in CI (UI ↔ `narration.js` ↔ `generate_audio.js`)
- Manual smoke test with the API offline: lesson stays fully usable (captions only)
- Cache test: second visit plays previously-requested question audio with zero network calls

**Deployment checklist**
- `.env.local` and any real key excluded from git; production key only as a server-side env var
- Proxy rejects oversize text and foreign origins
- Build verified inside the target embed at `https://intelliasg.com/courses/grade-3-math` (iframe/embed behaviour, storage access, audio autoplay policy)

---

**Document Version:** 1.0 | September 2026
**Product:** Intellia — Grade 7 Math, Bar, Line & Pie Charts
**Reference UI:** <https://grade5-time-intervals.vercel.app/>
**Reference Repo:** <https://github.com/p1pachare-cloud/Grade5-Time-Intervals>
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`, `eleven_multilingual_v2`) — per `audio_generation_pipeline.md`
**Upload Location:** <https://intelliasg.com/courses/grade-3-math>
