import { say, ask, cheer, think, celebrate, instruct } from './audio';

export function wonderNarration() {
  return [
    think("Mike in New York is staring at the festival's Data Wall. Three charts are glowing, but every label has vanished."),
    ask("One chart shows how the crowd changed through the day. Which one is it?"),
    cheer("Let's discover which chart tells which story!")
  ];
}

export function getStoryNarration(panelIndex) {
  const panels = [
    [say("John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki are the Global Data Explorers. They live in ten different countries, but they meet on video calls to solve data mysteries.")],
    [say("Tonight is the World Youth Festival. But the giant Data Wall has glitched! The bars, lines, and circles are all scrambled, and the clock is ticking.")],
    [say("In Sydney, Emma counts how many students joined each activity. Football has forty, dance has twenty-five, chess has fifteen, and art has thirty. Each activity gets its own bar. The taller the bar, the bigger the number!")],
    [say("Liam in Cape Town notices something. Two schools took part, so each activity needs two bars, one for each school. A key tells us which colour belongs to which school.")],
    [say("In Cairo, Aisha checks the temperature at the outdoor stage every two hours. When the temperature rises, her line climbs. When it falls, her line drops. A line graph shows how things change over time.")],
    [say("Sofia in Paris asks two hundred students to vote for their favourite festival snack. Together, all the votes make one whole circle. Every snack gets a slice, and the whole circle is three hundred and sixty degrees.")],
    [say("But wait! Diego in Mexico City spots a trickster chart. Its bars start at fifty instead of zero, so a tiny difference looks huge. Explorers must always check the scale before they trust a chart.")],
    [say("With Plotty's help, every chart on the Data Wall lights up. The festival can begin! But first, the Explorers want to see if you can fix the charts too.")]
  ];
  return panels[panelIndex] || [];
}

export function stationANarration() {
  return [
    instruct("Pick an interval, then drag each bar top to match the data table. Watch the numbers snap right to the gridlines!")
  ];
}

export function stationBNarration() {
  return [
    instruct("Tap the grid to plot each temperature reading. Watch the points join into a trend line, then probe any hour to interpolate!")
  ];
}

export function stationCNarration() {
  return [
    instruct("Work out the sector angle using the formula, then turn the radius dial to cut the slices of the pie!")
  ];
}

export function stationDNarration() {
  return [
    instruct("Sort the scenarios into the right chart buckets, and spot the deliberate trickster flaws on the Data Wall!")
  ];
}

export function correctNarration() {
  return [
    celebrate("Amazing! You read that chart perfectly! You are a Data Explorer superstar!")
  ];
}

export function incorrectNarration() {
  return [
    cheer("Not quite! Let's look at the chart again.")
  ];
}

export function reflectNarration() {
  return [
    think("What an adventure today! Can you tell me one thing you learned about bar, line, and pie charts?"),
    celebrate("Lesson complete! You are a Global Data Explorer Champion!")
  ];
}
