if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || process.env.PORT_DEVELOPMENT;
const todoRoutes = require('./routes');
const uri = process.env.MONGO_PORT_PRODUCTION || "mongodb://localhost:27017/todoList_" + process.env.NODE_ENV;
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(uri, (err) => {
  if(err){
    console.log(err);
  }else {
    console.log(`${uri} successfully conected`);
  }
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use("/api", todoRoutes);
app.use((err, req, res, next) => {
  let status = err.status || 500
  let message = err.message || "error with no error message passed"
  res.status(status).json({message});
});
app.listen(port, () =>{
  console.log(`Listening to ${port}`)
});

module.exports = app;
