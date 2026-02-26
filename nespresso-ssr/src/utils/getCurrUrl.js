export default function getCurrUrl() {
  const urls = {
    development: {
      server: "https://n-coffee.ru",
      url: "https://n-coffee.ru",
    },
    production: {
      server: "https://n-coffee.ru",
      url: "https://n-coffee.ru",
    },
    // development: "https://nestle-nespresso.ru",
    // production: "https://weblauncherstudio.fvds.ru",
  };

  return urls[process.env.NODE_ENV];
}
