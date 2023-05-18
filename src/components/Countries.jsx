import React, { useContext, useEffect, useState } from 'react';
import LoginContext from '../context/LoginContext';
import HomeContext from '../context/HomeContext';
// import countriesMock from '../mocks/countries';

function Countries() {
  const [countries, setCountries] = useState([]);
  const { key } = useContext(LoginContext);
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('x-rapidapi-key', key);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch('https://v3.football.api-sports.io/countries', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.response);
        setCountries(result.response);
      });
    // setCountries(countriesMock.response);
  }, [key]);

  const { setToRender,
    setTypeSelected, setCountryOrSeasonSelected } = useContext(HomeContext);
  const handleClickCountry = (country) => {
    setToRender('leagues');
    setCountryOrSeasonSelected(country);
    setTypeSelected('country');
  };

  return (
    <div>
      {countries.map((country) => (
        <button key={ country.name } onClick={ () => handleClickCountry(country.name) }>
          <img src={ country.flag } alt={ country.name } />
          <p>{country.name}</p>
        </button>
      ))}
    </div>
  );
}

export default Countries;
