import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

interface FetchAccountStatesResponse {
  id: number;
  favorite: boolean;
  rated: boolean;
  watchlist: boolean;
}

async function updateFavoriteMedia(
  accountId: number,
  sessionId: string,
  mediaType: "movie" | "tv",
  mediaId: number,
  isFavorite: boolean
) {
  return await axiosInstance.post("/media/favorite/update/" + accountId, {
    session_id: sessionId,
    media_type: mediaType,
    media_id: mediaId,
    favorite: isFavorite,
  });
}

async function getAccountStates(sessionId: string, mediaId: number, mediaType: "movie" | "tv") {
  return await axiosInstance.get<FetchAccountStatesResponse>(`/${mediaType}/detail/${mediaId}/account_states`, {
    params: {
      session_id: sessionId
    }
  });
}

export { updateFavoriteMedia, getAccountStates };
