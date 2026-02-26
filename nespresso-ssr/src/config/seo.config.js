// SEO конфигурация для N-Coffee
// Базовые настройки для всех страниц

export const siteConfig = {
  name: "N-Coffee",
  domain: "https://n-coffee.ru",
  description:
    "Оригинальные капсулы Nespresso с доставкой по России. Кофемашины Nespresso Original, Vertuo, Professional. Акции и подарки.",
  keywords: [
    "Nespresso",
    "капсулы Nespresso",
    "кофе Nespresso",
    "кофемашина Nespresso",
    "Nespresso купить",
  ],
  author: "N-Coffee",
  language: "ru",
  locale: "ru_RU",
  twitterHandle: "@ncoffee",
};

// Шаблоны title для разных типов страниц
export const titleTemplates = {
  // Главная страница
  home: `${siteConfig.name} — капсулы и кофемашины Nespresso с доставкой по России`,

  // Категории
  category: (categoryName) =>
    `${categoryName} — купить с доставкой | ${siteConfig.name}`,

  // Страница товара
  product: (productName) =>
    `${productName} — купить в Москве и России | ${siteConfig.name}`,

  // Страница кофемашины
  machine: (machineName) =>
    `${machineName} — цена, отзывы, купить | ${siteConfig.name}`,

  // Акции и спецпредложения
  special: (offerName) => `${offerName} | ${siteConfig.name}`,

  // Дефолтный шаблон
  default: (pageName) => `${pageName} | ${siteConfig.name}`,
};

// Шаблоны description
export const descriptionTemplates = {
  // Главная страница
  home: `Купить оригинальные капсулы Nespresso и кофемашины с доставкой по всей России. Большой выбор: Original, Vertuo, Professional. Акции, подарки, гарантия качества.`,

  // Категории капсул
  capsules: (categoryName) =>
    `${categoryName} — оригинальные капсулы Nespresso. Большой выбор вкусов, быстрая доставка по России. Акции и подарки при покупке.`,

  // Категории кофемашин
  machines: (categoryName) =>
    `${categoryName} — официальные кофемашины Nespresso. Гарантия, доставка, подарки при покупке.`,

  // Страница товара
  product: (productName, category) =>
    `${productName} — ${category}. Оригинальный товар, быстрая доставка по России. Акции и подарки.`,

  // Аксессуары
  accessories: `Аксессуары для кофемашин Nespresso: Aeroccino, контейнеры, средства для чистки. Доставка по России.`,

  // Дефолтный шаблон
  default: (description) =>
    `${description} | ${siteConfig.name} — доставка по России, акции и подарки.`,
};

// SEO данные для категорий (на основе urlsIds)
export const categorySeoData = {
  "21ec0619-6b32-4b51-84d8-3505e9c012e0": {
    // capsulesOriginal
    title: "Капсулы Nespresso Original — купить с доставкой по России",
    description:
      "Оригинальные капсулы Nespresso Original: Ristretto, Arpeggio, Roma и другие вкусы. Быстрая доставка по России. Акции и подарки.",
    keywords: [
      "капсулы Nespresso Original",
      "Nespresso Original купить",
      "капсулы для Nespresso",
    ],
  },
  "8a751463-a205-49bf-acc0-e3aaab3ba453": {
    // capsulesVertuo
    title: "Капсулы Nespresso Vertuo — купить с доставкой по России",
    description:
      "Капсулы Nespresso Vertuo для кофемашин Vertuo. Большие капсулы, насыщенный вкус. Доставка по России.",
    keywords: [
      "капсулы Nespresso Vertuo",
      "Nespresso Vertuo купить",
      "Vertuo капсулы",
    ],
  },
  "f4b46931-5f5a-452a-82de-341da568cd24": {
    // capsulesPro
    title: "Капсулы Nespresso Professional — для бизнеса и офиса",
    description:
      "Профессиональные капсулы Nespresso для кофемашин Zenius, Gemini, Aguila. Для офисов и кафе. Доставка по России.",
    keywords: [
      "Nespresso Professional",
      "капсулы Nespresso Pro",
      "кофе для офиса",
    ],
  },
  "63cc29f9-6d1f-413a-bc59-debf5eb1f633": {
    // machinesOriginal
    title: "Кофемашины Nespresso Original — купить с доставкой",
    description:
      "Кофемашины Nespresso Original: Essenza, CitiZ, Lattissima, Creatista. Официальная гарантия, доставка по России.",
    keywords: [
      "кофемашина Nespresso",
      "Nespresso Original купить",
      "кофемашина с капсулами",
    ],
  },
  "1a74328b-b51c-4ac3-aaa3-e9583d9783aa": {
    // machinesVertuo
    title: "Кофемашины Nespresso Vertuo — купить с доставкой",
    description:
      "Кофемашины Nespresso Vertuo и Vertuo Next. Большие капсулы, американо одним нажатием. Доставка по России.",
    keywords: [
      "кофемашина Nespresso Vertuo",
      "Vertuo купить",
      "Nespresso Vertuo",
    ],
  },
  "277b80c9-ec7a-4445-9ae2-25e6fad898bf": {
    // accessories
    title: "Аксессуары Nespresso — Aeroccino, контейнеры, средства для чистки",
    description:
      "Аксессуары для кофемашин Nespresso: вспениватели молока Aeroccino, контейнеры для капсул, средства для чистки. Доставка по России.",
    keywords: [
      "Aeroccino купить",
      "аксессуары Nespresso",
      "контейнер для капсул",
    ],
  },
  "d61a5529-7920-41bf-a927-45734c11f981": {
    // exclusive
    title: "Эксклюзивные товары Nespresso — Limited Edition",
    description:
      "Эксклюзивные капсулы и аксессуары Nespresso. Лимитированные серии, подарочные наборы. Доставка по России.",
    keywords: [
      "Nespresso Limited Edition",
      "эксклюзивные капсулы Nespresso",
      "подарочный набор Nespresso",
    ],
  },
  "1cdc3761-2853-4b32-961b-fba1b84a41db": {
    // specialOffers
    title: "Акции и специальные предложения Nespresso",
    description:
      "Специальные предложения и акции на капсулы и кофемашины Nespresso. Скидки, подарки, бесплатная доставка.",
    keywords: [
      "Nespresso акция",
      "скидки Nespresso",
      "Nespresso подарок",
    ],
  },
};

// Дефолтные OG изображения (placeholder)
export const defaultOgImage = "https://n-coffee.ru/images/og-default.jpg";

// Пути к OG изображениям для категорий
export const categoryOgImages = {
  capsules: "https://n-coffee.ru/images/og-capsules.jpg",
  machines: "https://n-coffee.ru/images/og-machines.jpg",
  accessories: "https://n-coffee.ru/images/og-accessories.jpg",
};
