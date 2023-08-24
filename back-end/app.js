import dotenv from "dotenv";
import express from "express";

import router from "./src/routers/index.js";
import dbConn from "./src/db/database.js";
dotenv.config();

const app = express();

dbConn();

app.use(express.json());
app.use(router);

export default app;
