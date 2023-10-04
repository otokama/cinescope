import { NextFunction, Request, Response, Router } from "express";
import { getDiscoveryTV, getTVList } from "../services/tvService";
import { getBackdropLink, getPosterLink, populateLinks } from "../utils/image-url";
import { TV } from "../models/TV";

const tvController = Router();

tvController.get("/discover/airing_today", getDiscoveryTVList);
tvController.get("/discover/on_the_air", getDiscoveryTVList);
tvController.get("/discover/popular", getDiscoveryTVList);
tvController.get("/discover/top_rated", getDiscoveryTVList);
tvController.get("/discover", getDiscoverTVList);

async function getDiscoveryTVList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const size = parseInt(req.params?.size) || 15;
  const urlPaths = req.url.split("/");
  const listName = urlPaths[urlPaths.length - 1];

  try {
    const response = await getTVList(listName);

    let { results: tvList } = response.data;
    tvList = tvList.map((tv) => {
      tv.backdrop_path = getBackdropLink(tv.backdrop_path);
      tv.poster_path = getPosterLink(tv.poster_path);
      return tv;
    });
    if (tvList.length > size) {
      res.send(tvList.slice(0, size));
    } else {
      res.send(tvList);
    }
  } catch (err) {
    next(err);
  }
}

async function getDiscoverTVList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const size = 20;
  try {
    const response = await getDiscoveryTV();
    let { results: tvs } = response.data;
    tvs = tvs.map((tv) => (populateLinks(tv) as TV));
    res.send(tvs.slice(0, size));
  } catch (err) {
    next(err);
  }
}

export default tvController;
