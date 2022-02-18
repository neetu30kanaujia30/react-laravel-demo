
import React from "react";
import {render} from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./src/App";

require('./bootstrap');

if (document.getElementById('app')) {
    render(



        <React.StrictMode>
            <BrowserRouter>



                <App />



            </BrowserRouter>,
        </React.StrictMode>, document.getElementById('app')

    );
}
