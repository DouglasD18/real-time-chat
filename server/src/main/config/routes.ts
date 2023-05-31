import { Router, Express } from "express";
import usersRoute from "../routes/users";

export default (app: Express): void => {
  const router = Router();
  app.use("/api/users", router);
  usersRoute(router);
}