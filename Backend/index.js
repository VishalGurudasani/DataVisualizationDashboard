const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoURI = "mongodb://127.0.0.1:27017/DataVisualization";
const app = express();
const port = 5000;
const router =require('./Routes/index');

app.use(express.json());
app.use(cors());

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("error while connecting to database", err));

//api call
app.use("/api/data",router);



app.listen(port, () => {
  console.log(`Backend is listening at ${port}`);
});
