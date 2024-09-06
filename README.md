# Travel Planner App

## Project Overview

The **Travel Planner App** is a web application designed to help users plan their trips by providing useful information about their travel destination. Users can input a city name and receive the following details:
- A 7-day weather forecast for the city.
- An image of the city.
- The number of days until the trip starts.
- The total length of the trip.

The application integrates several APIs to retrieve data, including:
- GeoNames API for geographical data.
- Weatherbit API for weather information.
- Pixabay API for city images.

## Node.js Version

This project was developed using **Node.js version 18.18.0**. To ensure compatibility, it is recommended that you use this version or a compatible one when setting up the project. You can check your Node.js version by running:

node -v

## Features

City Data Retrieval: Fetches latitude, longitude, and country name based on the user’s inputted city name using the GeoNames API.
Weather Forecast: Provides a 7-day weather forecast for the selected city using the Weatherbit API.
City Image Display: Retrieves a relevant image of the city using the Pixabay API.
Trip Countdown: Displays the number of days remaining until the trip start date.
Trip Length Calculation: Calculates the duration of the trip in days, from the start date to the end date.

## APIs Used
GeoNames API: Provides geographical information (latitude, longitude, country) based on the city name.

Sign up at: GeoNames
GeoNames Username: bessan
Weatherbit API: Supplies a weather forecast for the location (latitude and longitude).

Sign up at: Weatherbit
Weatherbit API Key: f2d47f64cd9e4dcda7e0908916a0e4d9
Pixabay API: Retrieves a photo representing the city.

Sign up at: Pixabay
Pixabay API Key: 45574350-2452279639fe29c4c202ee714

## Installation Instructions
To set up the project, follow these steps:

Clone the repository:

git clone https://github.com/your-username/travel-planner-app.git

Navigate to the project directory:

cd travel-planner-app

Install the required dependencies:

npm install

Build the project:

npm run build

Start the server:

npm start

## Usage

Once the application is running, open your browser and go to http://localhost:8081.
Input a city name, your trip start date, and end date.
The app will provide weather information, a relevant city image, the trip countdown, and the length of your trip.

## Project Structure
├── dist/                   # Distribution files
├── src/                    # Source files
│   ├── client/             # Client-side code
│   └── server/             # Server-side code
├── package.json            # Project dependencies and scripts
├── webpack.config.js       # Webpack configuration
└── README.md               # Project documentation (this file)
## Future Improvements

Here are some potential features to add to this app:

Add the ability for users to save their trip information.
Display additional city details, such as popular tourist attractions.
Implement a feature to compare weather forecasts between multiple cities.

## License
This project is licensed under the MIT License - see the LICENSE file for details.



