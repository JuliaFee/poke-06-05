CREATE DATABASE pkmn;

\c pkmn;

CREATE TABLE fighter (
    id SERIAL PRIMARY KEY,
    f_name VARCHAR(255) NOT NULL,
    hp INT NOT NULL,
    atk INT NOT NULL,
    spd INT NOT NULL,
    game VARCHAR(255) NOT NULL
);

-- f_name = nome do lutador
-- hp = pontos de vida (health points)
-- atk = ataque
-- spd = velocidade
-- game = nome do jogo que o lutador pertence

CREATE TABLE battle_history (
    id SERIAL PRIMARY KEY,
    f1_id INT NOT NULL,
    f2_id INT NOT NULL,
    winner_id INT NOT NULL,
    loser_id INT NOT NULL,
    FOREIGN KEY (f1_id) REFERENCES fighter(id),
    FOREIGN KEY (f2_id) REFERENCES fighter(id),
    FOREIGN KEY (winner_id) REFERENCES fighter(id),
    FOREIGN KEY (loser_id) REFERENCES fighter(id)
);

-- f1_id = id do lutador 1
-- f2_id = id do lutador 2
-- winner_id = id do vencedor
-- loser_id = id do perdedor
