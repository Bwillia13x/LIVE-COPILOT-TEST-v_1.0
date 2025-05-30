// src/constants.ts

// --- UI Messages & Statuses ---
export const EDITOR_DEFAULT_TITLE = "New Note"; // Changed from "Untitled Note" to match current usage
export const STATUS_READY_TO_RECORD = "Ready to record";
export const STATUS_RECORDING = "Recording...";
export const STATUS_PROCESSING = "Processing...";
export const STATUS_LISTENING = "Listening...";
export const STATUS_SPEECH_DETECTED_WAITING = "No speech detected - keep talking...";
export const STATUS_MIC_ACCESS_DENIED = "Microphone access denied";
export const STATUS_SPEECH_RECOGNITION_ERROR = "Speech recognition error";
export const STATUS_NETWORK_ERROR_TRANSCRIPTION_LIMITED = "Network error - transcription may be limited";

// --- Timeout Durations (ms) ---
export const CONSTRUCTOR_SETUP_DELAY = 2000; // For setTimeout in constructor for performance optimization interval
export const SPEECH_RECOGNITION_RESTART_DELAY_SHORT = 100; // For onend immediate restart
export const SPEECH_RECOGNITION_RESTART_DELAY_MEDIUM = 500; // For manual restart in restartSpeechRecognition
export const AUTOSAVE_INTERVAL = 30000; // Auto-save every 30 seconds
export const AUTOSAVE_INDICATOR_TIMEOUT = 2000; // How long auto-save message shows

// --- Chart Defaults ---
export const CHART_DEFAULT_AI_TITLE = "AI Generated Chart";
export const CHART_DEFAULT_DIRECT_TEST_TITLE = "Direct Chart Test";
export const CHART_DEFAULT_DIRECT_TEST_DESCRIPTION = "Testing Chart.js directly without AI service";
export const CHART_DEFAULT_TOPIC_DIST_TITLE = "Topic Distribution";
export const CHART_DEFAULT_TOPIC_DIST_DESCRIPTION = "Main topics identified in your transcription";
export const CHART_DEFAULT_SENTIMENT_TITLE = "Sentiment Analysis";
export const CHART_DEFAULT_SENTIMENT_DESCRIPTION = "Emotional tone breakdown of your content";
export const CHART_DEFAULT_WORD_FREQ_TITLE = "Key Words";
export const CHART_DEFAULT_WORD_FREQ_DESCRIPTION = "Most frequently used words in your transcription";

// --- API & Model Related ---
// MODEL_NAME is kept in APIService.ts as it's tightly coupled there.

// --- Numeric Literals ---
// MAX_STORED_NOTES and MAX_RETRY_ATTEMPTS are instance properties in VoiceNotesApp for now.
// If they become global, they can be moved here.
// Example: export const MAX_RETRY_ATTEMPTS = 3;

// --- Toast Durations (if needed globally, currently handled in showToast options) ---
// export const TOAST_DURATION_SHORT = 2000;
// export const TOAST_DURATION_MEDIUM = 5000;
// export const TOAST_DURATION_LONG = 8000;

// --- Other ---
export const DEFAULT_SPEECH_LANG = 'en-US';
