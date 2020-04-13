import styled from "styled-components";
import { Input, Menu } from "antd";
import Link from "next/link";

const Home = () => (
    <div>
        <Menu mode="horizontal">
            <Menu.Item key="home">
                <Link href="/">
                    <a>리액트버드</a>
                </Link>
            </Menu.Item>
            <Menu.Item key="profile">
                <Link href="/profile">
                    <a>프로필</a>
                </Link>
            </Menu.Item>
            <Menu.Item key="mail"></Menu.Item>
        </Menu>
    </div>
);

export default Home;
