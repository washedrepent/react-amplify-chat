import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from './App';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Error from './components/Error';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
         <Route exact path="/" component={App}/>
         <Route exact path="/dashboard" component={Dashboard} />
         <Route exact path="/chat" component={Chat} />
         <Route component={Error} />
      </Switch>;
    </BrowserRouter>
  )
}

export default Router
