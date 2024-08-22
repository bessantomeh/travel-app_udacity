const apiKey = '5b84f45cd0e1edb84f2cd2cf43ac2575'; 
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';

const getWeather = async (city) => {
    const url = `${baseURL}${city}&appid=${apiKey}&units=metric`;
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

const postWeatherData = async (path, data) => {
    try {
        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const updateUI = async () => {
    try {
        const response = await fetch('/all');
        if (response.ok) {
            const data = await response.json();
            document.getElementById('temperature').innerText = `Temperature: ${data.temperature}°C`;
            document.getElementById('date').innerText = `Date: ${data.date}`;
            document.getElementById('user-response').innerText = `Feelings: ${data.userResponse}`;
        } else {
            console.error('Error retrieving data from server');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

document.getElementById('generate').addEventListener('click', async () => {
    const city = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
    
    if (city) {
        const weatherData = await getWeather(city);
        
        if (weatherData) {
            console.log('Weather Data:', weatherData);

            const temperature = weatherData.main.temp;
            const date = new Date().toLocaleDateString(); 

            const postData = {
                temperature: temperature,
                date: date,
                userResponse: userResponse
            };

            const serverPath = '/addData';
            await postWeatherData(serverPath, postData);
            
            // تحديث الواجهة بعد إرسال البيانات
            await updateUI();
        }
    } else {
        console.error('Please enter a city');
    }
});

document.getElementById('yourButton').addEventListener('click', function() {
    mainFunction();
  });
  
