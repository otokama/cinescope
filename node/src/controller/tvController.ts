import { NextFunction, Request, Response, Router } from "express";
import { TV } from "../models/TV";
import { TVDetail } from "../models/TVDetail";
import {
  getCast,
  getDetail,
  getDiscoveryTV,
  getRating,
  getStreamProviders,
  getTVList,
  getTVRecommendations,
  getVideos,
} from "../services/tvService";
import {
  populateLinks,
  populateProfileLink
} from "../utils/image-url";
import { populateVideoLink } from "../utils/video-url";

const tvController = Router();

tvController.get("/discover", getDiscoverTVList);
tvController.get("/discover/:list", getDiscoveryTVList);
tvController.get("/detail/:id", getTVDetail);
tvController.get("/detail/:id/trailer", getTVTrailers);
tvController.get("/detail/:id/credits", getTVCredits);
tvController.get("/detail/:id/provider", getTVWatchProviders);
tvController.get("/detail/:id/recommendation", getRecommendations);

async function getDiscoveryTVList(req: Request, res: Response) {
  if (!req.params.list) {
    return res.status(400).send("Missing list name");
  }
  try {
    const { data } = await getTVList(
      req.params.list,
      req.query.page?.toString()
    );
    res.send(data);
  } catch (err) {
    res.status(400).send("Failed to fetch discovery tv list");
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
      return res.send("Missing tv id").status(400);
    }
    const tvId = parseInt(req.params.id);
    let { data: tvDetail, status } = await getDetail(tvId);
    if (status === 200 && tvDetail) {
      tvDetail = populateLinks(tvDetail) as TVDetail;
      const { data, status } = await getRating(parseInt(req.params.id));
      if (status === 200 && data.results) {
        const usRating = data.results.find(
          (rating) => rating.iso_3166_1 === "US"
        );
        tvDetail.certification = usRating?.rating;
      }
      return res.send(tvDetail);
    } else {
      return res.status(404).send("TV Not Found");
    }
  } catch (err) {
    res.status(404).send("TV Not Found");
  }
}

async function getTVCredits(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.send("Missing tv id").status(400);
    }
    const tvId = parseInt(req.params.id);
    let { data, status } = await getCast(tvId);
    let cast = data.cast;
    if (status === 200 && cast && cast.length > 0) {
      cast = cast.map((actor) => populateProfileLink(actor));
      res.send(cast.slice(0, 10));
    } else {
      res.send([]);
    }
  } catch (err) {
    res.status(404).send("TV Not Found");
  }
}

async function getTVTrailers(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.send("Missing tv id").status(400);
    }
    const tvId = parseInt(req.params.id);
    let { data, status } = await getVideos(tvId);
    let { results: videos } = data;
    if (status === 200 && videos.length > 0) {
      let trailerVideos = videos.filter(
        (v) => v.type === "Trailer" || v.type === "Teaser"
      );
      if (trailerVideos.length === 0) {
        return res.send([]);
      }
      trailerVideos = trailerVideos.map((v) => populateVideoLink(v));
      res.send(trailerVideos);
    } else {
      res.send([]);
    }
  } catch (err) {
    res.status(404).send("TV Not Found");
  }
}

async function getTVWatchProviders(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.send("Missing tv id").status(400);
    }
    const tvId = parseInt(req.params.id);
    let { data, status } = await getStreamProviders(tvId);
    if (status === 200 && data && data.results) {
      res.send(data.results["US"]);
    } else {
      res.send([]);
    }
  } catch (err) {
    res.status(404).send("TV Not Found");
  }
}

async function getRecommendations(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.send("Missing tv id").status(400);
    }
    const tvId = parseInt(req.params.id);
    let { data, status } = await getTVRecommendations(tvId);
    let tvs = data.results;
    if (status === 200 && tvs) {
      tvs = tvs.map((tv) => populateLinks(tv) as TV);
      res.send(tvs);
    } else {
      res.send([]);
    }
  } catch (err) {
    res.status(404).send("TV Not Found");
  }
}

export default tvController;
