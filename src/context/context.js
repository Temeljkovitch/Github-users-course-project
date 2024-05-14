import React, { useState, useEffect, createContext, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

export const useGlobalContext = () => useContext(GithubContext);

const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  return (
    <GithubContext.Provider
      value={{ users, setUsers, repos, setRepos, followers, setFollowers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubProvider;
