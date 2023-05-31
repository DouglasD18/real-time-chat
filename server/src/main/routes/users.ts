import { Router } from "express";
import { adapterRoute } from "../adapter/express-router-adapter";
import { makeSignUpController } from '../factories/sign-up';
import { makeLoginController } from '../factories/login';
import { makeVerifyController } from '../factories/verify';

export default (router: Router): void => {
  router.post("/login/", adapterRoute(makeSignUpController()));
  router.get("/login/", adapterRoute(makeLoginController()));
  router.get("/verify/", adapterRoute(makeVerifyController()));
}