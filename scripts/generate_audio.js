import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envLocalPath = path.resolve(__dirname, '../.env.local');
let envKey = '';
if (fs.existsSync(envLocalPath)) {
  const match = fs.readFileSync(envLocalPath, 'utf8').match(/VITE_ELEVENLABS_API_KEY=(.+)/);
  if (match) envKey = match[1].trim();
}

const API_KEY = process.env.ELEVENLABS_API_KEY || process.env.VITE_ELEVENLABS_API_KEY || envKey;
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice
const MODEL_ID = 'eleven_multilingual_v2';

const STYLE_SETTINGS = {
  celebration: { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question: { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis: { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking: { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

const phrases = [
  // Wonder Phase
  {
    text: "Mike in New York is staring at the festival's Data Wall. Three charts are glowing, but every label has vanished.",
    style: "thinking",
    filename: "audio_wonder_hook_0.mp3"
  },
  {
    text: "One chart shows how the crowd changed through the day. Which one is it?",
    style: "question",
    filename: "audio_wonder_hook_1.mp3"
  },
  {
    text: "Let's discover which chart tells which story!",
    style: "encouragement",
    filename: "audio_wonder_hook_2.mp3"
  },

  // Story Panels (Paragraphs only, NEVER titles)
  {
    text: "John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki are the Global Data Explorers. They live in ten different countries, but they meet on video calls to solve data mysteries.",
    style: "statement",
    filename: "audio_story_panel1.mp3"
  },
  {
    text: "Tonight is the World Youth Festival. But the giant Data Wall has glitched! The bars, lines, and circles are all scrambled, and the clock is ticking.",
    style: "statement",
    filename: "audio_story_panel2.mp3"
  },
  {
    text: "In Sydney, Emma counts how many students joined each activity. Football has forty, dance has twenty-five, chess has fifteen, and art has thirty. Each activity gets its own bar. The taller the bar, the bigger the number!",
    style: "statement",
    filename: "audio_story_panel3.mp3"
  },
  {
    text: "Liam in Cape Town notices something. Two schools took part, so each activity needs two bars, one for each school. A key tells us which colour belongs to which school.",
    style: "statement",
    filename: "audio_story_panel4.mp3"
  },
  {
    text: "In Cairo, Aisha checks the temperature at the outdoor stage every two hours. When the temperature rises, her line climbs. When it falls, her line drops. A line graph shows how things change over time.",
    style: "statement",
    filename: "audio_story_panel5.mp3"
  },
  {
    text: "Sofia in Paris asks two hundred students to vote for their favourite festival snack. Together, all the votes make one whole circle. Every snack gets a slice, and the whole circle is three hundred and sixty degrees.",
    style: "statement",
    filename: "audio_story_panel6.mp3"
  },
  {
    text: "But wait! Diego in Mexico City spots a trickster chart. Its bars start at fifty instead of zero, so a tiny difference looks huge. Explorers must always check the scale before they trust a chart.",
    style: "statement",
    filename: "audio_story_panel7.mp3"
  },
  {
    text: "With Plotty's help, every chart on the Data Wall lights up. The festival can begin! But first, the Explorers want to see if you can fix the charts too.",
    style: "statement",
    filename: "audio_story_panel8.mp3"
  },

  // Simulation Stations
  {
    text: "Pick an interval, then drag each bar top to match the data table. Watch the numbers snap right to the gridlines!",
    style: "instruction",
    filename: "audio_sim_station_a.mp3"
  },
  {
    text: "Tap the grid to plot each temperature reading. Watch the points join into a trend line, then probe any hour to interpolate!",
    style: "instruction",
    filename: "audio_sim_station_b.mp3"
  },
  {
    text: "Work out the sector angle using the formula, then turn the radius dial to cut the slices of the pie!",
    style: "instruction",
    filename: "audio_sim_station_c.mp3"
  },
  {
    text: "Sort the scenarios into the right chart buckets, and spot the deliberate trickster flaws on the Data Wall!",
    style: "instruction",
    filename: "audio_sim_station_d.mp3"
  },

  // Feedback & Reflection
  {
    text: "Amazing! You read that chart perfectly! You are a Data Explorer superstar!",
    style: "celebration",
    filename: "audio_celebrate.mp3"
  },
  {
    text: "Not quite! Let's look at the chart again.",
    style: "encouragement",
    filename: "audio_encouragement.mp3"
  },
  {
    text: "What an adventure today! Can you tell me one thing you learned about bar, line, and pie charts?",
    style: "thinking",
    filename: "audio_reflect.mp3"
  },
  {
    text: "Lesson complete! You are a Global Data Explorer Champion!",
    style: "celebration",
    filename: "audio_complete.mp3"
  }
];

const outputDir = path.resolve(__dirname, '../public/assets/audio');
fs.mkdirSync(outputDir, { recursive: true });

async function generateAudioForPhrase(phrase, index) {
  const filePath = path.join(outputDir, phrase.filename);
  console.log(`[${index + 1}/${phrases.length}] Generating audio for: "${phrase.text.slice(0, 45)}..."`);

  const settings = STYLE_SETTINGS[phrase.style] || STYLE_SETTINGS.statement;

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg'
    },
    body: JSON.stringify({
      text: phrase.text,
      model_id: MODEL_ID,
      voice_settings: settings
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs API error (${response.status}): ${errorText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filePath, buffer);
  console.log(`  [OK] Saved to ${phrase.filename} (${buffer.length} bytes)`);
}

async function run() {
  console.log('--- Starting ElevenLabs Offline Audio Generation ---');
  console.log(`API Key: ${API_KEY ? `${API_KEY.slice(0, 7)}...${API_KEY.slice(-4)}` : 'MISSING'}`);
  console.log(`Target Directory: ${outputDir}`);
  console.log(`Total phrases: ${phrases.length}\n`);

  if (!API_KEY) {
    console.error('ERROR: No ElevenLabs API key found! Please check .env.local');
    process.exit(1);
  }

  for (let i = 0; i < phrases.length; i++) {
    try {
      await generateAudioForPhrase(phrases[i], i);
      // Wait 500ms between calls to avoid rate limits
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      console.error(`  [X] Error generating phrase ${i + 1}:`, err.message);
    }
  }

  console.log('\n--- Audio Generation Finished ---');

  // Verify and write audioMap.js
  const mapContent = `// Auto-generated mapping of text strings to static audio files
export const audioMap = {
${phrases.map(p => `  ${JSON.stringify(p.text)}: "/assets/audio/${p.filename}"`).join(',\n')}
};

export default audioMap;
`;

  const mapPath = path.resolve(__dirname, '../src/utils/audioMap.js');
  fs.writeFileSync(mapPath, mapContent, 'utf-8');
  console.log(`[OK] Updated audioMap at ${mapPath}`);
}

run();
