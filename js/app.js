/*
  AI Travel Assistant - Main JavaScript
  Beginner-friendly script handling:
  1) Login/signup with localStorage
  2) Package rendering with offline data
  3) Rule-based chatbot simulation
*/

const PACKAGE_DATA = [
  {
    country: "Japan",
    duration: "7-day plan",
    flight: "Round trip from Delhi to Tokyo - Economy",
    hotels: [
      { name: "Sakura Stay Tokyo", price: "$110/night", rating: "4.5" },
      { name: "Osaka Central Inn", price: "$95/night", rating: "4.3" }
    ],
    sightseeing: ["Mount Fuji", "Tokyo Tower", "Fushimi Inari Shrine"],
    totalPrice: "$1,950"
  },
  {
    country: "France",
    duration: "5-day plan",
    flight: "Round trip from Mumbai to Paris - Economy",
    hotels: [
      { name: "Paris Metro Hotel", price: "$130/night", rating: "4.4" },
      { name: "Lyon Comfort Suites", price: "$105/night", rating: "4.2" }
    ],
    sightseeing: ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
    totalPrice: "$2,100"
  },
  {
    country: "Italy",
    duration: "7-day plan",
    flight: "Round trip from Bengaluru to Rome - Economy",
    hotels: [
      { name: "Roman Holiday Inn", price: "$120/night", rating: "4.3" },
      { name: "Venice Canal View", price: "$140/night", rating: "4.6" }
    ],
    sightseeing: ["Colosseum", "Leaning Tower of Pisa", "Venice Grand Canal"],
    totalPrice: "$2,250"
  },
  {
    country: "Switzerland",
    duration: "5-day plan",
    flight: "Round trip from Chennai to Zurich - Economy",
    hotels: [
      { name: "Zurich Alpine Stay", price: "$170/night", rating: "4.7" },
      { name: "Geneva Lake Hotel", price: "$185/night", rating: "4.8" }
    ],
    sightseeing: ["Jungfraujoch", "Lake Geneva", "Matterhorn"],
    totalPrice: "$3,200"
  },
  {
    country: "Thailand",
    duration: "5-day plan",
    flight: "Round trip from Kolkata to Bangkok - Economy",
    hotels: [
      { name: "Bangkok Plaza", price: "$70/night", rating: "4.1" },
      { name: "Phuket Palm Resort", price: "$85/night", rating: "4.2" }
    ],
    sightseeing: ["Phi Phi Islands", "Grand Palace", "Wat Arun"],
    totalPrice: "$1,200"
  },
  {
    country: "United Arab Emirates",
    duration: "7-day plan",
    flight: "Round trip from Hyderabad to Dubai - Economy",
    hotels: [
      { name: "Dubai Skyline Hotel", price: "$210/night", rating: "4.8" },
      { name: "Abu Dhabi Pearl", price: "$190/night", rating: "4.6" }
    ],
    sightseeing: ["Burj Khalifa", "Palm Jumeirah", "Sheikh Zayed Mosque"],
    totalPrice: "$3,450"
  },
  {
    country: "Australia",
    duration: "7-day plan",
    flight: "Round trip from Delhi to Sydney - Economy",
    hotels: [
      { name: "Sydney Harbor Lodge", price: "$155/night", rating: "4.5" },
      { name: "Melbourne Art Hotel", price: "$145/night", rating: "4.4" }
    ],
    sightseeing: ["Sydney Opera House", "Great Barrier Reef", "Bondi Beach"],
    totalPrice: "$2,900"
  },
  {
    country: "Canada",
    duration: "5-day plan",
    flight: "Round trip from Mumbai to Toronto - Economy",
    hotels: [
      { name: "Toronto Maple Inn", price: "$140/night", rating: "4.4" },
      { name: "Vancouver Bay Suites", price: "$150/night", rating: "4.5" }
    ],
    sightseeing: ["Niagara Falls", "Banff National Park", "CN Tower"],
    totalPrice: "$2,650"
  },
  {
    country: "United States",
    duration: "7-day plan",
    flight: "Round trip from Bengaluru to New York - Economy",
    hotels: [
      { name: "NYC Midtown Stay", price: "$190/night", rating: "4.3" },
      { name: "San Francisco Bay Hotel", price: "$185/night", rating: "4.4" }
    ],
    sightseeing: ["Statue of Liberty", "Grand Canyon", "Times Square"],
    totalPrice: "$3,050"
  },
  {
    country: "India",
    duration: "5-day plan",
    flight: "Round trip domestic flight - Economy",
    hotels: [
      { name: "Agra Heritage Inn", price: "$60/night", rating: "4.2" },
      { name: "Jaipur Royal Stay", price: "$75/night", rating: "4.3" }
    ],
    sightseeing: ["Taj Mahal", "Hawa Mahal", "Gateway of India"],
    totalPrice: "$850"
  }
];

const WEATHER_DATA = {
  Japan: "Cold, 12°C",
  France: "Mild, 18°C",
  Italy: "Pleasant, 20°C",
  Switzerland: "Cool, 10°C",
  Thailand: "Warm, 30°C",
  "United Arab Emirates": "Hot, 35°C",
  Australia: "Sunny, 24°C",
  Canada: "Cold, 8°C",
  "United States": "Variable, 16°C",
  India: "Warm, 28°C"
};

const page = window.location.pathname.split("/").pop();

function getUsers() {
  return JSON.parse(localStorage.getItem("ata_users") || "[]");
}

function getCurrentUser() {
  return localStorage.getItem("ata_logged_in_user");
}

function setMessage(id, text, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className = `message ${type}`;
}

function requireLogin() {
  const protectedPages = ["dashboard.html", "packages.html", "chatbot.html"];
  if (protectedPages.includes(page) && !getCurrentUser()) {
    window.location.href = "login.html";
  }
}

function handleSignup() {
  const form = document.getElementById("signupForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    const users = getUsers();
    const exists = users.find((user) => user.username === username);

    if (exists) {
      setMessage("signupMessage", "Username already exists. Try another one.", "error");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("ata_users", JSON.stringify(users));
    setMessage("signupMessage", "Signup successful! Redirecting to login...", "success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}

function handleLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const user = getUsers().find((u) => u.username === username && u.password === password);

    if (!user) {
      setMessage("loginMessage", "Invalid username or password.", "error");
      return;
    }

    localStorage.setItem("ata_logged_in_user", user.username);
    setMessage("loginMessage", "Login successful!", "success");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 700);
  });
}

function setupDashboard() {
  const welcomeText = document.getElementById("welcomeText");
  if (welcomeText) {
    welcomeText.textContent = `Hello ${getCurrentUser() || "Traveler"}!`;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("ata_logged_in_user");
      window.location.href = "login.html";
    });
  }
}

function renderPackage(country) {
  const packageDetails = document.getElementById("packageDetails");
  const weatherDisplay = document.getElementById("weatherDisplay");
  const pkg = PACKAGE_DATA.find((item) => item.country === country);
  if (!pkg || !packageDetails || !weatherDisplay) return;

  weatherDisplay.textContent = `Weather in ${country}: ${WEATHER_DATA[country] || "No data"}`;

  const hotels = pkg.hotels
    .map((hotel) => `<li>${hotel.name} - ${hotel.price} (⭐ ${hotel.rating})</li>`)
    .join("");

  packageDetails.innerHTML = `
    <div class="package-grid">
      <article class="card">
        <h3>${pkg.country}</h3>
        <p><strong>Duration:</strong> ${pkg.duration}</p>
        <p><strong>Flight:</strong> ${pkg.flight}</p>
      </article>
      <article class="card">
        <h3>Hotels</h3>
        <ul>${hotels}</ul>
      </article>
      <article class="card">
        <h3>Sightseeing</h3>
        <ul>${pkg.sightseeing.map((place) => `<li>${place}</li>`).join("")}</ul>
      </article>
      <article class="card">
        <h3>Total Package Price</h3>
        <p><strong>${pkg.totalPrice}</strong></p>
      </article>
    </div>
  `;
}

function setupPackages() {
  const select = document.getElementById("countrySelect");
  if (!select) return;

  select.innerHTML = PACKAGE_DATA.map((item) => `<option value="${item.country}">${item.country}</option>`).join("");

  select.addEventListener("change", (event) => {
    renderPackage(event.target.value);
  });

  renderPackage(PACKAGE_DATA[0].country);
}

function getChatbotReply(input) {
  const text = input.toLowerCase();

  // Rule-based responses that simulate AI behavior.
  if (text.includes("cheap") || text.includes("budget")) {
    return "For a cheap trip, I recommend Thailand or India. They offer great experiences at lower prices.";
  }
  if (text.includes("luxury")) {
    return "For luxury travel, Switzerland and the United Arab Emirates are great choices.";
  }
  if (text.includes("5 day") || text.includes("5-day")) {
    return "For a short 5-day trip, try France, Thailand, Canada, Switzerland, or India.";
  }
  if (text.includes("7 day") || text.includes("7-day")) {
    return "For a detailed 7-day experience, Japan, Italy, Australia, UAE, and the United States are ideal.";
  }

  // Country-specific replies.
  const foundPackage = PACKAGE_DATA.find((pkg) => text.includes(pkg.country.toLowerCase()));
  if (foundPackage) {
    return `${foundPackage.country} package: ${foundPackage.duration}, total ${foundPackage.totalPrice}. Top places: ${foundPackage.sightseeing.join(", ")}.`;
  }

  return "I can help with cheap trips, luxury travel, 5-day or 7-day plans, and country-specific packages. Try asking: 'Japan trip' or 'cheap trip'.";
}

function setupChatbot() {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const chatWindow = document.getElementById("chatWindow");
  if (!form || !input || !chatWindow) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;

    chatWindow.innerHTML += `<div class="chat-message user">${userText}</div>`;
    const botReply = getChatbotReply(userText);
    chatWindow.innerHTML += `<div class="chat-message bot">${botReply}</div>`;

    input.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });
}

requireLogin();
handleSignup();
handleLogin();
setupDashboard();
setupPackages();
setupChatbot();
