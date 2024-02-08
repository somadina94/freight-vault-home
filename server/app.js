const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const vaultRouter = require("./routes/vaultRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/vault", vaultRouter);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);

module.exports = app;
