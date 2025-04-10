import React, { useEffect, useState } from 'react';
import './WeatherInfo.css';
<script src="https://cdn.jsdelivr.net/npm/particles.js"></script>

interface City {
    id: number;
    name: string;
    country: string;
}

const WeatherInfo: React.FC = () => {
    const [cities, setCities] = useState<City[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [weather, setWeather] = useState<any>(null);
    const [bgVideo, setBgVideo] = useState<string>('');
    const [favorites, setFavorites] = useState<City[]>([]);

    const API_KEY = '28c5260155fb9f79e42ee4a1d7787c9c';

    useEffect(() => {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            setFavorites(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = () => {
        if (selectedCity && !favorites.some((c) => c.id === selectedCity.id)) {
            setFavorites([...favorites, selectedCity]);
        }
    };

    useEffect(() => {
        if (weather) {
            const weatherCondition = weather.weather[0].main.toLowerCase();

            // Tùy chỉnh video nền theo điều kiện thời tiết
            switch (weatherCondition) {
                case 'clear':
                    setBgVideo('/backgrounds/clear.mp4');
                    break;
                case 'rain':
                    setBgVideo('/backgrounds/rain.mp4');
                    break;
                case 'thunderstorm':
                    setBgVideo('/backgrounds/thunderstorm.mp4');
                    break;
                case 'clouds':
                    setBgVideo('/backgrounds/cloud.mp4');
                    break;
                case 'snow':
                    setBgVideo('/backgrounds/snow.mp4');
                    break;
                case 'mist':
                    setBgVideo('/backgrounds/mist.mp4');
                    break;
                case 'drizzle':
                    setBgVideo('/backgrounds/drizzle.mp4');
                    break;
                default:
                    setBgVideo('/backgrounds/default.mp4');
                    break;
            }
        }
    }, [weather]);

    useEffect(() => {
        if (selectedCity) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.name}&appid=${API_KEY}&units=metric&lang=vi`)
                .then((res) => res.json())
                .then((data) => {
                    setWeather(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy thông tin thời tiết:", error);
                });
        }
    }, [selectedCity]);

    useEffect(() => {
        fetch('/city.list.json')
            .then((res) => res.json())
            .then((data) => {
                setCities(data);
            });
    }, []);

    useEffect(() => {
        console.log("Weather Data: ", weather);
        console.log("Background Video: ", bgVideo);
    }, [weather, bgVideo]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSuggestions([]);
            return;
        }

        const filtered = cities
            .filter((city) =>
                city.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 10);

        setSuggestions(filtered);
    }, [searchTerm, cities]);

    useEffect(() => {
        if (!bgVideo) return;

        const videoElement = document.querySelector('.background-video') as HTMLVideoElement;

        if (videoElement) {
            videoElement.load(); // Tải lại video khi thay đổi video
            videoElement.play(); // Phát video
            videoElement.classList.add('show'); // Thêm class show để hiển thị video
        }
    }, [bgVideo]);

    return (
        <div className="weather">
            <h2>Nhập tên thành phố:</h2>
            <br></br>
            <input
                type="text"
                placeholder="VD: Hanoi, Tokyo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="weather__search"
            />

            {suggestions.length > 0 && (
                <ul className="weather__suggestions">
                    {suggestions.map((city) => (
                        <li
                            key={city.id}
                            onClick={() => {
                                setSelectedCity(city);
                                setSearchTerm(`${city.name}, ${city.country}`);
                                setSuggestions([]);
                            }}
                        >
                            {city.name}, {city.country}
                        </li>
                    ))}
                </ul>
            )}

            {weather && (
                <>
                    <h2 className="weather__city">{weather.name}</h2>
                    <p className="weather__datetime">{new Date().toLocaleString('vi-VN')}</p>
                    <div className="weather__main">
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="weather icon"
                        />
                        <h1 className="weather__temp">{Math.round(weather.main.temp)}°C</h1>
                    </div>
                    <p className="weather__desc">{weather.weather[0].description}</p>
                    <div className="weather__extra">
                        <p>💧 Độ ẩm: {weather.main.humidity}%</p>
                        <p>💨 Gió: {weather.wind.speed} m/s</p>
                    </div>
                    <button onClick={addFavorite} className="weather__fav-btn">
                        ❤️ Lưu vào yêu thích
                    </button>
                </>
            )}

            {favorites.length > 0 && (
                <div className="weather__favorites">
                    <h3>🌟 Thành phố yêu thích:</h3>
                    <ul>
                        {favorites.map((city) => (
                            <li
                                key={city.id}
                                onClick={() => {
                                    setSelectedCity(city);
                                    setSearchTerm(`${city.name}, ${city.country}`);
                                }}
                            >
                                {city.name}, {city.country}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {bgVideo && (
                <video className="background-video" autoPlay loop muted playsInline>
                    <source src={bgVideo} type="video/mp4" />
                    <p>Không thể tải video nền.</p>
                </video>
            )}
        </div>
    );
};

export default WeatherInfo;
