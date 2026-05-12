/**
 * Devuelve un elemento aleatorio de un arreglo.
 * @param {Array} arr
 * @returns {*}
 */
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = { randomFrom };
