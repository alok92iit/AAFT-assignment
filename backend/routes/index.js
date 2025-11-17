import express from "express";
import leads from "./leades.route.js";
import auth from "./auth.js";
import users from "./users.js";
import { checkToken } from "../utils/common.js";

const routes =express.Router()

routes.use("/leads",checkToken,leads)
routes.use("/auth",auth)
routes.use("/users",checkToken,users)

export default routes
