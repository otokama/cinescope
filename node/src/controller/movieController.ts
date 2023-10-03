import { NextFunction, Request, Response, Router } from "express";
import { getMovieList } from "../services/movieService";
import { getBackdropLink, getPosterLink } from "../utils/movieUtil";

const movieController = Router();

movieController.get("/now_playing", getDiscoverMovieList);
movieController.get("/popular", getDiscoverMovieList);
movieController.get("/top_rated", getDiscoverMovieList);
movieController.get("/upcoming", getDiscoverMovieList);


async function getDiscoverMovieList(req: Request, res: Response, next: NextFunction) {
  const size = parseInt(req.params?.size) || 15;
  
  const urlPaths = req.url.split("/");
  const listName = urlPaths[urlPaths.length - 1];
  try {
    const response = await getMovieList(listName);
    let { results: movieList } = response.data;
    movieList = movieList.map((movie) => {
      movie.backdrop_path = getBackdropLink(movie.backdrop_path);
      movie.poster_path = getPosterLink(movie.poster_path);
      return movie;
    });
    if (movieList.length > size) {
      res.send(movieList.slice(0, size));
    } else {
      res.send(movieList);
    }
  } catch (err) {
    next(err);
  }
}

export default movieController;