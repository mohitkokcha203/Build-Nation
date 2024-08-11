const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./private.env" });
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
// configuraton of cloudinary ========

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

const dbConnect = require("./DATABASE/dbConnect");
const userAuthRouter = require("./ROUTES/authenticationRout");
const ProductRouter = require("./ROUTES/productRoute");

const app = express();
app.use(express.json({limit:'50mb'}));
app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// routers ================
app.use("/user", userAuthRouter);
app.use("/product", ProductRouter);

//establishing connection with database ---------------
const port = process.env.PORT || 4001;
dbConnect();
app.listen(port, () => {
  console.log("*** SERVER IS UP ***");
});
