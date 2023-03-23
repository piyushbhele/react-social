import React from "react";
import ReactDOM from "react-dom";

import "./styles/index.css";
import { App } from "./components";
import { AuthProvider, PostsProvider } from "./providers/";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
