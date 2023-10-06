import { NextFunction, Request, Response, Router } from "express";
import { TV } from "../models/TV";
import { getDetail, getDiscoveryTV, getRating, getTVList } from "../services/tvService";
import {
  getBackdropLink,
  getPosterLink,
  populateLinks,
} from "../utils/image-url";
import { TVDetail } from "../models/TVDetail";

const tvController = Router();

tvController.get("/discover/airing_today", getDiscoveryTVList);
tvController.get("/discover/on_the_air", getDiscoveryTVList);
tvController.get("/discover/popular", getDiscoveryTVList);
tvController.get("/discover/top_rated", getDiscoveryTVList);
tvController.get("/discover", getDiscoverTVList);
tvController.get("/detail/:id", getTVDetail);

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
    tvs = tvs.map((tv) => populateLinks(tv) as TV);
    res.send(tvs.slice(0, size));
  } catch (err) {
    next(err);
  }
}

async function getTVDetail(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.send("Missing movie id").status(400);
    }
    const tvId = parseInt(req.params.id);
    let { data: tvDetail, status } = await getDetail(tvId);
    if (status === 200 && tvDetail) {
      tvDetail = populateLinks(tvDetail) as TVDetail;
      const {data, status} = await getRating(parseInt(req.params.id));
      if (status === 200 && data.results) {
        const usRating = data.results.find((rating) => rating.iso_3166_1 === "US");
        tvDetail.certification = usRating?.rating;
      }
      return res.send(tvDetail);
    } else {
      return res.status(404).send("TV Not Found");
    }
  } catch (err) {
    res.status(404).send("TV Not Found");
  }
};

export default tvController;
