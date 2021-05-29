const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//MIDDLEWARES
app.use(cors());

//IMPORT ROUTES
const sellerRoute = require("./routes/seller");
app.use("/seller", sellerRoute);

const appointmentRoute = require("./routes/appointment");
app.use("/appointment", appointmentRoute);

const customerRoute = require("./routes/customer");
app.use("/customer", customerRoute);

const port = process.env.PORT || 5000;
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("CONNECTED TO DB ")
);
app.listen(port, () => console.log(`listening on port ${port}...`));
