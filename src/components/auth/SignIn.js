import React from 'react';
import { AmplifyAuthenticator, AmplifySignIn  } from '@aws-amplify/ui-react';

const SignIn = () =>{
  return(
    <AmplifyAuthenticator>
      <AmplifySignIn
        headerText="My Custom Sign In Text"
        slot="sign-in"
      ></AmplifySignIn>
    </AmplifyAuthenticator>
  );
};

export default SignIn;
