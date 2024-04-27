import express from "express";
import initialAuthMiddleware from "../middlewares/initialAuthMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import fs from "fs";

const router = express.Router();

router.get("/", initialAuthMiddleware, (_, res) => {
  res.render("login");
});

router.get("/admin", authMiddleware, (_, res) => {
  res.render("admin");
});

router.get("/receitas-despesas", authMiddleware, (_, res) => {
  res.render("cadReceitasDespesas");
});

router.get("/categorias", authMiddleware, (_, res) => {
  res.render("cadCategorias");
});

router.get("/cadastro-conta", authMiddleware, (_, res) => {
  res.render("cadContas");
});

router.get("/cadastro-usuario", authMiddleware, (_, res) => {
  res.render("cadUsuarios");
});

router.get("/lancamentos", authMiddleware, (_, res) => {
  res.render("lancamentos");
});

const usuariosData = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));

// API`s

router.post("/api/login", (req, res) => {
  const { usuario, senha } = req.body;
  const usuarioAutenticado = usuariosData.find(
    (user) => user.user === usuario && user.pwd === senha
  );

  if (usuarioAutenticado) {
    req.session.isAuthenticated = true;
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

router.get("/api/categorias", (req, res) => {
  if (!req.session.isAuthenticated) res.sendStatus(401);

  const categoriesData = JSON.parse(
    fs.readFileSync("./data/categories.json", "utf-8")
  );
  res.json(categoriesData);
});

router.post("/api/categorias", (req, res) => {
  if (!req.session.isAuthenticated) res.sendStatus(401);

  const novaCategoria = req.body;

  let categoriasData = JSON.parse(
    fs.readFileSync("./data/categories.json", "utf-8")
  );

  const index = categoriasData.findIndex((cat) => cat.id === novaCategoria.id);
  if (index !== -1) {
    categoriasData[index] = novaCategoria;
  } else {
    categoriasData.push(novaCategoria);
  }

  fs.writeFileSync(
    "./data/categories.json",
    JSON.stringify(categoriasData, null, 2)
  );

  res.sendStatus(200);
});

router.put("/api/categorias/:id", (req, res) => {
  if (!req.session.isAuthenticated) res.sendStatus(401);

  const { id } = req.params;
  const { description, type } = req.body;

  let categoriasData = JSON.parse(
    fs.readFileSync("./data/categories.json", "utf-8")
  );

  const index = categoriasData.findIndex((cat) => cat.id === id);
  if (index !== -1) {
    categoriasData[index].description = description;
    categoriasData[index].type = type;
    fs.writeFileSync(
      "./data/categories.json",
      JSON.stringify(categoriasData, null, 2)
    );
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.get("/api/contas", (req, res) => {
  const contasData = JSON.parse(
    fs.readFileSync("./data/accounts.json", "utf-8")
  );
  res.json(contasData);
});

router.post("/api/contas", (req, res) => {
  const novaConta = req.body;

  let contasData = JSON.parse(fs.readFileSync("./data/accounts.json", "utf-8"));

  contasData.push(novaConta);

  fs.writeFileSync("./data/accounts.json", JSON.stringify(contasData, null, 2));

  res.sendStatus(200);
});

router.put("/api/contas/:id", (req, res) => {
  const { id } = req.params;
  const { description, comments } = req.body;

  let contasData = JSON.parse(fs.readFileSync("./data/accounts.json", "utf-8"));

  const index = contasData.findIndex((conta) => conta.id === id);
  if (index !== -1) {
    contasData[index].description = description;
    contasData[index].comments = comments;
    fs.writeFileSync(
      "./data/accounts.json",
      JSON.stringify(contasData, null, 2)
    );
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.get("/api/receitas-despesas", (req, res) => {
  const entriesData = JSON.parse(
    fs.readFileSync("./data/entries.json", "utf-8")
  );
  res.json(entriesData);
});

router.post("/api/receitas-despesas", (req, res) => {
  const novaEntry = req.body;

  const entriesData = JSON.parse(
    fs.readFileSync("./data/entries.json", "utf-8")
  );

  entriesData.push(novaEntry);

  fs.writeFileSync("./data/entries.json", JSON.stringify(entriesData, null, 2));

  res.sendStatus(200);
});

router.put("/api/receitas-despesas/:id", (req, res) => {
  if (!req.session.isAuthenticated) res.sendStatus(401);

  const { id } = req.params;
  const {
    description,
    type,
    categories,
    value,
    due_date,
    payment_date,
    account,
    status,
    comments,
  } = req.body;

  let entriesData = JSON.parse(fs.readFileSync("./data/entries.json", "utf-8"));

  const index = entriesData.findIndex((ent) => ent.id === id);
  if (index !== -1) {
    entriesData[index].description = description;
    entriesData[index].type = type;
    entriesData[index].type = categories;
    entriesData[index].type = value;
    entriesData[index].type = due_date;
    entriesData[index].type = payment_date;
    entriesData[index].type = account;
    entriesData[index].type = status;
    entriesData[index].type = comments;
    fs.writeFileSync(
      "./data/entries.json",
      JSON.stringify(entriesData, null, 2)
    );
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

export default router;
