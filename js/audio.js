/**
 * Audio Manager
 * Handles hybrid audio playback (Custom MP3 -> Browser TTS Fallback)
 */

const AudioManager = {
    play: function (text, customAudioFile = null) {
        // 1. Try Custom Audio File (if provided)
        if (customAudioFile) {
            const audioPath = `assets/audio/${customAudioFile}`;
            const audio = new Audio(audioPath);

            // Add error handling to fallback if file missing
            audio.onerror = () => {
                console.warn(`Audio file not found: ${audioPath}. Falling back to TTS.`);
                this.playTTS(text);
            };

            audio.play().catch(e => {
                console.warn("Audio play failed:", e);
                this.playTTS(text);
            });
            return;
        }

        // 2. Fallback to Browser TTS
        this.playTTS(text);
    },

    playTTS: function (text) {
        if (!window.speechSynthesis) {
            console.error("Browser does not support Speech Synthesis");
            return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'nl-NL'; // Dutch
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.0;

        // Try to select a better voice if available
        const voices = window.speechSynthesis.getVoices();
        const dutchVoice = voices.find(v => v.lang.includes('nl') && !v.name.includes('Google')); // Prefer native OS voices often
        if (dutchVoice) {
            utterance.voice = dutchVoice;
        }

        window.speechSynthesis.speak(utterance);
    }
};

// Expose globally
window.playAudio = (text, file) => AudioManager.play(text, file);
