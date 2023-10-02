import { NextFunction, Response, Router } from "express";
import { Request } from "express-jwt";
import { getAccount } from "../services/accountService";

const accountRouter = Router();

accountRouter.get("/details", getAccountDetails);

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

export default accountRouter;
