import { useState } from "react";
import countryServices from "../services/country";
import { useEffect } from "react";

const ViewCountries = ({ filterdCountries, setFilterdCountries }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (filterdCountries.length === 1) {
      const capital = filterdCountries[0].capital[0];

      countryServices.getWeather(capital).then((data) => {
        setWeather(data);
      });
    }
  }, [filterdCountries]);

  if (filterdCountries.length === 1) {
    return (
      <div>
        <h1>{filterdCountries[0].name.common}</h1>
        <div>
          Capital{" "}
          {filterdCountries[0].capital.map((c) => (
            <div>{c}</div>
          ))}
        </div>
        <div>Area {filterdCountries[0].area}</div>
        <h2>Languages</h2>
        <ul>
          {Object.values(filterdCountries[0].languages).map((l) => (
            <li>{l}</li>
          ))}
        </ul>
        <img
          src={filterdCountries[0].flags.svg}
          alt={filterdCountries[0].flags.alt}
        />
        {weather && (
          <div>
            {" "}
            <p>temperature {weather?.main.temp} °C</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>wind {weather?.wind.speed} m/s</p>
          </div>
        )}
      </div>
    );
  }
  const display = (name) => {
    const country = filterdCountries.filter((c) => c.name.common === name);
    setFilterdCountries(country);
  };

  return (
    <div>
      {filterdCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        filterdCountries.map((c) => (
          <div>
            {c.name.common}
            <button onClick={() => display(c.name.common)}>Show</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewCountries;
