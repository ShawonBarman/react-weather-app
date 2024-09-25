import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";

const API_KEY = "5d9840e44a8ae22baed51974ec1bb853"

function App() {
  let [cityName, setCityName] = useState('');
  let [weatherData, setWeatherDetails] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let getData = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (cityName === ""){
      toast.error("Please write a city name first.")
    }
    else{
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((finalResponse) => {
        setIsLoading(false);
        if (finalResponse.cod === "404"){
          setWeatherDetails();
          toast.success("Sorry city not found");
        }
        else{
          setWeatherDetails(finalResponse);
          toast.success("Sucessfully fetched.");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error);
      });
      setCityName('');
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="wrapper1">
          <form onSubmit={getData} className="search">
            <input type="search" placeholder="Enter city name" onChange={(event)=>setCityName(event.target.value)} value={cityName}/>
            <button type="submit" className="button">Search</button>
          </form>
        </div>
        {
          (isLoading)
          ?
          (
            <div id="loader-overlay">
              <div className="loader"></div>
            </div>
          )
          :
          ''
        }
        {
          (weatherData !== undefined)
          ?
          (
            <div className="wrapper2">
              <div className="weather">
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <div className="details">
                    <h2 className="mb-3">Weather in {weatherData.name}, {weatherData.sys.country}</h2>
                    <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="weather img"/>
                    <p><strong>Condition:</strong> {weatherData.weather[0].main} - {weatherData.weather[0].description}</p>
                    <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
                    <p><strong>Feels like:</strong> {weatherData.main.feels_like}°C</p>
                    <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
                    <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                    <p><strong>Visibility:</strong> {weatherData.visibility / 1000} km</p>
                    <p><strong>Sunrise:</strong> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                    <p><strong>Sunset:</strong> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
                    <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
                  </div>
                </div>
              </div>
            </div>
          )
          :
          ''
        }
      </div>
    </>
  );
}

export default App;


