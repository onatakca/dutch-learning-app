# 🇳🇱 Dutch Learning App

> An interactive web application for complete beginners to learn practical, everyday Dutch through vocabulary, grammar exercises, and common daily phrases.

![Project Status](https://img.shields.io/badge/status-in%20development-yellow)
![HTML](https://img.shields.io/badge/HTML-5-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Project Overview

A beginner-friendly Dutch learning application focused on practical, real-world language skills. Unlike traditional apps that focus purely on vocabulary lists, this app emphasizes the most useful daily interactions: ordering food, grocery shopping, greetings, and common conversations.

**Perfect for**: Complete beginners (A1-A2 level) who want to quickly learn functional Dutch for daily life in the Netherlands.

## ✨ Key Features

### 📚 Must-Have Features
- **Flashcard System**: Dutch ↔ English vocabulary practice with spaced repetition
- **Practical Categories**:
  - Greetings & Basic Phrases
  - Grocery Shopping
  - Ordering Food & Drinks
  - Transportation
  - Medical/Pharmacy
  - Numbers & Time
- **Text-to-Speech**: Browser-based pronunciation for all words and phrases (free!)
- **Progress Tracking**: Track learned words and practice streaks
- **Spaced Repetition Algorithm**: Smart review scheduling based on Anki methodology

### 📝 Core Learning Features
- **Fill-in-the-Blank Exercises**: Grammar practice in context
- **Common Phrases Practice**: Real conversations you'll actually use
- **Daily Streak Tracking**: Motivation through consistency
- **Quiz Mode**: Test your knowledge with multiple choice and typing exercises
- **Grammar Tips**: Built-in explanations for tricky Dutch concepts (de/het articles, word order)

### 🎮 Nice-to-Have Features (if time permits)
- User authentication (save progress across devices)
- Gamification (points, achievements, levels)
- Multiple difficulty levels
- Speaking practice with speech recognition
- Dark mode

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3 (modern, responsive design)
- Vanilla JavaScript (ES6+)
- Web Speech API (text-to-speech)

**Data Storage**
- JSON files for vocabulary/phrases
- LocalStorage for user progress
- (Optional) Backend with Node.js + PostgreSQL for user accounts

**Deployment**
- GitHub Pages (free, simple hosting)
- Or Netlify/Vercel (free tier)

**Why This Stack?**
- 100% free to build and deploy
- No complicated frameworks to learn
- Fast development time
- Full control over UX
- Works offline with service workers

## 📋 Implementation Roadmap

### Phase 1: Core Learning System (Days 1-4)
- [x] Set up project structure and Git repository
- [ ] Design UI/UX mockups (simple wireframes)
- [ ] Create vocabulary database structure (JSON)
- [ ] Curate 500-1000 most useful Dutch words/phrases
- [ ] Organize into practical categories
- [ ] Implement flashcard interface
- [ ] Add text-to-speech pronunciation
- [ ] Build basic progress tracking (LocalStorage)

### Phase 2: Interactive Learning Features (Days 5-8)
- [ ] Implement spaced repetition algorithm
- [ ] Create fill-in-the-blank exercises
- [ ] Build common phrases practice mode
- [ ] Add quiz mode (multiple choice + typing)
- [ ] Design and implement progress dashboard
- [ ] Add daily streak counter
- [ ] Create category selection interface
- [ ] Grammar tips tooltips

### Phase 3: Polish & Enhancement (Days 9-12)
- [ ] Responsive design for mobile/tablet
- [ ] Add animations and transitions
- [ ] Implement keyboard shortcuts
- [ ] Add accessibility features (ARIA labels)
- [ ] Create tutorial/onboarding flow
- [ ] Add statistics page (words learned, time spent, etc.)
- [ ] Bug fixes and testing

### Phase 4: Deployment & Documentation (Days 13-15)
- [ ] Write comprehensive README
- [ ] Add setup instructions
- [ ] Create user guide
- [ ] Deploy to GitHub Pages/Netlify
- [ ] Create demo video/GIF
- [ ] Add screenshots to README
- [ ] Final testing across browsers
- [ ] Set up CI/CD (optional)

## 🚀 Getting Started

### Prerequisites
```
A modern web browser (Chrome, Firefox, Safari, Edge)
Text editor (VS Code recommended)
Git
```

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/dutch-learning-app.git
cd dutch-learning-app

# No build process needed! Just open in browser
# Option 1: Open directly
open index.html

# Option 2: Use a local server (recommended)
# With Python:
python -m http.server 8000

# With Node.js:
npx http-server

# Visit http://localhost:8000
```

### Project Structure

```
dutch-learning-app/
├── index.html
├── css/
│   ├── style.css
│   ├── flashcards.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── flashcards.js
│   ├── spaced-repetition.js
│   ├── exercises.js
│   ├── progress.js
│   └── speech.js
├── data/
│   ├── vocabulary.json
│   ├── phrases.json
│   ├── grammar-exercises.json
│   └── categories.json
├── assets/
│   ├── images/
│   └── icons/
├── README.md
└── LICENSE
```

## 📚 Learning Content Structure

### Vocabulary Database Format
```json
{
  "categories": [
    {
      "id": "greetings",
      "name": "Greetings & Basic Phrases",
      "level": "A1",
      "words": [
        {
          "dutch": "Hallo",
          "english": "Hello",
          "pronunciation": "HAH-loh",
          "example": "Hallo! Hoe gaat het?",
          "exampleTranslation": "Hello! How are you?"
        }
      ]
    }
  ]
}
```

### Categories & Content
1. **Greetings & Basics** (~100 words)
   - Hello, goodbye, please, thank you
   - How are you? / Nice to meet you
   - Yes, no, maybe, excuse me

2. **Grocery Shopping** (~150 words)
   - Food items, quantities
   - "Where is...?", "How much...?"
   - Common supermarket vocabulary

3. **Ordering Food & Drinks** (~120 words)
   - Restaurant phrases
   - Menu items
   - Dietary restrictions

4. **Transportation** (~100 words)
   - Directions, public transport
   - Train station vocabulary
   - Bicycle-related terms

5. **Numbers, Time & Dates** (~80 words)
   - Numbers 1-1000
   - Days, months, time expressions
   - Common time phrases

6. **Medical & Pharmacy** (~100 words)
   - Basic health phrases
   - Pharmacy vocabulary
   - Emergency phrases

7. **Small Talk** (~150 words)
   - Weather, hobbies, work
   - Common conversation starters
   - Polite expressions

## 🎓 Spaced Repetition Algorithm

Using a simplified Anki-style algorithm:
- **New cards**: Show after 1 day
- **Easy**: Next review in 4 days
- **Good**: Next review in 2 days
- **Hard**: Show again in same session
- **Wrong**: Reset to new card status

Progress is saved in browser LocalStorage.

## 🎨 Design Philosophy

**Simple & Distraction-Free**
- Clean, minimalist interface
- Focus on learning content
- No unnecessary animations
- Fast load times

**Mobile-First**
- Responsive design
- Touch-friendly buttons
- Works on all devices

**Accessibility**
- High contrast colors
- Keyboard navigation
- Screen reader support
- Clear typography

## 📊 Progress Tracking

The app tracks:
- Total words learned
- Words by category
- Daily streak
- Study time
- Accuracy rate per category
- Review schedule adherence

## 🔮 Future Improvements

- [ ] User accounts & cloud sync
- [ ] Speaking practice with speech recognition
- [ ] Gamification (XP, levels, badges)
- [ ] Community features (forums, practice partners)
- [ ] More advanced grammar lessons
- [ ] Video lessons with native speakers
- [ ] Integration with Dutch news for reading practice
- [ ] Offline mode with service workers
- [ ] Mobile app (React Native)
- [ ] Dutch culture lessons
- [ ] Flemish vs Netherlands Dutch toggle
- [ ] AI conversation partner (future paid feature)

## 🌟 What Makes This Different?

**Focus on Practical Use**
- Not just vocabulary lists - real phrases you'll use tomorrow
- Organized by situation, not arbitrary categories
- Common sentences for ordering, shopping, greeting

**Beginner-Friendly**
- Starts with absolute basics
- Clear explanations in English
- No overwhelming features
- Linear progression path

**Completely Free**
- No subscriptions, no paywalls
- Open source
- Runs in browser
- No API costs

## 🎓 What I Learned

*To be filled in during development*

- Working with the Web Speech API
- Implementing spaced repetition algorithms
- Building responsive web applications from scratch
- Managing user state with LocalStorage
- Creating intuitive learning interfaces
- Curating educational content

## 📝 Data Sources

- **Vocabulary**: Dutch frequency word lists + manual curation
- **Phrases**: Common Dutch expressions from NT2 curriculum
- **Grammar**: CEFR guidelines for A1-A2 levels
- **Pronunciation**: Web Speech API (browser-native)

## 🤝 Contributing

This is a personal portfolio project, but suggestions for vocabulary or features are welcome! Open an issue if you have ideas.

## 📄 License

MIT License - Free to use and modify!

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [yourwebsite.com](https://yourwebsite.com)

---

⭐ Star this repo if you're learning Dutch too!

**Built as part of my Masters in Computer Science portfolio**

## 📖 Quick Start Guide for Users

1. **Choose a Category** (e.g., "Greetings")
2. **Practice Flashcards** - Click to flip, hear pronunciation
3. **Rate Your Knowledge** - Easy/Good/Hard
4. **Review Regularly** - App reminds you when to review
5. **Track Progress** - See your improvement over time!

**Recommended Study Plan**: 15-20 minutes daily for best results
