import Head from "next/head";
import dynamic from "next/dynamic";

import { urlsIds } from "../src/config/urlsIds.config";
import getCurrUrl from "../src/utils/getCurrUrl";

const ExclusivePage = dynamic(() =>
  import("../src/components/pages/exclusivePage/ExclusivePage")
);
import SpecialOffersPage from "../src/components/pages/specialOffersPage/SpecialOffersPage";
const AccessoriesPage = dynamic(() =>
  import("../src/components/pages/accessoriesPage/AccessoriesPage")
);
const AboutCompanyPage = dynamic(() =>
  import("../src/components/pages/aboutCompanyPage/AboutCompanyPage")
);
const MachinesPage = dynamic(() =>
  import("../src/components/pages/machinesPage/MachinesPage")
);

export default function getPageContent(
  page,
  title,
  description,
  type,
  path,
  props
) {
  switch (page) {
    case urlsIds.machinesVertuo:
    case urlsIds.machinesOriginal:
      return (
        <>
          <Head>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <link rel="canonical" href={`${getCurrUrl().url}/${path}`} />
            <title>{title}</title>
          </Head>
          <MachinesPage {...props} page={type} />
        </>
      );
    case urlsIds.accessories:
      return (
        <>
          <Head>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <link rel="canonical" href={`${getCurrUrl().url}/${path}`} />
            <title>{title}</title>
          </Head>
          <AccessoriesPage {...props} />
        </>
      );
    case urlsIds.exclusive:
      return (
        <>
          <Head>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <link rel="canonical" href={`${getCurrUrl().url}/${path}`} />
            <title>{title}</title>
          </Head>
          <ExclusivePage {...props} />
        </>
      );
    case urlsIds.about:
      return (
        <>
          <Head>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <link rel="canonical" href={`${getCurrUrl().url}/${path}`} />
            <title>{title}</title>
          </Head>
          <AboutCompanyPage {...props} />
        </>
      );
    case urlsIds.specialOffers:
      return (
        <>
          <Head>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <link rel="canonical" href={`${getCurrUrl().url}/${path}`} />
            <title>{title}</title>
          </Head>
          <SpecialOffersPage {...props} />
        </>
      );
    default:
      return null;
  }
}
