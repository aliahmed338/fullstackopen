import axios from "axios";
const URL = "https://studies.cs.helsinki.fi/restcountries/api";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather";
const api_key = import.meta.env.VITE_SOME_KEY;
const getCountries = () => {
  const request = axios.get(`${URL}/all`);
  return request.then((res) => res.data);
};
const getWeather = (city) => {
  const request = axios.get(
    `${weatherURL}?q=${city}&appid=${api_key}&units=metric`,
  );
  return request.then((res) => res.data);
};

export default { getCountries, getWeather };
