# 🇳🇱 Dutch Learning App

> A simple, interactive web app for learning practical Dutch vocabulary and phrases.

![Status](https://img.shields.io/badge/status-active-green) ![License](https://img.shields.io/badge/license-MIT-blue)

## 🎯 Overview

Designed for beginners (A1-A2), this app focuses on real-world utility over exhaustive vocabulary lists. Learn to order food, shop for groceries, and introduce yourself with audio-supported flashcards and sentences.

## ✨ Features

- **Flashcards & List View**: Practice with 3D flipping cards or scroll through full word lists.
- **Spaced Repetition**: Smart review scheduling based on your "Easy/Good/Hard" ratings.
- **Audio Pronunciation**: Native text-to-speech for all words and example sentences.
- **7 Practical Categories**: Greetings, Shopping, Food, Transport, Numbers, Medical, and Phrases.
- **Personalized**: User login (local), dark mode, and progress tracking (streaks & word counts).
- **Zero Setup**: Runs entirely in the browser with no backend required.

## 🚀 Quick Start

1. **Clone & Run**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/dutch-learning-app.git
   cd dutch-learning-app
   open index.html
   ```
2. **Login**: Enter your name to start tracking progress.
3. **Start Learning**: Pick a category and choose between Flashcard or List view.

## 🛠️ Tech Stack

- **Core**: HTML5, CSS3 (Variables, Flexbox), Vanilla JavaScript (ES6+).
- **Data**: JS Modules for vocabulary (no server needed).
- **Storage**: LocalStorage for progress and preferences.
- **Audio**: Web Speech API.

## 📂 Project Structure

```
dutch-learning-app/
├── index.html          # Dashboard
├── flashcards.html     # Practice Interface
├── css/                # Styles (Global, Cards, Responsive)
├── js/                 # Logic (App, Flashcards, Progress, Theme)
└── data/               # Content (Categories, Vocabulary)
```

## �️ Roadmap

- [x] Core Flashcard System & Spaced Repetition
- [x] Dark Mode & User Login
- [x] "Essential Phrases" with Sentence Audio
- [ ] Quiz Mode (Multiple Choice)
- [ ] Fill-in-the-blank Grammar Exercises

## 📄 License

MIT License. Free to use and modify.
