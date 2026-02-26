/**
 * JSON-LD компонент для структурированных данных
 * Помогает поисковикам понять содержимое страницы
 */

// JSON-LD для организации (весь сайт)
export const OrganizationJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "N-Coffee",
    url: "https://n-coffee.ru",
    logo: "https://n-coffee.ru/logo.png",
    description:
      "Оригинальные капсулы Nespresso и кофемашины с доставкой по России",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7-XXX-XXX-XX-XX",
      contactType: "customer service",
      availableLanguage: ["Russian"],
    },
    sameAs: [
      // Социальные сети (добавить если есть)
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// JSON-LD для веб-сайта
export const WebsiteJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "N-Coffee",
    url: "https://n-coffee.ru",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://n-coffee.ru/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// JSON-LD для товара (Product)
export const ProductJsonLd = ({
  name,
  description,
  image,
  sku,
  brand,
  price,
  currency = "RUB",
  availability = "InStock",
  url,
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku,
    brand: {
      "@type": "Brand",
      name: brand || "Nespresso",
    },
    offers: {
      "@type": "Offer",
      url,
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      seller: {
        "@type": "Organization",
        name: "N-Coffee",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

// JSON-LD для страницы товара (с отзывами если есть)
export const ProductPageJsonLd = ({
  name,
  description,
  image,
  sku,
  brand,
  price,
  currency = "RUB",
  availability = "InStock",
  url,
  rating,
  reviewCount,
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku,
    brand: {
      "@type": "Brand",
      name: brand || "Nespresso",
    },
    aggregateRating:
      rating && reviewCount
        ? {
            "@type": "AggregateRating",
            ratingValue: rating,
            reviewCount: reviewCount,
          }
        : undefined,
    offers: {
      "@type": "Offer",
      url,
      price,
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      priceValidUntil: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      seller: {
        "@type": "Organization",
        name: "N-Coffee",
      },
    },
  };

  // Удаляем undefined поля
  const cleanJsonLd = JSON.parse(JSON.stringify(jsonLd));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanJsonLd) }}
    />
  );
};

// JSON-LD для хлебных крошек (BreadcrumbList)
export const BreadcrumbJsonLd = ({ items }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default {
  OrganizationJsonLd,
  WebsiteJsonLd,
  ProductJsonLd,
  ProductPageJsonLd,
  BreadcrumbJsonLd,
};
