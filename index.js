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

//rota Get fighters por game
app.get('/fighters/game/:game', async (req, res) => {
    try {
        const { game } = req.params;
        const resultado = await pool.query('SELECT * FROM fighters WHERE game = $1', [game]);
        res.json({
            total: resultado.rowCount,
            fighters: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter lutador por jogo:', error.message);
        res.status(500).send({ mensagem: 'Erro interno ao obter lutador por jogo' });
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

// rota get Batalhas
app.get('/battle-history', async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT bh.id, f1.f_name as vencedor, f2.f_name as perdedor
            FROM battle_history bh
            INNER JOIN fighters f1 ON bh.winner_id = f1.id
            INNER JOIN fighters f2 ON bh.loser_id = f2.id;
        `);
        res.json({
            total: resultado.rowCount,
            battles: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter histórico de batalhas:', error);
        res.status(500).send({ mensagem: 'Erro interno ao obter histórico de batalhas' });
    }
});

//rota pegar batalha por id
app.get('/battle-history/fighters/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query(`
            SELECT bh.id, f1.f_name as vencedor, f2.f_name as perdedor
            FROM battle_history bh
            INNER JOIN fighters f1 ON bh.winner_id = f1.id
            INNER JOIN fighters f2 ON bh.loser_id = f2.id
            WHERE f1_id = $1 OR f2_id = $1;`, [id]);
        res.json({
            total: resultado.rowCount,
            battles: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter batalha:', error);
        res.status(500).send({ mensagem: 'Erro interno ao obter batalha' });
    }
});

//rota simular batalha
app.get('/battle-history/fighters/:f1_id/:f2_id', async (req, res) => {
    const { f1_id, f2_id } = req.params;
    try {
        const vencedor = await calculateBattle(f1_id, f2_id);
        const perdedor = (vencedor === f1_id ? f2_id : f1_id);
        await pool.query('INSERT INTO battle_history (f1_id, f2_id, winner_id, loser_id) VALUES ($1, $2, $3, $4)', [f1_id, f2_id, vencedor, perdedor]);
        const vence_info = await pool.query('SELECT f_name FROM fighters WHERE id = $1', [vencedor]);
        const perde_info = await pool.query('SELECT f_name FROM fighters WHERE id = $1', [perdedor]);
        res.status(200).send({ vencedor: vence_info.rows[0].f_name, perdedor: perde_info.rows[0].f_name, mensagem: 'Batalha registrada com sucesso' });
    } catch (error) {
        console.error('Erro ao registrar batalha:', error);
        res.status(500).send({ mensagem: 'Erro interno ao registrar batalha' });
    }
});

// função para calcular a batalha
async function calculateBattle(f1_id, f2_id) {
    const fighter1 = await pool.query('SELECT * FROM fighters WHERE id = $1', [f1_id]);
    const fighter2 = await pool.query('SELECT * FROM fighters WHERE id = $1', [f2_id]);

    // o lutador com maior ataque ganha
    if (fighter1.rows[0].atk > fighter2.rows[0].atk) {
        // se o ataque for igual, o lutador com maior speed ganha
        if (fighter1.rows[0].spd > fighter2.rows[0].spd) {
            // se o speed for igual, o lutador com mais hp ganha
            if (fighter1.rows[0].hp > fighter2.rows[0].hp) {
                return fighter1.rows[0].id;
            } else {
                return fighter2.rows[0].id;
            }
        } else {
            return fighter2.rows[0].id;
        }
    } else {
        return fighter2.rows[0].id;
    }
}



// infos do servidor
app.get('/', (req, res) => {
    res.send('👊 servidor funcionando!');
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});