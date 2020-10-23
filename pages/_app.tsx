import { createGlobalStyle } from "styled-components";
import { useState, useCallback } from "react";
import "jodit/build/jodit.min.css";
import { message } from "antd";
import api from "../api";
import wrapper from "../stores/configureStore";
import Head from "next/head";
import "antd/dist/antd.css";
import { DefaultSeo } from 'next-seo';

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
      <DefaultSeo
        title="코후비 블로그"
        description="코후비 블로그"
          openGraph={{
            type: 'website',
            locale: 'ko_KR',
            url: 'https://kohubi.xyz',
            site_name: 'kohubi blog',
            images: [{
              url: "https://kohubi.xyz/logo.png",
            }],
            description: '코후비 블로그',
            title: '코후비 블로그',
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />

      <Component />
      <GlobalStyle />
    </div>
  );
};

export default wrapper.withRedux(MyBlog);
