require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const v1Router = express.Router();
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const cors = require("cors");
const { checkForAuthentication } = require("./middlewares/authentication");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
// app.use(express.static(path.resolve("./public")));

v1Router.use("/user", userRoutes);
v1Router.use("/profile",checkForAuthentication(), profileRoutes);


app.use("/api/v1", v1Router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
