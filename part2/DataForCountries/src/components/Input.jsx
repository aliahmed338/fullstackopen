const Input = ({ countryName, filterCountries }) => {
  return <input value={countryName} onChange={filterCountries} />;
};

export default Input;
