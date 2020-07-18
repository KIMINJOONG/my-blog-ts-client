import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

interface IProps {
  styleTags: Array<React.ReactElement<{}>>;
}

export default class MyDocument extends Document<IProps> {
  static getInitialProps(context: any) {
    const sheet = new ServerStyleSheet();
    const page = context.renderPage((App: any) =>
      (props: any) => sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          {this.props.styleTags}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
