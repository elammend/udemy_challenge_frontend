import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import QuizStoreProvider from "./stores/QuizStore";

ReactDOM.render(
  <QuizStoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QuizStoreProvider>,
  document.getElementById("root")
);
