import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head />
      <body>
        <Main />
        <NextScript />
        {
          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/101520872"
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        }
      </body>
    </Html>
  );
}
