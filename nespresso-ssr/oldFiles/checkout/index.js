import Head from "next/head";
import Checkout from "../../src/components/pages/checkoutPage/checkout/Checkout";

const CheckoutPage = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={`Насладитесь высококачественным кофе с быстрой доставкой прямо к вашей двери. Простой и удобный процесс покупки. Откройте для себя мир ароматов Nespresso сегодня!`}
        />
        <title>Оформление доставки | Nespresso</title>
      </Head>
      <Checkout />
    </>
  );
};

export default CheckoutPage;
