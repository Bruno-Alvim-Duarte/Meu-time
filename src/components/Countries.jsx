import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from '../context/LoginContext';

// import countriesMock from '../mocks/countries';

function Countries(props) {
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

  const handleClickCountry = (country) => {
    const { setCountryState } = props;
    setCountryState(country);
  };

  return (
    <div>
      {countries.map((country) => (
        <div key={ country.name }>
          <button onClick={ () => handleClickCountry(country.name) }>
            <img src={ country.flag } alt={ country.name } />
            <p>{country.name}</p>
          </button>
        </div>
      ))}
    </div>
  );
}

Countries.propTypes = {
  setCountryState: PropTypes.func.isRequired,
};

export default Countries;
