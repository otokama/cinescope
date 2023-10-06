import { Actor } from "../models/Actor";
import { Movie } from "../models/Movie";
import { MovieDetail } from "../models/MovieDetail";
import { TV } from "../models/TV";
import { TVDetail } from "../models/TVDetail";

const baseUrl = "https://image.tmdb.org/t/p/";

function getBackdropLink(path: string, size?: string) {
  const imgSize = size || "original";
  return baseUrl + imgSize + path;
}

function getPosterLink(path: string, size?: string) {
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
  content.backdrop_path = getBackdropLink(content.backdrop_path);
  content.poster_path = getPosterLink(content.poster_path);
  return content;
}

export { getBackdropLink, getPosterLink, populateLinks, populateProfileLink };
