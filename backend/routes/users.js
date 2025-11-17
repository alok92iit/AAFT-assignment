import express from "express"
import { allUsers } from "../controller/users.js"
const users=express.Router()


users.route("/")
    .get(allUsers)


export default users