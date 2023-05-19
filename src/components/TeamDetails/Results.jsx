import React, { useContext, useEffect, useState } from 'react';
import LoginContext from '../../context/LoginContext';
import HomeContext from '../../context/HomeContext';

function Results() {
  const [results, setResults] = useState([]);
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
        setResults(result.response.fixtures);
      });
  });

  return (
    <div>
      <table>
        <thead>
          <th>Total de jogos</th>
          <th>Total de vitórias</th>
          <th>Total de derrotas</th>
          <th>Total de empates</th>
        </thead>
        <tbody>
          <td>{results.played.total}</td>
          <td>{results.wins.total}</td>
          <td>{results.loses.total}</td>
          <td>{results.draws.total}</td>
        </tbody>

      </table>
    </div>
  );
}

export default Results;
