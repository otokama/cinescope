import { NextFunction, Request, Response, Router } from "express";
import { getTVList } from "../services/tvService";
import { getBackdropLink, getPosterLink } from "../utils/movieUtil";

const tvController = Router();

tvController.get("/airing_today", getDiscoveryTVList);
tvController.get("/on_the_air", getDiscoveryTVList);
tvController.get("/popular", getDiscoveryTVList);
tvController.get("/top_rated", getDiscoveryTVList);

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

export default tvController;
