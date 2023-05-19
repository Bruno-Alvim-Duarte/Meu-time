// falta o useContext
import React, { useContext, useEffect, useState } from 'react';
import HomeContext from '../context/HomeContext';
import LoginContext from '../context/LoginContext';
// import leagues from '../mocks/leagues';

function Leagues() {
  const [leaguesInfo, setLeaguesInfo] = useState([]);
  const { countrySelected, seasonSelected } = useContext(HomeContext);
  const { key } = useContext(LoginContext);
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('x-rapidapi-key', key);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    console.log(countrySelected, seasonSelected);
    fetch(`https://v3.football.api-sports.io/leagues?country=${countrySelected}&season=${seasonSelected}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.response);
        setLeaguesInfo(result.response);
      });
    // setLeaguesInfo(leagues.response);
  }, [key, countrySelected, seasonSelected]);

  const { setToRender, setLeagueSelected } = useContext(HomeContext);
  const handleClickLeague = (leagueId) => {
    console.log(leagueId);
    setToRender('teams');
    setLeagueSelected(leagueId);
  };

  return (
    <div>
      {leaguesInfo.map((leagueInfo) => (
        <button
          key={ leagueInfo.league.id }
          onClick={ () => handleClickLeague(leagueInfo.league.id) }
        >
          <img src={ leagueInfo.league.logo } alt={ leagueInfo.league.name } />
          <p>{leagueInfo.league.name}</p>
        </button>
      ))}
    </div>
  );
}

export default Leagues;
