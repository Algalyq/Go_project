
import React, { useState, useEffect } from 'react';
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;



function Admin() {
    let navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const onSelect = ({key}) => {
        console.log("1", key)
        navigate(`/admin/${key}`)
    }



    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onSelect= {onSelect}
                    items={[
                        {
                            key: 'furniture',
                            icon: <UserOutlined />,
                            label: 'Furniture',
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
export default Admin