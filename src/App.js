import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Box } from "@chakra-ui/react";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs";
import Docs from "./pages/Docs";
import TestIntegration from "./pages/TestIntegration";
import AllGames from "./pages/AllGames";
// import About from "./pages/About";
// import Privacy from "./pages/Privacy";
// import Developers from "./pages/Developers";
// import TermsAndConditions from "./pages/TermsAndConditions";
import GameScreen from "./pages/GameScreen";
import Account from "./pages/Account";
import PrivateRoutes from "./utils/PrivateRoutes";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import {
  setIsAuthenticated,
  setUser,
  setUserToken,
} from "./redux/slices/authSlice";

function App() {
  const { user } = useSelector((state) => state.authSliceReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const userToken = Cookies.get("userToken");
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      dispatch(setUser(JSON.parse(userInfo)));
      dispatch(setUserToken(userToken));
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Please login",
        position: "top",
        status: "error",
      });
      setUser(null);
      setIsAuthenticated(false);
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Box height={"100vh"} mt={"11vh"}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route element={<PrivateRoutes user={user} />}> */}
          <Route path="/docs" element={<Docs />} />
          <Route path="/test-your-game" element={<TestIntegration />} />
          <Route path="/games" element={<AllGames />} />
          <Route path="/games/:userId/:gameId" element={<GameScreen />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* </Route> */}

          {/* <Route path="/#about-us" element={<About />} /> */}
          {/* <Route path="/terms-of-service" element={<TermsAndConditions />} /> */}
          {/* <Route path="/privacy-policy" element={<Privacy />} /> */}
          {/* <Route path="/developers" element={<Developers />} /> */}
          <Route path="/*" element={<Home />} />
        </Routes>
        <Footer />
      </Box>
    </>
  );
}

export default App;
