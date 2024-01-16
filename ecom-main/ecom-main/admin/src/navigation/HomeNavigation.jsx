import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const HomeNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('loggedInUser');

    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className='home'>
      <Sidebar />
      <main className='pages'>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeNavigation;
