import app from "./app";
import connectDb from "./config/mongo.config";

connectDb()
  .then(() => null)
  .catch(() => undefined);

app.listen(4000, (): void => {
  console.log(`listening on ${4000}`);
});
