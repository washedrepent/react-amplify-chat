import React, { Component } from 'react';
import './App.css';
import { Link, BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Authenticator, SignOut } from 'aws-amplify-react';
import queryString from 'query-string';

import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Error from './components/Error';

import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const ProtectedRoute = ({ render: C, props: childProps, ...rest }) => (
  <Route
    {...rest}
    render={rProps =>
      childProps.isLoggedIn ? (
        <C {...rProps} {...childProps} />
      ) : (
        <Redirect
          to={`/?redirect=${rProps.location.pathname}${
            rProps.location.search
          }`}
        />
      )
    }
  />
);

const ProppedRoute = ({ render: C, props: childProps, ...rest }) => (
  <Route {...rest} render={rProps => <C {...rProps} {...childProps} />} />
);

class AuthComponent extends Component {
  handleStateChange = state => {
    console.log("State =" + state);
    if (state === 'signedIn') {
      this.props.onUserSignIn();
      this.props.history.push("/dashboard");
    }else{
      this.props.onUserNotSignedIn();
    }
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <Authenticator onStateChange={this.handleStateChange}/>
      </div>
    );
  }
}

const Routes = ({ childProps }) => (
  <Switch>
    <ProppedRoute
      exact
      path="/"
      render={AuthComponent}
      props={childProps}
    />
    <ProtectedRoute
      exact
      path="/dashboard"
      render={Dashboard}
      props={childProps}
    />
    <ProtectedRoute
      exact
      path="/chat"
      render={Chat}
      props={childProps}
    />
    <Route component={Error} />
  </Switch>
);



class App extends Component {
  state = {
   authState: {
     isLoggedIn: false
   }
 };

 handleUserSignIn = () => {
   this.setState({ authState: { isLoggedIn: true } });
 };

 handleUserNotSignedIn = () =>{
   this.setState({ authState: { isLoggedIn: false} });
 }

 render() {
   const childProps = {
     isLoggedIn: this.state.authState.isLoggedIn,
     onUserSignIn: this.handleUserSignIn,
     onUserNotSignedIn: this.handleUserNotSignedIn
   };
   return (
      <div className="App">
        <h1>Amplify Routes Example</h1>
        <SignOut />
        <Navigation />
        <div>
          {this.state.authState.isLoggedIn
            ? 'User is Logged In'
            : 'Not Logged In'}
        </div>
        <br />
        <Routes childProps={childProps} />
      </div>
    );
  }
};
const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
