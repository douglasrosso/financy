import fs from "fs";

function searchReleaseMiddleware(req, res, next) {
  const entriesData = JSON.parse(
    fs.readFileSync("./data/entries.json", "utf-8")
  );
  const hoje = new Date().toISOString().split("T")[0];

  const lancamentosDoDia = entriesData.filter(
    (entry) =>
      entry.due_date === hoje &&
      (!entry.payment_date || entry.payment_date === "")
  );
  const lancamentosEmAtraso = entriesData.filter(
    (entry) =>
      new Date(entry.due_date) <= new Date(hoje) &&
      (!entry.payment_date || entry.payment_date === "")
  );

  const lancamentosUnicos = new Set();
  const lancamentosFiltrados = [];

  [...lancamentosDoDia, ...lancamentosEmAtraso].forEach((entry) => {
    if (!lancamentosUnicos.has(entry.id)) {
      lancamentosUnicos.add(entry.id);
      lancamentosFiltrados.push(entry);
    }
  });

  res.locals.numLancamentosDoDia = lancamentosDoDia.length;
  res.locals.numLancamentosEmAtraso = lancamentosEmAtraso.length;
  res.locals.lancamentosNoModal = lancamentosFiltrados;

  next();
}

export default searchReleaseMiddleware;
