// DOM Elements
const mainContainer = document.querySelector("main"); // Main container for news articles
const navLinks = document.querySelectorAll(".nav-bar .nav-link"); // Navigation links for categories
const searchForm = document.querySelector("#search-form"); // Search form
const searchInput = document.querySelector("#search-input"); // Search input
const headerContainer = document.querySelector("#header-container"); // Container for the header message
const apiKey = "utkjLy5Tm1cXUNSQGpbOGr1PKEphyYYZ"; // NY Times API key

// Ensure main has grid-template-columns set to 1fr
const adjustGridLayout = (isSearchActive) => {
    if (isSearchActive) {
      mainContainer.style.gridTemplateColumns = "repeat(3, 1fr)"
    } else {
      mainContainer.style.gridTemplateColumns = "1fr";
    }
  };



// Generate UI for news articles
const generateNewsUI = (articles) => {
    mainContainer.innerHTML = ""; // Clear previous content
  
    if (!articles.length) {
      mainContainer.innerHTML = `
        <p class="no-results">No news articles found. Please try another search or category.</p>
      `;
      return;
    }
  
    articles.forEach((article) => {
      const newsCard = document.createElement("div");
      newsCard.classList.add("news-card");
  
      // Construct the full image URL
      const imageUrl = article.multimedia?.[0]?.url 
        ? `https://www.nytimes.com/${article.multimedia[0].url}` 
        : "images/error404.jpg"; // Fallback image
  
      newsCard.innerHTML = `
        <div class="news-image-container">
          <img
            src="${imageUrl}"
            alt="${article.headline?.main || "News Image"}"
            onerror="this.src='images/error404.jpg';"
          />
        </div>
        <div class="news-content">
          <h2 class="news-title">${article.headline?.main || "Untitled"}</h2>
          <p class="news-description">${article.abstract || "No description available."}</p>
          <a href="${article.web_url || "404.html"}" target="_blank" class="view-button">Read More</a>
        </div>
      `;
  
      mainContainer.appendChild(newsCard);
    });
  };

  const fetchNews = async (endpoint, params = "") => {
    mainContainer.innerHTML = `
      <p class="load">Loading...</p>
    `; // Loading state
  
    const requestURL = `https://api.nytimes.com/svc/${endpoint}.json?${params}&api-key=${apiKey}`;
  
    if (!navigator.onLine) {
      mainContainer.innerHTML = `
        <p class="error-message">No internet connection. Please check your connection and try again.</p>
      `;
      mainContainer.style.gridTemplateColumns = "1fr"; // Reset to single-column layout
      return;
    }
  
    try {
      const response = await fetch(requestURL);
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Check if there are results
      if (endpoint === "search/v2/articlesearch" && (!data.response.docs || !data.response.docs.length)) {
        mainContainer.innerHTML = `
          <p class="no-results">No news articles found. Please try another search or category.</p>
        `;
        mainContainer.style.gridTemplateColumns = "1fr"; // Reset to single-column layout
        return;
      }
  
      // Adjust to use `response.docs` for the `articlesearch` endpoint
      if (endpoint === "search/v2/articlesearch") {
        generateNewsUI(data.response.docs);
      } else {
        generateNewsUI(data.results); // For other endpoints
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
      mainContainer.innerHTML = `
        <p class="error-message">Unable to fetch news. Please try again later.</p>
      `;
      mainContainer.style.gridTemplateColumns = "1fr"; // Reset to single-column layout
    }
  };
  
  

// Handle category click event
// Reset grid layout for categories
const handleCategoryClick = (event) => {
    event.preventDefault();
    const category = event.target.dataset.category;
  
    if (category === "search") {
      window.location.href = "search.html";
      return;
    }
  
    if (category === "home") {
      window.location.href = "index.html";
      return;
    }
  
    // Reset to single-column layout for category view
    mainContainer.style.gridTemplateColumns = "1fr";
  
    navLinks.forEach((link) => link.classList.remove("active"));
    event.target.classList.add("active");
  
    fetchNews(`topstories/v2/${category}`);
  };
  
  
  
// Handle search form submission
const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    const query = searchInput.value.trim(); // Get the search query
  
    if (!query) {
      alert("Please enter a search term.");
      return;
    }
  
    // Update the header to show the search query
    headerContainer.innerHTML = `<h1>Results for "${query}"</h1>`;
  
    // Change grid layout for the main container
    mainContainer.style.display = "grid";
    mainContainer.style.gridTemplateColumns = "repeat(3, 1fr)"; // Set 3 columns
  
    // Fetch news based on the search query
    fetchNews("search/v2/articlesearch", `q=${encodeURIComponent(query)}`);
  };
  

// Initialize the app
const init = () => {
  if (!mainContainer || !navLinks || !searchForm || !searchInput || !headerContainer) {
    console.error("Required DOM elements are missing.");
    return;
  }

  // Attach click event listeners to navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", handleCategoryClick);
  });

  // Attach submit event listener to the search form
  searchForm.addEventListener("submit", handleSearchSubmit);
};

// Run the app
init();
