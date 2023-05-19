import React, { useEffect, useState } from 'react';
// import resultsMock from '../../mocks/results';
import PropTypes from 'prop-types';

function Results(props) {
  const [results, setResults] = useState({});

  useEffect(() => {
    const { teamStatistics } = props;
    setResults(teamStatistics.fixtures);
    // setResults(resultsMock);
  }, [props]);

  if (results.played) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Total de jogos</th>
              <th>Total de vitórias</th>
              <th>Total de derrotas</th>
              <th>Total de empates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{results.played.total}</td>
              <td>{results.wins.total}</td>
              <td>{results.loses.total}</td>
              <td>{results.draws.total}</td>
            </tr>
          </tbody>

        </table>
      </div>
    );
  }
}

Results.propTypes = {
  teamStatistics: PropTypes.shape({
    fixtures: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default Results;
