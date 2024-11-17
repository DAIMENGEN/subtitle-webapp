import React from "react";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "@A/page/home-page/home-page";
import {RealtimeSubtitle} from "@A/components/realtime-subtitle/realtime-subtitle";

export const WebappRoute = () => {
    return (
        <Routes>
            <Route path={"/"} element={<HomePage/>}>
                <Route index element={<RealtimeSubtitle/>}/>
            </Route>
        </Routes>
    )
}