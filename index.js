const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 9876;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ssbu',
  password: 'ds564',
  port: 5432,
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
        console.error('Erro ao obter todos os lutadores:', error);
        res.status(500).send({ mensagem: 'Erro interno ao obter todos os lutadores' });
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
// rota GET fighters por nome
app.get('/fighters/name/:f_name', async (req, res) => {
    try {
        const { f_name } = req.params;
        const resultado = await pool.query('SELECT * FROM fighters WHERE f_name = $1', [f_name]);
        res.json({
            total: resultado.rowCount,
            fighters: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter lutador por nome:', error.message);
        res.status(500).send({ mensagem: 'Erro interno ao obter lutador por nome' });
    }
});


// rota POST fighters

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

// rota PUT fighters
app.put('/fighters/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { f_name, hp, atk, spd, game } = req.body;
        await pool.query('UPDATE fighters SET f_name = $1, hp = $2, atk = $3, spd = $4, game = $5 WHERE id = $6', 
        [f_name, hp, atk, spd, game, id]);
        res.status(200).send({ mensagem: 'lutador atualizado com sucesso' });
    } catch (error) {
        console.error('lutador ao atualizar herói');
        res.status(500).send({ mensagem: 'lutador interno ao atualizar herói' });
    }
});

//rota DELETE fighters
app.delete('/fighters/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM fighters WHERE id = $1', [id]);
        res.status(200).send({ mensagem: 'lutador excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir lutador');
        res.status(500).send({ mensagem: 'Erro interno ao excluir lutador' });
    }
});

// infos do servidor
app.get('/', (req, res) => {
    res.send('👊 servidor funcionando!');
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});