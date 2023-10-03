import axios from "axios";
import { TV } from "../models/TV";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv",
});

interface FetchTVListResponse {
  results: TV[];
}


async function getTVList(listName: string) {

  return await apiClient.get<FetchTVListResponse>(`/${listName}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    }
  });
}

export { getTVList };