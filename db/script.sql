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
    type_btl VARCHAR(255) NOT NULL,

);
