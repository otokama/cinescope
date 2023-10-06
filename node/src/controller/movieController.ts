import { NextFunction, Request, Response, Router } from "express";
import { Movie } from "../models/Movie";
import { MovieDetail } from "../models/MovieDetail";
import {
  getMovieCast,
  getMovieDiscovery,
  getMovieList,
  getMovieProviders,
  getMovieRating,
  getMovieVideos,
  retrieveMovieDetail,
} from "../services/movieService";
import { populateLinks, populateProfileLink } from "../utils/image-url";
import { populateVideoLink } from "../utils/video-url";

const movieController = Router();

movieController.get("/discover/now_playing", getDiscoverMovieList);
movieController.get("/discover/popular", getDiscoverMovieList);
movieController.get("/discover/top_rated", getDiscoverMovieList);
movieController.get("/discover/upcoming", getDiscoverMovieList);
movieController.get("/discover", getDiscoveryMovies);
movieController.get("/detail/:id", getMovieDetail);
movieController.get("/detail/:id/credits", getMovieCredit);
movieController.get("/detail/:id/trailer", getMovieTrailers);
movieController.get("/detail/:id/provider", getWatchProviders);

async function getDiscoverMovieList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const size = parseInt(req.params?.size) || 15;

  const urlPaths = req.url.split("/");
  const listName = urlPaths[urlPaths.length - 1];
  try {
    const response = await getMovieList(listName);
    let { results: movieList } = response.data;
    movieList = movieList.map((movie) => populateLinks(movie) as Movie);
    if (movieList.length > size) {
      res.send(movieList.slice(0, size));
    } else {
      res.send(movieList);
    }
  } catch (err) {
    next(err);
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
    let { data: movieDetail, status } = await retrieveMovieDetail(movieId);
    movieDetail = populateLinks(movieDetail) as MovieDetail;
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

async function getMovieTrailers(
  req: Request,
  res: Response
) {
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

async function getWatchProviders(
  req: Request,
  res: Response
) {
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

export default movieController;
