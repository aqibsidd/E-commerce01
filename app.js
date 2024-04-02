let dotenv = require("dotenv")
const express = require('express');
const bodyParser = require('body-parser');
const loadRoutes = require('./routers')

require('./db/conn')

dotenv.config({path:'./.env'});

const app = express();
app.use(bodyParser.json());
// Routes

app.use(loadRoutes)
const PORT = process.env.PORT 
const HOST_NAME = process.env.HOST 

app.listen(PORT, HOST_NAME, async () => {
  console.log(`server is running on ${HOST_NAME}:${PORT}`);
});