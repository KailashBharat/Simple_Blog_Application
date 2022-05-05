import "dotenv/config";
import express from "express";
import useRoutes from "./routes/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

useRoutes(app);

export default app;


