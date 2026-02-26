import AddToHomeDialog from "../addToHomeDialog/AddToHomeDialog";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";
import Menu from "../menu/Menu";
import SocialLinks from "../socialLinks/SocialLinks";
import { useRouter } from "next/router";
import { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";

const CouponBanner = dynamic(() => import("../couponBanner/CouponBanner"), {
  ssr: false,
});
const AlertDialog = dynamic(() => import("../alertDialog/AlertDialog"), {
  ssr: false,
});

function Layout({ children, menuLinks }) {
  const { pathname } = useRouter();

  const [isCheckoutPage, setIsCheckoutPage] = useState(true);

  useEffect(() => {
    if (pathname.includes("/checkout")) {
      setIsCheckoutPage(true);
    } else {
      setIsCheckoutPage(false);
    }
  }, [pathname]);

  return (
    <>
      {/* {!isCheckoutPage ? <AddToHomeDialog /> : null} */}
      <Menu />
      <NavBar links={menuLinks} />
      <CouponBanner />
      <AlertDialog />
      {children}
      {!isCheckoutPage ? <SocialLinks /> : null}
      <CookieConsent
        location="bottom"
        buttonText="Согласен"
        cookieName="cookieConsent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        declineButtonStyle={{ fontSize: "13px" }}
        expires={150}
      >
        Мы используем куки для улучшения вашего опыта на сайте.{" "}
        <Link href="/about/privacyPolicy" style={{ color: "#ffd700" }}>
          Подробнее
        </Link>
      </CookieConsent>
      <Footer links={menuLinks} />
    </>
  );
}

export default memo(Layout);
