import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reducer,{ initialState } from './Components/ContextApi/Reducer';
import {StateProvider} from './Components/ContextApi/StateProvider'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //hmare data ko hum data layer se within the app use kr pae islie hum APP component ko state provider me wrap krdete h aur usko reducer aur initial state dete h
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);

