import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import HomeContext from './HomeContext';

export default function HomeProvider({ children }) {
  const [toRender, setToRender] = useState('countries');
  const [countrySelected, setCountrySelected] = useState('');

  const values = useMemo(() => ({
    toRender,
    countrySelected,
    setCountrySelected,
    setToRender,
  }), [toRender, countrySelected]);
  return (
    <HomeContext.Provider value={ values }>
      {children}
    </HomeContext.Provider>
  );
}

HomeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
