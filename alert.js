const apiKey = '9d7d50ceb4789656ea5b5b158b3b7765';  

const cityCoordinates = {
    "Delhi": { lat: '28.6139', lon: '77.2090' },
    "Mumbai": { lat: '19.0760', lon: '72.8777' },
    "Bangalore": { lat: '12.9716', lon: '77.5946' },
    "Chennai": { lat: '13.0827', lon: '80.2707' },
    "Hyderabad": { lat: '17.3850', lon: '78.4867' },
    "Kolkata": { lat: '22.5726', lon: '88.3639' },
    "Ahmedabad": { lat: '23.0225', lon: '72.5714' },
    "Pune": { lat: '18.5204', lon: '73.8567' },
    "Jaipur": { lat: '26.9124', lon: '75.7873' },
    "Surat": { lat: '21.1702', lon: '72.8311' },
    "Lucknow": { lat: '26.8467', lon: '80.9462' },
    "Kanpur": { lat: '26.4499', lon: '80.3319' },
    "Nagpur": { lat: '21.1458', lon: '79.0882' },
    "Visakhapatnam": { lat: '17.6868', lon: '83.2185' },
    "Hazaribagh": { lat: '23.8041', lon: '85.3633' }
};

async function fetchWeatherAlerts() {
    const selectedCity = document.getElementById("locationSelect").value;
    const { lat, lon } = cityCoordinates[selectedCity] || cityCoordinates["Hazaribagh"];
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const alertBox = document.getElementById("alertBox");
    const loading = document.getElementById("loading");

    try {
        loading.style.display = "block";
        alertBox.style.display = "none";

        let response = await fetch(apiUrl);

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        let data = await response.json();
        loading.style.display = "none";

        alertBox.innerHTML = `
            🌡️ Temp: ${data.main.temp}°C | 💨 Wind: ${data.wind.speed} m/s | 💧 Humidity: ${data.main.humidity}%
        `;
        alertBox.style.display = "block";

    } catch (error) {
        console.error("Error:", error);
        alertBox.innerHTML = "Error loading alerts. Try again later.";
    }
}
