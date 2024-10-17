const express = require('express');
const db = require('aa-sqlite');

const router = express.Router();
const port = 3000;

// Abrir la base de datos
async function openDb() {
    await db.open(process.env.base || './database.sqlite');
}

// Cerrar la base de datos
async function closeDb() {
    await db.close();
}

// Ruta para obtener todas las preguntas
router.get('/questions', async (req, res) => {
    try {
        await openDb();
        const sql = "SELECT * FROM questions";
        const questions = await db.all(sql);
        await closeDb();

        res.json(questions); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener las preguntas");
    }
});

// Ruta para obtener una pregunta por su ID
router.get('/questions/:id', async (req, res) => {
    const id = req.params.id; 
    try {
        await openDb();
        const sql = "SELECT * FROM questions WHERE IdQuestion = ?";
        const question = await db.get(sql, [id]);
        await closeDb();

        if (question) {
            res.json(question);
        } else {
            res.status(404).send("Pregunta no encontrada");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener la pregunta");
    }
});

// Total de registros
router.get('/total', async (req, res) => {
    try {
        await openDb();
        const sql = "SELECT COUNT(*) as total FROM questions";
        const result = await db.get(sql);
        await closeDb();

        res.json({ total: result.total }); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener el total de registros");
    }
});


module.exports = router;