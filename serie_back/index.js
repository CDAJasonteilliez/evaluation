const express = require("express");
const routes = require("./routes");
const path = require("path");

const app = express();
const port = 8000;

require("./database");

app.use(express.static(path.join(__dirname, "upload")));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(routes);

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
