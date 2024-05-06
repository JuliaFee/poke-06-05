const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 9876;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ssbu',
  password: 'ds564',
  port: 9876,
});

app.use(express.json());

// rota GET fighters
app.get('/fighters', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM fighters');
        res.json({
            total: resultado.rowCount,
            fighters: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter lutadores');
        res.status(500).send({ mensagem: 'Erro interno ao obter lutadores' });
    }
});

// rota GET fighters por id
app.get('/fighters/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM fighters WHERE id = $1', [id]);
        res.json({
            total: resultado.rowCount,
            fighters: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter lutador');
        res.status(500).send({ mensagem: 'Erro interno ao obter lutador' });
    }
});

// rota get fighters por nome
app.get('/fighters/:f_name', async (req, res) => {
    try {
        const { f_name } = req.params;
        const resultado = await pool.query('SELECT * FROM fighters WHERE f_name = $1', [f_name]);
        res.json({
            total: resultado.rowCount,
            fighters: resultado.rows });
    } catch (error) {
        console.error('Erro ao obter lutador');
        res.status(500).send({ mensagem: 'Erro interno ao obter lutador' });
    }
});

// rota POST Fighters

app.post('/fighters', async (req, res) => {
    try {
        const { f_name, hp, atk, spd, game } = req.body;

        await pool.query('INSERT INTO fighters (f_name, hp, atk, spd, game) VALUES ($1, $2, $3, $4, $5)', 
        [f_name, hp, atk, spd, game]);

        res.status(200).send({ mensagem: 'Lutador registrado com sucesso' });
        
    } catch (error) {
        console.error('Erro ao registrar lutador');
        res.status(500).send({ mensagem: 'Erro interno ao registrar lutador' });
    }
});