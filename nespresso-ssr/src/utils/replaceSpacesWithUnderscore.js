export const replaceSpacesWithUnderscore = (str) => {
  return str.trim().replace(/[ &+]/g, "_");
};
