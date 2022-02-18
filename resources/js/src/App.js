import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import store from "./store";

import Main from "../Main";
function App () {
        return (
            <StoreProvider store={store}>


                <Main />

            </StoreProvider>
        );

}

export default App;
