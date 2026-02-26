const currVer = "v1";

export const clearOldLocalStorage = () => {
  const version = localStorage.getItem("version");

  if (!version || version !== currVer) {
    localStorage.clear();
    localStorage.setItem("version", currVer);
    window.location.reload();
  }
};
