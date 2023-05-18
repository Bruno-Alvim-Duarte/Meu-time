import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import HomeContext from './HomeContext';

export default function HomeProvider({ children }) {
  const [toRender, setToRender] = useState('countries');
  const [countryOrSeasonSelected, setCountryOrSeasonSelected] = useState('');
  const [typeSelected, setTypeSelected] = useState('');
  const [leagueSelected, setLeagueSelected] = useState('');

  const values = useMemo(() => ({
    toRender,
    countryOrSeasonSelected,
    typeSelected,
    leagueSelected,
    setLeagueSelected,
    setTypeSelected,
    setCountryOrSeasonSelected,
    setToRender,
  }), [toRender, countryOrSeasonSelected, typeSelected, leagueSelected]);
  return (
    <HomeContext.Provider value={ values }>
      {children}
    </HomeContext.Provider>
  );
}

HomeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
