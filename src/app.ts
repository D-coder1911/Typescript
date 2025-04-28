import express, { Application, Request, Response } from "express";
import router from "./router";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.all("/*splat", (req: Request, res: Response): void => {
  res.status(404).send({
    message: `Given URL: ${req.url} is not found`,
  });
});

export default app;
