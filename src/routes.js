import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Error from './components/Error';

export default () =>
<Switch>
   <Route exact path="/" component={App}/>
   <Route exact path="/dashboard" component={Dashboard} />
   <Route exact path="/chat" component={Chat} />
   <Route component={Error} />
</Switch>;
