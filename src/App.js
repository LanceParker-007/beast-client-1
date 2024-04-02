import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Box } from "@chakra-ui/react";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs";
import Docs from "./pages/Docs";
import TestIntegration from "./pages/TestIntegration";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { setIsAuthenticated, setUser } from "./redux/slices/authSlice";
// import AllGames from "./pages/AllGames";
// import About from "./pages/About";
// import Privacy from "./pages/Privacy";
// import Developers from "./pages/Developers";
// import TermsAndConditions from "./pages/TermsAndConditions";
// import GameScreen from "./pages/GameScreen";
// import Account from "./pages/Account";

function App() {
  const { user, testBuilds } = useSelector((state) => state.authSliceReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = Cookies.get("userInfo");
    if (userInfo) {
      dispatch(setUser(JSON.parse(userInfo)));
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Box minHeight={"50vh"} mt={"11vh"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route
            path="/test-your-game"
            element={<TestIntegration user={user} testBuilds={testBuilds} />}
          />
          {/* <Route path="/games" element={<AllGames />} /> */}
          {/* <Route path="/games/:gameId" element={<GameScreen />} /> */}
          {/* <Route path="/games/click-war" element={<GameScreen />} /> */}
          {/* <Route path="/account" element={<Account />} /> */}
          {/* <Route path="/#about-us" element={<About />} /> */}
          <Route path="/contact-us" element={<ContactUs />} />
          {/* <Route path="/terms-of-service" element={<TermsAndConditions />} /> */}
          {/* <Route path="/privacy-policy" element={<Privacy />} /> */}
          {/* <Route path="/developers" element={<Developers />} /> */}
          {/* <Route path="/*" element={<Docs />} /> */}
        </Routes>
      </Box>
      <Footer />
    </>
  );
}

export default App;
