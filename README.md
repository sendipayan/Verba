# 🎤 SpeakUp - Public Speaking Practice App

**SpeakUp** is a web-based application designed to help users improve their public speaking skills through interactive speech practice. Whether you're rehearsing a presentation or just boosting confidence, SpeakUp offers an intuitive platform with real-time feedback, transcription, and recording.

---

## ✨ Features

- 🎙️ **Speech Recognition**
  - Real-time voice-to-text transcription powered by `react-speech-recognition`
- 📹 **Live Camera and Microphone Preview**
  - Visual self-feedback while speaking
- 🔴 **Video Recording**
  - Capture full video+audio of your speech using the `MediaRecorder` API
- 📝 **Transcript Output**
  - Transcribe your entire speech and copy it with one click
- 💾 **Download Recordings**
  - Save your practice sessions in `.webm` format
- 🔁 **Reset Practice**
  - Clear transcript and restart at any time
- 🤖 **AI Feedback Simulation**
  - Placeholder for smart AI speech evaluation (coming soon!)
- 📱 **Fully Responsive Design**
  - Optimized for both desktop and mobile devices

---

## 🛠️ Tech Stack

| Area            | Tools / Technologies                            |
|-----------------|--------------------------------------------------|
| Framework       | Next.js 13+                                      |
| Frontend        | React, Font Awesome                             |
| Speech-to-Text  | `react-speech-recognition`                      |
| Media Capture   | Web APIs (`navigator.mediaDevices`, `MediaRecorder`) |
| Styling         | Vanilla CSS Modules                             |
| Video/Audio     | HTML5 Video API, Blobs                          |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sendipayan/Verba.git
cd Verba
