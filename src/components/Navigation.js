import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd'
import { ProfileOutlined, DashboardOutlined, WechatOutlined } from '@ant-design/icons'

const Navigation = (props) => {
    const { current } = props;

    console.log(current);
    return (
        <Menu selectedKeys={[current]} mode="horizontal">
          <Menu.Item key='dashboard'>
            <Link to='/dashboard'>
            <DashboardOutlined />Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key='home'>
            <Link to={`/`}>
              <ProfileOutlined />Profile
            </Link>
          </Menu.Item>
          <Menu.Item key='chat'>
            <Link to='/chat'>
              <WechatOutlined />Chat
            </Link>
          </Menu.Item>
        </Menu>
    );
}

export default Navigation;
