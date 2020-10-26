import { createGlobalStyle } from "styled-components";
import { useState, useCallback } from "react";
import "jodit/build/jodit.min.css";
import { message } from "antd";
import api from "../api";
import wrapper from "../stores/configureStore";
import Head from "next/head";
import "antd/dist/antd.css";

const GlobalStyle = createGlobalStyle`
     a{
         text-decoration:none;
         color:inherit;
     }

     code {
        background-color: #eee;
        border-radius: 3px;
        font-family: courier, monospace;
        padding: 0 3px;
     }
`;

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

//NextComponentType<AppContext, AppInitialProps, Props>
const MyBlog: any = ({ Component }: any) => {
  message.config({
    top: 65,
    duration: 2,
    maxCount: 3,
    rtl: true,
  });

  return (
    <div>
      <Head>
        <title>Kohubi's Blog</title>
          <meta
            name="viewport"
            content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
          />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <meta name="subject" content="코후비 블로그" />
          <meta name="title" content="코후비 블로그" />
          <meta name="author" content="김인중 | kohubi" />
          <meta name="keywords" content="비보이,개발,개발자" />
          <meta name="description" content="춤추는 개발자 코후비 블로그" />

          {/* Open Graph */}
          <meta property="og:type" content="website" /> 
          <meta property="og:title" content="코후비 블로그" />
          <meta property="og:description" content="춤추는 개발자 코후비 블로그" />
          <meta property="og:image" content="https://kohubi.xyz/logo@3x.png" />
          <meta property="og:image:width" content="200" />
          <meta property="og:image:height" content="200" />
          <meta property="og:url" content="https://kohubi.xyz" />

          {/* <link rel="canonical" href="https://kohubi.xyz" /> */}
          <link
            rel="shortcut icon"
            href="https://kohubi.xyz/favicon.ico"
            type="image/x-icon"
          />
          <meta
            name="naver-site-verification"
            content="b859482b7c9f0278e01a56189ba14a7b55f7489d"
          />
          <meta
            name="google-site-verification"
            content="O4gmbMWol2odBM0qvx_2cY02Ilbp_3l-Px69viCH2Ng"
          />
      </Head>
      
      <Component />
      <GlobalStyle />
    </div>
  );
};

export default wrapper.withRedux(MyBlog);
