const express = require("express");
const router = express.Router();
const pokeneas = require("../data/pokeneas");
const { randomFrom } = require("../utils/random");
const { getContainerId } = require("../utils/container");

/**
 * GET /visual
 * Muestra la imagen y frase filosófica de un Pokenea aleatorio.
 */
router.get("/", (req, res) => {
  const pokenea = randomFrom(pokeneas);
  const containerId = getContainerId();

  res.send(/* html */ `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Pokeneas – ${pokenea.nombre}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lora:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --gold: #e8b84b;
      --dark: #0e0e0e;
      --cream: #f5f0e8;
      --red:  #c0392b;
    }

    body {
      background: var(--dark);
      color: var(--cream);
      font-family: 'Lora', serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .card {
      background: linear-gradient(160deg, #1a1a1a 60%, #2a1f0d);
      border: 2px solid var(--gold);
      border-radius: 4px;
      max-width: 480px;
      width: 100%;
      overflow: hidden;
      box-shadow: 0 0 60px rgba(232,184,75,0.15);
      animation: fadeIn .6s ease both;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .card-header {
      background: var(--gold);
      padding: .5rem 1.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-header .name {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 2rem;
      color: var(--dark);
      letter-spacing: 2px;
    }

    .card-header .id-badge {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1rem;
      background: var(--dark);
      color: var(--gold);
      padding: .2rem .6rem;
      border-radius: 2px;
    }

    .img-wrapper {
      width: 100%;
      aspect-ratio: 1;
      overflow: hidden;
      background: #111;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .img-wrapper img {
      width: 80%;
      height: 80%;
      object-fit: contain;
      filter: drop-shadow(0 0 24px rgba(232,184,75,0.4));
      transition: transform .4s ease;
    }

    .img-wrapper img:hover { transform: scale(1.05); }

    .card-body {
      padding: 1.5rem 1.8rem 2rem;
    }

    .quote-mark {
      font-size: 4rem;
      line-height: 1;
      color: var(--gold);
      opacity: .4;
      margin-bottom: -.5rem;
    }

    .frase {
      font-size: 1.15rem;
      font-style: italic;
      line-height: 1.7;
      color: var(--cream);
    }

    .meta {
      margin-top: 1.4rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(232,184,75,0.25);
      display: flex;
      justify-content: space-between;
      font-size: .78rem;
      color: rgba(245,240,232,0.45);
      font-family: monospace;
    }

    .meta span { display: flex; flex-direction: column; gap: .2rem; }
    .meta .label { color: var(--gold); opacity: .8; text-transform: uppercase; font-size: .65rem; letter-spacing: 1px; }

    .reload-btn {
      display: block;
      margin: 1.2rem auto 0;
      padding: .55rem 1.6rem;
      background: transparent;
      border: 1.5px solid var(--gold);
      color: var(--gold);
      font-family: 'Bebas Neue', sans-serif;
      font-size: 1rem;
      letter-spacing: 2px;
      cursor: pointer;
      transition: background .2s, color .2s;
      border-radius: 2px;
    }

    .reload-btn:hover { background: var(--gold); color: var(--dark); }

    nav {
      margin-top: 1.5rem;
      font-size: .8rem;
      color: rgba(245,240,232,0.4);
    }
    nav a { color: var(--gold); text-decoration: none; }
    nav a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <div class="card-header">
      <span class="name">${pokenea.nombre}</span>
      <span class="id-badge">#${String(pokenea.id).padStart(3, "0")}</span>
    </div>

    <div class="img-wrapper">
      <img
        src="${pokenea.imagen}"
        alt="${pokenea.nombre}"
        onerror="this.src='https://placehold.co/400x400/0e0e0e/e8b84b?text=${encodeURIComponent(pokenea.nombre)}'"
      />
    </div>

    <div class="card-body">
      <div class="quote-mark">"</div>
      <p class="frase">${pokenea.frase}</p>

      <div class="meta">
        <span>
          <span class="label">Habilidad</span>
          ${pokenea.habilidad}
        </span>
        <span>
          <span class="label">Altura</span>
          ${pokenea.altura} m
        </span>
      </div>

      <div class="meta" style="margin-top:.8rem; border-top:none; padding-top:0;">
        <span>
          <span class="label">Container ID</span>
          ${containerId}
        </span>
      </div>

      <button class="reload-btn" onclick="location.reload()">
        Otro Pokenea ↻
      </button>
    </div>
  </div>

  <nav>
    <a href="/api/pokenea">Ver ruta JSON</a> &nbsp;·&nbsp;
    <a href="/visual">Recargar visual</a>
  </nav>
</body>
</html>
  `);
});

module.exports = router;
