import React, { useContext, useEffect, useState } from 'react';
import HomeContext from '../context/HomeContext';
import LoginContext from '../context/LoginContext';

function Leagues() {
  const [leaguesInfo, setLeaguesInfo] = useState([]);
  const { countrySelected } = useContext(HomeContext);
  const { key } = useContext(LoginContext);
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('x-rapidapi-key', key);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(`https://v3.football.api-sports.io/leagues?country=${countrySelected}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.response);
        setLeaguesInfo(result.response);
      });
  }, [countrySelected, key]);
  return (
    <div>
      {leaguesInfo.map((leagueInfo) => (
        <div key={ leagueInfo.league.id }>
          <img src={ leagueInfo.league.logo } alt={ leagueInfo.league.name } />
          <p>{leagueInfo.league.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Leagues;