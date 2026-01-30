import { useState } from "react";
import Input from "./components/Input";
import { useEffect } from "react";
import countryServices from "./services/country";
import ViewCountries from "./components/viewCountries";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [filterdCountries, setFilterdCountries] = useState([]);

  useEffect(() => {
    countryServices.getCountries().then((allCountries) => {
      setCountries(allCountries);
    });
  }, []);

  const filterCountries = (e) => {
    setCountryName(e.target.value);
    const filterd = countries.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilterdCountries(filterd);
  };

  return (
    <div>
      <Input countryName={countryName} filterCountries={filterCountries} />

      <ViewCountries
        filterdCountries={filterdCountries}
        setFilterdCountries={setFilterdCountries}
      />
    </div>
  );
};

export default App;
