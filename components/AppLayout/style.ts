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

export const MainContentRow = styled(Row)`
    padding-top: 50px;
`;

export const MainContentCol = styled(Col)`
    height: 100%;
    margin: 0 auto;
`;

export const MenuSpan = styled.span`
    width: 29px;
    height: 22px;
    font-family: AppleSDGothicNeo;
    font-size: 17px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: -0.41px;
    color: #ffffff;
    cursor: pointer;
`;

export const ProfileSpan = styled.span`
    font-family: AppleSDGothicNeo;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: center;
    color: rgba(60, 60, 67, 0.6);
`;

export const ProfileResultSpan = styled.span`
    font-family: SFProDisplay;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: 0.38px;
    text-align: center;
    color: #03e0c5;
`;

export const BoardDate = styled.span`
    font-family: SFProText;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: rgba(60, 60, 67, 0.6);
`;

export const BoardContentSumary = styled.span`
    font-family: AppleSDGothicNeo;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: -0.08px;
    color: rgba(60, 60, 67, 0.6);
`;

export const MoreA = styled.a`
    font-family: SFProText;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: -0.08px;
    text-align: right;
    color: #03e0c5;
    cursor: pointer;

`;

export const HashtagA = styled.a`
    font-family: SFProText;
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: -0.41px;
    color: #03e0c5;
`;
