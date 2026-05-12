const os = require("os");
const fs = require("fs");

/**
 * Devuelve el ID del contenedor Docker actual.
 * Lee /proc/self/cgroup para extraer el ID; si falla, usa el hostname.
 */
function getContainerId() {
  try {
    const cgroup = fs.readFileSync("/proc/self/cgroup", "utf8");
    const match = cgroup.match(/docker[/-]([a-f0-9]{12,64})/);
    if (match) return match[1].substring(0, 12);
  } catch (_) {}
  return os.hostname();
}

module.exports = { getContainerId };
