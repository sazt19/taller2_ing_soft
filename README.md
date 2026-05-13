# Pokeneas – Pokédex Antioqueño
---

## Estructura del proyecto

```
pokeneas/
├── src/
│   ├── app.js              # Punto de entrada
│   ├── data/
│   │   └── pokeneas.js     # Arreglo de los 10 Pokeneas
│   ├── routes/
│   │   ├── api.js          # GET /api/pokenea  → JSON
│   │   └── visual.js       # GET /visual       → HTML con imagen + frase
│   └── utils/
│       ├── container.js    # Lee el ID del contenedor Docker
│       └── random.js       # Helper para elemento aleatorio
├── .github/workflows/
│   └── docker.yml          # CI/CD → DockerHub
├── Dockerfile
└── package.json
```

## Rutas

| Ruta           | Descripción |
|----------------|-------------|
| `GET /api/pokenea` | JSON con `id`, `nombre`, `altura`, `habilidad` y `containerId` |
| `GET /visual`      | Página HTML con imagen, frase filosófica y `containerId` |

---

## Correr con Docker

```bash
docker build -t pokeneas .
docker run -p 3000:3000 pokeneas
```

---

## CI/CD – DockerHub

El workflow `.github/workflows/docker.yml` se dispara en cada push a `main`.

Configura estos secretos en tu repositorio GitHub:

| Secret | Valor |
|--------|-------|
| `DOCKERHUB_USERNAME` | Tu usuario de DockerHub |
| `DOCKERHUB_TOKEN`    | Access Token de DockerHub |

---


### Crear servicio con 10 réplicas (desde la líder)

```bash
docker service create \
  --name pokeneas \
  --replicas 10 \
  --publish published=80,target=3000 \
  <TU_USUARIO_DOCKERHUB>/pokeneas:latest
```

### Verificar

```bash
docker service ps pokeneas
```

---

## Imágenes en GCP Buckets

Las imágenes de cada Pokenea se almacenan en:

```
gs://pokeneas-buckets/<nombre>.png
```

La URL pública queda como:
`https://storage.googleapis.com/pokeneas-buckets/cachaquito.png`
