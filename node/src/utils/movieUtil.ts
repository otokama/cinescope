const baseUrl = "https://image.tmdb.org/t/p/";

function getBackdropLink(path: string, size?: string) {
  const imgSize = size || "w1280";
  return baseUrl + "/" + imgSize + path;
}

function getPosterLink(path: string, size?: string) {
  const imgSize = size || "w780";
  return baseUrl + "/" + imgSize + path;
}

export { getBackdropLink, getPosterLink };