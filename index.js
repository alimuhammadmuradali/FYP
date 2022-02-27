const express = require("express");
const path = require("path");
const fileUpload = require("./routes/fileUpload");
const connectDB = require(`./config/db`);
const errorHandler = require("./middleware/error");

connectDB();
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/file", express.static("uploads"));
//app.use(express.static(path.join(__dirname, "uploads")));

app.use("/upload", fileUpload);
app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  //close server & exit process
  server.close(() => process.exit(1));
});
