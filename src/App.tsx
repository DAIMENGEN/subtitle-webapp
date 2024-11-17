import "./App.css";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {WebappRoute} from "@A/route/webapp-route";

function App() {
    return (
        <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        }}>
            <WebappRoute/>
        </BrowserRouter>
    );
}

export default App;
