import Head from "next/head";

import AboutCompanyPage from "../../src/components/pages/aboutCompanyPage/AboutCompanyPage";

import CoffeeService from "../../src/services/CoffeeService";

const { getSingleSectionContent, getSections } = new CoffeeService();

const About = ({ sections, singleSectionContent }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Закажите кофе Nespresso с легкостью и насладитесь подлинным опытом благодаря большому выбору кофе. Дешёвая и быстрая доставка."
        />
        <title>{singleSectionContent.title}</title>
      </Head>
      <AboutCompanyPage
        sections={sections}
        singleSectionContent={singleSectionContent}
      />
    </>
  );
};

export async function getStaticPaths() {
  const res = await getSections();

  const paths = res.map(({ section }) => ({
    params: { type: section },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params: { type } }) {
  const singleSectionContent = await getSingleSectionContent(type);
  const sections = await getSections();
  return {
    props: {
      singleSectionContent,
      sections,
    },
    revalidate: 10,
  };
}

export default About;
