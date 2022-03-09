import "./App.css";
import { Box, Button, Divider, Typography } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import CryptoPage from "./views/CryptoPage";
import Footer from "./components/Footer/Footer";
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Box style={{ minWidth: "300px" }}>
        <Navbar />
        <Box style={{ height: "82vh" }}></Box>
        <Routes>
          <Route path="/crypto" element={<CryptoPage />} />
        </Routes>
        <Footer />
      </Box>
    </BrowserRouter>
  );
};

export default App;
