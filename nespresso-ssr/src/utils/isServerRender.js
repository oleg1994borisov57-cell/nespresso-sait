export default function isServerRender() {
  return typeof window === "undefined";
}
