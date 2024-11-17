import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, webappStore} from "@A/core/store/webapp-store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={webappStore}>
            <PersistGate persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
