import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
// import Signin from "./pages/Signin";
import { Box } from "@chakra-ui/react";
import AllGames from "./pages/AllGames";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Privacy from "./pages/Privacy";
import Developers from "./pages/Developers";
import Home from "./pages/Home/Home";
import TermsAndConditions from "./pages/TermsAndConditions";
import GameScreen from "./pages/GameScreen";

function App() {
  return (
    <>
      <Header />
      <Box minH={"100vh"} mt={"11vh"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<AllGames />} />
          {/* <Route path="/games/:gameId" element={<GameScreen />} /> */}
          <Route path="/games/click-royal" element={<GameScreen />} />
          <Route path="/#about-us" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/terms-of-service" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/developers" element={<Developers />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}

export default App;
