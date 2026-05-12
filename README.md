# 🌿 Pokeneas – Pokédex Antioqueño

Proyecto para el Taller 02. Sistema con 2 rutas construido en **Express**, empaquetado en **Docker**, y desplegado con **Docker Swarm** en GCP.

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

## Correr localmente

```bash
npm install
npm start
# → http://localhost:3000
```

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

## Despliegue en GCP con Docker Swarm

### 1. Crear 4 instancias con Docker instalado

```bash
# En cada instancia (repite x4)
sudo apt-get update && sudo apt-get install -y docker.io
sudo usermod -aG docker $USER
```

### 2. Iniciar Swarm en la instancia líder

```bash
docker swarm init --advertise-addr <IP_INTERNA_LIDER>
# Guarda el token que aparece
```

### 3. Unir las otras 3 instancias como managers

```bash
# En cada una de las 3 instancias restantes:
docker swarm join --token <TOKEN_MANAGER> <IP_LIDER>:2377
```

### 4. Crear servicio con 10 réplicas (desde la líder)

```bash
docker service create \
  --name pokeneas \
  --replicas 10 \
  --publish published=80,target=3000 \
  <TU_USUARIO_DOCKERHUB>/pokeneas:latest
```

### 5. Verificar

```bash
docker service ps pokeneas
```

---

## Imágenes en GCP Buckets

Las imágenes de cada Pokenea se almacenan en:

```
gs://pokeneas-bucket/<nombre>.png
```

Para subir una imagen:

```bash
gsutil cp cachaquito.png gs://pokeneas-bucket/
gsutil acl ch -u AllUsers:R gs://pokeneas-bucket/cachaquito.png
```

La URL pública queda como:
`https://storage.googleapis.com/pokeneas-bucket/cachaquito.png`

> Actualiza las URLs en `src/data/pokeneas.js` con el nombre real de tu bucket.
