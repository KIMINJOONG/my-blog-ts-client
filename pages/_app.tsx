import { AppContext, AppInitialProps, AppProps } from "next/app";
import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import AppLayout from "../components/AppLayout";
import { useState } from "react";
import UserStore from "../stores/userStore";
import axios from "axios";
import { NextComponentType } from "next";

const GlobalStyle = createGlobalStyle`
     ${reset};
     a{
         text-decoration:none;
         color:inherit;
     }
     *{
         box-sizing:boerder-box;
     }
     body{
         font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
         font-size: 14px;
         font-weight: 400;
         line-height: 24px;
         background-color: #f3f3f3;
     }
`;

interface Props extends AppProps {
    result: any;
}

const MyBlog: NextComponentType<AppContext, AppInitialProps, Props> = ({
    Component,
    pageProps,
    result,
}) => {
    console.log("result : ", result);
    return (
        <div>
            <UserStore.Provider value={{ me: null }}>
                {" "}
                <Helmet>
                    <title>Kohubi's 블로그</title>
                </Helmet>
                <AppLayout>
                    <Component {...pageProps} />
                </AppLayout>
                <GlobalStyle />
            </UserStore.Provider>
        </div>
    );
};

MyBlog.getInitialProps = async ({ Component, ctx }: AppContext) => {
    let pageProps = {};
    let result = "sadfadsfa";

    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, result };
};

// class MyBlog extends App<Props> {
//     static async getInitialProps(context: AppContext) {
//         const { ctx, Component } = context;
//         let pageProps = {};
//         let result = "sdfasdf";
//         const cookie = ctx.req?.headers.cookie ? ctx.req?.headers.cookie : "";
//         axios.defaults.headers.Cookie = "";
//         if (cookie) {
//             axios.defaults.headers.Cookie = cookie;
//         }
//         if (Component.getInitialProps) {
//             pageProps = (await Component.getInitialProps(ctx)) || {};
//         }
//         return { pageProps, result };
//     }

//     render() {
//         const { Component, result, pageProps } = this.props;
//         console.log("result : ", result, "pagePRops: ", pageProps);
//         return (
//             <div>
//                 <UserStore.Provider value={{ me: null }}>
//                     <Helmet>
//                         <title>Kohubi's 블로그</title>
//                     </Helmet>
//                     <AppLayout>
//                         <Component {...pageProps} />
//                     </AppLayout>
//                     <GlobalStyle />
//                 </UserStore.Provider>
//             </div>
//         );
//     }
// }

export default MyBlog;
