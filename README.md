# NewScope News Application

NewScope is a modern web application that allows users to browse and search for the latest and most reliable news articles across various categories. It leverages the New York Times API to provide up-to-date articles, ensuring users stay informed about world events, science, technology, sports, and more.

## Features

- **Category-based News**: Browse news articles by predefined categories like World, Science, Technology, and Sports.

- **Search Functionality**: Search for specific topics or keywords to find relevant news articles.
- **Dynamic User Interface**: Articles are displayed dynamically with a clean and user-friendly design.
- **Responsive Design**: The application is optimized for both desktop and mobile devices.
- **Offline Notification**: Alerts users when there is no internet connection.

## How to Run the Application Locally

Follow these steps to run the NewScope application on your local machine:

  ## Prerequisites
Ensure you have:
 - a web browser installed (Chrome, Firefox, etc).
 - A text editor (VS Code, Linux Vi) to edit and view the code.
 - An internet connection to fetch news data from the New York Times API.

  ## Installation Steps

1. Clone the Repository
Clone the repository to your local machine using the following command:

     git clone <repository-url>


2. Navigate to the Project Directory      

    cd alu-api-summative


3. Add Your API Key
The application uses the New York Times API to fetch news data.
Replace the apiKey value in both scripts/api.js and scripts/search.js with your own API key:

    const apiKey = "your-nyt-api-key-here";

You can obtain an API key by signing up at the New York Times Developer Portal.

4. Open the Application

Open the index.html file in your browser to start searching!

## How to Deploy the Application

Follow these steps to run the NewScope application on your own seerver:

1. Clone the Repository
Clone the repository to the server using the following command:

        git clone <repository-url>

2. Navigate to the Project Directory      

        cd <repository-folder-name>

3. Edit configuration files (NginX Servers)
Edit the nginx onfigurion file found in /etc/nginx/sites-available/default, to direct the system to the index.html file.
                                            
     server {
        listen 80 default_server;
        listen [::]:80 default_server;
        root /var/www/html;
            index index.html;
     }

4. Restart Nginx
Restart nginx for changes to configurations to take effect without stopping the server

         sudo system nginx restart

Load up the website using either the IP address to start searching!

## File Structure

├── index.html       # Home page of the application
├── search.html      # Search page for querying specific news topics
├── 404.html         # Custom 404 error page
├── styles/
│   ├── styles.css   # Main CSS file for the home page
│   ├── search.css   # CSS file for the search page
│   ├── 404style.css # CSS file for the 404 error page
├── scripts/
│   ├── api.js       # Handles fetching and displaying news articles by category
│   ├── search.js    # Handles search functionality and displaying results
│   ├── hamburger.js # Script for responsive navigation
├── images/          # Contains images used in the application
└── README.md        # Documentation file (this file)


## API Used

**New York Times API**
This application utilizes the following endpoints from the New York Times API:

Top Stories API: Fetches the latest articles by category.
[API Documentation](https://developer.nytimes.com/docs/archive-product/1/overview)
Article Search API: Allows users to search for news articles by keywords.
[API Documentation](https://developer.nytimes.com/docs/articlesearch-product/1/overview)

## Screenshots

1. Home Page
The home page provides a dynamic display of the latest news articles by category.


2. Search Page
The search page allows users to query specific topics.


3. 404 Page
The custom 404 page provides a friendly message for invalid routes.


## Challenges Faced
- Finding and maintaining a clear theme throughout the website files. Methods such as using var() to have clear color pallete for the website were helpful
- Finding a neat and concise way of sorting files or this application. Multiple methods were implemente including separating js scripts and css code for easier troubleshooting, and storing similar files in folders (images in /images, js scripts in /scripts, etc.)
- The first two results for "Sports" were unnecessary as one was an invitation to a newsletter (with no link attached) and the other an empty response. Provisions were made within the "api.js" code to exclude them from display.
- Effectively deploying and making neccesary configurations within the web servers, as well as configuring the load balancer.

## Credits

**Developer**: Sibahle Dlamini

**API Provider**: [The New York Times API](https://developer.nytimes.com/)

**Inspiration**: 
[News App | HTML, CSS and Javascript Project](https://www.youtube.com/watch?v=j8TtnNk35Ws)


