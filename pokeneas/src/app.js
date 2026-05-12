const express = require("express");
const app = express();

// ── Rutas ─────────────────────────────────────────────────────────────────────
const apiRouter    = require("./routes/api");
const visualRouter = require("./routes/visual");

app.use("/api/pokenea", apiRouter);
app.use("/visual",      visualRouter);

// Ruta raíz → redirige al visual
app.get("/", (req, res) => res.redirect("/visual"));

// ── Arranque ──────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌿 Pokeneas corriendo en http://localhost:${PORT}`);
});

module.exports = app;
