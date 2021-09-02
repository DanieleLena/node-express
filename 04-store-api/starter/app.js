require("dotenv").config();
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connect");
const productRouter = require('./routes/products');
//This package is the equivalent of asyncmiddleaware of the previous project
require('express-async-errors');

// require('./populate');

const express = require("express");
const router = require("./routes/products");
const app = express();

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products',productRouter);

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    //connect db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening in port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
