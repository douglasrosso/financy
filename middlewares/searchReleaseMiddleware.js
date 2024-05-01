import fs from "fs";

function searchReleaseMiddleware(req, res, next) {
  const entriesData = JSON.parse(
    fs.readFileSync("./data/entries.json", "utf-8")
  );
  const hoje = new Date().toISOString().split("T")[0];
  const lancamentoDoDia = entriesData.find(
    (lancamento) => lancamento.due_date === hoje
  );
  const lancamentosEmAtraso = entriesData.filter(
    (lancamento) => lancamento.due_date < hoje
  );

  res.locals.lancamentoDoDia = lancamentoDoDia;
  res.locals.lancamentosEmAtraso = lancamentosEmAtraso;

  next();
}

export default searchReleaseMiddleware;
