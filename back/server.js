import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
