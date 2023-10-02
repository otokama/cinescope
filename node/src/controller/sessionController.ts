import { Request, Response, Router } from "express";
import ms from "ms";
import { getNewSessionToken } from "../helpers/jwt";
import { getAccount } from "../services/accountService";
import { getNewSession, getRequestToken } from "../services/sessionService";

const sessionRouter = Router();

sessionRouter.get("/new", requestNewSession);
sessionRouter.get("/tmdb-approved", createSession);

async function requestNewSession(_: Request, res: Response) {
  try {
    const reqTokenRes = await getRequestToken();
    if (reqTokenRes.status === 200 && reqTokenRes.data.success) {
      const { request_token } = reqTokenRes.data;
      if (!process.env.AUTH_REDIRECT_URL) {
        throw new Error("auth redirect URL not set");
      }
      const authLink = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${process.env.AUTH_REDIRECT_URL}`;
      res.send({ authLink });
    } else {
      res.status(500).send("TMDB: request new request_token denied");
    }
  } catch (err) {
    res.status(500).send("TMDB: request new request_token denied");
  }
}

async function createSession(req: Request, res: Response) {
  if (req.query.approved === "true" && req.query.request_token) {
    const request_token = req.query.request_token;
    try {
      const newSessionRes = await getNewSession(String(request_token));
      if (newSessionRes.status === 200 && newSessionRes.data.success) {
        const { session_id } = newSessionRes.data;
        const { data: accountDetail } = await getAccount(session_id);

        const sessionToken = getNewSessionToken(session_id, accountDetail.id);

        res
          .cookie("session_token", sessionToken, {
            expires: new Date(Date.now() + ms("2d")),
          })
          .redirect("/");
      } else {
        res.status(500).send("TMDB: new session denied");
      }
    } catch (err) {
      res.status(500).send("Failed to get account detail");
    }
  } else {
    res.status(400).send("Request token not authorized");
  }
}

export default sessionRouter;
