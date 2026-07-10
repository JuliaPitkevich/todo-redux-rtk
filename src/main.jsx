import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./rtk/store.js";
import App from "./App.jsx";
import "./styles/index.scss";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
