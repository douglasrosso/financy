import apiAuthMiddleware from "../middlewares/apiAuthMiddleware.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import searchReleaseMiddleware from "../middlewares/searchReleaseMiddleware.js";
const secretKey = "financy";

function useApiRoutes(router) {
  const usuariosData = JSON.parse(
    fs.readFileSync("./data/users.json", "utf-8")
  );

  router.post("/api/login", (req, res) => {
    const { usuario, senha } = req.body;
    const usuarioAutenticado = usuariosData.find(
      (user) => user.user === usuario && user.pwd === senha
    );

    if (usuarioAutenticado) {
      jwt.sign(
        { user: usuarioAutenticado },
        secretKey,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            res.status(500).json({ error: "Falha ao gerar token" });
          } else {
            res.cookie("auth", token, {
              maxAge: 24 * 60 * 60 * 1000,
              httpOnly: true,
            });
          }
          res.sendStatus(200);
        }
      );
    } else {
      res.sendStatus(401);
    }
  });

  router.get("/api/categorias", apiAuthMiddleware, (req, res) => {
    const categoriesData = JSON.parse(
      fs.readFileSync("./data/categories.json", "utf-8")
    );
    res.json(categoriesData);
  });

  router.post("/api/categorias", apiAuthMiddleware, (req, res) => {
    const novaCategoria = req.body;

    let categoriasData = JSON.parse(
      fs.readFileSync("./data/categories.json", "utf-8")
    );

    const index = categoriasData.findIndex(
      (cat) => cat.id === novaCategoria.id
    );
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

  router.put("/api/categorias/:id", apiAuthMiddleware, (req, res) => {
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

  router.get("/api/contas", apiAuthMiddleware, (req, res) => {
    const contasData = JSON.parse(
      fs.readFileSync("./data/accounts.json", "utf-8")
    );
    res.json(contasData);
  });

  router.post("/api/contas", apiAuthMiddleware, (req, res) => {
    const novaConta = req.body;

    let contasData = JSON.parse(
      fs.readFileSync("./data/accounts.json", "utf-8")
    );

    contasData.push(novaConta);

    fs.writeFileSync(
      "./data/accounts.json",
      JSON.stringify(contasData, null, 2)
    );

    res.sendStatus(200);
  });

  router.put("/api/contas/:id", apiAuthMiddleware, (req, res) => {
    const { id } = req.params;
    const { description, comments } = req.body;

    let contasData = JSON.parse(
      fs.readFileSync("./data/accounts.json", "utf-8")
    );

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

  router.get("/api/lancamentos", apiAuthMiddleware, (req, res) => {
    const entriesData = JSON.parse(
      fs.readFileSync("./data/entries.json", "utf-8")
    );
    res.json(entriesData);
  });

  router.post("/api/lancamentos", apiAuthMiddleware, (req, res) => {
    const novaEntry = req.body;

    const entriesData = JSON.parse(
      fs.readFileSync("./data/entries.json", "utf-8")
    );

    entriesData.push(novaEntry);

    fs.writeFileSync(
      "./data/entries.json",
      JSON.stringify(entriesData, null, 2)
    );

    res.sendStatus(200);
  });

  router.put("/api/lancamentos/:id", apiAuthMiddleware, (req, res) => {
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

    let entriesData = JSON.parse(
      fs.readFileSync("./data/entries.json", "utf-8")
    );

    const index = entriesData.findIndex((ent) => ent.id === id);
    if (index !== -1) {
      entriesData[index].description = description;
      entriesData[index].type = type;
      entriesData[index].categories = categories;
      entriesData[index].value = value;
      entriesData[index].due_date = due_date;
      entriesData[index].payment_date = payment_date;
      entriesData[index].account = account;
      entriesData[index].status = status;
      entriesData[index].comments = comments;
      fs.writeFileSync(
        "./data/entries.json",
        JSON.stringify(entriesData, null, 2)
      );
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  router.get("/api/usuarios", apiAuthMiddleware, (req, res) => {
    const usuariosData = JSON.parse(
      fs.readFileSync("./data/users.json", "utf-8")
    );
    res.json(usuariosData);
  });

  router.post("/api/usuario", apiAuthMiddleware, (req, res) => {
    const novoUsuario = req.body;

    const usuariosData = JSON.parse(
      fs.readFileSync("./data/users.json", "utf-8")
    );

    usuariosData.push(novoUsuario);

    fs.writeFileSync(
      "./data/users.json",
      JSON.stringify(usuariosData, null, 2)
    );

    res.sendStatus(200);
  });

  router.put("/api/usuario/:id", apiAuthMiddleware, (req, res) => {
    const { id } = req.params;
    const { name, email, user, pwd, level, status } = req.body;

    let usuariosData = JSON.parse(
      fs.readFileSync("./data/users.json", "utf-8")
    );

    const index = usuariosData.findIndex((usuario) => usuario.id === id);
    if (index !== -1) {
      usuariosData[index].name = name;
      usuariosData[index].email = email;
      usuariosData[index].user = user;
      usuariosData[index].pwd = pwd;
      usuariosData[index].level = level;
      usuariosData[index].status = status;
      fs.writeFileSync(
        "./data/users.json",
        JSON.stringify(usuariosData, null, 2)
      );
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

}

export default useApiRoutes;
