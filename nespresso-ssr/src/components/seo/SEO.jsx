import Head from "next/head";
import { useRouter } from "next/router";

/**
 * SEO компонент для динамических meta-тегов
 * Унифицированный компонент для всех страниц
 */
const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  canonical,
  noIndex = false,
  children,
}) => {
  const router = useRouter();
  const currentUrl = `https://n-coffee.ru${router.asPath}`;
  const canonicalUrl = canonical || currentUrl;

  const siteName = "N-Coffee";
  const defaultDescription =
    "Оригинальные капсулы Nespresso и кофемашины с доставкой по России. Большой выбор: Original, Vertuo, Professional. Акции, подарки, гарантия качества.";
  const defaultImage = "https://n-coffee.ru/images/og-default.jpg";

  return (
    <Head>
      {/* Основные meta */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* OpenGraph */}
      <meta property="og:title" content={title || siteName} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* Дополнительно */}
      <meta name="theme-color" content="#000000" />

      {children}
    </Head>
  );
};

export default SEO;
