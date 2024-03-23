import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Box } from "@chakra-ui/react";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs";
import Docs from "./pages/Docs";
import TestIntegration from "./pages/TestIntegration";
// import AllGames from "./pages/AllGames";
// import About from "./pages/About";
// import Privacy from "./pages/Privacy";
// import Developers from "./pages/Developers";
// import TermsAndConditions from "./pages/TermsAndConditions";
// import GameScreen from "./pages/GameScreen";
// import Account from "./pages/Account";

function App() {
  return (
    <>
      <Header />
      <Box minHeight={"50vh"} mt={"11vh"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/test-your-game" element={<TestIntegration />} />
          {/* <Route path="/games" element={<AllGames />} /> */}
          {/* <Route path="/games/:gameId" element={<GameScreen />} /> */}
          {/* <Route path="/games/click-war" element={<GameScreen />} /> */}
          {/* <Route path="/account" element={<Account />} /> */}
          {/* <Route path="/#about-us" element={<About />} /> */}
          <Route path="/contact-us" element={<ContactUs />} />
          {/* <Route path="/terms-of-service" element={<TermsAndConditions />} /> */}
          {/* <Route path="/privacy-policy" element={<Privacy />} /> */}
          {/* <Route path="/developers" element={<Developers />} /> */}
        </Routes>
      </Box>
      <Footer />
    </>
  );
}

export default App;
