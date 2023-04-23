import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import StateProvider from './contextApi/ContextStates';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import Store from './Store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={Store} >
      <StateProvider>
        <App />
      {/* <h1><span>&#9616;</span>&#9616;</h1><p></p> */}
      </StateProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
