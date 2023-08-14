const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const { mongodb } = require("./mongodb");
const { adminRouter } = require("./admin/adminBro");

const app = express();
const PORT = process.env.PORT || 3051;

mongodb();

// API ROUTES
app.use("/admin", adminRouter);

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// Custom middleware
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("🤩This is backend CRM webpage🎉🚀 ");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
