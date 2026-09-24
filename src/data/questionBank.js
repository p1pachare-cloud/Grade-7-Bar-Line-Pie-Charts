import { shuffleArray } from '../utils/shuffle.js';

export const worlds = [
  {
    id: 1,
    name: 'Sydney Opera House Bay',
    landmark: 'Opera House Bay',
    country: 'Australia',
    concept: 'Reading Single Bar Charts (Scales in 5s & 10s)'
  },
  {
    id: 2,
    name: 'Cape Town Table Mountain',
    landmark: 'Table Mountain',
    country: 'South Africa',
    concept: 'Comparing Bars & Double Bar Charts'
  },
  {
    id: 3,
    name: 'Tokyo Neon Tower',
    landmark: 'Tokyo Tower',
    country: 'Japan',
    concept: 'Scales, Intervals & Chart Choices'
  },
  {
    id: 4,
    name: 'Cairo Weather Station',
    landmark: 'Giza Plateau',
    country: 'Egypt',
    concept: 'Reading Line Graphs & Interpolation'
  },
  {
    id: 5,
    name: 'London Tower Bridge Trends',
    landmark: 'Tower Bridge',
    country: 'United Kingdom',
    concept: 'Line Trends, Steepest Change & Rate of Change'
  },
  {
    id: 6,
    name: 'Paris Café Pie Parlour',
    landmark: 'Eiffel Tower',
    country: 'France',
    concept: 'Pie Charts: Fractions & Percentages of a Whole'
  },
  {
    id: 7,
    name: 'Mumbai Spice Market',
    landmark: 'Gateway of India',
    country: 'India',
    concept: 'Pie Sector Angle Calculation (Formula: (f/N)×360°)'
  },
  {
    id: 8,
    name: 'Rio Carnival Missing Slice',
    landmark: 'Sugarloaf Mountain',
    country: 'Brazil',
    concept: 'Missing Sectors, Angles & Missing Totals'
  },
  {
    id: 9,
    name: 'New York Data Wall',
    landmark: 'Empire State / Broadway',
    country: 'United States',
    concept: 'Choosing Displays & Spotting Misleading Graphs'
  },
  {
    id: 10,
    name: 'Reykjavik Northern Lights Finale',
    landmark: 'Aurora Observatory',
    country: 'Iceland',
    concept: 'Grand Finale: Multi-Step Mastery & Synthesis'
  }
];

function buildQuestion(id, worldIndex, type, questionText, visualData, correctAnswer, wrongOptions, hint1, hint2, explanation) {
  // Ensure options has 4 items and correctAnswer is included
  const allOptions = [correctAnswer, ...wrongOptions.filter(o => o !== correctAnswer).slice(0, 3)];
  // Randomly shuffle options so correctAnswer is NOT always A
  const shuffledOptions = shuffleArray(allOptions);

  return {
    id,
    worldIndex,
    type,
    questionText,
    visualData,
    options: shuffledOptions,
    correctAnswer,
    hint1,
    hint2,
    explanation
  };
}

export function createQuestionBank() {
  const bank = [];

  // ==========================================
  // World 1: Sydney Opera House Bay (Single Bar Charts)
  // ==========================================
  const w1Data = [
    { cat: 'Football', val: 40, col: '#00e5ff' },
    { cat: 'Dance', val: 25, col: '#ffc107' },
    { cat: 'Chess', val: 15, col: '#ff4081' },
    { cat: 'Art', val: 30, col: '#00e676' }
  ];

  bank.push(buildQuestion(
    'w1_q1', 0, 'read_bar',
    'According to the Sydney festival activities bar chart, how many students joined Football?',
    { chartType: 'bar', categories: w1Data, maxVal: 50, interval: 10 },
    '40 students', ['30 students', '25 students', '50 students'],
    'Find "Football" on the horizontal axis and trace up to the top of its blue bar.',
    'Read horizontally across to the vertical y-axis scale.',
    'The top of the Football bar lines up exactly with 40 on the y-axis.'
  ));

  bank.push(buildQuestion(
    'w1_q2', 0, 'read_bar',
    'The bar for Dance ends halfway between 20 and 30 on the scale. How many students joined Dance?',
    { chartType: 'bar', categories: w1Data, maxVal: 50, interval: 10 },
    '25 students', ['20 students', '30 students', '22 students'],
    'What number is exactly midway between 20 and 30?',
    '20 + (10 ÷ 2) = 25.',
    'On a scale counting in 10s, halfway between 20 and 30 represents 25.'
  ));

  bank.push(buildQuestion(
    'w1_q3', 0, 'compare_bars',
    'How many more students chose Art (30) than Chess (15)?',
    { chartType: 'bar', categories: w1Data, maxVal: 50, interval: 10 },
    '15 students', ['45 students', '10 students', '20 students'],
    '"How many more" means finding the difference by subtracting.',
    'Calculate 30 − 15.',
    '30 − 15 = 15 more students chose Art than Chess.'
  ));

  bank.push(buildQuestion(
    'w1_q4', 0, 'read_bar',
    'Which activity had exactly 15 participants according to the bar heights?',
    { chartType: 'bar', categories: w1Data, maxVal: 50, interval: 10 },
    'Chess', ['Football', 'Dance', 'Art'],
    'Look for the bar whose top reaches the 15 mark (halfway between 10 and 20).',
    'The pink bar has height 15.',
    'Chess is represented by the 15-student bar.'
  ));

  bank.push(buildQuestion(
    'w1_q5', 0, 'compare_bars',
    'What is the combined enrollment of Football (40) and Dance (25)?',
    { chartType: 'bar', categories: w1Data, maxVal: 50, interval: 10 },
    '65 students', ['55 students', '70 students', '60 students'],
    'Add the values of Football and Dance together.',
    '40 + 25 = 65.',
    '40 + 25 = 65 students.'
  ));

  bank.push(buildQuestion(
    'w1_q6', 0, 'read_bar',
    'What is the scale interval between consecutive major gridlines on this chart?',
    { chartType: 'bar', categories: w1Data, maxVal: 50, interval: 10 },
    '10 units', ['5 units', '20 units', '2 units'],
    'Look at the grid numbers: 0, 10, 20, 30, 40, 50.',
    'Each step increases by 10.',
    'The gridlines increment by 10 units each.'
  ));

  bank.push(buildQuestion(
    'w1_q7', 0, 'compare_bars',
    'Which activity was the least popular among the students surveyed?',
    { chartType: 'bar', categories: w1Data, maxVal: 50, interval: 10 },
    'Chess (15)', ['Dance (25)', 'Art (30)', 'Football (40)'],
    'The least popular activity is shown by the shortest bar.',
    'The shortest bar is Chess with height 15.',
    'Chess has the lowest enrollment at 15 students.'
  ));

  bank.push(buildQuestion(
    'w1_q8', 0, 'compare_bars',
    'What is the ratio of Football students (40) to Art students (30) in simplest form?',
    { chartType: 'bar', categories: w1Data, maxVal: 50, interval: 10 },
    '4 : 3', ['3 : 4', '40 : 3', '8 : 5'],
    'Write 40 : 30 and divide both terms by 10.',
    '40 ÷ 10 = 4, and 30 ÷ 10 = 3.',
    '40 : 30 simplifies to 4 : 3.'
  ));

  bank.push(buildQuestion(
    'w1_q9', 0, 'read_bar',
    'If 10 new students enroll in Art (currently 30), what will the new bar height be?',
    { chartType: 'bar', categories: w1Data, maxVal: 50, interval: 10 },
    '40 students', ['35 students', '45 students', '30 students'],
    'Take the current value 30 and add 10.',
    '30 + 10 = 40.',
    'The updated bar height will be 30 + 10 = 40 students.'
  ));

  bank.push(buildQuestion(
    'w1_q10', 0, 'compare_bars',
    'What is the grand total of all students across all four activities on this chart?',
    { chartType: 'bar', categories: w1Data, maxVal: 50, interval: 10 },
    '110 students', ['100 students', '120 students', '105 students'],
    'Add all bar heights: 40 + 25 + 15 + 30.',
    '40 + 25 = 65; 65 + 15 = 80; 80 + 30 = 110.',
    '40 + 25 + 15 + 30 = 110 total students.'
  ));

  // ==========================================
  // World 2: Cape Town Table Mountain (Double Bar Charts)
  // ==========================================
  const w2Double = [
    { cat: 'Athletics', valA: 45, valB: 30 },
    { cat: 'Debate', valA: 20, valB: 35 },
    { cat: 'Choir', valA: 35, valB: 50 },
    { cat: 'Robotics', valA: 50, valB: 40 }
  ];

  bank.push(buildQuestion(
    'w2_q1', 1, 'double_bar',
    'On the Cape Town double bar chart (Cyan = School A, Gold = School B), which school had more students in Debate?',
    { chartType: 'double_bar', seriesA: 'School A', seriesB: 'School B', categories: w2Double, maxVal: 60, interval: 10 },
    'School B (35 students)', ['School A (20 students)', 'Both were equal', 'Cannot tell from the chart'],
    'Look at the Debate category: compare the cyan bar (20) and gold bar (35).',
    '35 > 20, so the gold bar is taller.',
    'School B has 35 students in Debate while School A has 20.'
  ));

  bank.push(buildQuestion(
    'w2_q2', 1, 'double_bar',
    'What was the difference in student numbers between School A and School B in Choir?',
    { chartType: 'double_bar', seriesA: 'School A', seriesB: 'School B', categories: w2Double, maxVal: 60, interval: 10 },
    '15 students', ['10 students', '20 students', '5 students'],
    'School B = 50 in Choir, and School A = 35.',
    'Subtract: 50 − 35.',
    '50 − 35 = 15 students difference in Choir.'
  ));

  bank.push(buildQuestion(
    'w2_q3', 1, 'double_bar',
    'Which activity had the highest combined enrollment from both schools?',
    { chartType: 'double_bar', seriesA: 'School A', seriesB: 'School B', categories: w2Double, maxVal: 60, interval: 10 },
    'Robotics (90 students)', ['Choir (85 students)', 'Athletics (75 students)', 'Debate (55 students)'],
    'Calculate the sum of both bars for each activity.',
    'Robotics: 50 + 40 = 90; Choir: 35 + 50 = 85.',
    'Robotics has the highest combined total with 50 + 40 = 90 students.'
  ));

  bank.push(buildQuestion(
    'w2_q4', 1, 'double_bar',
    'In which activity did School A lead School B by exactly fifteen students?',
    { chartType: 'double_bar', seriesA: 'School A', seriesB: 'School B', categories: w2Double, maxVal: 60, interval: 10 },
    'Athletics (45 vs 30)', ['Debate (20 vs 35)', 'Choir (35 vs 50)', 'Robotics (50 vs 40)'],
    'School A (cyan) must be taller than School B (gold) by 15.',
    'In Athletics: 45 − 30 = 15.',
    'In Athletics, School A had 45 while School B had 30 (lead of 15).'
  ));

  bank.push(buildQuestion(
    'w2_q5', 1, 'double_bar',
    'What is the total number of students representing School A across all 4 categories?',
    { chartType: 'double_bar', seriesA: 'School A', seriesB: 'School B', categories: w2Double, maxVal: 60, interval: 10 },
    '150 students', ['140 students', '155 students', '160 students'],
    'Add the cyan bars: 45 + 20 + 35 + 50.',
    '45 + 20 = 65; 65 + 35 = 100; 100 + 50 = 150.',
    'School A has 45 + 20 + 35 + 50 = 150 students.'
  ));

  bank.push(buildQuestion(
    'w2_q6', 1, 'double_bar',
    'What is the total number of students representing School B across all 4 categories?',
    { chartType: 'double_bar', seriesA: 'School A', seriesB: 'School B', categories: w2Double, maxVal: 60, interval: 10 },
    '155 students', ['150 students', '165 students', '145 students'],
    'Add the gold bars: 30 + 35 + 50 + 40.',
    '30 + 35 = 65; 65 + 50 = 115; 115 + 40 = 155.',
    'School B has 30 + 35 + 50 + 40 = 155 students.'
  ));

  bank.push(buildQuestion(
    'w2_q7', 1, 'double_bar',
    'Which school had greater overall participation across all 4 categories?',
    { chartType: 'double_bar', seriesA: 'School A', seriesB: 'School B', categories: w2Double, maxVal: 60, interval: 10 },
    'School B by 5 students', ['School A by 5 students', 'They tied exactly', 'School B by 15 students'],
    'School B has 155 students and School A has 150.',
    '155 − 150 = 5 in favor of School B.',
    'School B had 155 vs School A with 150 (greater by 5).'
  ));

  bank.push(buildQuestion(
    'w2_q8', 1, 'double_bar',
    'What fraction of School B’s 155 total students chose Choir (50)?',
    { chartType: 'double_bar', seriesA: 'School A', seriesB: 'School B', categories: w2Double, maxVal: 60, interval: 10 },
    '10/31', ['1/3', '5/15', '2/5'],
    'Divide Choir count (50) by total (155).',
    '50 ÷ 5 = 10, and 155 ÷ 5 = 31.',
    '50/155 simplifies to 10/31.'
  ));

  bank.push(buildQuestion(
    'w2_q9', 1, 'double_bar',
    'Why is a key/legend necessary on a double bar chart?',
    { chartType: 'double_bar', seriesA: 'School A', seriesB: 'School B', categories: w2Double, maxVal: 60, interval: 10 },
    'To tell which colour bar represents which school',
    ['To show the time of the tournament', 'To calculate the average', 'To replace axis numbers'],
    'Consider what happens if colors are not explained.',
    'The legend maps each color to its corresponding data series.',
    'A key or legend identifies which series each color represents.'
  ));

  bank.push(buildQuestion(
    'w2_q10', 1, 'double_bar',
    'Which activity showed the smallest gap between the two schools?',
    { chartType: 'double_bar', seriesA: 'School A', seriesB: 'School B', categories: w2Double, maxVal: 60, interval: 10 },
    'Robotics (10 gap)', ['Athletics (15 gap)', 'Debate (15 gap)', 'Choir (15 gap)'],
    'Calculate the differences: Athletics=15, Debate=15, Choir=15, Robotics=10.',
    '50 − 40 = 10 is the smallest gap.',
    'Robotics has the narrowest difference (10 students).'
  ));

  // ==========================================
  // World 3: Tokyo Neon Tower (Scales & Chart Choices)
  // ==========================================
  bank.push(buildQuestion(
    'w3_q1', 2, 'choose_chart',
    'Yuki wants to compare visitor numbers across 4 separate observation decks in Tokyo. Which display is best?',
    { chartType: 'bar', categories: [{ cat: 'Deck A', val: 320 }, { cat: 'Deck B', val: 450 }, { cat: 'Deck C', val: 280 }, { cat: 'Deck D', val: 400 }], maxVal: 500, interval: 100 },
    'Bar Chart', ['Line Graph', 'Scatter Plot', 'Tally Chart only'],
    'Observation decks are discrete, separate categories.',
    'Bar charts best compare separate categorical groups.',
    'A bar chart is designed for discrete categorical comparisons.'
  ));

  bank.push(buildQuestion(
    'w3_q2', 2, 'misleading',
    'A Tokyo news chart comparing Deck A (490) and Deck B (500) starts its y-axis at 480. Why is this misleading?',
    { chartType: 'bar', categories: [{ cat: 'Deck A', val: 490 }, { cat: 'Deck B', val: 500 }], maxVal: 520, interval: 10 },
    'It makes a tiny 2% difference appear twice as large',
    ['It hides the names of the decks', 'It causes numbers to turn negative', 'There is nothing misleading about it'],
    'A truncated axis removes the zero baseline.',
    'Height 10 vs 20 makes one look double, despite values being 490 vs 500.',
    'Starting above zero exaggerates minor differences dramatically.'
  ));

  bank.push(buildQuestion(
    'w3_q3', 2, 'read_bar',
    'If maximum data value is 480, which vertical scale interval gives 10 clean gridlines?',
    { chartType: 'bar', categories: [{ cat: 'Peak', val: 480 }], maxVal: 500, interval: 50 },
    'Interval of 50 (up to 500)', ['Interval of 5 (up to 50)', 'Interval of 500 (1 line only)', 'Interval of 2'],
    '480 ÷ 10 = 48. Round to a clean standard step.',
    '50 × 10 = 500, which neatly encompasses 480.',
    'An interval of 50 fits 480 in 10 uniform gridlines.'
  ));

  bank.push(buildQuestion(
    'w3_q4', 2, 'choose_chart',
    'Which chart format is best to show the breakdown of energy sources powering Tokyo (totaling 100%)?',
    { chartType: 'pie', sectors: [{ name: 'Solar', pct: 30, col: '#00e5ff' }, { name: 'Wind', pct: 25, col: '#ffc107' }, { name: 'Hydro', pct: 45, col: '#00e676' }] },
    'Pie Chart', ['Line Graph', 'Double Bar Chart', 'Box Plot'],
    'Think about data that represents parts of a single whole.',
    'Pie charts represent shares of 100%.',
    'A pie chart is ideal for showing proportions of a 100% whole.'
  ));

  bank.push(buildQuestion(
    'w3_q5', 2, 'misleading',
    'A chart displays rainfall across 4 months, but the horizontal grid intervals are uneven (1 week, then 3 weeks, then 2 days). What is wrong?',
    { chartType: 'line', points: [{ time: 'Wk 1', val: 20 }, { time: 'Wk 4', val: 60 }, { time: 'Day 30', val: 25 }] },
    'Uneven time intervals distort the slope and trend',
    ['The chart should have used circles', 'Rainfall cannot be plotted on a graph', 'Months must have exactly 30 days'],
    'A line graph requires a uniform, consistent time scale.',
    'Uneven intervals falsify the rate of change.',
    'Uniform axis intervals are required to show accurate trends over time.'
  ));

  bank.push(buildQuestion(
    'w3_q6', 2, 'choose_chart',
    'Which display best tracks the temperature at Tokyo Skytree continuously every hour for 24 hours?',
    { chartType: 'line', points: [{ time: '0h', val: 15 }, { time: '6h', val: 18 }, { time: '12h', val: 26 }, { time: '18h', val: 22 }] },
    'Line Graph', ['Pie Chart', 'Bar Chart', 'Pictogram'],
    'Continuous time series data is best shown with connected points.',
    'A line graph shows rises, falls, and continuous progress.',
    'Line graphs are built for continuous change over time.'
  ));

  bank.push(buildQuestion(
    'w3_q7', 2, 'misleading',
    'A bar chart does not include axis labels or units of measurement. Why is this flawed?',
    { chartType: 'bar', categories: [{ cat: 'A', val: 50 }, { cat: 'B', val: 80 }], maxVal: 100, interval: 20 },
    'Without units, viewers cannot know what the numbers represent',
    ['Bars must always be painted green', 'Charts do not need labels if numbers are shown', 'Only the title is required'],
    'What do the numbers mean? Kilograms? Dollars? Seconds?',
    'Units specify the physical meaning of the numerical quantities.',
    'Axis labels and units are essential for mathematical clarity.'
  ));

  bank.push(buildQuestion(
    'w3_q8', 2, 'read_bar',
    'On a bar chart with interval 20, a bar reaches three and a half gridlines above zero. What is its value?',
    { chartType: 'bar', categories: [{ cat: 'Data', val: 70 }], maxVal: 100, interval: 20 },
    '70 units', ['60 units', '75 units', '65 units'],
    'Each gridline is 20. 3 full gridlines = 60.',
    'Half a gridline = 10. 60 + 10 = 70.',
    '3.5 × 20 = 70 units.'
  ));

  bank.push(buildQuestion(
    'w3_q9', 2, 'choose_chart',
    'When should you avoid using a pie chart?',
    { chartType: 'pie', sectors: [{ name: 'A', pct: 50 }, { name: 'B', pct: 50 }] },
    'When the categories are not parts of a single 100% whole',
    ['When you have percentages', 'When displaying survey results', 'When slices have different sizes'],
    'Pie charts only work when data items sum to one whole.',
    'Independent categories or non-proportional data must use bar charts.',
    'Pie charts require data to be components of a single fixed total.'
  ));

  bank.push(buildQuestion(
    'w3_q10', 2, 'misleading',
    'Why is starting a bar chart axis at zero standard scientific practice?',
    { chartType: 'bar', categories: [{ cat: 'X', val: 100 }, { cat: 'Y', val: 120 }], maxVal: 150, interval: 30 },
    'It guarantees bar heights remain proportional to their true values',
    ['It makes the bars shorter', 'It prevents negative numbers from ever existing', 'It is required only for Grade 7'],
    'Bar height should represent value accurately.',
    'A zero baseline maintains honest geometric proportions.',
    'Starting at zero prevents optical distortion of relative quantities.'
  ));

  // ==========================================
  // World 4: Cairo Weather Station (Line Graphs & Interpolation)
  // ==========================================
  const w4Line = [
    { time: '6 AM', val: 18 },
    { time: '9 AM', val: 24 },
    { time: '12 PM', val: 32 },
    { time: '3 PM', val: 36 },
    { time: '6 PM', val: 28 }
  ];

  bank.push(buildQuestion(
    'w4_q1', 3, 'line_read',
    'Aisha measures Cairo stage temperature. At what recorded hour did temperature peak at 36°C?',
    { chartType: 'line', points: w4Line, maxVal: 40, interval: 10 },
    '3 PM (36°C)', ['12 PM (32°C)', '6 PM (28°C)', '9 AM (24°C)'],
    'Look for the highest point plotted on the line curve.',
    'The highest vertex is at 3 PM.',
    'The temperature peaked at 36°C at 3 PM.'
  ));

  bank.push(buildQuestion(
    'w4_q2', 3, 'line_read',
    'Interpolation: What was the estimated temperature at 10:30 AM (halfway between 9 AM at 24°C and 12 PM at 32°C)?',
    { chartType: 'line', points: w4Line, maxVal: 40, interval: 10 },
    '28°C', ['26°C', '30°C', '24°C'],
    'Find the midpoint between 24 and 32.',
    '(24 + 32) ÷ 2 = 56 ÷ 2 = 28°C.',
    'Linear interpolation yields (24 + 32) / 2 = 28°C.'
  ));

  bank.push(buildQuestion(
    'w4_q3', 3, 'line_read',
    'Between which two observation times did temperature change from rising to falling?',
    { chartType: 'line', points: w4Line, maxVal: 40, interval: 10 },
    'Between 3 PM and 6 PM', ['Between 6 AM and 9 AM', 'Between 9 AM and 12 PM', 'It never falls'],
    'Find where the line switches direction from upward to downward.',
    'After the peak at 3 PM (36°C), it drops to 28°C at 6 PM.',
    'The slope turns negative between 3 PM and 6 PM.'
  ));

  bank.push(buildQuestion(
    'w4_q4', 3, 'line_read',
    'What was the net temperature increase between 6 AM (18°C) and 3 PM (36°C)?',
    { chartType: 'line', points: w4Line, maxVal: 40, interval: 10 },
    '18°C increase', ['14°C increase', '20°C increase', '12°C increase'],
    'Subtract: 36 − 18.',
    '36 − 18 = 18°C.',
    '36°C − 18°C = 18°C net increase.'
  ));

  bank.push(buildQuestion(
    'w4_q5', 3, 'line_read',
    'Interpolation: What is the estimated temperature at 7:30 AM (midpoint of 6 AM at 18°C and 9 AM at 24°C)?',
    { chartType: 'line', points: w4Line, maxVal: 40, interval: 10 },
    '21°C', ['20°C', '22°C', '19°C'],
    'Midpoint of 18 and 24.',
    '(18 + 24) ÷ 2 = 42 ÷ 2 = 21°C.',
    '(18 + 24) / 2 = 21°C.'
  ));

  bank.push(buildQuestion(
    'w4_q6', 3, 'line_read',
    'What was the temperature reading recorded at 12 PM noon?',
    { chartType: 'line', points: w4Line, maxVal: 40, interval: 10 },
    '32°C', ['24°C', '36°C', '28°C'],
    'Trace up from 12 PM to the plotted point.',
    'Look across to the y-axis.',
    'The reading at 12 PM is 32°C.'
  ));

  bank.push(buildQuestion(
    'w4_q7', 3, 'line_read',
    'What does the word "interpolation" mean in line graph analysis?',
    { chartType: 'line', points: w4Line, maxVal: 40, interval: 10 },
    'Estimating an unknown value between two known plotted points',
    ['Predicting values far outside the chart', 'Deleting outlier points', 'Connecting points with curved arcs'],
    'Look at the prefix "inter-" (between).',
    'Interpolation evaluates points inside the measured interval.',
    'Interpolation is estimating values between existing data points.'
  ));

  bank.push(buildQuestion(
    'w4_q8', 3, 'line_read',
    'Between 9 AM (24°C) and 12 PM (32°C), what was the average temperature rise per hour?',
    { chartType: 'line', points: w4Line, maxVal: 40, interval: 10 },
    '2.67°C per hour', ['8°C per hour', '3°C per hour', '4°C per hour'],
    'Total rise is 32 − 24 = 8°C over 3 hours.',
    '8 ÷ 3 ≈ 2.67°C/hr.',
    '(32 − 24) / 3 = 8 / 3 ≈ 2.67°C per hour.'
  ));

  bank.push(buildQuestion(
    'w4_q9', 3, 'line_read',
    'At 6 PM, the temperature dropped to 28°C. By how many degrees did it fall from the 3 PM peak (36°C)?',
    { chartType: 'line', points: w4Line, maxVal: 40, interval: 10 },
    '8°C drop', ['6°C drop', '10°C drop', '4°C drop'],
    'Subtract: 36 − 28.',
    '36 − 28 = 8°C.',
    'The temperature decreased by 8°C.'
  ));

  bank.push(buildQuestion(
    'w4_q10', 3, 'line_read',
    'Why is time always plotted on the horizontal x-axis in weather charts?',
    { chartType: 'line', points: w4Line, maxVal: 40, interval: 10 },
    'Time is the independent variable that progresses continuously',
    ['Because time cannot be measured in numbers', 'To keep the line horizontal', 'It is an arbitrary design rule'],
    'Independent variables go on the x-axis.',
    'Time moves forward continuously and independently.',
    'By standard convention, the independent variable (time) is on the x-axis.'
  ));

  // ==========================================
  // World 5: London Tower Bridge Trends (Steepest Change & Rate)
  // ==========================================
  const w5Line = [
    { time: '1 PM', val: 100 },
    { time: '2 PM', val: 150 },
    { time: '3 PM', val: 320 },
    { time: '4 PM', val: 350 },
    { time: '5 PM', val: 200 }
  ];

  bank.push(buildQuestion(
    'w5_q1', 4, 'line_trend',
    'Sarah monitors pedestrian traffic on Tower Bridge. Between which two hours was crowd growth steepest?',
    { chartType: 'line', points: w5Line, maxVal: 400, interval: 50 },
    'Between 2 PM and 3 PM (+170 people)',
    ['Between 1 PM and 2 PM (+50 people)', 'Between 3 PM and 4 PM (+30 people)', 'Between 4 PM and 5 PM (−150 people)'],
    'Steepest growth = largest positive increase in 1 hour.',
    'From 2 PM (150) to 3 PM (320), increase is 320 − 150 = +170.',
    'A jump of 170 people produced the steepest upward slope.'
  ));

  bank.push(buildQuestion(
    'w5_q2', 4, 'line_trend',
    'What was the rate of crowd change from 4 PM (350) to 5 PM (200)?',
    { chartType: 'line', points: w5Line, maxVal: 400, interval: 50 },
    'Decrease of 150 people per hour',
    ['Increase of 150 people per hour', 'Decrease of 50 people per hour', 'No change'],
    'Change = Final − Initial = 200 − 350 = −150.',
    'Negative sign indicates decrease.',
    'The crowd decreased by 150 people per hour.'
  ));

  bank.push(buildQuestion(
    'w5_q3', 4, 'line_trend',
    'At what hour was the crowd size at its absolute peak?',
    { chartType: 'line', points: w5Line, maxVal: 400, interval: 50 },
    '4 PM (350 people)', ['3 PM (320 people)', '2 PM (150 people)', '5 PM (200 people)'],
    'Find the vertex with the greatest y-value.',
    'At 4 PM, count reaches 350.',
    'The peak occurred at 4 PM with 350 people.'
  ));

  bank.push(buildQuestion(
    'w5_q4', 4, 'line_trend',
    'How does a line graph visually show a rapid increase versus a slow increase?',
    { chartType: 'line', points: w5Line, maxVal: 400, interval: 50 },
    'A rapid increase has a much steeper upward slope',
    ['A rapid increase has a thicker line', 'A rapid increase is colored red', 'A rapid increase is horizontal'],
    'Think about hill climbing: steep hill = rapid elevation gain.',
    'Steeper slope = higher rate of change (Δy / Δx).',
    'The slope (steepness) indicates the speed or rate of change.'
  ));

  bank.push(buildQuestion(
    'w5_q5', 4, 'line_trend',
    'Between 1 PM (100) and 2 PM (150), by what percentage did the crowd grow?',
    { chartType: 'line', points: w5Line, maxVal: 400, interval: 50 },
    '50% growth', ['25% growth', '100% growth', '15% growth'],
    'Growth = (150 − 100) ÷ 100.',
    '50 ÷ 100 = 50%.',
    'The crowd grew by 50% in that hour.'
  ));

  bank.push(buildQuestion(
    'w5_q6', 4, 'line_trend',
    'What was the total change in pedestrian count from 1 PM (100) to 4 PM (350)?',
    { chartType: 'line', points: w5Line, maxVal: 400, interval: 50 },
    'Net increase of 250 people', ['Net increase of 300 people', 'Net increase of 150 people', 'Net increase of 200 people'],
    'Subtract initial (100) from peak (350).',
    '350 − 100 = 250.',
    'The net increase was 250 people over 3 hours.'
  ));

  bank.push(buildQuestion(
    'w5_q7', 4, 'line_trend',
    'What was the average rate of change per hour from 1 PM to 4 PM (3 hours)?',
    { chartType: 'line', points: w5Line, maxVal: 400, interval: 50 },
    '83.3 people per hour', ['50 people per hour', '100 people per hour', '75 people per hour'],
    'Total change = 250. Elapsed time = 3 hours.',
    '250 ÷ 3 ≈ 83.33.',
    '250 / 3 ≈ 83.3 people/hour.'
  ));

  bank.push(buildQuestion(
    'w5_q8', 4, 'line_trend',
    'What does a perfectly horizontal segment on a line graph represent?',
    { chartType: 'line', points: w5Line, maxVal: 400, interval: 50 },
    'No change in value over that time period (constant)',
    ['Infinite speed', 'Value dropped to zero', 'Data was lost'],
    'If y does not go up or down, what happens?',
    'Δy = 0 means rate of change is zero.',
    'A horizontal line segment signifies that the quantity remained constant.'
  ));

  bank.push(buildQuestion(
    'w5_q9', 4, 'line_trend',
    'Between which hours did crowd traffic grow at the slowest positive rate?',
    { chartType: 'line', points: w5Line, maxVal: 400, interval: 50 },
    'Between 3 PM and 4 PM (+30 people)',
    ['Between 1 PM and 2 PM (+50 people)', 'Between 2 PM and 3 PM (+170 people)', 'Between 4 PM and 5 PM'],
    'Look for the gentlest positive slope.',
    'Increase from 3 PM to 4 PM is only 350 − 320 = 30.',
    '3 PM to 4 PM had the gentlest positive rise (+30).'
  ));

  bank.push(buildQuestion(
    'w5_q10', 4, 'line_trend',
    'If crowd size at 5 PM is 200 and continues dropping at 50 people/hour, what will it be at 6 PM?',
    { chartType: 'line', points: w5Line, maxVal: 400, interval: 50 },
    '150 people', ['100 people', '180 people', '120 people'],
    'Subtract rate (50) from current value (200).',
    '200 − 50 = 150.',
    'Extrapolating: 200 − 50 = 150 people.'
  ));

  // ==========================================
  // World 6: Paris Café Pie Parlour (Fractions & Percentages)
  // ==========================================
  const w6Pie = [
    { name: 'Crêpes', pct: 25, col: '#00e5ff' },
    { name: 'Pretzels', pct: 40, col: '#ffc107' },
    { name: 'Churros', pct: 20, col: '#ff4081' },
    { name: 'Fruit Cup', pct: 15, col: '#00e676' }
  ];

  bank.push(buildQuestion(
    'w6_q1', 5, 'pie_quantity',
    'Sofia surveyed 200 students in Paris. If 25% chose Crêpes, how many students voted for Crêpes?',
    { chartType: 'pie', sectors: w6Pie },
    '50 students', ['25 students', '75 students', '100 students'],
    '25% equals ¼ of the whole.',
    '200 ÷ 4 = 50.',
    '25% of 200 = 0.25 × 200 = 50 students.'
  ));

  bank.push(buildQuestion(
    'w6_q2', 5, 'pie_quantity',
    'If Pretzels accounted for 40% of the 200 students, how many votes did Pretzels receive?',
    { chartType: 'pie', sectors: w6Pie },
    '80 students', ['40 students', '60 students', '100 students'],
    'Calculate 40% of 200.',
    '(40 ÷ 100) × 200 = 80.',
    '40% of 200 = 80 students.'
  ));

  bank.push(buildQuestion(
    'w6_q3', 5, 'pie_quantity',
    'What fraction of the total pie in simplest form represents the 20% Churros sector?',
    { chartType: 'pie', sectors: w6Pie },
    '1/5', ['1/4', '2/5', '1/10'],
    'Write 20/100 and simplify.',
    '20 ÷ 20 = 1, and 100 ÷ 20 = 5.',
    '20% = 20/100 = 1/5.'
  ));

  bank.push(buildQuestion(
    'w6_q4', 5, 'pie_quantity',
    'How many students voted for Fruit Cup (15% of 200)?',
    { chartType: 'pie', sectors: w6Pie },
    '30 students', ['15 students', '35 students', '25 students'],
    '15% of 200 = 15 × 2.',
    '15 × 2 = 30.',
    '0.15 × 200 = 30 students.'
  ));

  bank.push(buildQuestion(
    'w6_q5', 5, 'pie_quantity',
    'What is the sum of percentages for all four sectors on this pie chart?',
    { chartType: 'pie', sectors: w6Pie },
    '100%', ['360%', '90%', '180%'],
    'Add: 25% + 40% + 20% + 15%.',
    '25 + 40 + 20 + 15 = 100%.',
    'A complete pie chart always sums to exactly 100%.'
  ));

  bank.push(buildQuestion(
    'w6_q6', 5, 'pie_quantity',
    'How many more students voted for Pretzels (80) than Crêpes (50)?',
    { chartType: 'pie', sectors: w6Pie },
    '30 students', ['20 students', '40 students', '15 students'],
    'Subtract: 80 − 50.',
    '80 − 50 = 30.',
    '80 − 50 = 30 more students.'
  ));

  bank.push(buildQuestion(
    'w6_q7', 5, 'pie_quantity',
    'If a pie chart has 3 equal sectors, what percentage does each sector represent?',
    { chartType: 'pie', sectors: [{ name: 'A', pct: 33.3 }, { name: 'B', pct: 33.3 }, { name: 'C', pct: 33.3 }] },
    '33.33% (33⅓%)', ['30%', '25%', '50%'],
    'Divide 100% by 3.',
    '100 ÷ 3 = 33.33%.',
    '100% / 3 = 33⅓%.'
  ));

  bank.push(buildQuestion(
    'w6_q8', 5, 'pie_quantity',
    'A sector represents 10% of a school of 500 students. How many students is that?',
    { chartType: 'pie', sectors: [{ name: 'A', pct: 10 }, { name: 'B', pct: 90 }] },
    '50 students', ['10 students', '100 students', '25 students'],
    '10% of 500 is 500 ÷ 10.',
    '500 ÷ 10 = 50.',
    '0.10 × 500 = 50 students.'
  ));

  bank.push(buildQuestion(
    'w6_q9', 5, 'pie_quantity',
    'In a survey of 120 people, 60 chose Coffee. What percentage of the pie is this?',
    { chartType: 'pie', sectors: [{ name: 'Coffee', pct: 50 }, { name: 'Tea', pct: 50 }] },
    '50% (half the pie)', ['60%', '25%', '120%'],
    '60 out of 120 is 1/2.',
    '½ × 100% = 50%.',
    '(60 / 120) × 100 = 50%.'
  ));

  bank.push(buildQuestion(
    'w6_q10', 5, 'pie_quantity',
    'Why can a pie chart NOT be used if categories overlap (e.g. students who play BOTH music and sports)?',
    { chartType: 'pie', sectors: w6Pie },
    'Sectors must be mutually exclusive parts of a single whole',
    ['Because circles cannot overlap', 'Percentages would become negative', 'A line graph is required for all surveys'],
    'Pie slices cannot double-count individuals.',
    'Total of overlapping sets exceeds 100%.',
    'Pie chart categories must be mutually exclusive to avoid exceeding 100%.'
  ));

  // ==========================================
  // World 7: Mumbai Spice Market (Calculating Angles)
  // ==========================================
  bank.push(buildQuestion(
    'w7_q1', 6, 'pie_angle',
    'Out of 60 spice votes in Mumbai, 15 students chose Cardamom. What is the sector angle for Cardamom?',
    { chartType: 'pie', sectors: [{ name: 'Cardamom', angle: 90, col: '#00e5ff' }, { name: 'Other', angle: 270, col: '#ffc107' }] },
    '90°', ['25°', '60°', '120°'],
    'Formula: Angle = (Frequency ÷ Total) × 360°.',
    '(15 ÷ 60) × 360° = ¼ × 360° = 90°.',
    '(15 / 60) × 360° = 90°.'
  ));

  bank.push(buildQuestion(
    'w7_q2', 6, 'pie_angle',
    'Out of 120 votes, 30 students chose Saffron. What angle on the pie chart should Saffron have?',
    { chartType: 'pie', sectors: [{ name: 'Saffron', angle: 90, col: '#ffd54f' }, { name: 'Other', angle: 270, col: '#7c5cbf' }] },
    '90°', ['30°', '45°', '120°'],
    'Calculate (30 ÷ 120) × 360°.',
    '30/120 = 1/4. 1/4 of 360° = 90°.',
    '(30 / 120) × 360° = 90°.'
  ));

  bank.push(buildQuestion(
    'w7_q3', 6, 'pie_angle',
    'A sector represents 50% of a circle. What is its angle in degrees?',
    { chartType: 'pie', sectors: [{ name: 'Half', angle: 180, col: '#00e5ff' }, { name: 'Half', angle: 180, col: '#ffc107' }] },
    '180° (straight angle)', ['90°', '50°', '360°'],
    'Half of 360°.',
    '360 ÷ 2 = 180°.',
    '50% of 360° = 180°.'
  ));

  bank.push(buildQuestion(
    'w7_q4', 6, 'pie_angle',
    'Out of 72 market visitors, 18 bought Cumin. What is the sector angle for Cumin?',
    { chartType: 'pie', sectors: [{ name: 'Cumin', angle: 90, col: '#ff7043' }, { name: 'Other', angle: 270, col: '#00e5ff' }] },
    '90°', ['72°', '18°', '120°'],
    '(18 ÷ 72) × 360°.',
    '18/72 = 1/4. ¼ of 360° = 90°.',
    '(18 / 72) × 360° = 90°.'
  ));

  bank.push(buildQuestion(
    'w7_q5', 6, 'pie_angle',
    'What is the sector angle for a category that takes up exactly 10% of a pie chart?',
    { chartType: 'pie', sectors: [{ name: '10%', angle: 36, col: '#00e676' }, { name: '90%', angle: 324, col: '#2d1b69' }] },
    '36°', ['10°', '45°', '90°'],
    '10% of 360° = 360 ÷ 10.',
    '360 ÷ 10 = 36°.',
    '0.10 × 360° = 36°.'
  ));

  bank.push(buildQuestion(
    'w7_q6', 6, 'pie_angle',
    'Common Misconception: If a slice represents 25%, is its angle 25°?',
    { chartType: 'pie', sectors: [{ name: '25%', angle: 90, col: '#00e5ff' }] },
    'No! 25% of 360° is 90°, not 25°',
    ['Yes, percentages and angles are identical', 'No, 25% is 45°', 'Yes, only for right angles'],
    'Remember: circle total is 360°, not 100°!',
    '25% of 360 = 90.',
    'Percentages are out of 100 while angles are out of 360; 25% = 90°.'
  ));

  bank.push(buildQuestion(
    'w7_q7', 6, 'pie_angle',
    'Out of 90 votes, 45 chose Turmeric. What angle represents Turmeric?',
    { chartType: 'pie', sectors: [{ name: 'Turmeric', angle: 180, col: '#ffd54f' }, { name: 'Other', angle: 180, col: '#ff4081' }] },
    '180°', ['90°', '45°', '120°'],
    '45 out of 90 is 1/2.',
    '½ of 360° = 180°.',
    '(45 / 90) × 360° = 180°.'
  ));

  bank.push(buildQuestion(
    'w7_q8', 6, 'pie_angle',
    'A sector has an angle of 120°. What fraction of the whole circle does it represent?',
    { chartType: 'pie', sectors: [{ name: '120°', angle: 120, col: '#7c5cbf' }, { name: 'Other', angle: 240, col: '#00e5ff' }] },
    '1/3 of the circle', ['1/4 of the circle', '1/2 of the circle', '2/5 of the circle'],
    'Divide 120° by 360°.',
    '120 ÷ 360 = 1/3.',
    '120° / 360° = 1/3.'
  ));

  bank.push(buildQuestion(
    'w7_q9', 6, 'pie_angle',
    'Out of 360 total votes, a category receives 40 votes. What is its angle?',
    { chartType: 'pie', sectors: [{ name: 'Cat', angle: 40, col: '#ff4081' }, { name: 'Other', angle: 320, col: '#00e5ff' }] },
    '40°', ['20°', '80°', '90°'],
    'When total is 360, each vote equals exactly 1°!',
    '(40 ÷ 360) × 360° = 40°.',
    'When total = 360, frequency directly equals degrees: 40 votes = 40°.'
  ));

  bank.push(buildQuestion(
    'w7_q10', 6, 'pie_angle',
    'If a category has a sector angle of 72°, what percentage of the whole pie is it?',
    { chartType: 'pie', sectors: [{ name: '72°', angle: 72, col: '#00e676' }] },
    '20%', ['15%', '25%', '30%'],
    'Formula: (Angle ÷ 360) × 100%.',
    '(72 ÷ 360) × 100 = 1/5 × 100 = 20%.',
    '(72 / 360) × 100% = 20%.'
  ));

  // ==========================================
  // World 8: Rio Carnival Missing Slice (Missing Sectors)
  // ==========================================
  bank.push(buildQuestion(
    'w8_q1', 7, 'pie_missing',
    'Three sectors of a Rio Carnival pie chart measure 90°, 120°, and 60°. What is the angle of the fourth sector?',
    { chartType: 'pie', sectors: [{ name: 'Samba', angle: 90, col: '#00e5ff' }, { name: 'Costumes', angle: 120, col: '#ffc107' }, { name: 'Floats', angle: 60, col: '#ff4081' }, { name: 'Music (?)', angle: 90, col: '#00e676' }] },
    '90°', ['80°', '100°', '110°'],
    'All angles in a circle sum to 360°.',
    'Sum given: 90 + 120 + 60 = 270°. 360 − 270 = 90°.',
    '360° − (90° + 120° + 60°) = 360° − 270° = 90°.'
  ));

  bank.push(buildQuestion(
    'w8_q2', 7, 'pie_missing',
    'Two sectors measure 140° and 130°. What is the measure of the third missing sector?',
    { chartType: 'pie', sectors: [{ name: 'A', angle: 140, col: '#00e5ff' }, { name: 'B', angle: 130, col: '#ffc107' }, { name: 'C (?)', angle: 90, col: '#ff4081' }] },
    '90°', ['80°', '100°', '70°'],
    'Sum given angles: 140 + 130 = 270°.',
    '360 − 270 = 90°.',
    '360° − 270° = 90°.'
  ));

  bank.push(buildQuestion(
    'w8_q3', 7, 'pie_missing',
    'A pie chart has 4 sectors: 100°, 80°, 110°, and X. What is the value of X?',
    { chartType: 'pie', sectors: [{ name: '100°', angle: 100 }, { name: '80°', angle: 80 }, { name: '110°', angle: 110 }, { name: 'X', angle: 70 }] },
    '70°', ['60°', '80°', '90°'],
    '100 + 80 + 110 = 290°.',
    '360 − 290 = 70°.',
    '360° − 290° = 70°.'
  ));

  bank.push(buildQuestion(
    'w8_q4', 7, 'pie_missing',
    'Three sectors of a pie chart represent 40%, 35%, and X%. What must X% equal?',
    { chartType: 'pie', sectors: [{ name: '40%', pct: 40 }, { name: '35%', pct: 35 }, { name: 'X%', pct: 25 }] },
    '25%', ['20%', '30%', '15%'],
    'Percentages must sum to 100%.',
    '100 − (40 + 35) = 100 − 75 = 25%.',
    '100% − 75% = 25%.'
  ));

  bank.push(buildQuestion(
    'w8_q5', 7, 'pie_missing',
    'A missing sector measures 90° on a chart representing 400 people. How many people does this missing sector represent?',
    { chartType: 'pie', sectors: [{ name: '90°', angle: 90, col: '#00e5ff' }] },
    '100 people', ['90 people', '120 people', '80 people'],
    '90° is ¼ of 360°.',
    '¼ of 400 = 100.',
    '(90 / 360) × 400 = 100 people.'
  ));

  bank.push(buildQuestion(
    'w8_q6', 7, 'pie_missing',
    'If 3 sectors each measure 80°, what is the angle of the fourth sector?',
    { chartType: 'pie', sectors: [{ name: '80°', angle: 80 }, { name: '80°', angle: 80 }, { name: '80°', angle: 80 }, { name: 'X', angle: 120 }] },
    '120°', ['100°', '110°', '90°'],
    '3 × 80 = 240°.',
    '360 − 240 = 120°.',
    '360° − 240° = 120°.'
  ));

  bank.push(buildQuestion(
    'w8_q7', 7, 'pie_missing',
    'A sector represents 180° and another represents 90°. What is the angle of the remaining piece?',
    { chartType: 'pie', sectors: [{ name: '180°', angle: 180 }, { name: '90°', angle: 90 }, { name: '90°', angle: 90 }] },
    '90° (a right angle)', ['45°', '60°', '180°'],
    '180 + 90 = 270°.',
    '360 − 270 = 90°.',
    '360° − 270° = 90°.'
  ));

  bank.push(buildQuestion(
    'w8_q8', 7, 'pie_missing',
    'Can a valid pie chart have two sectors that measure 200° and 180°?',
    { chartType: 'pie', sectors: [{ name: 'A', angle: 200 }, { name: 'B', angle: 180 }] },
    'No, because 200° + 180° = 380°, which exceeds 360°',
    ['Yes, circles can expand beyond 360°', 'Yes, if one sector is negative', 'No, only because 200 is an even number'],
    'Add the angles together.',
    '380° > 360°.',
    'A Euclidean circle contains exactly 360°; 380° is impossible.'
  ));

  bank.push(buildQuestion(
    'w8_q9', 7, 'pie_missing',
    'A pie chart has sectors measuring 150°, 120°, and 90°. Is there room for any other sector?',
    { chartType: 'pie', sectors: [{ name: '150°', angle: 150 }, { name: '120°', angle: 120 }, { name: '90°', angle: 90 }] },
    'No, because 150° + 120° + 90° = 360° (circle is completely full)',
    ['Yes, there is room for a 10° slice', 'Yes, there is room for a 30° slice', 'No, only because three is the maximum number of slices'],
    '150 + 120 + 90 = 360°.',
    '360° − 360° = 0°.',
    'The existing sectors sum to 360°, leaving 0° remaining.'
  ));

  bank.push(buildQuestion(
    'w8_q10', 7, 'pie_missing',
    'If half a pie chart is divided equally into 3 slices, what angle is each slice?',
    { chartType: 'pie', sectors: [{ name: 'S1', angle: 60 }, { name: 'S2', angle: 60 }, { name: 'S3', angle: 60 }] },
    '60° each', ['45° each', '30° each', '90° each'],
    'Half the pie = 180°.',
    '180° ÷ 3 = 60°.',
    '180° / 3 = 60° per slice.'
  ));

  // ==========================================
  // World 9: New York Data Wall (Mixed Critiques & Choosing)
  // ==========================================
  bank.push(buildQuestion(
    'w9_q1', 8, 'choose_chart',
    'Mike wants to display how many hours each day he spent studying across 7 consecutive days. Which chart is most suitable?',
    { chartType: 'line', points: [{ time: 'Mon', val: 2 }, { time: 'Tue', val: 3 }, { time: 'Wed', val: 4 }, { time: 'Thu', val: 2 }, { time: 'Fri', val: 5 }] },
    'Line Graph', ['Pie Chart', 'Venn Diagram', 'Pictogram with 1 symbol'],
    'Progress across consecutive days represents change over time.',
    'Line graphs connect time points seamlessly.',
    'Continuous progress across days over time is best represented by a Line Graph.'
  ));

  bank.push(buildQuestion(
    'w9_q2', 8, 'misleading',
    'A New York newspaper pie chart shows sectors of 40%, 35%, and 35%. Why is this invalid?',
    { chartType: 'pie', sectors: [{ name: 'A', pct: 40, col: '#00e5ff' }, { name: 'B', pct: 35, col: '#ffc107' }, { name: 'C', pct: 35, col: '#ff4081' }] },
    'The percentages sum to 110%, but a whole pie must equal exactly 100%',
    ['Percentages must be odd numbers', 'The slices have different colours', 'Nothing is wrong with it'],
    'Add the percentages: 40 + 35 + 35.',
    '40 + 35 + 35 = 110% (exceeds 100%).',
    'A pie chart represents parts of a single whole; its sectors must sum to exactly 100%.'
  ));

  bank.push(buildQuestion(
    'w9_q3', 8, 'choose_chart',
    'Which chart is best to compare the budget allocations of 5 different school clubs?',
    { chartType: 'bar', categories: [{ cat: 'Chess', val: 200 }, { cat: 'Art', val: 350 }, { cat: 'Sports', val: 500 }, { cat: 'Music', val: 400 }, { cat: 'Drama', val: 300 }], maxVal: 600, interval: 100 },
    'Bar Chart', ['Line Graph', 'Scatter Plot', 'Tally Chart only'],
    'Budget allocations of separate clubs = separate categories.',
    'Bar charts best compare separate categorical groups.',
    'Bar charts are best suited to compare discrete categories.'
  ));

  bank.push(buildQuestion(
    'w9_q4', 8, 'misleading',
    'A bar chart uses 3D cylinders instead of flat rectangles. Why can 3D bars mislead viewers?',
    { chartType: 'bar', categories: [{ cat: 'A', val: 30 }, { cat: 'B', val: 60 }], maxVal: 80, interval: 20 },
    'The 3D volume perspective makes taller bars look disproportionately gigantic',
    ['Cylinders cannot have colors', '3D shapes cannot be printed', 'Computers cannot render cylinders correctly'],
    'Think about height versus volume.',
    'Doubling height in 3D multiplies visual volume by up to 8x.',
    '3D perspective distorts perception of height.'
  ));

  bank.push(buildQuestion(
    'w9_q5', 8, 'choose_chart',
    'Carlos wants to compare the attendance of boys and girls across 5 different sports. Which display is best?',
    { chartType: 'double_bar', seriesA: 'Boys', seriesB: 'Girls', categories: [{ cat: 'Soccer', valA: 40, valB: 35 }, { cat: 'Tennis', valA: 20, valB: 25 }] },
    'Double Bar Chart with a key', ['Single Pie Chart', 'Line Graph', 'Tally Chart only'],
    'Two groups (boys and girls) across multiple categories.',
    'Double bar charts place two series side-by-side.',
    'A double bar chart with a legend is designed for this exact two-group comparison.'
  ));

  bank.push(buildQuestion(
    'w9_q6', 8, 'misleading',
    'A line graph shows stock prices, but the vertical axis numbers are: 0, 5, 20, 25, 100. What is wrong?',
    { chartType: 'line', points: [{ time: '1', val: 5 }, { time: '2', val: 20 }, { time: '3', val: 100 }] },
    'The y-axis scale has uneven, inconsistent intervals',
    ['The line is not smooth enough', 'Stock prices must always rise', 'The dots are too large'],
    'Look at the spacing: 5 to 20 is 15, while 25 to 100 is 75!',
    'Unequal intervals falsify the rate of change.',
    'Scale intervals must be equal and consistent throughout the axis.'
  ));

  bank.push(buildQuestion(
    'w9_q7', 8, 'choose_chart',
    'Which display is best to show the percentage of Earth’s surface covered by land vs water?',
    { chartType: 'pie', sectors: [{ name: 'Water', pct: 71, col: '#00e5ff' }, { name: 'Land', pct: 29, col: '#00e676' }] },
    'Pie Chart (29% Land, 71% Water)', ['Line Graph over 24 hours', 'Double Bar Chart', 'Histogram'],
    'Land and water form two complementary parts of one 100% surface.',
    'Parts of a single whole = Pie chart.',
    'A pie chart perfectly illustrates complementary portions of a whole.'
  ));

  bank.push(buildQuestion(
    'w9_q8', 8, 'misleading',
    'A graph title says "Massive Decline in Festival Attendance", but attendance dropped from 1,000 to 995. What is this?',
    { chartType: 'bar', categories: [{ cat: 'Last Year', val: 1000 }, { cat: 'This Year', val: 995 }] },
    'Misleading sensationalized title with a truncated axis',
    ['Accurate mathematical reporting', 'A pie chart error', 'An interpolation error'],
    'A drop of 5 out of 1000 is only 0.5%!',
    'Exaggerating 0.5% as "massive" misleads readers.',
    'Sensationalized labels coupled with truncated scales distort genuine findings.'
  ));

  bank.push(buildQuestion(
    'w9_q9', 8, 'choose_chart',
    'You want to track your heart rate continuously every minute during a 30-minute run. Which chart should you use?',
    { chartType: 'line', points: [{ time: '0m', val: 70 }, { time: '15m', val: 145 }, { time: '30m', val: 160 }] },
    'Line Graph', ['Pie Chart', 'Bar Chart', 'Venn Diagram'],
    'Continuous physical measurement over time.',
    'Connecting points reveals cardiovascular trends and peaks.',
    'Continuous biometric monitoring over time is best represented by a Line Graph.'
  ));

  bank.push(buildQuestion(
    'w9_q10', 8, 'misleading',
    'What is the very first thing a skilled Data Explorer checks before interpreting any bar chart?',
    { chartType: 'bar', categories: [{ cat: 'Check', val: 50 }] },
    'Check if the vertical axis begins at zero and has uniform intervals',
    ['Check what color the bars are', 'Count how many letters are in the title', 'Check if there is a 3D effect'],
    'Remember Diego’s lesson in Panel 7.',
    'Always verify the scale and zero baseline before trusting bar heights.',
    'Checking the axis baseline and scale intervals ensures the visual proportions are honest.'
  ));

  // ==========================================
  // World 10: Reykjavik Northern Lights Finale (Grand Finale Boss)
  // ==========================================
  bank.push(buildQuestion(
    'w10_q1', 9, 'pie_angle',
    'Reykjavik Finale 1: A survey of 360 students reveals 72 chose Aurora Watching. What angle on a circle graph does this represent?',
    { chartType: 'pie', sectors: [{ name: 'Aurora', angle: 72, col: '#00e5ff' }, { name: 'Other', angle: 288, col: '#7c5cbf' }] },
    '72°', ['20°', '36°', '144°'],
    'Notice total is 360! When total = 360, frequency equals angle directly!',
    '(72 ÷ 360) × 360° = 72°.',
    'Since total = 360, each student corresponds to 1°, so 72 students = 72°.'
  ));

  bank.push(buildQuestion(
    'w10_q2', 9, 'line_trend',
    'Reykjavik Finale 2: What geometric feature of a line graph determines whether change was fast or slow?',
    { chartType: 'line', points: [{ time: '1', val: 10 }, { time: '2', val: 30 }, { time: '3', val: 35 }] },
    'The steepness (slope) of the line segment',
    ['The color of the plotted dots', 'The width of the horizontal axis', 'The size of the title'],
    'How do you tell if a climb was rapid?',
    'Steeper slope = higher rate of change (Δy / Δx).',
    'The slope (steepness) indicates rate of change.'
  ));

  bank.push(buildQuestion(
    'w10_q3', 9, 'double_bar',
    'Reykjavik Finale 3: In a double bar chart, School A has 60 and School B has 90. What percentage more did School B achieve over School A?',
    { chartType: 'double_bar', seriesA: 'School A', seriesB: 'School B', categories: [{ cat: 'Score', valA: 60, valB: 90 }] },
    '50% more', ['30% more', '33.3% more', '100% more'],
    'Difference is 90 − 60 = 30.',
    '30 ÷ 60 = 0.5 = 50%.',
    '30 / 60 = 50% increase.'
  ));

  bank.push(buildQuestion(
    'w10_q4', 9, 'pie_missing',
    'Reykjavik Finale 4: A pie chart has 5 sectors: 90°, 90°, 60°, 45°, and X. What is the measure of sector X?',
    { chartType: 'pie', sectors: [{ name: 'A', angle: 90 }, { name: 'B', angle: 90 }, { name: 'C', angle: 60 }, { name: 'D', angle: 45 }, { name: 'X', angle: 75 }] },
    '75°', ['65°', '85°', '70°'],
    'Sum given: 90 + 90 + 60 + 45 = 285°.',
    '360 − 285 = 75°.',
    '360° − 285° = 75°.'
  ));

  bank.push(buildQuestion(
    'w10_q5', 9, 'read_bar',
    'Reykjavik Finale 5: On a scale counting in 25s, a bar reaches 3 full gridlines plus halfway to the next gridline. What is its value?',
    { chartType: 'bar', categories: [{ cat: 'Data', val: 87.5 }], maxVal: 100, interval: 25 },
    '87.5 units', ['85 units', '90 units', '75 units'],
    '3 gridlines = 3 × 25 = 75.',
    'Half a gridline = 12.5. 75 + 12.5 = 87.5.',
    '75 + 12.5 = 87.5 units.'
  ));

  bank.push(buildQuestion(
    'w10_q6', 9, 'line_read',
    'Reykjavik Finale 6: Linear interpolation between (2h, 40km) and (4h, 70km) gives what distance at 3h?',
    { chartType: 'line', points: [{ time: '2h', val: 40 }, { time: '4h', val: 70 }] },
    '55 km', ['50 km', '60 km', '65 km'],
    'Find midpoint between 40 and 70.',
    '(40 + 70) ÷ 2 = 110 ÷ 2 = 55 km.',
    '(40 + 70) / 2 = 55 km.'
  ));

  bank.push(buildQuestion(
    'w10_q7', 9, 'pie_angle',
    'Reykjavik Finale 7: What angle represents a category chosen by 45 out of 180 students?',
    { chartType: 'pie', sectors: [{ name: '45/180', angle: 90 }] },
    '90°', ['45°', '60°', '120°'],
    '45 ÷ 180 = 1/4.',
    '1/4 of 360° = 90°.',
    '(45 / 180) × 360° = 90°.'
  ));

  bank.push(buildQuestion(
    'w10_q8', 9, 'misleading',
    'Reykjavik Finale 8: Why is a line graph inappropriate for displaying favorite ice cream flavors (Chocolate, Vanilla, Berry)?',
    { chartType: 'bar', categories: [{ cat: 'Choc', val: 50 }, { cat: 'Van', val: 40 }, { cat: 'Berry', val: 30 }] },
    'Ice cream flavors are discrete categories with no meaningful continuous sequence between them',
    ['Because ice cream melts', 'Because line graphs can only show money', 'Because lines cannot be colored'],
    'Can you have a value halfway between Chocolate and Vanilla on a continuum?',
    'No! There is no intermediate continuum between flavors.',
    'Line graphs imply continuity between adjacent points, which does not exist for discrete qualitative categories.'
  ));

  bank.push(buildQuestion(
    'w10_q9', 9, 'choose_chart',
    'Reykjavik Finale 9: You need to compare monthly rainfall in 3 different cities over a full 12-month year. What is the most effective display?',
    { chartType: 'line', points: [{ time: 'Jan', val: 50 }, { time: 'Jun', val: 90 }, { time: 'Dec', val: 60 }] },
    'Multiple Line Graph (3 lines with a key)',
    ['Single Pie Chart', 'Single Bar Chart with 3 bars', 'Tally Chart only'],
    'Continuous time (months) across multiple series (cities).',
    'A multi-line graph compares several time series simultaneously.',
    'A multiple line graph with a legend allows side-by-side trend comparisons over time.'
  ));

  bank.push(buildQuestion(
    'w10_q10', 9, 'pie_missing',
    'Reykjavik Grand Finale: In a school of 720 students, the Pie Slicer gives angles: 180°, 90°, 45°, and 45°. How many students chose the 180° category?',
    { chartType: 'pie', sectors: [{ name: '180°', angle: 180 }, { name: '90°', angle: 90 }, { name: '45°', angle: 45 }, { name: '45°', angle: 45 }] },
    '360 students (half the school)',
    ['180 students', '720 students', '90 students'],
    '180° is exactly half of 360°.',
    'Half of 720 students = 360.',
    '(180 / 360) × 720 = 360 students.'
  ));

  return bank;
}

export const questionBank = createQuestionBank();
