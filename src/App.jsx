import { useState } from 'react'
import SearchForm from './assets/SearchForm';
import LocationInfo from './assets/LocationInfo';
import ErrorMessage from './assets/ErrorMessage';
import Weather from './Weather';

function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({});
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState([]);

  const accessToken = import.meta.env.VITE_LOCATION_ACCESS_TOKEN;

  async function getLocation() {
    if (!city) {
      setError("Check your spelling!");
      setLocation({});
      return;
    }

    let url = `https://us1.locationiq.com/v1/search?key=${accessToken}&q=${city}&format=json`;
    // try {
    let response = await fetch(url);
    let jsonData = await response.json();
    if (jsonData.error) {
      setError("Check the spelling!");
      // setLocation({});
      // setWeatherData([]);
    } else {
      let locationData = jsonData[0];
      setLocation(locationData);
      setError('');


      if (locationData.lat && locationData.lon) {
        try {
          let weatherResponse = await fetch(`http://localhost:3000/weather?lat=${locationData.lat}&lon=${locationData.lon}`);
          let weatherData = await weatherResponse.json();
          setWeatherData(weatherData);
        }
        catch (error) {
          setError("Error fetching weather data. Did you type the City correctly?");
        }
      }
    }
      
    // catch(error) {
    //   setError("Error fetching location data. Did you type the City correctly?");
    //   setWeatherData([]);
  // }
}

return (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <SearchForm setCity={setCity} getLocation={getLocation} />
        {error && <ErrorMessage error={error} />}
        {location.display_name && <LocationInfo location={location} accessToken={accessToken} />}
        {weatherData.length > 0 && <Weather weatherData={weatherData} />}
      </div>
    </div>
  </div>
)
}

export default App
