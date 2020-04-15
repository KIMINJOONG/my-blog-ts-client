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
    position: relative;
    margin: 0 auto;
`;

export const Ul = styled.ul`
    float: left;

    & > li {
        vertical-align: middle;
        display: inline-block;
        margin-right: 25px;
        position: relative;
        color: #ffffff;
    }
`;

export const SubUl = styled.ul`
    float: right;

    & > li {
        vertical-align: middle;
        display: inline-block;
        margin-left: 25px;
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
