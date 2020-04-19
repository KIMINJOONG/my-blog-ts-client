import { AppProps } from "next/app";
import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import AppLayout from "../components/AppLayout";
import { useState } from "react";
import UserStore from "../stores/userStore";
import axios from "axios";

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

const useForm = (initValue: any) => {
    const [value, setValue] = useState(initValue);

    return { value };
};

const MyBlog = ({ Component, pageProps }: AppProps) => {
    const userForm = useForm({
        me: {},
    });

    console.log("sdadsad : ", pageProps);

    return (
        <div>
            <UserStore.Provider value={userForm}>
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

MyBlog.getInitialProps = async (context: any) => {
    let pageProps = {};
    const { ctx, Component } = context;
    const cookie = ctx.isServer ? ctx.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    let result = "123123213123";
    if (cookie) {
        result = await axios.get("users/me", {
            withCredentials: true,
        });
    }

    if (Component.getInitialProps) {
        pageProps = (await Component.getInitialProps(result)) || {};
    }

    return { pageProps };
};

export default MyBlog;
