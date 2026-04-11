# 💪 Flexify – Smart Workout Planner

## 📌 Project Pitch

**Flexify** is a dynamic web application that helps users quickly discover exercises and build personalized workout plans. It is designed for individuals who want a simple, interactive way to explore workouts based on muscle groups and difficulty levels without needing a complex fitness platform.

---

## 👤 User Persona

**Target User:**
Beginner to intermediate gym-goers (ages 18–40)

**Background:**

* Busy individuals with limited time
* May feel overwhelmed by too many workout options
* Looking for quick, structured exercise ideas

**Goals:**

* Find exercises easily
* Build a simple workout routine
* Stay consistent with workouts

---

## ❗ Problem Statement

Many people struggle to find structured workouts that match their fitness level and goals. Existing platforms are often too complex, overwhelming, or require subscriptions.

**Flexify solves this by:**

* Providing quick access to exercises
* Allowing real-time filtering by muscle and difficulty
* Letting users build and save their own workout plans

---

## 🧱 Application Structure

This is a **Single Page Application (SPA)** with multiple views:

### 🏠 Home (Explore Exercises)

* Search exercises by name
* Filter by muscle group and difficulty
* Dynamic exercise cards rendered from API data
* Add exercises to workout plan

---

### 📋 My Workout Plan

* View selected exercises
* Remove exercises from plan
* Form to create a workout plan (name, duration, notes)
* Client-side validation with custom error messages
* Data stored using `localStorage`

---

### 📊 Dashboard (Live Widget)

* “Workout Tip of the Day” (random exercise from API)
* Optional: current time or motivational quote

---

### ❤️ Favorites (Optional Enhancement)

* Save favorite exercises
* Quickly add them to workout plan

---

## ⚙️ Technical Implementation

### 🧩 Technologies Used

* HTML5 (semantic structure)
* CSS3 (responsive design + variables)
* JavaScript (ES6+)
* Fetch API
* LocalStorage

---

### 🔌 API Used

**API Ninjas – Exercises API**
https://www.api-ninjas.com/api/exercises

Example endpoint:

```
https://api.api-ninjas.com/v1/exercises?muscle=biceps
```

Data includes:

* Name
* Type
* Muscle
* Difficulty
* Instructions

---

### 🔁 Features

* ✅ Dynamic Data Gallery (min 3 items)
* ✅ Real-time filtering (search + dropdown)
* ✅ Multi-view SPA architecture
* ✅ Responsive design (mobile + desktop)
* ✅ Live widget using `fetch()`
* ✅ Functional form with validation
* ✅ LocalStorage (save workout plan)

---

## 📱 Responsive Design

Flexify is designed to work across devices:

* Mobile: stacked layout, simplified navigation
* Desktop: grid-based card layout with sidebar filters

---

## 🧪 Challenges & Solutions

### Challenge:

Handling dynamic filtering while keeping the UI responsive and efficient.

### Solution:

Implemented a filtering system using JavaScript array methods (`filter`, `map`) and re-rendered the UI based on user input in real time.

---

## 🚀 Deployment

* **Live URL:** **
* **Repository:** **

---

## 📚 Notes & Research

Additional research and planning can be found in:

* `NOTES.md`

---

## 🎨 Future Improvements

* Add drag-and-drop workout planner
* Add exercise detail page
* Integrate more fitness-related APIs
* Add user progress tracking

---

## 🙌 Acknowledgements

* API provided by API Ninjas
* Inspired by modern fitness and productivity tools

---
