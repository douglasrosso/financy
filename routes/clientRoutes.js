import initialAuthMiddleware from "../middlewares/initialAuthMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

function useClientRoutes(router) {
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

}

export default useClientRoutes;
