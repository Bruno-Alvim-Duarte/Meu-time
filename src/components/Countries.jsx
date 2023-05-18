import React, { useContext, useEffect, useState } from 'react';
import LoginContext from '../context/LoginContext';

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
  }, [key]);

  console.log(countries);

  return (
    <div>
      {countries.map((country) => (
        <div key={ country.name }>
          <img src={ country.flag } alt={ country.name } />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Countries;
