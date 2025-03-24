import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import React from 'react';
import Header from './components/Header/Header';
import { Link, Outlet } from 'react-router-dom';

const App = () => {

  return (
    <div className="App">
      <section className='bg-white'>
        <Header/>
      </section>
      <section className=''>
        <section className=''></section>
        <section className='app-content'>
          <Outlet/>
        </section>
      </section>
    </div>
  );
}

export default App;
