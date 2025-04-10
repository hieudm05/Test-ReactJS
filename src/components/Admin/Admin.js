import React, { useState } from 'react';
import SideBar from './SideBar';
import { FaBars } from 'react-icons/fa';
import './Admin.scss';

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <section className="admin-container">
        <section className='admin-sidebar'>
          <SideBar collapsed={collapsed}/>
        </section>
        <section className='admin-content'>
          <span>
            <FaBars className='admin-icon' onClick={() => {
              setCollapsed(!collapsed);
            }}/>
          </span>
        </section>
      </section>
    </>
  );
}
export default Admin;