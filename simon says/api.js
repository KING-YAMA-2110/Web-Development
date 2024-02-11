
async function getGeoCoordinates(location) {
    let openCageApiKey = 'aeeb4d37cae04943a9b61fda31904d19';
    let geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${openCageApiKey}&limit=1`;
    try {
        let response = await fetch(geocodeUrl);
        let data = await response.json();
        if (data.results.length > 0) {
            return data.results[0].geometry;
        } else {
            throw new Error('Location not found. Please try another query.');
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        throw error;
    }
}

async function fetchAirPollutionHistory(lat, lon, start, end) {
    let openWeatherApiKey = '7f26a30647ac91d361ee968441e2980e';
    let airPollutionUrl = `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${start}&end=${end}&appid=${openWeatherApiKey}`;
    try {
        let response = await fetch(airPollutionUrl);
         data = await response.json();
        return data;
    } catch (error) {
        console.error('Air pollution API error:', error);
        throw error;
    }
}

function displayData(data) {
    let displayDiv = document.getElementById('dataDisplay');
    displayDiv.innerHTML = ''; 

    if (data.list && data.list.length > 0) {
        data.list.forEach((item) => {
            let date = new Date(item.dt * 1000).toLocaleString();
            let content = `<div class="data-item"><strong>Date:</strong> ${date}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>AQI:</strong> ${item.main.aqi}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Carbon Monoxide(CO) emission:</strong>${item.components.co}`;
            displayDiv.innerHTML += content;
        });
    } else {
        displayDiv.innerHTML = '<div>No air pollution data found for this location and time range.</div>';
    }
}

function displayError(message) {
   let displayDiv = document.getElementById('dataDisplay');
    displayDiv.innerHTML = `<div class="error">${message}</div>`;
}

async function getAirPollutionHistory() {
    let location = document.getElementById('location').value;
    if (!location) {
        displayError('Please enter a location.');
        return;
    }

    try {
        let geoCoordinates = await getGeoCoordinates(location);
        
       
        let end = Math.floor(Date.now() / 1000);
        let start = end - 86400; 
        
        let airPollutionData = await fetchAirPollutionHistory(geoCoordinates.lat, geoCoordinates.lng, start, end);
        displayData(airPollutionData);
    } catch (error) {
        displayError(error.message);
    }
}
