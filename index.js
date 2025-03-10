const express = require("express");
const cors = require("cors");
const database = require("./config/database");
require("dotenv").config();
const routesApiVer1 = require("./api/v1/routes/index.route");
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

database.connect();

app.use(cors());

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

// Routes Version 1
routesApiVer1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
