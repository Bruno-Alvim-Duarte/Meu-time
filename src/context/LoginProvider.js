import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

export default function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [key, setKey] = React.useState('');

  const login = (newKey) => {
    setKey(newKey);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const values = useMemo(() => ({
    isLoggedIn,
    key,
    login,
    logout,
  }), [isLoggedIn, key]);

  return (
    <LoginContext.Provider value={ values }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
