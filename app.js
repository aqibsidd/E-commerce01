let dotenv = require("dotenv")
const express = require('express');
const bodyParser = require('body-parser');
const loadRoutes = require('./routers')
const cors = require("cors");
let corsOptions = {
  origin: function (origin, callback) {
    console.log(whitelist.indexOf(origin));
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

require('./db/conn')

dotenv.config({ path: './.env' });

const app = express();
app.use(bodyParser.json());

app.use(cors({ origin: "*" }));
// Routes

app.use(loadRoutes)
const PORT = process.env.PORT
const HOST_NAME = process.env.HOST

app.listen(PORT, HOST_NAME, async () => {
  console.log(`server is running on ${HOST_NAME}:${PORT}`);
});