const pool = require("./connection");
async function guardarOperacion(
  estructura,
  tipoOperacion,
  valor,
  estadoResultante,
) {
  const query = ` INSERT INTO operaciones (estructura, tipo_operacion, valor, estado_resultante) VALUES ($1, $2, $3, $4) RETURNING * `;
  const valores = [
    estructura,
    tipoOperacion,
    valor,
    JSON.stringify(estadoResultante),
  ];
  const resultado = await pool.query(query, valores);
  return resultado.rows[0];
}
async function obtenerHistorial(estructura) {
  const query =
    "SELECT * FROM operaciones WHERE estructura = $1 ORDER BY creado_en DESC";
  const resultado = await pool.query(query, [estructura]);
  return resultado.rows;
}
module.exports = { guardarOperacion, obtenerHistorial };
