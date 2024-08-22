const username = 'bessan'; 
const baseURL = 'http://api.geonames.org/searchJSON?q=';

const getCityData = async (city) => {
    const url = `${baseURL}${city}&maxRows=10&username=${username}`;
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

document.getElementById('generate').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    
    if (city) {
        const cityData = await getCityData(city);
        
        if (cityData && cityData.geonames.length > 0) {
            const firstResult = cityData.geonames[0];
            const latitude = firstResult.lat;
            const longitude = firstResult.lng;
            const country = firstResult.countryName;

            document.getElementById('latitude').innerText = `Latitude: ${latitude}`;
            document.getElementById('longitude').innerText = `Longitude: ${longitude}`;
            document.getElementById('country').innerText = `Country: ${country}`;

            updateCountdown();
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
