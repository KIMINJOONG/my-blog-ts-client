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
    rtl: true
  });

  return (
    <div>
      <Head>
        <title>My page title</title>
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
        <meta
          property="og:image"
          content="https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188327.jpg"
        />
        <meta property="og:description" content="Og tag test!!!" />
        <meta property="og:title" content="Og tag test!!! title" />
      </Head>
      <Head>
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
