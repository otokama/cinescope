import { NextFunction, Request, Response, Router } from "express";
import { Movie } from "../models/Movie";
import { MovieSearchQuery } from "../models/MovieSearchQuery";
import {
  getDetail,
  getMovieCast,
  getMovieDiscovery,
  getMovieList,
  getMovieProviders,
  getMovieRating,
  getMovieRecommendations,
  getMovieVideos,
  search,
} from "../services/movieService";
import { populateLinks, populateProfileLink } from "../utils/image-url";
import { populateVideoLink } from "../utils/video-url";

const movieController = Router();

movieController.get("/discover", getDiscoveryMovies);
movieController.get("/discover/:list", getDiscoverMovieList);
movieController.get("/detail/:id", getMovieDetail);
movieController.get("/detail/:id/credits", getMovieCredit);
movieController.get("/detail/:id/trailer", getMovieTrailers);
movieController.get("/detail/:id/provider", getWatchProviders);
movieController.get("/detail/:id/recommendation", getRecommendations);
movieController.get("/search", searchMovies);

async function getDiscoverMovieList(req: Request, res: Response) {
  if (!req.params.list) {
    return res.status(400).send("Missing list name");
  }
  try {
    const { data } = await getMovieList(
      req.params.list,
      req.query.page?.toString()
    );
    res.send(data);
  } catch (err) {
    res.status(400).send("Failed to fetch discovery movies");
  }
}

async function getDiscoveryMovies(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const size = 20;
  try {
    const response = await getMovieDiscovery();
    let { results: movies } = response.data;
    movies = movies.map((movie) => populateLinks(movie) as Movie);
    res.send(movies.slice(0, size));
  } catch (err) {
    next(err);
  }
}

async function getMovieDetail(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.params.id) {
      return res.send("Missing movie id").status(400);
    }
    const movieId = parseInt(req.params.id);
    let { data: movieDetail, status } = await getDetail(movieId);
    if (status === 200 && movieDetail) {
      const certification = await getMovieRating(parseInt(req.params.id));
      if (certification) movieDetail.certification = certification;
      res.send(movieDetail);
    } else {
      res.status(404).send("Movie Not Found");
    }
  } catch (err) {
    res.status(404).send("Movie Not Found");
  }
}

async function getMovieCredit(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.params.id) {
      return res.send("Missing movie id").status(400);
    }
    const movieId = parseInt(req.params.id);
    let { data, status } = await getMovieCast(movieId);
    let cast = data.cast;
    if (status === 200 && cast && cast.length > 0) {
      cast = cast.map((actor) => populateProfileLink(actor));
      res.send(cast.slice(0, 10));
    } else {
      res.send([]);
    }
  } catch (err) {
    res.status(404).send("Movie Not Found");
  }
}

async function getMovieTrailers(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.send("Missing movie id").status(400);
    }
    const movieId = parseInt(req.params.id);
    let { data, status } = await getMovieVideos(movieId);
    let { results: videos } = data;
    if (status === 200 && videos && videos.length > 0) {
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
    res.status(404).send("Movie Not Found");
  }
}

async function getWatchProviders(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.send("Missing movie id").status(400);
    }
    const movieId = parseInt(req.params.id);
    let { data, status } = await getMovieProviders(movieId);
    if (status === 200 && data && data.results) {
      return res.send(data.results["US"]);
    } else {
      res.send([]);
    }
  } catch (err) {
    res.status(404).send("Movie Not Found");
  }
}

async function getRecommendations(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.send("Missing movie id").status(400);
    }
    const movieId = parseInt(req.params.id);
    let { data, status } = await getMovieRecommendations(movieId);
    let movies = data.results;
    if (status === 200 && movies) {
      res.send(movies);
    } else {
      res.send([]);
    }
  } catch (err) {
    res.status(404).send("Movie Not Found");
  }
}

async function searchMovies(req: Request, res: Response) {
  const queryDict = req.query;
  const searchQuery: MovieSearchQuery = {
    query: queryDict.query?.toString() || "",
    include_adult: false,
    language: "en-US",
    year: queryDict.year?.toString(),
    page: queryDict.page ? parseInt(queryDict.page.toString()) : 1,
  };
  try {
    const { data } = await search(searchQuery);
    res.send(data);
  } catch (err) {
    res.status(400).send("Failed to search");
  }
}

export default movieController;
