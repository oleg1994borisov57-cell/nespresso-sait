import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/indexcopy.css";
import "../styles/productPage.css";
import "../styles/specialOffers.css";
import "../styles/addButtonLarge.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Provider } from "react-redux";
import store from "../src/redux/store";
import { useEffect } from "react";
import Layout from "../src/components/layout/Layout";
import Head from "next/head";
import isServerRender from "../src/utils/isServerRender";

import NextNProgress from "nextjs-progressbar";
import getCurrUrl from "../src/utils/getCurrUrl";

import App from "next/app";

import CoffeeService from "../src/services/CoffeeService";
import { urlsIds } from "../src/config/urlsIds.config";

import coffeeIcon from "../src/resources/icons/navBar/coffee.png";
import exclusive from "../src/resources/icons/navBar/exclusive.png";
import machines from "../src/resources/icons/navBar/machines.png";
import aboutCompany from "../src/resources/icons/navBar/aboutUs.png";
import promotions from "../src/resources/icons/navBar/promotions.png";
import legalEntities from "../src/resources/icons/navBar/legalEntities.png";
import accessories from "../src/resources/icons/navBar/accessories.png";
import specialOffers from "../src/resources/icons/navBar/specialOffers.png";

import { clearOldLocalStorage } from "../src/utils/clearOldLocalStorage";

const { getAllPages, getSections } = new CoffeeService();

export default function MyApp({ Component, pageProps, menuData }) {
  useEffect(() => {
    clearOldLocalStorage();
    // initializing metrika
    if (!isServerRender()) {
      (async function (m, e, t, r, i, k, a) {
        m[i] =
          m[i] ||
          function () {
            (m[i].a = m[i].a || []).push(arguments);
          };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) {
            return;
          }
        }
        (k = e.createElement(t)),
          (a = e.getElementsByTagName(t)[0]),
          (k.async = true),
          (k.src = r),
          a.parentNode.insertBefore(k, a);
      })(
        window,
        document,
        "script",
        "https://mc.yandex.ru/metrika/tag.js",
        "ym"
      );

      setTimeout(() => {
        ym(101520872, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          ecommerce: "dataLayer",
        });
      }, 10000);
    }

    // initiali
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/public/sw.js", { scope: "/" });
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="icon"
          sizes="16x16"
          href={`${getCurrUrl().url}/favicon.svg`}
          type="image/svg+xml"
        />
        <link
          rel="apple-touch-icon"
          sizes="16x16"
          href={`${getCurrUrl().url}/favicon.svg`}
          type="image/svg+xml"
        />
        <link rel="manifest" href={`${getCurrUrl().url}/manifest.json`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content={getCurrUrl().url} />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#000000" />
        
        {/* OpenGraph мета-теги для социальных сетей */}
        <meta property="og:title" content="N-Coffee — капсулы Nespresso Original и Vertuo в России" />
        <meta property="og:description" content="Купить оригинальные капсулы Nespresso с доставкой по РФ. Акции, подарки, быстрая доставка." />
        {/* TODO: заменить на реальную OG-картинку (1200x630 px рекомендовано) */}
        <meta property="og:image" content="https://n-coffee.ru/images/coffee-capsules-og.jpg" />
      </Head>
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Provider store={store}>
        <Layout menuLinks={menuData}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

let _showWarning = true;

const sectionNames = {
  aboutCompany: {
    id: "aboutCompany",
    name: "О компании",
    icon: aboutCompany,
  },
  promotions: { name: "Акции", icon: promotions },
  legalEntities: { name: "Юр лицам", icon: legalEntities },
};

const pageNames = {
  [urlsIds.accessories]: {
    name: "Аксессуары",
    icon: accessories,
    id: "accessories",
  },
  [urlsIds.machinesOriginal]: {
    name: "Кофемашины",
    icon: machines,
    id: "machines",
  },
  [urlsIds.capsulesOriginal]: {
    name: "Кофе",
    icon: coffeeIcon,
    id: "coffee",
  },
  [urlsIds.exclusive]: {
    name: "Exclusive",
    icon: exclusive,
    id: "exclusive",
  },
  [urlsIds.specialOffers]: {
    name: "Купи сейчас",
    icon: specialOffers,
    id: "special-offers",
    width: "60px",
  },
};
MyApp.getInitialProps = async (appContext) => {
  const res = await getAllPages();
  const sections = await getSections();
  const filtredSections = sections.filter(
    ({ section }) =>
      section === "aboutCompany" ||
      section === "promotions" ||
      section === "legalEntities"
  );

  const menuData = [];

  res
    .filter(({ id }) => {
      return Object.keys(pageNames).includes(id) || id === urlsIds.about;
    })
    .forEach(({ id, url }) => {
      const route = url.replace("/", "");

      if (id === urlsIds.about) {
        filtredSections.forEach(({ section }) => {
          menuData.push({
            id: section,
            title: sectionNames[section].name,
            icon: sectionNames[section].icon,
            href: `/${route}/${section}`,
            width: "30px",
          });
        });
        return;
      }

      try {
        menuData.push({
          id: pageNames[id].id,
          title: pageNames[id].name,
          icon: pageNames[id].icon,
          href: `/${route}`,
          width: pageNames[id].width ?? "30px",
        });
      } catch {
        if (_showWarning) {
          console.log(
            "\u001b[1;33m Warning: Page name not found in menu list; no navigation icon created. Add it in pages/_app.jsx under pageNames."
          );
          _showWarning = false;
        }
      }
    });

  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, menuData };
};
