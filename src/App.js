import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import React from 'react';
import Header from './components/Header/Header';
import { Link, Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'

const App = () => {

  return (
    <div className="app-container">
      <section className='header'>
        <Header/>
      </section>
      <section className=''>
        <section className=''></section>
        <section className='app-content'>
         <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </section>
      </section>
    </div>
  );
}

export default App;
