/*
  AI Travel Assistant - Main JavaScript
  Features:
  1) Login / Signup (localStorage)
  2) Package rendering (offline data)
  3) Rule-based chatbot
*/

/* ================= PACKAGE DATA ================= */

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
    country: "Thailand",
    duration: "5-day plan",
    flight: "Round trip from Kolkata to Bangkok - Economy",
    hotels: [
      { name: "Bangkok Plaza", price: "$70/night", rating: "4.1" },
      { name: "Phuket Palm Resort", price: "$85/night", rating: "4.2" }
    ],
    sightseeing: ["Phi Phi Islands", "Grand Palace", "Wat Arun"],
    totalPrice: "$1,200"
  }
];

/* ================= WEATHER DATA ================= */

const WEATHER_DATA = {
  Japan: "Cold, 12°C",
  France: "Mild, 18°C",
  Italy: "Pleasant, 20°C",
  Thailand: "Warm, 30°C"
};

/* ================= PAGE DETECTION ================= */

const page =
  window.location.pathname.split("/").pop() || "index.html";

/* ================= USER FUNCTIONS ================= */

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

/* ================= LOGIN PROTECTION ================= */

function requireLogin() {
  const protectedPages = ["dashboard.html", "packages.html", "chatbot.html"];
  if (protectedPages.includes(page) && !getCurrentUser()) {
    window.location.href = "login.html";
  }
}

/* ================= SIGNUP ================= */

function handleSignup() {
  const form = document.getElementById("signupForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    const users = getUsers();
    const exists = users.find((u) => u.username === username);

    if (exists) {
      setMessage("signupMessage", "Username already exists.", "error");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("ata_users", JSON.stringify(users));

    setMessage("signupMessage", "Signup successful! Redirecting...", "success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}

/* ================= LOGIN ================= */

function handleLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const user = getUsers().find(
      (u) => u.username === username && u.password === password
    );

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

/* ================= DASHBOARD ================= */

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

/* ================= PACKAGES ================= */

function renderPackage(country) {
  const packageDetails = document.getElementById("packageDetails");
  const weatherDisplay = document.getElementById("weatherDisplay");

  const pkg = PACKAGE_DATA.find((item) => item.country === country);
  if (!pkg || !packageDetails || !weatherDisplay) return;

  weatherDisplay.textContent =
    `Weather in ${country}: ${WEATHER_DATA[country] || "No data"}`;

  const hotelList = pkg.hotels
    .map((h) => `<li>${h.name} - ${h.price} (⭐ ${h.rating})</li>`)
    .join("");

  packageDetails.innerHTML = `
    <div class="card">
      <h3>${pkg.country}</h3>
      <p><strong>Duration:</strong> ${pkg.duration}</p>
      <p><strong>Flight:</strong> ${pkg.flight}</p>
      <h4>Hotels</h4>
      <ul>${hotelList}</ul>
      <h4>Sightseeing</h4>
      <ul>${pkg.sightseeing.map(p => `<li>${p}</li>`).join("")}</ul>
      <h3>Total Price: ${pkg.totalPrice}</h3>
    </div>
  `;
}

function setupPackages() {
  const select = document.getElementById("countrySelect");
  if (!select) return;

  select.innerHTML = PACKAGE_DATA
    .map((item) => `<option value="${item.country}">${item.country}</option>`)
    .join("");

  select.addEventListener("change", (e) => {
    renderPackage(e.target.value);
  });

  renderPackage(PACKAGE_DATA[0].country);
}

/* ================= CHATBOT ================= */

function getChatbotReply(input) {
  const text = input.toLowerCase();

  if (text.includes("cheap") || text.includes("budget")) {
    return "For budget trips, Thailand or India are great choices.";
  }

  if (text.includes("luxury")) {
    return "For luxury travel, Switzerland and UAE are recommended.";
  }

  if (text.includes("5 day")) {
    return "France and Thailand are perfect for 5-day trips.";
  }

  if (text.includes("7 day")) {
    return "Japan and Italy are ideal for 7-day trips.";
  }

  const found = PACKAGE_DATA.find(pkg =>
    text.includes(pkg.country.toLowerCase())
  );

  if (found) {
    return `${found.country}: ${found.duration}, Total ${found.totalPrice}. Top places: ${found.sightseeing.join(", ")}.`;
  }

  return "Ask about cheap trips, luxury trips, 5-day or 7-day plans, or a specific country.";
}

function setupChatbot() {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const chatWindow = document.getElementById("chatWindow");
  if (!form || !input || !chatWindow) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userText = input.value.trim();
    if (!userText) return;

    const userDiv = document.createElement("div");
    userDiv.className = "chat-message user";
    userDiv.textContent = userText;

    const botDiv = document.createElement("div");
    botDiv.className = "chat-message bot";
    botDiv.textContent = getChatbotReply(userText);

    chatWindow.appendChild(userDiv);
    chatWindow.appendChild(botDiv);

    input.value = "";
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });
}

/* ================= INITIALIZE ================= */

requireLogin();
handleSignup();
handleLogin();
setupDashboard();
setupPackages();
setupChatbot();