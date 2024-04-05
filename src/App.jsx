import { useState } from 'react'
import SearchForm from './assets/SearchForm';
import LocationInfo from './assets/LocationInfo';
import ErrorMessage from './assets/ErrorMessage';
import Weather from './Weather';
import Movies from './Movies';
// import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({});
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [movieData, setMovieData] = useState([]);

  const accessToken = import.meta.env.VITE_LOCATION_ACCESS_TOKEN;

  async function getLocation() {
    if (!city) {
      setError("Check your spelling!");
      setLocation({});
      return;
    }

    let url = `https://us1.locationiq.com/v1/search?key=${accessToken}&q=${city}&format=json`;
    let response = await fetch(url);
    let jsonData = await response.json();
    if (jsonData.error) {
      setError("Check the spelling!");
    } else {
      let locationData = jsonData[0];
      setLocation(locationData);
      setError('');


      if (locationData.lat && locationData.lon) {
        try {
          let weatherResponse = await fetch(`https://city-explorer-api-hep3.onrender.com/weather?lat=${locationData.lat}&lon=${locationData.lon}`);
          let weatherData = await weatherResponse.json();
          setWeatherData(weatherData);

          const movieResponse = await fetch(`https://city-explorer-api-hep3.onrender.com/movies?city=${city}`);
          const movieData = await movieResponse.json();
          setMovieData(movieData);
        }
        catch (error) {
          setError("Error fetching weather or movie data. Did you type the City correctly?");
        }
      }
    }
      
}

return (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <SearchForm setCity={setCity} getLocation={getLocation} />
        {error && <ErrorMessage error={error} />}
        {location.display_name && <LocationInfo location={location} accessToken={accessToken} />}
        {weatherData.length > 0 && <Weather weatherData={weatherData} />}
        {movieData.length > 0 && <Movies movieData={movieData}/>}
      </div>
    </div>
  </div>
)
}

export default App
