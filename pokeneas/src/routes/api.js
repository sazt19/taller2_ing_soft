const express = require("express");
const router = express.Router();
const pokeneas = require("../data/pokeneas");
const { randomFrom } = require("../utils/random");
const { getContainerId } = require("../utils/container");

/**
 * GET /api/pokenea
 * Devuelve un Pokenea aleatorio en formato JSON
 * (id, nombre, altura, habilidad) + containerId.
 */
router.get("/", (req, res) => {
  const pokenea = randomFrom(pokeneas);
  res.json({
    id: pokenea.id,
    nombre: pokenea.nombre,
    altura: `${pokenea.altura} m`,
    habilidad: pokenea.habilidad,
    containerId: getContainerId(),
  });
});

module.exports = router;
