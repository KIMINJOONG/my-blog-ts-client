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
          <meta
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
          />

          {/* Twitter */}
          <meta name="twitter:card" content="summary" key="twcard" />
          <meta
            name="twitter:creator"
            content={"ohubi's Blog"}
            key="twhandle"
          />

          {/* Open Graph */}
          <meta property="og:url" content={"https://kohubi.xyz"} key="ogurl" />
          <meta
            property="og:image"
            content={"https://kohubi.xyz/logo.png"}
            key="ogimage"
          />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="400" />
          <meta
            property="og:site_name"
            content={"Kohubi's Blog"}
            key="ogsitename"
          />
          <meta property="og:title" content={"Kohubi's Blog"} key="ogtitle" />
          <meta
            property="og:description"
            content={"개발자 김인중이자 비보이 kohubi의 개발과 일상을 담은 블로그입니다."}
            key="ogdesc"
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
