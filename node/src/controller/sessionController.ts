import { Request, Response, Router } from "express";
// import ms from "ms";
// import { getNewSessionToken } from "../helpers/jwt";
import { getAccount } from "../services/accountService";
import {
  getNewSession,
  getRequestToken,
  revokeSession,
} from "../services/sessionService";

const sessionRouter = Router();

sessionRouter.get("/new", requestNewSession);
sessionRouter.get("/auth", createSession);
sessionRouter.delete("/delete", deleteSession);

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
  if (req.query.request_token) {
    const request_token = req.query.request_token;
    try {
      const newSessionRes = await getNewSession(String(request_token));
      if (newSessionRes.status === 200 && newSessionRes.data.success) {
        const { session_id } = newSessionRes.data;
        const { data: accountDetail } = await getAccount(session_id);
        // const sessionToken = getNewSessionToken(session_id, accountDetail.id);
        res.send({
          user: accountDetail,
          sessionId: session_id,
        });
      } else {
        res.status(400).send("TMDB: new session denied");
      }
    } catch (err) {
      res.status(400).send("Failed to get account detail");
    }
  } else {
    res.status(400).send("Request token not provided");
  }
}

async function deleteSession(req: Request, res: Response) {
  const session_id = req.body.session_id;
  if (!session_id) {
    return res.status(400).send("Missing session_id");
  }
  try {
    const { data: revokeResponse, status } = await revokeSession(
      String(session_id)
    );
    if (status === 200 && revokeResponse.success) {
      return res.send({ success: true });
    }
    return res.status(400).send("Failed to revoke session");
  } catch (err) {
    return res.status(400).send("Failed to revoke session");
  }
}

export default sessionRouter;
