import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Users from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';

// import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
          <Route path="/users" element={<Users />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
      
    </BrowserRouter>
  </Provider>
);
reportWebVitals();
