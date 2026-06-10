const express = require("express");
const router = express.Router();
const db = require("./db");

// Registrar medicamento
router.post("/medicamentos", async (req, res) => {
    try {
        const { nombre_patente, nombre_generico, sustancia, laboratorio, fecha_caducidad, descripcion } = req.body;

        const sql = `
            INSERT INTO medicamentos 
            (nombre_patente, nombre_generico, sustancia, laboratorio, fecha_caducidad, descripcion)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        const result = await db.query(sql, [
            nombre_patente,
            nombre_generico,
            sustancia,
            laboratorio,
            fecha_caducidad,
            descripcion
        ]);

        res.json({ ok: true, data: result.rows[0] });

    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
});

// Listar medicamentos
router.get("/medicamentos", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM medicamentos ORDER BY id_medicamento DESC");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buscar por ID
router.get("/medicamentos/:id", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM medicamentos WHERE id_medicamento = $1",
            [req.params.id]
        );
        res.json(result.rows[0] || null);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar
router.delete("/medicamentos/:id", async (req, res) => {
    try {
        await db.query("DELETE FROM medicamentos WHERE id_medicamento = $1", [req.params.id]);
        res.json({ ok: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar
router.put("/medicamentos/:id", async (req, res) => {
    try {
        const { nombre_patente, nombre_generico, sustancia, laboratorio, fecha_caducidad, descripcion } = req.body;

        const sql = `
            UPDATE medicamentos SET 
            nombre_patente=$1, nombre_generico=$2, sustancia=$3, laboratorio=$4, fecha_caducidad=$5, descripcion=$6
            WHERE id_medicamento=$7
            RETURNING *;
        `;

        const result = await db.query(sql, [
            nombre_patente,
            nombre_generico,
            sustancia,
            laboratorio,
            fecha_caducidad,
            descripcion,
            req.params.id
        ]);

        res.json({ ok: true, data: result.rows[0] });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
