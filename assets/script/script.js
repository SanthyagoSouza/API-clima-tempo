document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#cityname').value

    if (!cityName) {
        return alert('Digite uma cidade por favor!')
    }

    const env = '867f646105c96d1c713dcb9538f9f6a6';
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${env}&units=metric&lang=pt_br`;

    console.log(apiurl);

    const result = await fetch(apiurl);
    const json = await result.json();
    console.log(json)
    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,

        })
    } else {

        showAlert('Não foi possivel localizar...!')
    }
})

function showInfo(json) {
    showAlert('');

    document.querySelector("#weather").classList.add('show')
    document.querySelector("#title").innerHTML = `${json.city},${json.country}`;
    document.querySelector("#tempvalue").innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')}<sup> Cº</sup>`;
    document.querySelector("#tempimg").setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector("#wind").innerHTML = `${json.windSpeed.toFixed(1).toString()} <sup> KM/h</sup>`;
    document.querySelector("#humidity").innerHTML = `${json.humidity.toString()} <sup> %</sup>`;
    document.querySelector("#tempmax").innerHTML = `${json.temp_max.toFixed(1).toString().replace('.', ',')} <sup> Cº</sup>`;
    document.querySelector("#tempmin").innerHTML = `${json.temp_min.toFixed(1).toString().replace('.', ',')} <sup> Cº</sup>`;
    document.querySelector("#tempdescription").innerHTML = `${json.description}`;


}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}


/*
{
    "coord": {
        "lon": -40.3078,
        "lat": -20.1286
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "céu limpo",
            "icon": "01n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 22.7,
        "feels_like": 23.06,
        "temp_min": 22.7,
        "temp_max": 23.59,
        "pressure": 1020,
        "humidity": 78,
        "sea_level": 1020,
        "grnd_level": 1012
    },
    "visibility": 10000,
    "wind": {
        "speed": 2.06,
        "deg": 360
    },
    "clouds": {
        "all": 0
    },
    "dt": 1726015731,
    "sys": {
        "type": 1,
        "id": 8474,
        "country": "BR",
        "sunrise": 1725957699,
        "sunset": 1726000490
    },
    "timezone": -10800,
    "id": 3447779,
    "name": "Serra",
    "cod": 200
}

*/


