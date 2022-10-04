import React, { useEffect, useMemo, useState, createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import getCommonOptions from "../pages/helpers/getCommonOptions";

export const AuthContext = createContext({
  isAuthenticated: null,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
});

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const loadAuthUser = () => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      setIsAuthenticated(true);
    }
  };

  //I would change this
  const providerValue = useMemo(() => {
    return {
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
    };
  }, [isAuthenticated, setIsAuthenticated, user, setUser]);

  //I would change this code
  useEffect(() => {
    loadAuthUser();
  }, []);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
