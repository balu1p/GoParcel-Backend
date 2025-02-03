const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const router = require('./routes/auth.routes');
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
//auth routes 
app.use("/api/auth", router);

connectDB()
  .then(() => {
    console.log("DB connected successfully..!");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is successfully listening on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("DB connection rejected...!", err);
  });
  