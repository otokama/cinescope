import { NextFunction, Request, Response, Router } from "express";
import { Movie } from "../models/Movie";
import { getMovieDiscovery, getMovieList, retrieveMovieDetail } from "../services/movieService";
import { populateLinks } from "../utils/image-url";

const movieController = Router();

movieController.get("/discover/now_playing", getDiscoverMovieList);
movieController.get("/discover/popular", getDiscoverMovieList);
movieController.get("/discover/top_rated", getDiscoverMovieList);
movieController.get("/discover/upcoming", getDiscoverMovieList);
movieController.get("/discover", getDiscoveryMovies);
movieController.get("/detail/:id", getMovieDetail);

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

async function getMovieDetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.params.id) {
      return res.send("Missing movie id").status(400);
    }
    const movieId = parseInt(req.params.id);
    const { data: movieDetail, status } = await retrieveMovieDetail(movieId);
    if (status === 200 && movieDetail) {
      return res.send(movieDetail);
    }
  } catch (err) {
    res.status(404).send("Movie Not Found");
  }

}

export default movieController;
