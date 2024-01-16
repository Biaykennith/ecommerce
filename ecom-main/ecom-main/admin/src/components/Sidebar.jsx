import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiShop, CiViewBoard, CiDeliveryTruck, CiShoppingCart, CiLogout } from "react-icons/ci";

const Sidebar = () => {
  const navigate = useNavigate();

  const homeRoutes = [
    {
      path: "/home/dashboard",
      icon: <CiViewBoard />,
      name: "Dashboard"
    },
    {
      path: "/home/order",
      icon: <CiDeliveryTruck />,
      name: "Order"
    },
    {
      path: "/home/product",
      icon: <CiShoppingCart />,
      name: "Product"
    },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      sessionStorage.removeItem('loggedInUser');
      navigate('/');
    }
  };

  return (
    <aside className='sidebar'>
      <div>
        <h1 className='logo'><CiShop /> Admin</h1>
        <ul className='sidebarMenu'>
          {homeRoutes.map((route, index) => (
            <li key={index} className='sidebarLinks'>
              {route.icon}
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <button className='logoutButton' onClick={handleLogout}>
        <CiLogout />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
