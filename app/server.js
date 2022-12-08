const pg = require("pg");
const express = require("express");
const app = express();

const port = 3000;
const hostname = "localhost";

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

app.use(express.static("public"));
app.use(express.json());


app.get("/", (req, res) => {
    res.send("public/index.html"); 
});

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});