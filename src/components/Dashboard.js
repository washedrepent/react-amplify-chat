import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify'

import Container from './Container'

const Dashboard = (props) => {
    useEffect(() => {
      Auth.currentAuthenticatedUser()
        .catch(() => {
          console.log(props);
          props.history.push('/')
        })
    }, [props]);
    return (
      <Container>
       <div>
          <p>Hello Welcome to the Dashboard</p>
       </div>
      </Container>
    );
}

export default Dashboard;
