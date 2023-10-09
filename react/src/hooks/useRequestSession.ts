import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { ToastNotification } from "../entities/Toast";
import { User } from "../entities/User";
import APIClient from "../services/api-client";
import useAccountStore from "../stores/user";
import { useToastHook } from "./useToast";

export interface AuthenticateSessionResponse {
  user: User;
  sessionId: string;
}

const useRequestSession = (reqToken: string) => {
  const setSessionId = useAccountStore((s) => s.setSessionId);
  const setUser = useAccountStore((s) => s.setUser);

  const { setToast } = useToastHook();
  const [sessionCreated, setSessionCreated] = useState(false);
  const [error, setError] = useState();
  const apiClient = new APIClient<AuthenticateSessionResponse>("/session/auth");

  useEffect(() => {
    const controller = new AbortController();
    setTimeout(() => {
      apiClient
        .get({
          params: {
            request_token: reqToken,
          },
          signal: controller.signal,
        })
        .then((res) => {
          const { sessionId, user } = res;
          setSessionId(sessionId);
          setUser(user);
          setSessionCreated(true);
          const toast: ToastNotification = {
            title: "Success",
            description: "You have logged in as " + user.username,
            status: "success",
            duration: 5000,
          };
          setToast(toast);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err);
        });
    }, 1000);
    return () => controller.abort();
  }, []);

  return { sessionCreated, error };
};

export default useRequestSession;
