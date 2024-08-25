import '../styles/style.scss';

const geonamesUsername = 'bessan'; 
const geonamesBaseURL = 'http://api.geonames.org/searchJSON?q=';
const weatherbitApiKey = 'f2d47f64cd9e4dcda7e0908916a0e4d9'; 
const pixabayApiKey = '45574350-2452279639fe29c4c202ee714';

const getCityData = async (city) => {
    const url = `${geonamesBaseURL}${city}&maxRows=10&username=${geonamesUsername}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const getWeatherData = async (latitude, longitude) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherbitApiKey}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;  // بيانات الطقس المستقبلية
        } else {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const getImage = async (city) => {
    const url = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(city)}&image_type=photo`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data.hits && data.hits.length > 0) {
                return data.hits[0].webformatURL; 
            } else {
                throw new Error('No images found');
            }
        } else {
            throw new Error('Error fetching images');
        }
    } catch (error) {
        console.error('Error:', error);
        return null; 
    }
};

const updateWeatherInfo = (weatherData) => {
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('weather-description');
    const forecastElement = document.getElementById('forecast');

    if (weatherData && weatherData.data && weatherData.data.length > 0) {
        const todayForecast = weatherData.data[0]; // بيانات الطقس لليوم الأول
        temperatureElement.innerText = `Temperature: ${todayForecast.temp} °C`;
        descriptionElement.innerText = `Description: ${todayForecast.weather.description}`;
        
        // عرض توقعات الأيام القادمة
        forecastElement.innerHTML = '<h4>Upcoming Forecast:</h4>';
        weatherData.data.forEach(day => {
            const forecastItem = document.createElement('div');
            forecastItem.innerText = `Date: ${day.valid_date} - Temp: ${day.temp} °C - Description: ${day.weather.description}`;
            forecastElement.appendChild(forecastItem);
        });
    } else {
        console.error('No weather data found');
    }
};

const calculateTripLength = () => {
    const tripDate = new Date(document.getElementById('trip-date').value); 
    const endDate = new Date(document.getElementById('end-date').value); 
    const tripLengthElement = document.getElementById('trip-length');

    if (tripDate && endDate) {
        const timeDiff = endDate - tripDate;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

        if (daysDiff > 0) {
            tripLengthElement.innerText = `Length of trip: ${daysDiff} days`;
        } else {
            tripLengthElement.innerText = 'End date must be after the start date.';
        }
    } else {
        tripLengthElement.innerText = 'Please select both trip date and end date.';
    }
};

document.getElementById('generate').addEventListener('click', async () => {
    const city = document.getElementById('city').value;

    if (city) {
        const cityData = await getCityData(city);
        
        if (cityData && cityData.geonames && cityData.geonames.length > 0) {
            const firstResult = cityData.geonames[0];
            const latitude = firstResult.lat;
            const longitude = firstResult.lng;
            const country = firstResult.countryName;

            document.getElementById('latitude').innerText = `Latitude: ${latitude}`;
            document.getElementById('longitude').innerText = `Longitude: ${longitude}`;
            document.getElementById('country').innerText = `Country: ${country}`;

            const weatherData = await getWeatherData(latitude, longitude);
            if (weatherData) {
                updateWeatherInfo(weatherData); // استدعاء الدالة لتحديث واجهة المستخدم
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

            // تحديث طول الرحلة بعد الحصول على البيانات
            calculateTripLength(); 
        } else {
            console.error('No data found for the city');
        }
    } else {
        console.error('Please enter a city');
    }
});

const updateCountdown = () => {
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
