import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import seasonsMock from '../mocks/seasons';
import LoginContext from '../context/LoginContext';

function Seasons(props) {
  const [seasons, setSeasons] = useState([]);
  const { key } = useContext(LoginContext);
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('x-rapidapi-key', key);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch('https://v3.football.api-sports.io/leagues/seasons', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.response);
        setSeasons(result.response);
      });
    // setSeasons(seasonsMock.response);
  }, [key]);

  const handleClickSeason = (season) => {
    const { setSeasonState } = props;
    setSeasonState(season);
  };
  return (
    <div>
      {seasons.map((season) => (
        <button key={ season } onClick={ () => handleClickSeason(season) }>
          <p>{season}</p>
        </button>
      ))}
    </div>
  );
}

Seasons.propTypes = {
  setSeasonState: PropTypes.func.isRequired,
};

export default Seasons;
