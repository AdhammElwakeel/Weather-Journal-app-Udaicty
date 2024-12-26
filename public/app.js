const apiKey = 'fce9534bdbf120b7082769c1f9d51329'; 

// Function to fetch weather data directly from OpenWeatherMap
const fetchWeatherData = async (userZip) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${userZip}&appid=${apiKey}&units=imperial`; 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); 
        return data; 
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
};

// Function to perform action on button click
const performAction = async (e) => {
    e.preventDefault(); 
    const userZip = document.getElementById('zip').value;
    const data = await fetchWeatherData(userZip);
    
    if (data) { // Check if data is returned
        document.getElementById('temp').innerHTML = Math.round(data.main.temp) + ' degrees';
        document.getElementById('content').innerHTML = data.name;
        document.getElementById("date").innerHTML = new Date(data.dt * 1000).toLocaleDateString();
    } else {
        document.getElementById('temp').innerHTML = 'Error fetching data';
        document.getElementById('content').innerHTML = '';
        document.getElementById("date").innerHTML = '';
    }
};

// Add event listener to the generate button
document.getElementById('generate').addEventListener('click', performAction);
