import asyncio
import os
import json
import edge_tts

OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../public/assets/audio'))
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Educator voice: en-US-AriaNeural (Clear, Engaging, Expressive Female Educator)
VOICE = "en-US-AriaNeural"

phrases = [
    # Wonder Phase
    {
        "text": "Mike in New York is staring at the festival's Data Wall. Three charts are glowing, but every label has vanished.",
        "filename": "audio_wonder_hook_0.mp3"
    },
    {
        "text": "One chart shows how the crowd changed through the day. Which one is it?",
        "filename": "audio_wonder_hook_1.mp3"
    },
    {
        "text": "Let's discover which chart tells which story!",
        "filename": "audio_wonder_hook_2.mp3"
    },

    # Story Panels (Paragraphs only, NEVER titles)
    {
        "text": "John, Mike, Sarah, Emma, Liam, Sofia, Noah, Aisha, Carlos, and Yuki are the Global Data Explorers. They live in ten different countries, but they meet on video calls to solve data mysteries.",
        "filename": "audio_story_panel1.mp3"
    },
    {
        "text": "Tonight is the World Youth Festival. But the giant Data Wall has glitched! The bars, lines, and circles are all scrambled, and the clock is ticking.",
        "filename": "audio_story_panel2.mp3"
    },
    {
        "text": "In Sydney, Emma counts how many students joined each activity. Football has forty, dance has twenty-five, chess has fifteen, and art has thirty. Each activity gets its own bar. The taller the bar, the bigger the number!",
        "filename": "audio_story_panel3.mp3"
    },
    {
        "text": "Liam in Cape Town notices something. Two schools took part, so each activity needs two bars, one for each school. A key tells us which colour belongs to which school.",
        "filename": "audio_story_panel4.mp3"
    },
    {
        "text": "In Cairo, Aisha checks the temperature at the outdoor stage every two hours. When the temperature rises, her line climbs. When it falls, her line drops. A line graph shows how things change over time.",
        "filename": "audio_story_panel5.mp3"
    },
    {
        "text": "Sofia in Paris asks two hundred students to vote for their favourite festival snack. Together, all the votes make one whole circle. Every snack gets a slice, and the whole circle is three hundred and sixty degrees.",
        "filename": "audio_story_panel6.mp3"
    },
    {
        "text": "But wait! Diego in Mexico City spots a trickster chart. Its bars start at fifty instead of zero, so a tiny difference looks huge. Explorers must always check the scale before they trust a chart.",
        "filename": "audio_story_panel7.mp3"
    },
    {
        "text": "With Plotty's help, every chart on the Data Wall lights up. The festival can begin! But first, the Explorers want to see if you can fix the charts too.",
        "filename": "audio_story_panel8.mp3"
    },

    # Simulation Stations
    {
        "text": "Pick an interval, then drag each bar top to match the data table. Watch the numbers snap right to the gridlines!",
        "filename": "audio_sim_station_a.mp3"
    },
    {
        "text": "Tap the grid to plot each temperature reading. Watch the points join into a trend line, then probe any hour to interpolate!",
        "filename": "audio_sim_station_b.mp3"
    },
    {
        "text": "Work out the sector angle using the formula, then turn the radius dial to cut the slices of the pie!",
        "filename": "audio_sim_station_c.mp3"
    },
    {
        "text": "Sort the scenarios into the right chart buckets, and spot the deliberate trickster flaws on the Data Wall!",
        "filename": "audio_sim_station_d.mp3"
    },

    # Feedback & Reflection
    {
        "text": "Amazing! You read that chart perfectly! You are a Data Explorer superstar!",
        "filename": "audio_celebrate.mp3"
    },
    {
        "text": "Not quite! Let's look at the chart again.",
        "filename": "audio_encouragement.mp3"
    },
    {
        "text": "What an adventure today! Can you tell me one thing you learned about bar, line, and pie charts?",
        "filename": "audio_reflect.mp3"
    },
    {
        "text": "Lesson complete! You are a Global Data Explorer Champion!",
        "filename": "audio_complete.mp3"
    }
]

async def generate():
    print(f"--- Generating Offline Audio for {len(phrases)} Educational Phrases ---")
    print(f"Target Directory: {OUTPUT_DIR}")
    print(f"Voice Profile: {VOICE}\n")

    for i, item in enumerate(phrases):
        filepath = os.path.join(OUTPUT_DIR, item["filename"])
        print(f"[{i+1}/{len(phrases)}] Synthesizing: {item['text'][:45]}... -> {item['filename']}")
        comm = edge_tts.Communicate(item["text"], VOICE, rate="+0%", pitch="+0Hz")
        await comm.save(filepath)
        size = os.path.getsize(filepath)
        print(f"   [OK] Saved ({size} bytes)")

    print("\n--- Audio Generation Complete! ---")

    # Update audioMap.js
    map_lines = []
    for item in phrases:
        escaped_text = json.dumps(item["text"])
        map_lines.append(f'  {escaped_text}: "/assets/audio/{item["filename"]}"')

    joined_entries = ",\n".join(map_lines)
    audio_map_content = "// Auto-generated mapping of text strings to static audio files\nexport const audioMap = {\n" + joined_entries + "\n};\n\nexport default audioMap;\n"
    map_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../src/utils/audioMap.js'))
    with open(map_path, 'w', encoding='utf-8') as f:
        f.write(audio_map_content)
    print(f"[OK] Updated audioMap at {map_path}")

if __name__ == "__main__":
    asyncio.run(generate())
