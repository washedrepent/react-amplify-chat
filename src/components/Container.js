import React, { useState } from 'react'

import Navigation from './Navigation'
import { Layout } from 'antd'

const { Header, Content, Footer } = Layout


const Container = ({ children }) => {

  var current = setRoute();

  function setRoute() {
    const location = window.location.href.split('/')
    const pathname = location[location.length-1]
    current = pathname ? pathname : 'home';
    return current;
  }
  
  const styles = {
    container: {
      margin: '0 auto',
      padding: '50px 100px'
    }
  }
  return(
    <Layout className="layout">
      <Header>
        <Navigation current={current} />
      </Header>
      <Content style={styles.container}>
        { children }
      </Content>
      <Footer style={{ textAlign: 'center' }}>Test Footer by Hans-Eric Lippke</Footer>
    </Layout>
  )
}
export default Container
