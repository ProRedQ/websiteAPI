// Wyświetlanie "tytułu", oraz wyszukiwanego miasta
document.getElementById("city").textContent = "How's the Weather?";

function Check() {
    const city = document.getElementById("search").value;
    document.getElementById("city").textContent = "Weather in: " + city;
    console.log(city);
    getWeather(`${city}`);
}

// Wyświetlanie aktualnej pogody za pomocą API openweathermap
async function getWeather(city) {
    try {
        const apiKey = ""; // Your Key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`; // Url który korzysta z dwóch poprzednio zdefiniowanych stałych
    
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status ${response.status}`);

        const data = await response.json();
        console.log(data);
        const temp = Math.round(data.main.temp);
        const feels_like = Math.round(data.main.feels_like);
        const wind_speed = Math.round(data.wind.speed);
        const desc = data.weather[0].description;
        const pressure = data.main.pressure;
        // document.getElementById("city").textContent = data.name;
        document.getElementById("temp").textContent = temp + " °C";
        document.getElementById("desc").textContent = desc;
        document.getElementById("feel").textContent = feels_like + " °C";
        document.getElementById("wind").textContent = wind_speed + " [km/h]";
        document.getElementById("pressure").textContent = pressure;
    }
    catch (error) {
        console.error("Błąd:", error);
    }
}

// Generowania obrazka za pomocą API Unsplash
async function fetchImage() {
    const accessKey = ''; // Your API Key
    const query = document.getElementById("search-img").value; // Zapytanie z inputa
    const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${accessKey}`;
    console.log(url);

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('API Response:', data); // Logowanie odpowiedzi API
        const smallImageUrl = data.urls.small;
        console.log(smallImageUrl);
        console.log(`Url: ${data.urls.small}`);

        const imageContainer = document.getElementById('imageContainer');
        imageContainer.style.backgroundImage = `url("${smallImageUrl}")`;
        imageContainer.style.backgroundSize = 'cover'; // Ustawienie, by obrazek wypełniał cały div
        imageContainer.style.backgroundPosition = 'center'; // Centrowanie obrazka
    } catch (error) {
        console.error('Błąd pobierania obrazka:', error);
    }
}

// Generowanie informacji o kraju za pomocą restCountries API
async function checkCountry() {
    const query = document.getElementById("search-country").value;
    // const url = `https://restcountries.com/v3.1/name/${query}`;
    const url = `https://restcountries.com/v3.1/all`;
    console.log(url);

    document.getElementById("textContainer").style.display = "flex";

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Country response: ", data);

        function searchData(data, query) {
            return data.filter(item => item.name.common.toLowerCase() === query.toLowerCase());
        }

        const results = searchData(data, query);
        console.log(results);

        const name = results[0].name.common;
        const capital = results[0].capital;
        const continents = results[0].continents;
        const currencies = Object.values(results[0].currencies)[0].name;
        const languages = Object.values(results[0].languages)[0];
        const flagUrl = results[0].flags.png;
        console.log(flagUrl);
        const flag = document.getElementById("flag");
        console.log(name, capital, continents, currencies, languages)

        document.getElementById("name").textContent = `${name}`;
        document.getElementById("capital").textContent = `${capital}`;
        document.getElementById("continents").textContent = `${continents}`;
        document.getElementById("currency").textContent = `${currencies}`;
        document.getElementById("language").textContent = `${languages}`;

        flag.style.backgroundImage = `url("${flagUrl}")`;
        flag.style.backgroundSize = 'cover'; // Ustawienie, by obrazek wypełniał cały div
        flag.style.backgroundPosition = 'center'; // Centrowanie obrazka

    } catch(error) {
        console.error("Błąd pobierania informacji o kraju: ", error);
    }
}