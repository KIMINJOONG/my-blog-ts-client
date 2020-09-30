import Document, { Html, Main, Head, NextScript } from "next/document";
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
          {/* <meta
            name="viewport"
            content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
          />
          <meta charSet="utf-8" />
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <meta name="subject" content="Kohubi's Blog" />
          <meta name="title" content="Kohubi's Blog" />
          <meta name="author" content="김인중 / kohubi" />
          <meta name="keywords" content="비보이,개발,개발자" />
          <meta
            name="description"
            content="개발자 김인중이자 비보이 kohubi의 개발과 일상을 담은 블로그입니다."
          /> */}

          {/* Open Graph */}
          <meta property="og:url" content="https://kohubi.xyz" />
          <meta property="og:title" content="코후비 블로그" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="http://www.bbsetheme.com/wp-content/uploads/2017/11/bbsetheme_logo.png"
          />
          <meta property="og:description" content="코후비 블로그" />

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
