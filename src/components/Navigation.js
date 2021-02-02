import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
       <div>
          <NavLink to="/dashboard">Home</NavLink>
          <NavLink to="/chat">Chat</NavLink>
       </div>
    );
}

export default Navigation;
