import React, { useState, useEffect } from 'react'
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn } from '@aws-amplify/ui-react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { useHistory } from "react-router"

import Container from './components/Container'

const App = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();
  //let history = useHistory();

  useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)

            //if (nextAuthState === AuthState.SignedIn) {
          //      history.push("/dashboard");
            //}
        });
    //}, [history]);
    }, []);

  return authState === AuthState.SignedIn && user ? (
    <Container>
      <h1>Profile</h1>
      <h2>Username: {user.username}</h2>
      <h3>Email: {user.attributes.email}</h3>
      <h4>Phone: {user.attributes.phone_number}</h4>
      <AmplifySignOut />
    </Container>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignIn slot="sign-in" hideSignUp/>
      <AmplifySignOut />
    </AmplifyAuthenticator>
  );
}
export default App;
