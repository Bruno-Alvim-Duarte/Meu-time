import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import HomeContext from './HomeContext';

export default function HomeProvider({ children }) {
  const [toRender, setToRender] = useState('countries');
  const [countrySelected, setCountrySelected] = useState('');
  const [seasonSelected, setSeasonSelected] = useState('');
  const [leagueSelected, setLeagueSelected] = useState('');
  const [teamSelected, setTeamSelected] = useState('');

  const values = useMemo(() => ({
    toRender,
    countrySelected,
    seasonSelected,
    leagueSelected,
    teamSelected,
    setTeamSelected,
    setLeagueSelected,
    setSeasonSelected,
    setCountrySelected,
    setToRender,
  }), [toRender, seasonSelected, countrySelected, leagueSelected, teamSelected]);
  return (
    <HomeContext.Provider value={ values }>
      {children}
    </HomeContext.Provider>
  );
}

HomeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
