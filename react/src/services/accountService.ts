import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

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

export { updateFavoriteMedia };
