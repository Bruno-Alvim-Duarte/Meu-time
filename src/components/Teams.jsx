import React, { useContext, useEffect, useState } from 'react';
// import LoginContext from '../context/LoginContext';
// import teamsMock from '../mocks/teams';
import HomeContext from '../context/HomeContext';

function Teams() {
  const [teamsInfo, setTeamsInfo] = useState([]);
  const { key } = useContext(LoginContext);
  const { leagueSelected,
    setToRender, setTeamSelected } = useContext(HomeContext);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('x-rapidapi-key', key);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`https://v3.football.api-sports.io/teams?league=${leagueSelected}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.response);
        setTeamsInfo(result.response);
      });
    // setTeamsInfo(teamsMock.response);
  }, [key, leagueSelected]);

  const handleClickTeam = (teamId) => {
    setToRender('team-details');
    setTeamSelected(teamId);
  };

  return (
    <div>
      {teamsInfo.map((teamInfo) => (
        <button
          key={ teamInfo.team.id }
          onClick={ () => handleClickTeam(teamInfo.team.id) }
        >
          <img src={ teamInfo.team.logo } alt={ teamInfo.team.name } />
          <p>{teamInfo.team.name}</p>
        </button>
      ))}
    </div>
  );
}

export default Teams;
