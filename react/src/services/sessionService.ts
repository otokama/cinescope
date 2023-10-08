import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

interface FetchAuthLinkResponse {
  authLink: string;
}

interface DeleteSessionResponse {
  success: boolean;
}

const requestSession = async () => {
  try {
    const { data } = await axiosInstance.get<FetchAuthLinkResponse>(
      "/session/new"
    );
    return data.authLink;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const revokeSession = async (sessionId: string) => {
  try {
    const { data } = await axiosInstance.delete<DeleteSessionResponse>(
      "/session/delete",
      {
        data: { session_id: sessionId },
      }
    );
    return data;
  } catch (err) {
    throw err;
  }
};

export { requestSession, revokeSession };
