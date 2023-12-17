import React, { useState, useEffect } from 'react';

const App = () => {
  const [city, setCity] = useState('mumbai');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    // Array of image URLs
    const imageUrls = [
      'https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg',
      'https://images.pexels.com/photos/531756/pexels-photo-531756.jpeg',
      'https://images.pexels.com/photos/1028600/pexels-photo-1028600.jpeg',
      'https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg',
      'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
      'https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg',
      'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg',
      'https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg',
    ];
    

    // Get a random image URL
    const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

    // Set the background image
    setBackgroundImage(`url(${randomImageUrl})`);
  }, []);



  const getWeather = () => {
    const apiKey = 'a1b91a6430ec18c22f2ab6c0d2bb56ee';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setError(null);
      })
      .catch((error) => {
        setWeatherData(null);
        setError('Please Check Your City Name Correctly');
        console.error('Please Check City Name Correctly ', error);
      });
  };

  const handleSearch = () => {
    getWeather();
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    getWeather();
  }, []); // Run once on component mount

  useEffect(() => {
    // Add or remove dark mode class directly on the root HTML element
    const root = document.documentElement;
    root.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center bg-cover  justify-center ${darkMode ? 'dark' : ''}`} style={{ backgroundImage }}>
      <header className={`bg-${darkMode ? 'gray-800' : 'blue-500'} text-white p-4 w-full fixed top-0`}>
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold hover:bg-blue-600 focus:outline-none animate-wavy ">Weather App</div>
          <nav className="flex">
            <button
              onClick={toggleDarkMode}
              className={`bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none ${
                darkMode ? 'bg-yellow-500' : 'bg-indigo-500'
              }`}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </nav>
        </div>
      </header>

      <div className="mt-16 w-full flex justify-center   "> {/* Center the main content */}
        <div className={` opacity-70 w-2/3 p-8 border border-slate-600 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <input
            type="text"
            placeholder="Enter a city name"
            id="city"
            value={city}
            onChange={handleInputChange}
            className={` bg-black font-bold text-2xl  text-orange-400 w-full px-4 py-2 mb-4 border border-slate-600 rounded-md focus:outline-none ${darkMode ? 'border-gray-600  text-orange-400' : 'border-blue-500'}`}
          />
         <button
  onClick={handleSearch}
  id="search-btn"
  className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none animate-wavy`}
>
  Search
</button>


          <div id="result" className="mt-4 flex flex-col items-center">
            {error && <p className="text-red-500">{error}</p>}
            {weatherData && (
              <>
                <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{weatherData.name}</h2>
                <h4 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>{weatherData.weather[0].main}</h4>
                <img
                  src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                  alt="Weather icon"
                  className="mx-auto my-4"
                />
                <h4 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>{weatherData.weather[0].description}</h4>
                <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{weatherData.main.temp} &#176;</h1>
                <div className="flex flex-col md:flex-row md:justify-between mt-4">
                <div className='flex flex-row border border-slate-600 rounded-xl space-x-32'>
    <div className="md:ml-auto border border-slate-600 rounded-xl min-w-[90px] text-center hover:bg-gray-200 transition duration-300 ease-in-out">
        <h4 className={`text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Min</h4>
        <h4 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>{weatherData.main.temp_min}&#176;</h4>
    </div>
    <div className="md:ml-auto border border-slate-600 rounded-xl min-w-[90px] text-center hover:bg-gray-200 transition duration-300 ease-in-out">
        {/* Move to the right side on medium screens and above */}
        <h4 className={`text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Max</h4>
        <h4 className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>{weatherData.main.temp_max}&#176;</h4>
    </div>
</div>

                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <footer className={`mt-8 text-${darkMode ? 'white' : 'gray-600'} text-center p-4`}>
        © [2023] [Rahul Choudhary (IIT BHU)]. All rights reserved. | Privacy Policy | Terms of Service
      </footer>
    </div>
  );
};

export default App;
