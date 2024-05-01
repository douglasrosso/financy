import initialAuthMiddleware from "../middlewares/initialAuthMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import fs from "fs";

function useClientRoutes(router) {
  router.get("/", initialAuthMiddleware, (_, res) => {
    res.render("login");
  });

  router.get("/admin", authMiddleware, (_, res) => {
    res.render("admin");
  });

  router.get("/receitas-despesas", authMiddleware, (_, res) => {
    res.render("cadReceitasDespesas", { receitasDespesas: {} });
  });

  router.get("/receitas-despesas/:id", authMiddleware, (req, res) => {
    const lancamentosData = JSON.parse(
      fs.readFileSync("./data/entries.json", "utf-8")
    );

    const receitasDespesas = lancamentosData.find(
      (lanc) => lanc.id == req.params.id
    );

    res.render("cadReceitasDespesas", { receitasDespesas });
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
}

export default useClientRoutes;
