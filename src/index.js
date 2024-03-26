import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const devServer = "http://localhost:5000";
export const prodServer = "";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <GoogleOAuthProvider clientId="329490772517-6ev48t90ct0na2to2aoortrbp07rh3nm.apps.googleusercontent.com">
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </ChakraProvider>
  </BrowserRouter>
);
