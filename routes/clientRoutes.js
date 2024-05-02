import initialAuthMiddleware from "../middlewares/initialAuthMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import logoutMiddleware from "../middlewares/logoutMiddleware.js";
import fs from "fs";

function useClientRoutes(router) {
  router.get("/", initialAuthMiddleware, (_, res) => {
    res.render("login");
  });

  router.get("/sair", logoutMiddleware, (_, res) => {
    res.render("login");
  });

  router.get("/home", authMiddleware, (_, res) => {
    res.render("home");
  });

  router.get("/lancamentos", authMiddleware, (_, res) => {
    res.render("cadReceitasDespesas", { receitasDespesas: {}, novoLancamento: false });
  });

  router.get("/receita-despesa/novo", authMiddleware, (_, res) => {
    res.render("cadReceitasDespesas", { receitasDespesas: {}, novoLancamento: true });
  });

  router.get("/receita-despesa/:id", authMiddleware, (req, res) => {
    const lancamentosData = JSON.parse(
      fs.readFileSync("./data/entries.json", "utf-8")
    );

    const receitasDespesas = lancamentosData.find(
      (lanc) => lanc.id == req.params.id
    );

    res.render("cadReceitasDespesas", { receitasDespesas, novoLancamento: false });
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
}

export default useClientRoutes;
