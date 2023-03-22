import React from "react";
import ReactDOM from "react-dom";

import "./styles/index.css";
import { App } from "./components";
import { AuthProvider } from "./providers/AuthProvider";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
