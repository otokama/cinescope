import { Actor } from "../../entities/Actor";
import { Movie } from "../../entities/Movie";
import { MovieDetail } from "../../entities/MovieDetail";
import { TV } from "../../entities/TV";
import { TVDetail } from "../../entities/TVDetail";

const baseUrl = "https://image.tmdb.org/t/p/";

function getBackdropLink(path: string, size?: string) {
  if (!path) return "";
  const imgSize = size || "original";
  return baseUrl + imgSize + path;
}

function getPosterLink(path: string, size?: string) {
  if (!path) return "";
  const imgSize = size || "w780";
  return baseUrl + imgSize + path;
}

function populateProfileLink(actor: Actor, size?: string) {
  if (!actor.profile_path) return actor;
  const imgSize = size || "h632";
  actor.profile_path = baseUrl + imgSize + actor.profile_path;
  return actor;
}

function populateLinks(
  content: Movie | TV | MovieDetail | TVDetail
): Movie | TV | MovieDetail | TVDetail {
  content.backdrop_path = content.backdrop_path
    ? getBackdropLink(content.backdrop_path)
    : "";
  content.poster_path = content.poster_path
    ? getPosterLink(content.poster_path)
    : "";
  return content;
}

export { getBackdropLink, getPosterLink, populateLinks, populateProfileLink };
