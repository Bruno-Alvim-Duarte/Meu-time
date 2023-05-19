import React, { useContext, useEffect, useState } from 'react';
import LoginContext from '../../context/LoginContext';
import HomeContext from '../../context/HomeContext';

function Lineups() {
  const [lineupFrequent, setLineupFrequent] = useState([]);
  const { key } = useContext(LoginContext);
  const { teamSelected, seasonSelected, leagueSelected } = useContext(HomeContext);

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
        let lineup;
        let played = 0;
        result.response.lineups.forEach((currLineup) => {
          if (currLineup.played > played) {
            played = currLineup.played;
            lineup = currLineup;
          }
          setLineupFrequent(lineup);
        });
      });
  }, [leagueSelected, seasonSelected, teamSelected, key]);

  return (
    <div>
      <h3>Formação mais utilizada</h3>
      <p>{lineupFrequent.formation}</p>
      <p>
        Vezes utilizadas
        {' '}
        { lineupFrequent.played }
      </p>
    </div>
  );
}

export default Lineups;
