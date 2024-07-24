const handleSearchClick = async (event) => {
    event.preventDefault();

    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value;
    searchInput.value = '';
    console.log(searchValue);
    
    const dataRequested = await fetchApiData(searchValue);
    if (dataRequested) {
        displayData(dataRequested); 
    }
    else {
        resetData();
        console.error('Failed to fetch data');
    }
}

const fetchApiData = async (city) => {
    try {
        const encodedCityValue = encodeURIComponent(city);
        const response = await fetch(`/api/data?city=${encodedCityValue}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
    
        return data;
    } catch (error) {
        console.error(error);

        return null;
    }
}

const displayData = (data) => {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    if (data && data.message) { 
        const cityNameDiv = document.createElement('div');
        cityNameDiv.id = 'city-name';
        cityNameDiv.textContent = data.weatherData.cityName;

        const weatherIconDiv = document.createElement('div');
        weatherIconDiv.id = 'weather-icon';
        weatherIconDiv.innerHTML = `<img src="/images/${data.weatherData.icon}.png" alt="Weather icon">`;

        const temperatureDiv = document.createElement('div');
        temperatureDiv.id = 'temperature';
        temperatureDiv.textContent = `${data.weatherData.temperature}°C`;

        const feelsLikeDiv = document.createElement('div');
        feelsLikeDiv.id = 'feels-like';
        feelsLikeDiv.textContent = `Feels like: ${data.weatherData.feelsLike}°C`;

        const weatherDescriptionDiv = document.createElement('div');
        weatherDescriptionDiv.id = 'weather-description';
        const description = data.weatherData.description;
        weatherDescriptionDiv.textContent = description;

        const humidityDiv = document.createElement('div');
        humidityDiv.id = 'humidity';
        humidityDiv.textContent = `Humidity: ${data.weatherData.humidity}%`;

        dataContainer.appendChild(cityNameDiv);
        dataContainer.appendChild(weatherIconDiv);
        dataContainer.appendChild(temperatureDiv);
        dataContainer.appendChild(feelsLikeDiv);
        dataContainer.appendChild(weatherDescriptionDiv);
        dataContainer.appendChild(humidityDiv);

    } else {
        dataContainer.textContent = 'Error displaying data';
    }
}

const resetData = () => {  
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Error fetching data. Please try again.';
    dataContainer.appendChild(errorDiv);
}