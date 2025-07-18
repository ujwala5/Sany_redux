import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { store } from "./app/store";
import { Provider } from "react-redux";


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
