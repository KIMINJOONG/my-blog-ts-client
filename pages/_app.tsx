import { AppProps } from "next/app";

const MyBlog = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};

export default MyBlog;
