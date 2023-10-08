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

async function getFavoriteList(
  accountId: number,
  mediaType: string,
  page?: string,
  sort_by?: string,
) {
  return await apiClient.get(`/${accountId}/favorite/${mediaType}`, {
    params: {
      page,
      sort_by,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function updateFavorite(mediaId: number, accountId: number, mediaType: string, favorite: boolean) {

  return await apiClient.post(`/${accountId}/favorite`, {
    media_type: mediaType,
    media_id: mediaId,
    favorite
  }, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    }
  });
}



export { getAccount, getFavoriteList, updateFavorite };
