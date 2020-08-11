const api = {
    key: "af4b3b80e7eec4d936ef851514dd5a08",
    baseurl: "https://api.openweathermap.org/data/2.5/weather?"
}



window.addEventListener('load', () => {
    let longitude, latitude;
    let key = ""

    if(navigator.geolocation) {




        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;

            const url = `${api.baseurl}lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`
            
            // const api = `http://api.weatherstack.com/current?type=city&access_key=983e556bb960c2eb0355faa860d92456&query=24.250,89.917`;
            fetch(url)
            .then(response => response.json())
            .then(data => {
                displayDOM(data);
            })
            .catch(() => {alert("someting is wrong. Try again")});
            
        });

    }
});


const searchBox = document.querySelector('.search-box');

searchBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        getResult(searchBox.value);
    }
});

function getResult(cityName) {
    const url = `${api.baseurl}q=${cityName}&units=metric&appid=${api.key}`;
    fetch(url)
    .then(resposne => resposne.json())
    .then(data => {
        displayDOM(data);
    })
    .catch(() => {alert("someting is wrong. Try again")})
}

function displayDOM(data) {
    const temp = data.main.temp;
    const weather = data.weather[0].main;
    const maxTemp = data.main.temp_max;
    const minTemp = data.main.temp_min;

    document.querySelector('.temp').innerHTML = `${temp}<span>°C</span>`;
    document.querySelector('.city').innerText = `${data.name}, ${data.sys.country}`;
    document.querySelector('.weather').innerText = weather;
    document.querySelector('.date').innerText = getDate(new Date());
    document.getElementById('min-temp').innerText = minTemp;
    document.getElementById('max-temp').innerText = maxTemp;
}

function getDate(date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dateFormat = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    return(dateFormat);
}