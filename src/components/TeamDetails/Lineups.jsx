import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Lineups(props) {
  const [lineupFrequent, setLineupFrequent] = useState({});

  useEffect(() => {
    const { teamStatistics } = props;
    console.log(teamStatistics);
    let lineup;
    let played = 0;
    teamStatistics.lineups.forEach((currLineup) => {
      if (currLineup.played > played) {
        played = currLineup.played;
        lineup = currLineup;
      }
      setLineupFrequent(lineup);
    });

    // setLineupFrequent(lineups);
  }, [props]);

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

Lineups.propTypes = {
  teamStatistics: PropTypes.shape({
    lineups: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  }).isRequired,
};

export default Lineups;
