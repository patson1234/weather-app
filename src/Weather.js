import React, { useState, useEffect } from 'react'
const api = {
    key: "d74cc8b71b7944bfc9add9cc8874cde7",
    base: "https://api.openweathermap.org/data/2.5/"

}
function Weather() {
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(sucess, err)

    }, [])
    const sucess = async data => {
        await fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.a6625897af005493033e2558ee228a9c&lat=18.5069&lon=73.8711&format=json`)
            .then(res => res.json())
            .then(result => {
                getDefaultWeather(result.address.city)
            });
    }
    const getDefaultWeather = async data => {
        await fetch(`${api.base}weather?q=${data}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQuery('');
                console.log(result);
            });
    }
    const err = async error => {
        console.error(error)
    }
    const search = async event => {
        if (event.key === 'Enter') {
            await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                });
        }
    }
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="location-box">
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="date">{dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {Math.round(weather.main.temp)}°c
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                            <div className='description'>{weather.weather[0].description}</div>
                        </div>
                    </div>
                ) : ('')}
            </main>
        </div>
    )
}

export default Weather
