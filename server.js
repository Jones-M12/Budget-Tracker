const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const db = require("./models/transaction");


const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budgettrackerjones", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

//add connection for Atlas DB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/BudgetTracker',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// // routes
console.log("Before html-routes.js")
require("./routes/html-routes.js")(app);
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});