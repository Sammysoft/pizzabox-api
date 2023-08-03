import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import UserRoutes from "./Routes/Users/user.routes.js";
import AuthenticateRoute from "./Routes/Auth/authenticate.routes.js";
import connectDB from "./Config/db.js";

const app = express();
const port = process.env.PORT || 9099;

app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/api/user", UserRoutes);
app.use("/api", AuthenticateRoute);
app.listen(port, () => {
  connectDB();
  console.log(`Server running on https://localhost:${port}`);
});
