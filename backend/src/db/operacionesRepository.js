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
async function resetEstructura(estructura, estadoVacio) {
  const cliente = await pool.connect();
  try {
    await cliente.query("BEGIN");
    await cliente.query("DELETE FROM operaciones WHERE estructura = $1", [
      estructura,
    ]);
    await cliente.query(
      "INSERT INTO operaciones (estructura, tipo_operacion, valor, estado_resultante) VALUES ($1, $2, $3, $4)",
      [estructura, "reset", null, JSON.stringify(estadoVacio)],
    );
    await cliente.query("COMMIT");
  } catch (error) {
    await cliente.query("ROLLBACK");
    throw error;
  } finally {
    cliente.release();
  }
}
async function resetEstructura(estructura, estadoVacio) {
  const cliente = await pool.connect();
  try {
    await cliente.query("BEGIN");
    await cliente.query("DELETE FROM operaciones WHERE estructura = $1", [
      estructura,
    ]);
    await cliente.query(
      "INSERT INTO operaciones (estructura, tipo_operacion, valor, estado_resultante) VALUES ($1, $2, $3, $4)",
      [estructura, "reset", null, JSON.stringify(estadoVacio)],
    );
    await cliente.query("COMMIT");
  } catch (error) {
    await cliente.query("ROLLBACK");
    throw error;
  } finally {
    cliente.release();
  }
}
module.exports = { guardarOperacion, obtenerHistorial, resetEstructura };
