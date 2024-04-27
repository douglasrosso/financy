import express from "express";
import expressSession from "express-session";
import bodyParser from "body-parser";
import rotas from "./routes/index.js";

const port = 3000;
const app = express();

app.use(
  expressSession({
    secret: "financy",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/", rotas);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta http://localhost:${port}`);
});
