import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

interface IProps {
  styleTags: Array<React.ReactElement<{}>>;
}

export default class MyDocument extends Document<IProps> {
  static async getInitialProps(ctx: any): Promise<any> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) =>
            (props: any) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (error) {
      console.error(error);
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <title>Kohubi's Blog</title>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <meta name="subject" content="Kohubi's Blog" />
          <meta name="title" content="Kohubi's Blog" />
          <meta name="author" content="김인중 / kohubi" />
          <meta name="keywords" content="$keyword" />
          <meta
            name="description"
            content="개발자 김인중이자 비보이 kohubi의 개발과 일상을 담은 블로그입니다."
          />
          <meta name="copyright" content="Kohubi's Blog" />
          <meta name="og:title" content="Kohubi's Blog" />
          <meta property="og:url" content="https://kohubi.xyz" />
          <meta
            name="og:description"
            content="개발자 김인중이자 비보이 kohubi의 개발과 일상을 담은 블로그입니다."
          />
          <meta property="og:image" content="/logo.png" />
          <meta property="og:type" content="website" />
          <meta
            name="viewport"
            content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
          />
          <link rel="canonical" href="https://kohubi.xyz" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="apple-touch-icon" href="/logo.png" />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="152x152"
            href="/logo.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="144x144"
            href="/logo.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="120x120"
            href="/logo.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="114x114"
            href="/logo.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href="/logo.png"
          />
          <link rel="apple-touch-icon-precomposed" href="/logo.png" />
          <meta
            name="naver-site-verification"
            content="b859482b7c9f0278e01a56189ba14a7b55f7489d"
          />
          {this.props.styleTags}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
