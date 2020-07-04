import { AppContext, AppInitialProps, AppProps } from "next/app";
import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import AppLayout from "../components/AppLayout";
import { useState, useCallback, useEffect } from "react";
import UserStore from "../stores/userStore";
import axios from "axios";
import { NextComponentType } from "next";
import jsCookie from "js-cookie";
import "../node_modules/antd/dist/antd.css";
import "jodit/build/jodit.min.css";
import { message } from "antd";
import api from "../api";

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
  serverData: {
    role: number;
    _id: string;
    email: string;
    password: string;
    name: string;
    __v: number;
  };
}

const useForm = (initValue: any) => {
  const [value, setValue] = useState(initValue);

  const serverDataInit = useCallback(
    (serverData: any) => {
      setValue({ ...serverData });
    },
    [value],
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

const MyBlog: NextComponentType<AppContext, AppInitialProps, Props> = ({
  Component,
  pageProps,
  serverData,
}) => {
  message.config({
    top: 65,
    duration: 2,
    maxCount: 3,
    rtl: true,
  });

  const userForm = useForm({});

  useEffect(() => {
    userForm.serverDataInit(serverData);
  }, [serverData]);

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

MyBlog.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};
  let cookie: string | undefined = "";
  //server
  if (ctx.req) {
    cookie = ctx.req.headers.cookie;
    axios.defaults.headers.Authorization = cookie;
  } else {
    const token = jsCookie.get("token") ? jsCookie.get("token") : "";
    axios.defaults.headers.Authorization = `token=${token}`;
  }
  let serverData = null;
  try {
    const result = await axios.get("http://localhost:4000/users/me", {
      withCredentials: true,
    });

    const { data } = result;
    serverData = data.data;
  } catch (error) {
    serverData = null;
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, serverData };
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
