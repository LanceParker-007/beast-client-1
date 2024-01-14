import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../index";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [highscore, setHighscore] = useState(0);
  const toast = useToast();

  const fetchHighScore = async () => {
    if (!user) {
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/user/getscore`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setHighscore(data.highscore);
    } catch (error) {
      toast({
        title: "Error fetching highscore",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };
  // fetchHighScore();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ user, setUser, highscore, setHighscore, fetchHighScore }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, useAppContext };
