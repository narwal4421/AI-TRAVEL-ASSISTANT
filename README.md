diff --git a/README.md b/README.md
index 577ecc0c83867372e7cd77a4c7f75ad5794eaadc..365c33067ae4eb099be993655d7843d2529201e0 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,143 @@
-# AI-TRAVEL-ASSISTANT
\ No newline at end of file
+# AI Travel Assistant (Offline Version)
+
+A complete beginner-friendly **school PBL project** that simulates an AI-powered travel planner without using any paid APIs, backend server, or internet connection.
+
+This project includes login/signup, travel packages for 10 countries, offline weather information, sightseeing recommendations, and a rule-based AI chatbot.
+
+---
+
+## ✨ Project Highlights
+
+- ✅ 100% offline-ready
+- ✅ No backend required
+- ✅ No external APIs or paid services
+- ✅ Built only with HTML, CSS, JavaScript, and JSON
+- ✅ Clean and beginner-friendly folder structure
+- ✅ Great for classroom demos and GitHub portfolio
+
+---
+
+## 🚀 Features
+
+### 1) Login and Signup System (localStorage)
+- User can create account with username and password
+- Data is stored in browser `localStorage`
+- Login redirects user to dashboard
+- Logout support included
+
+### 2) Dashboard
+- Personalized welcome message
+- Quick links to packages and chatbot
+- Brief project summary section
+
+### 3) Travel Packages (10 Countries)
+Countries included:
+- Japan
+- France
+- Italy
+- Switzerland
+- Thailand
+- United Arab Emirates
+- Australia
+- Canada
+- United States
+- India
+
+Each package includes:
+- Flight details (dummy data)
+- Hotel list with price and rating
+- Sightseeing landmarks
+- Offline weather information
+- Total package price
+- 5-day or 7-day travel plan
+
+### 4) Offline Weather System
+- Weather data stored in local JSON file
+- Displayed when a country is selected in packages page
+
+### 5) Offline AI Chatbot (Rule-Based)
+- Simulates smart travel assistant behavior
+- Example supported prompts:
+  - `cheap trip` → suggests Thailand or India
+  - `luxury travel` → suggests Switzerland or UAE
+  - `Japan trip` → shows Japan package insights
+  - `5 day trip` → suggests short-duration packages
+
+---
+
+## 🧱 Tech Stack
+
+- **HTML5**
+- **CSS3** (modern responsive design, cards, gradients)
+- **Vanilla JavaScript**
+- **JSON** (offline structured data)
+
+---
+
+## 📁 Folder Structure
+
+```text
+AI-Travel-Assistant/
+├── index.html
+├── login.html
+├── signup.html
+├── dashboard.html
+├── packages.html
+├── chatbot.html
+├── css/
+│   └── style.css
+├── js/
+│   └── app.js
+├── data/
+│   ├── packages.json
+│   └── weather.json
+└── README.md
+```
+
+---
+
+## ▶️ How to Run (Offline)
+
+1. Download or clone this repository.
+2. Open the project folder.
+3. Double-click `index.html` (or open it in any browser).
+4. Sign up with a new account and start exploring.
+
+> Works fully offline after opening in browser. No setup or installation required.
+
+---
+
+## 🖼️ Screenshots
+
+### Landing Page
+
+_Add your screenshot here after opening the project in browser._
+
+Example path for GitHub:
+
+```md
+![Landing Page](screenshots/landing-page.png)
+```
+
+---
+
+## 🔮 Future Improvements
+
+- Add dark mode toggle
+- Add search and filter for packages
+- Add custom trip planner (day-wise itinerary builder)
+- Add map integration (optional online mode)
+- Add downloadable itinerary as PDF
+
+---
+
+## 📚 Educational Value (PBL)
+
+This project demonstrates:
+- Frontend web development basics
+- Data handling with JSON
+- localStorage authentication flow
+- Rule-based AI chatbot logic
+- Responsive UI/UX design principles
+
+Perfect for school exhibitions, viva presentations, and beginner portfolios.
