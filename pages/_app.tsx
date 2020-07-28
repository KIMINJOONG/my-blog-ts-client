import { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import { useState, useCallback } from "react";
import "jodit/build/jodit.min.css";
import { message } from "antd";
import api from "../api";
import wrapper from "../stores/configureStore";
import Head from "next/head";
import "antd/dist/antd.css";

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

    const serverDataInit = useCallback(
        (serverData: any) => {
            setValue({ ...serverData });
        },
        [value]
    );

    const getMe = useCallback(async () => {
        const result = await api.getMe();
        const { data, status: httpStatus } = result;
        if (data && httpStatus === 200) {
            setValue({ ...data.data });
        } else {
            setValue(null);
        }
    }, [value]);

    const logout = useCallback(async () => {
        setValue(null);
    }, [value]);

    return { value, getMe, serverDataInit, logout };
};

//NextComponentType<AppContext, AppInitialProps, Props>
const MyBlog: any = ({ Component }: any) => {
    message.config({
        top: 65,
        duration: 2,
        maxCount: 3,
        rtl: true,
    });

    const userForm = useForm({});

    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <title>Kohubi's Blog</title>
            </Head>
            <Component />
            <GlobalStyle />
        </div>
    );
};

// MyBlog.getInitialProps = async ({ Component, ctx }: AppContext) => {
//     let pageProps = {};
//     let cookie: string | undefined = "";
//     const state: any = ctx.store.getState();
//     //server
//     if (ctx.req) {
//         cookie = ctx.req.headers.cookie;
//         axios.defaults.headers.Authorization = cookie;
//     } else {
//         const token = jsCookie.get("token") ? jsCookie.get("token") : "";
//         axios.defaults.headers.Authorization = `token=${token}`;
//     }

//     if (!state.user.me) {
//         ctx.store.dispatch({
//             type: LOAD_USER_REQUEST,
//         });
//     }

//     let serverData = null;
//     // try {
//     //     const endPoint =
//     //         process.env.NODE_ENV === "production"
//     //             ? "https://api.kohubi.xyz"
//     //             : "http://localhost:4000";
//     //     const result = await axios.get(`${endPoint}/users/me`, {
//     //         withCredentials: true,
//     //     });

//     //     const { data } = result;
//     //     serverData = data.data;
//     // } catch (error) {
//     //     serverData = null;
//     // }

//     if (Component.getInitialProps) {
//         pageProps = (await Component.getInitialProps(ctx)) || {};
//     }

//     return { pageProps, serverData };
// };

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

export default wrapper.withRedux(MyBlog);
