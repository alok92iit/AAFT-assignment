import { config } from "dotenv"
if (process.env.NODE_ENV !== "production") {
  config();
}
import express from "express";
import routes from "./routes/index.js";
import cors from "cors"
import { dbConfig } from "./utils/common.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import passportConfig from "./passportConfig.js";

dbConfig().catch((err) => console.log("the error=", err));
const app = express()

app.use(passport.initialize());
passportConfig(passport);
app.use(express.json({ limit: '700mb' }));
app.use(cookieParser());
app.use(cors({
  origin: ["http://127.0.0.1:5173", "http://192.168.56.1:5173", "http://localhost:5173", "http://172.28.240.1:5173", "http://192.168.1.46:5173", "https://skillfiedmentor.com"],
  // methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  // credentials: true,
   credentials: true,
    exposedHeaders: ["Authorization", "token", "x-access-token"],
}))
app.use('/api',routes)

app.listen(process.env.port, () => {
  console.log(`server runing on port ${process.env.port}`)
})
