import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Signin from "./pages/Signin";
import { Box } from "@chakra-ui/react";
import AllGames from "./pages/AllGames";

function App() {
  return (
    <>
      <Box>
        <Header />
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/games" element={<AllGames />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}

export default App;
