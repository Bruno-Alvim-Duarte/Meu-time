import React, { useContext, useEffect, useState } from 'react';
import Players from './Players';
import Lineups from './Lineups';
import Results from './Results';
import GoalsStatistics from './GoalsStatistics';
import HomeContext from '../../context/HomeContext';
import LoginContext from '../../context/LoginContext';

function TeamDetails() {
  const [teamStatistics, setTeamStatistics] = useState({});

  const { key } = useContext(LoginContext);
  const { seasonSelected, leagueSelected, teamSelected } = useContext(HomeContext);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('x-rapidapi-key', key);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`https://v3.football.api-sports.io/teams/statistics?season=${seasonSelected}&league=${leagueSelected}&team=${teamSelected}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.response);
        setTeamStatistics(result.response);
      });
  }, [key, seasonSelected, leagueSelected, teamSelected]);

  if (teamStatistics.league) {
    return (
      <div>
        <Players />
        <Lineups teamStatistics={ teamStatistics } />
        <Results teamStatistics={ teamStatistics } />
        <GoalsStatistics teamStatistics={ teamStatistics } />
      </div>
    );
  }
}

export default TeamDetails;
