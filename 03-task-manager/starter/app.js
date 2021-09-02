const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require('./middleware/error-handler');

require("dotenv").config();

const connectDb = require("./db/connects");

//middleware
app.use(express.static("./public"));
app.use(express.json());

const port = process.env.PORT ||5000;

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`The server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
