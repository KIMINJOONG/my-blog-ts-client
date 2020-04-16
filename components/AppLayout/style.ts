import styled from "styled-components";
import { Col, Row } from "antd";

export const Header = styled(Col)`
    width: 100%;
    height: 50px;
    position: fixed;
    background-color: #202020;
    z-index: 9999;
    border-bottom: 1px solid #202020;
`;

export const Navigation = styled(Col)`
    display: flex;
    margin: 0 auto;
`;

export const Ul = styled.ul`
    display: flex;
    flex: 1;
    align-items: center;

    & > li {
        display: inline-block;
        margin-right: 25px;
        position: relative;
        color: #ffffff;
    }
`;

export const Logo = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;

    & > a > h1 {
        color: white;
        cursor: pointer;
    }
`;

export const LeftUl = styled.ul`
    display: flex;
    flex: 1;
    align-items: center;
    flex-direction: row-reverse;

    & > li {
        display: inline-block;
        margin-right: 25px;
        position: relative;
        color: #ffffff;
    }
`;

export const MainHeaderContainer = styled(Row)`
    padding-top: 50px;
`;

export const MainHeaderSection = styled(Row)`
    padding: 70px 0;
`;

export const MainHeaderSectionCol = styled(Col)`
    margin: 0 auto;
    text-align: center;
`;

export const MainContentRow = styled(Row)`
    height: 100vh;
`;

export const MainContentCol = styled(Col)`
    margin: 0 auto;
`;
