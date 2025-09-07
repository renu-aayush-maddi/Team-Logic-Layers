from gtts import gTTS
from pydub import AudioSegment

# Create speech (Google TTS)
tts = gTTS("Hello, this is a five second audio for testing.")
tts.save("sample.mp3")

# Convert to WAV and make sure it's 5s long
audio = AudioSegment.from_file("sample.mp3")

# Clip or pad to 5s
if len(audio) > 5000:
    audio = audio[:5000]
else:
    silence = AudioSegment.silent(duration=5000 - len(audio))
    audio = audio + silence

audio.export("sample_audio.wav", format="wav")
print("Saved sample_audio.wav")
