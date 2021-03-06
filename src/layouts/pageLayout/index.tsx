import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './index.less';

const { Header, Sider, Content } = Layout;

export default function PageLayout(props: any) {
  const [collapsed, setCollapsed] = useState(false);

  const history = useHistory();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const selectMenu = ({ key }: any) => {
    history.push(key);
  };

  return (
    <Layout className="layout-box">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={selectMenu}
          defaultSelectedKeys={['/user']}
        >
          <Menu.Item key="/user" icon={<UserOutlined />}>
            用户管理
          </Menu.Item>
          <Menu.Item key="/menu" icon={<VideoCameraOutlined />}>
            菜单管理
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
            },
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
}
