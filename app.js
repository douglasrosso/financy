import express from "express";
import bodyParser from "body-parser";
import useApiRoutes from "./routes/apiRoutes.js";
import useClientRoutes from "./routes/clientRoutes.js";

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));

const router = express.Router();

useClientRoutes(router);
useApiRoutes(router);

app.use("/", router);

app.listen(port, () => {
  console.log(`Servidor iniciado no endereço http://localhost:${port}`);
});
