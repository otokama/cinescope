import { NextFunction, Response, Router } from "express";
import { Request } from "express-jwt";
import {
  getAccount,
  getFavoriteList,
  updateFavorite,
} from "../services/accountService";

const accountRouter = Router();

accountRouter.get("/details", getAccountDetails);

accountRouter.get(
  "/favorite/:accountId/:sessionId/:mediaType",
  getFavoriteMedia
);
accountRouter.post("/favorite/update/:accountId", updateFavoriteMedia);

async function getAccountDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.auth?.sessionId) return res.send(401);
  const sessionId = req.auth.sessionId;
  try {
    const { data: accountDetail } = await getAccount(sessionId);
    res.send(accountDetail);
  } catch (err) {
    next(err);
  }
}

async function getFavoriteMedia(req: Request, res: Response) {
  if (!req.params.accountId || !req.params.mediaType || !req.params.sessionId) {
    return res.status(400).send("Missing required field");
  }
  const queryDict = req.query;
  const accountId = parseInt(req.params.accountId);
  try {
    const { data } = await getFavoriteList(
      accountId,
      req.params.sessionId,
      req.params.mediaType,
      queryDict.page?.toString(),
      queryDict.sort_by?.toString()
    );
    res.send(data);
  } catch (err) {
    res.status(401).send("Failed to fetch favorite movies");
  }
}

async function updateFavoriteMedia(req: Request, res: Response) {
  let { media_type, media_id, favorite, session_id } = req.body;
  if (
    !media_type ||
    !media_id ||
    !session_id ||
    favorite === undefined ||
    !req.params.accountId
  ) {
    return res.status(400).send("Missing required field");
  }
  try {
    const accountId = parseInt(req.params.accountId);
    media_type = String(media_type);
    session_id = String(session_id);
    media_id = parseInt(media_id);
    const updateRes = await updateFavorite(
      media_id,
      accountId,
      session_id,
      media_type,
      favorite
    );
    if (updateRes.status === 200 || updateRes.status === 201) {
      res.send({ success: true });
    } else {
      res.status(400).send("Failed to update favorite " + media_type);
    }
  } catch (err) {
    res.status(400).send("Failed to update favorite " + media_type);
  }
}

export default accountRouter;
