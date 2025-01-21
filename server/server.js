const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-route");
const adminProductRouter = require("./routes/admin/product-routes");
const shopProductsRouter = require("./routes/shop/product-route");
const shopCartRouter = require("./routes/shop/cart-route");
const shopAddressRouter = require("./routes/shop/address-routes");

mongoose
  .connect("mongodb+srv://kushal:kushal@e-commerce-mern.cuod3.mongodb.net/")
  .then(() => console.log("MongoDb connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
