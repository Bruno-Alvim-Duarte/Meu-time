import React, { useContext, useEffect, useState } from 'react';
// import seasonsMock from '../mocks/seasons';
import HomeContext from '../context/HomeContext';
import LoginContext from '../context/LoginContext';

function Seasons() {
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

  const { setToRender,
    setTypeSelected, setCountryOrSeasonSelected } = useContext(HomeContext);
  const handleClickSeason = (season) => {
    setToRender('leagues');
    setCountryOrSeasonSelected(season);
    setTypeSelected('season');
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

export default Seasons;
