import { useState, useEffect, useContext, createContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = createContext();

export const useGlobalContext = () => useContext(GithubContext);

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [limit, setLimit] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    try {
      toggleError(); // Invoking error without arguments to clear previous error message (if you previously searched for a user that does not exist).
      setIsLoading(true);
      // User
      const { data } = await axios.get(`${rootUrl}/users/${user}`);
      console.log(data);
      setGithubUser(data);
      const { login, followers_url } = data;
      // Repos
      const { data: repos } = await axios.get(
        `${rootUrl}/users/${login}/repos?per_page=100`
      );
      setRepos(repos);
      // Followers
      const { data: followers } = await axios.get(
        `${followers_url}?per_page=100`
      );
      setFollowers(followers);
    } catch (error) {
      console.log(error);
      toggleError(true, "no user with that username!");
    }
    setIsLoading(false);
  };

  const checkRequests = async () => {
    try {
      const { data } = await axios.get(`${rootUrl}/rate_limit`);
      let { limit, remaining } = data.rate;
      setLimit(limit);
      setRemaining(remaining);
      if (remaining === 0) {
        toggleError(true, "sorry, you have exceeded your hourly rate limit!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(() => {
    checkRequests();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        limit,
        remaining,
        error,
        isLoading,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubProvider;
