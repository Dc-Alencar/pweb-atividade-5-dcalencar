import express from "express";
import { router } from "./routes/index.js";
import { middlewareDeErro } from "./middlewares/error.middlewares.js";

const app = express();
app.use(express.json());
app.use("/api", router);
app.use(middlewareDeErro);

export default app;