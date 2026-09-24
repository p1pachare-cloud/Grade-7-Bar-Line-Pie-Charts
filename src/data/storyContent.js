export const STORY_PANELS = [
  {
    id: 1,
    title: 'The Global Data Explorers',
    location: 'Global Video Call — 10 Cities',
    character: 'Plotty & The Club',
    text: 'John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki are the Global Data Explorers. They live in ten different countries, but they meet on video calls to solve data mysteries.',
    hasConceptCard: false
  },
  {
    id: 2,
    title: 'The Glitched Data Wall',
    location: 'New York Festival HQ',
    character: 'Mike & Plotty',
    text: 'Tonight is the World Youth Festival. But the giant Data Wall has glitched! The bars, lines, and circles are all scrambled, and the clock is ticking.',
    hasConceptCard: false
  },
  {
    id: 3,
    title: 'Emma Reads the Activities',
    location: 'Sydney, Australia',
    character: 'Emma',
    text: 'In Sydney, Emma counts how many students joined each activity. Football has forty, dance has twenty-five, chess has fifteen, and art has thirty. Each activity gets its own bar. The taller the bar, the bigger the number!',
    hasConceptCard: true,
    conceptCardId: 'bar_charts'
  },
  {
    id: 4,
    title: 'Liam Compares Two Schools',
    location: 'Cape Town, South Africa',
    character: 'Liam',
    text: 'Liam in Cape Town notices something. Two schools took part, so each activity needs two bars, one for each school. A key tells us which colour belongs to which school.',
    hasConceptCard: true,
    conceptCardId: 'double_bars'
  },
  {
    id: 5,
    title: 'Aisha Tracks Outdoor Temperature',
    location: 'Cairo, Egypt',
    character: 'Aisha',
    text: 'In Cairo, Aisha checks the temperature at the outdoor stage every two hours. When the temperature rises, her line climbs. When it falls, her line drops. A line graph shows how things change over time.',
    hasConceptCard: true,
    conceptCardId: 'line_graphs'
  },
  {
    id: 6,
    title: 'Sofia Slices the Snack Votes',
    location: 'Paris, France',
    character: 'Sofia',
    text: 'Sofia in Paris asks two hundred students to vote for their favourite festival snack. Together, all the votes make one whole circle. Every snack gets a slice, and the whole circle is three hundred and sixty degrees.',
    hasConceptCard: true,
    conceptCardId: 'pie_charts'
  },
  {
    id: 7,
    title: 'Diego Spots the Trickster Scale',
    location: 'Mexico City, Mexico',
    character: 'Diego',
    text: 'But wait! Diego in Mexico City spots a trickster chart. Its bars start at fifty instead of zero, so a tiny difference looks huge. Explorers must always check the scale before they trust a chart.',
    hasConceptCard: true,
    conceptCardId: 'misleading_charts'
  },
  {
    id: 8,
    title: 'The Data Wall Restored!',
    location: 'World Youth Festival Stage',
    character: 'Plotty & Global Team',
    text: "With Plotty's help, every chart on the Data Wall lights up. The festival can begin! But first, the Explorers want to see if you can fix the charts too.",
    hasConceptCard: false
  }
];

export const CONCEPT_CARDS = {
  bar_charts: {
    id: 'bar_charts',
    title: 'Concept Card 1 — Bar Charts',
    keyIdea: 'Bar charts compare separate categories. The taller the bar, the larger the quantity.',
    rules: [
      'Bars have equal widths and equal spacing between them.',
      'Always read straight across from the top of the bar to the vertical y-axis.',
      'If a bar lands halfway between gridlines 20 and 30, its value is 25!'
    ],
    microCheck: {
      question: 'Emma finds Football has 40 students and Art has 30 students. Which bar must be taller?',
      options: ['Football Bar', 'Art Bar', 'Both are equal height'],
      correctAnswer: 'Football Bar',
      explanation: 'Football has 40 vs Art with 30. Higher value = taller bar!'
    }
  },
  double_bars: {
    id: 'double_bars',
    title: 'Concept Card 2 — Double Bar Charts & Scales',
    keyIdea: 'Double bar charts place two series side-by-side to compare two groups across categories.',
    rules: [
      'A legend or key defines which colour corresponds to which group.',
      'Choose a scale interval (e.g. 5, 10, 20) so the tallest bar fits neatly in 5 to 10 gridlines.',
      'Keep scale intervals constant all the way up the axis!'
    ],
    microCheck: {
      question: 'When comparing two schools on a double bar chart, what element explains which colour represents School A?',
      options: ['The Legend / Key', 'The Category Label', 'The Title'],
      correctAnswer: 'The Legend / Key',
      explanation: 'The legend (or key) maps colours to series so viewers know which bar represents School A.'
    }
  },
  line_graphs: {
    id: 'line_graphs',
    title: 'Concept Card 3 — Line Graphs & Trends',
    keyIdea: 'Line graphs connect plotted points over continuous time to display trends, peaks, and troughs.',
    rules: [
      'Time is plotted on the horizontal x-axis, and quantity on the vertical y-axis.',
      'A steeper upward line means a faster rate of increase.',
      'Interpolation: Estimating a value between two measured points (e.g., halfway between 2 PM and 4 PM gives 3 PM).'
    ],
    microCheck: {
      question: 'Estimating a value between two plotted points on a line graph is called...',
      options: ['Interpolation', 'Extrapolation', 'Trunctation'],
      correctAnswer: 'Interpolation',
      explanation: 'Interpolation is reading or estimating a value located inside the range of known plotted points!'
    }
  },
  pie_charts: {
    id: 'pie_charts',
    title: 'Concept Card 4 — Pie Charts & Angles',
    keyIdea: 'A pie chart shows parts of a single whole. The entire circle equals 100% and 360°.',
    rules: [
      'Formula for sector angle: Angle = (Frequency ÷ Total) × 360°',
      'Formula for percentage: Percent = (Frequency ÷ Total) × 100',
      'CRITICAL: Angles are NOT percentages! A 25% sector is a 90° angle (¼ of 360°), not 25°!'
    ],
    microCheck: {
      question: 'A festival snack received 25% of all student votes. What angle should its sector measure?',
      options: ['90°', '25°', '180°', '45°'],
      correctAnswer: '90°',
      explanation: '25% of 360° = (25 / 100) × 360° = 90° (a right angle quarter of the pie)!'
    }
  },
  misleading_charts: {
    id: 'misleading_charts',
    title: 'Concept Card 5 — Choosing & Checking Charts',
    keyIdea: 'Always choose the right chart for the data, and inspect graphs for deliberate tricks!',
    rules: [
      'Categories -> Bar Chart | Continuous time -> Line Graph | Parts of 100% whole -> Pie Chart.',
      'Truncated Axis Trick: Starting a bar chart at 50 instead of 0 exaggerates small differences.',
      'Checklist: Axis starts at 0, intervals are even, units are labelled, and pie sectors sum to 360° / 100%.'
    ],
    microCheck: {
      question: 'Why is a bar chart with a truncated axis (starting at 50 instead of 0) misleading?',
      options: ['It exaggerates tiny differences', 'It hides the chart title', 'It changes the time scale'],
      correctAnswer: 'It exaggerates tiny differences',
      explanation: 'When the y-axis does not start at 0, small differences between bars look gigantic and deceive the viewer!'
    }
  }
};
