import React, { useMemo, createContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  currentMovie: {},
};
const AppStateContext = createContext(initialState);

const AppStateContextProvider = ({ children }) => {
  const [currentMovie, setCurrentMovie] = useState({});

  const value = useMemo(
    () => ({
      currentMovie,
      setCurrentMovie,
    }),
    [currentMovie]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

AppStateContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { AppStateContextProvider, AppStateContext };
