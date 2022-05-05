import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 4000;
const MONGOURI = process.env.MONGOURI || "";

mongoose.connect(MONGOURI);

mongoose.connection.once("connected", () => {
  console.log("Connected to db");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
