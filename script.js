// Get references to the elements
const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const weatherResult = document.getElementById('weather-result');
const loadingMessage = document.getElementById('loadingMessage');

// WeatherAPI key (replace with your actual API key from WeatherAPI)
const apiKey = ("e0aa894c438b47dc81275718240912") ; // Replace with your actual WeatherAPI key

// Event listener for form submission
weatherForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload
    const cityName = cityInput.value.trim();
    if (cityName) {
        getWeather(cityName);
    }
});


function getWeather(city) {
    
    loadingMessage.style.display = 'block';
    weatherResult.style.display = 'none'; 

    // Fetch weather data from WeatherAPI
    const url = (`https://api.weatherapi.com/v1/current.json?key=f161f384177844c3ae985127241012&q=${city}&aqi=no`);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            loadingMessage.style.display = 'none'; 
            displayWeather(data);  
        })
        .catch(error => {
            loadingMessage.style.display = 'none';
            alert('Error fetching weather data. Please try again.');
        });
}


function displayWeather(data) {
    const location = data.location.name;
    const region = data.location.region;
    const country = data.location.country;
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    weatherResult.innerHTML = `
        <h2>Weather in ${location}, ${region}, ${country}</h2>
        <img src="https:${icon}" alt="weather icon">
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Condition:</strong> ${condition}</p>
    `;
    weatherResult.style.display = 'block'; // Show the weather result
}
