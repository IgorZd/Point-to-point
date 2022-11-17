import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import * as serviceWorker from "./serviceWorker";
import "./styles/global.css";
import { StyleContextProvider } from "./styles/style.context";
import { routes } from "./routes";
import { renderRoutes } from "react-router-config";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyleContextProvider>
        <Provider store={store}>{renderRoutes(routes as any)}</Provider>
      </StyleContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
