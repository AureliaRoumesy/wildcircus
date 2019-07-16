import React from 'react';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Shows from './Components/Shows/Shows';
import Artists from './Components/Artists/Artists';
import Admin from './Components/Admin/Admin';
import { Layout, Menu, Icon } from 'antd';
import logo from './logo.png'
import'./App.css';

const { Content, Footer, Sider } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
          }}
          onCollapse={(collapsed, type) => {
          }}
          theme='light'
        >
          <div className="logo">
            <img src={logo} alt='logo'/>
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="2">
              <NavLink exact to="/">
                <Icon type="home" />
                <span className="nav-text">Présentation</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink exact to="/shows">
                <Icon type="fire" />
                <span className="nav-text">Spectacles</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink exact to="/artists">
                <Icon type="team" />
                <span className="nav-text">Artistes</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="1">
              <NavLink exact to="/admin">
                <Icon type="user" />
                <span className="nav-text">Admin</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ minHeight: '100vh' }}>
        <Content >
          <div style={{ padding: 24, background: '#fff' }}>
            <Route path="/" exact component={Home} />
            <Route path="/shows" exact component={Shows} />
            <Route path="/artists" exact component={Artists} />
            <Route path="/admin" exact component={Admin} />          
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>WILD CIRCUS</Footer>
      </Layout>
      </Layout>    
    </div>
  );
}

export default App;
