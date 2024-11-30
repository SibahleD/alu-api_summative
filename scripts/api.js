// DOM Elements
const mainContainer = document.querySelector("main"); // Main container for news articles
const navLinks = document.querySelectorAll(".nav-bar .nav-link"); // Navigation links for categories
const apiKey = "utkjLy5Tm1cXUNSQGpbOGr1PKEphyYYZ"; // NY Times API key

// Generate UI for news articles
const generateNewsUI = (articles) => {
  mainContainer.innerHTML = ""; // Clear previous content

  if (!articles.length) {
    mainContainer.innerHTML = `
      <p class="no-results">No news articles found. Please try another category.</p>
    `;
    return;
  }

  articles.forEach((article) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");

    newsCard.innerHTML = `
      <div class="news-image-container">
        <img
          src="${article.multimedia?.[0]?.url || "images/error404.jpg"}"
          alt="${article.title || "News Image"}"
          onerror="this.src='images/error404.jpg';"
        />
      </div>
      <div class="news-content">
        <h2 class="news-title">${article.title || "Untitled"}</h2>
        <p class="news-description">${article.abstract || "No description available."}</p>
        <a href="${article.url || "404.html"}" target="_blank" class="view-button">Read More</a>
      </div>
    `;

    mainContainer.appendChild(newsCard);
  });
};

// Fetch news from the NY Times API
// Fetch news from the NY Times API
const fetchNews = async (category) => {
  mainContainer.innerHTML = `
    <p class="load">Loading...</p>
  `; // Loading state

  const requestURL = `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`;

  if (!navigator.onLine) {
    mainContainer.innerHTML = `
      <p class="error-message">No internet connection. Please check your connection and try again.</p>
    `;
    return;
  }

  try {
    const response = await fetch(requestURL);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Filter articles for science to exclude the first two results
    const filteredArticles = category === "science" ? data.results.slice(2) : data.results;

    generateNewsUI(filteredArticles); // Populate the UI with fetched articles
  } catch (error) {
    console.error("Failed to fetch news:", error);
    mainContainer.innerHTML = `
      <p class="error-message">Unable to fetch news. Please try again later.</p>
    `;
  }
};


// Handle category click event
const handleCategoryClick = (event) => {
  event.preventDefault(); // Prevent default link behavior
  const category = event.target.dataset.category; // Get category from data attribute

  // Check for "search" option
  if (category === "search") {
    window.location.href = "search.html"; // Redirect to search.html
    return;
  }

  // Check for "home" option
  if (category === "home") {
    window.location.href = "index.html"; // Redirect to index.html
    return;
  }

  // Otherwise, proceed with fetching news for the selected category
  navLinks.forEach((link) => link.classList.remove("active")); // Remove active state from all links
  event.target.classList.add("active"); // Add active state to the clicked link

  fetchNews(`${category}`); // Fetch and display news for the selected category
};

// Initialize the app
const init = () => {
  if (!mainContainer || !navLinks) {
    console.error("Required DOM elements are missing.");
    return;
  }

  // Attach click event listeners to navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", handleCategoryClick);
  });

  // Fetch news for the default category (home)
  fetchNews("home");
};

// Run the app
init();
