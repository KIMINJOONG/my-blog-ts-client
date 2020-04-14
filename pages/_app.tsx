import { AppProps, Container } from "next/app";
import { Helmet } from "react-helmet";

const MyBlog = ({ Component, pageProps }: AppProps) => {
    return (
        <Container>
            <Helmet>
                <title>Kohubi's 블로그</title>
            </Helmet>
            <Component {...pageProps} />
        </Container>
    );
};

export default MyBlog;
