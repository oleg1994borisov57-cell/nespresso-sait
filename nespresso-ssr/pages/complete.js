import Head from "next/head";
import OrderInfo from "../src/components/pages/checkoutPage/orderInfo/OrderInfo";
import getCurrUrl from "../src/utils/getCurrUrl";

const CheckoutPage = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={`Насладитесь высококачественным кофе с быстрой доставкой прямо к вашей двери. Простой и удобный процесс покупки. Откройте для себя мир ароматов Nespresso сегодня!`}
        />
        <link rel="canonical" href={`${getCurrUrl().url}/complete`} />
        <title>Подтверждение заказа | Nespresso</title>
      </Head>
      <OrderInfo />
    </>
  );
};

export default CheckoutPage;
