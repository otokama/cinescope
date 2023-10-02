import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/account",
});

interface FetchAccountDetailResponse {
  name: string;
  id: number;
  username: string;
}

async function getAccount(sessionId: string) {
  return await apiClient.get<FetchAccountDetailResponse>("", {
    params: {
      session_id: sessionId,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getFavoriteMovies(accountId: number) {}

async function addFavoriteMovie(movieId: number, accountId: number) {}

async function removeFavoriteMovie(movieId: number, accountId: number) {}

export { getAccount };
