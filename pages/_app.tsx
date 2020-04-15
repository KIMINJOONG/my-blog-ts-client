import { AppProps, Container } from "next/app";
import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import AppLayout from "../components/AppLayout";

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

const MyBlog = ({ Component, pageProps }: AppProps) => {
    return (
        <Container>
            <Helmet>
                <title>Kohubi's 블로그</title>
            </Helmet>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
            <GlobalStyle />
        </Container>
    );
};

export default MyBlog;
