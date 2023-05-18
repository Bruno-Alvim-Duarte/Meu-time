import React, { useContext, useState } from 'react';
import LoginContext from '../context/LoginContext';
import HomeContext from '../context/HomeContext';

function Players() {
  const [playersInfo, setPlayersInfo] = useState([]);
  const { key } = useContext(LoginContext);
  const { teamSelected } = useContext(HomeContext);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('x-rapidapi-key', key);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`https://v3.football.api-sports.io/player?team=${teamSelected}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setPlayersInfo(result.response);
      });
  }, [key, teamSelected]);

  return (
    <div>
      {playersInfo.map((playerInfo) => (
        <div key={ playerInfo.player.id }>
          <img src={ playerInfo.player.photo } alt={ playerInfo.player.name } />
          <p>{playerInfo.player.name}</p>
          <p>{playerInfo.player.age}</p>
          <p>{playerInfo.player.nationality}</p>
        </div>
      ))}
    </div>
  );
}

export default Players;
