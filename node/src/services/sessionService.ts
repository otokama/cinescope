import axios from "axios";

interface FetchRequestTokenResponse {
  success: boolean;
  expires_at: Date;
  request_token: string;
}

interface FetchCreateSessionResponse {
  success: boolean;
  session_id: string;
}

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3/authentication",
});

async function getRequestToken() {
  return await apiClient.get<FetchRequestTokenResponse>("/token/new", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  });
}

async function getNewSession(request_token: string) {
  return await apiClient.post<FetchCreateSessionResponse>(
    "/session/new",
    { request_token },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    }
  );
}
export { getRequestToken, getNewSession };
