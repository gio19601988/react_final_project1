import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/index';
import { PersistGate } from "redux-persist/integration/react"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        pers
       <Provider store={store}>
        <PersistGate persistor={persistor}>
           <App />
           </PersistGate>
        </Provider>
    </Router>
       
);