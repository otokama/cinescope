import { Movie } from "../models/Movie";
import { TV } from "../models/TV";

const baseUrl = "https://image.tmdb.org/t/p/";

function getBackdropLink(path: string, size?: string) {
  const imgSize = size || "original";
  return baseUrl + imgSize + path;
}

function getPosterLink(path: string, size?: string) {
  const imgSize = size || "w780";
  return baseUrl+ imgSize + path;
}

function populateLinks(content: Movie | TV) {
  content.backdrop_path = getBackdropLink(content.backdrop_path);
  content.poster_path = getPosterLink(content.poster_path);
  return content;
}

export { getBackdropLink, getPosterLink, populateLinks };