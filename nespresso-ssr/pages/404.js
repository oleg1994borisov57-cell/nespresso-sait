import { useEffect } from "react";
import Page404 from "../src/components/pages/page404/page404";

export default function Custom404() {
  useEffect(() => {
    if (typeof window === "undefined") {
      // Устанавливаем статус ответа 404
      res.statusCode = 404;
      // Устанавливаем заголовок X-Accel-Redirect
      res.setHeader("X-Accel-Redirect", "/internal_redirect");
    }
  }, []);

  return <Page404 />;
}
