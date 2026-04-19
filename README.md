# 💪 Flexify – Smart Workout Planner

## 📌 Project Pitch

**Flexify** is a dynamic web application that helps users quickly discover exercises and build personalized workout plans. It is designed for individuals who want a simple, interactive way to explore workouts based on muscle groups and difficulty levels without needing a complex fitness platform and paying too much for a plan.

---

## 👤 User Persona

**Target User:**
Beginner to intermediate gym-goers (ages 18–40)

**Background:**

* Wants to exercise based on muscle group 
* Busy individuals with limited time
* May feel overwhelmed by too many workout options
* Looking for quick, structured exercise ideas

**Goals:**

* Find exercises easily
* Build a simple workout routine
* Stay consistent with workouts

---

## ❗ Problem Statement

Many people struggle to find structured workouts that match their fitness level and goals based on muscle groups. Existing platforms are often too complex, overwhelming, or require subscriptions.

**Flexify solves this by:**

* Providing quick access to exercises
* Allowing real-time filtering by muscle and difficulty
* Letting users build and save their own workout plans

---

## 🧱 Application Structure

This is a **Single Page Application (SPA)** with multiple views:

### 🏠 Home (Explore Exercises)

* Hero section
* Flexify Features
* Motivation quotes
* Dynamic exercise cards

---

### 📋 My Workout Plan 

Will added in the next version

* View My Plans
* Remove exercises from plan
* Client-side validation with custom error messages
* Data stored using `localStorage`

---

### 📊 Exercises

* Filter by muscle group and difficulty
* Search functionality
* “Workout Tip of the Day” (random exercise from API)
* List of exercises

---

### 📊 Exercise details

* Details about the selected exercise

---

### ❤️ Favorites

* Save favorite exercises
* Add them to workout plan

---

### 📋 Get Plan

* Form to create a workout plan (name, duration, notes, and more information for building a plan )

---

## ⚙️ Technical Implementation

### 🧩 Technologies Used

* HTML5 (semantic structure)
* CSS3 (responsive design + variables)
* JavaScript (ES6+)
* Fetch API
* LocalStorage
* Vercel for deployment

---

### 🔌 API Used

**API flexify – Exercises API**
https://flexify-backend.vercel.app/exercises

Example endpoint:

```
https://flexify-backend.vercel.app/exercises?muscle=biceps
```

Data includes:

* Name
* Type
* Muscle
* Difficulty
* Instructions
* Safety Info

---

## 🧪 Challenges & Solutions

### Challenge:

Handling dynamic filtering while keeping the UI responsive and efficient.

### Solution:

Implemented a filtering system using JavaScript array methods (`filter`, `map`) and re-rendered the UI based on user input in real time.

---

## 🚀 Deployment

* **Live URL:** *https://flexify-taupe.vercel.app/*
* **Repository:** *https://github.com/fatemehkhoshbayan/Flexify*

---

## 🙌 Acknowledgements

* API provided by API Ninjas
* Inspired by modern fitness and productivity tools

---
