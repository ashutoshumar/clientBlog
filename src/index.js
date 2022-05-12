import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextProvider } from "./context/Context";
import './index.scss'
import { BrowserRouter} from "react-router-dom"
ReactDOM.render(
  <BrowserRouter>
 <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
 
  </BrowserRouter>,
  document.getElementById('root')
);


