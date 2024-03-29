import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./fonts/fonts.css";
import "./components/ui/common.css";
import "./components/ui/box.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, HashRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <HashRouter>
          <App />
      </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
