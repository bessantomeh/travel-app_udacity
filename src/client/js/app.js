import '../styles/style.scss';

// API keys and base URLs
const geonamesUsername = 'bessan'; 
const weatherbitApiKey = 'f2d47f64cd9e4dcda7e0908916a0e4d9';
const pixabayApiKey = '45574350-2452279639fe29c4c202ee714';

const geonamesBaseURL = 'http://api.geonames.org/searchJSON?q=';

// Helper function to handle fetch responses
const handleFetchResponse = async (response) => {
    if (response.ok) {
        return await response.json();
    } else {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message}`);
    }
};

// Fetch city data from GeoNames API
export const getCityData = async (city) => {
    const url = `${geonamesBaseURL}${city}&maxRows=10&username=${geonamesUsername}`;
    try {
        const response = await fetch(url);
        return await handleFetchResponse(response);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Fetch weather data from Weatherbit API
export const getWeatherData = async (latitude, longitude, startDate, endDate) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}&start_date=${startDate}&end_date=${endDate}`;
    try {
        const response = await fetch(url);
        return await handleFetchResponse(response);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Fetch city image from Pixabay API
export const getImage = async (city) => {
    const url = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(city)}&image_type=photo`;
    try {
        const response = await fetch(url);
        const data = await handleFetchResponse(response);
        if (data.hits && data.hits.length > 0) {
            return data.hits[0].webformatURL; 
        } else {
            throw new Error('No images found');
        }
    } catch (error) {
        console.error('Error:', error);
        return null; 
    }
};

// Update weather information on the UI
const updateWeatherInfo = (weatherData, startDate, endDate) => {
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('weather-description');
    const forecastElement = document.getElementById('forecast');

    // تحويل التواريخ المدخلة من المستخدم إلى كائنات Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (weatherData && weatherData.data && weatherData.data.length > 0) {
        temperatureElement.innerText = `Temperature Forecast:`;
        
        forecastElement.innerHTML = '<h4>Forecast for your trip:</h4>';
        weatherData.data.forEach(day => {
            const forecastDate = new Date(day.valid_date);

            // التحقق من أن تاريخ التوقع يقع ضمن النطاق المطلوب
            if (forecastDate >= start && forecastDate <= end) {
                const forecastItem = document.createElement('div');
                forecastItem.innerText = `Date: ${day.valid_date} - Temp: ${day.temp} °C - Description: ${day.weather.description}`;
                forecastElement.appendChild(forecastItem);
            }
        });
    } else {
        console.error('No weather data found');
    }
};

// Calculate and display the length of the trip
const calculateTripLength = () => {
    const tripDate = new Date(document.getElementById('trip-date').value); 
    const endDate = new Date(document.getElementById('end-date').value); 
    const tripLengthElement = document.getElementById('trip-length');

    if (tripDate && endDate) {
        const timeDiff = endDate - tripDate;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

        if (daysDiff > 0) {
            tripLengthElement.innerText = `Length of trip: ${daysDiff} days`;
        } else {
            tripLengthElement.innerText = 'End date must be after the start date.';
        }
    } else {
        tripLengthElement.innerText = 'Please select both trip date and end date.';
    }
};

// Event listener for the "Generate" button click
const init = () => {
    document.getElementById('generate').addEventListener('click', async () => {
        const city = document.getElementById('city').value;
        const tripDate = document.getElementById('trip-date').value;
        const endDate = document.getElementById('end-date').value;

        if (city && tripDate && endDate) {
            const cityData = await getCityData(city);
            
            if (cityData && cityData.geonames && cityData.geonames.length > 0) {
                const firstResult = cityData.geonames[0];
                const latitude = firstResult.lat;
                const longitude = firstResult.lng;
                const country = firstResult.countryName;

                document.getElementById('latitude').innerText = `Latitude: ${latitude}`;
                document.getElementById('longitude').innerText = `Longitude: ${longitude}`;
                document.getElementById('country').innerText = `Country: ${country}`;

                // Pass trip start and end dates to getWeatherData
                const weatherData = await getWeatherData(latitude, longitude, tripDate, endDate);
                if (weatherData) {
                    updateWeatherInfo(weatherData, tripDate, endDate); // تمرير التواريخ هنا
                }

                const cityImageUrl = await getImage(city);
                const imageElement = document.getElementById('image');

                if (imageElement) {
                    if (cityImageUrl) {
                        imageElement.src = cityImageUrl; 
                    } else {
                        console.error('No image found for the city');
                    }
                } else {
                    console.error('Image element not found');
                }

                calculateTripLength(); 
            } else {
                console.error('No data found for the city');
            }
        } else {
            console.error('Please enter a city and select trip dates.');
        }
    });
};

// Update countdown for the trip
export const updateCountdown = () => {
    const tripDate = document.getElementById('trip-date').value; 

    if (tripDate) {
        const currentDate = new Date();
        const selectedDate = new Date(tripDate);
        const timeDifference = selectedDate - currentDate; 

        const daysUntilTrip = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        if (daysUntilTrip >= 0) {
            document.getElementById('countdown').innerText = `Days until your trip: ${daysUntilTrip}`;
        } else {
            document.getElementById('countdown').innerText = 'Your trip date has already passed.';
        }

        localStorage.setItem('tripDate', tripDate);
    } else {
        document.getElementById('countdown').innerText = 'Please select a trip date.';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch(error => console.error('Service Worker registration failed:', error));
}

// Main function to initialize the app
export const mainFunction = () => {
    console.log('App initialized.');
    init(); // Initialize event listeners
};
