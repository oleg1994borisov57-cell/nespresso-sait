export default function getBrowserType() {
  const userAgent = navigator.userAgent;

  if (userAgent.indexOf("Firefox") > -1) {
    return "firefox";
  }

  if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
    return "safari";
  }

  // Проверяем на Chrome
  if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1) {
    return "chrome";
  }

  // Проверяем на Internet Explorer
  if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1) {
    return "explorer";
  }

  // Если браузер не определен
  return "default";
}
