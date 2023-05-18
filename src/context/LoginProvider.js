import React, { useMemo } from 'react';
import LoginContext from './LoginContext';

export default function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const values = useMemo(() => ({
    isLoggedIn,
    login,
    logout,
  }), [isLoggedIn]);

  return (
    <LoginContext.Provider value={ values }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
