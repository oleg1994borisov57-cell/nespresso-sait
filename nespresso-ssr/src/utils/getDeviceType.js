export default function getDeviceType() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "ios";
  }

  if (/android/i.test(userAgent)) {
    return "android";
  }

  return "pc";
}
