

CREATE DATABASE ssbu;

\c ssbu;

CREATE TABLE fighters (
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
    FOREIGN KEY (f1_id) REFERENCES fighters(id),
    FOREIGN KEY (f2_id) REFERENCES fighters(id),
    FOREIGN KEY (winner_id) REFERENCES fighters(id),
    FOREIGN KEY (loser_id) REFERENCES fighters(id)
);

-- f1_id = id do lutador 1
-- f2_id = id do lutador 2
-- winner_id = id do vencedor
-- loser_id = id do perdedor

INSERT INTO fighters (f_name, hp, atk, spd, game) 
VALUES 
    ('Mario', 150, 30, 10, 'Super Mario Bros'),
    ('Donkey Kong', 200, 40, 5, 'Donkey Kong'),
    ('Link', 150, 35, 15, 'The Legend of Zelda'),
    ('Samus', 140, 45, 20, 'Metroid'),
    ('Yoshi', 130, 25, 12, 'Super Mario World'),
    ('Kirby', 110, 20, 25, 'Kirby'),
    ('Fox', 110, 50, 30, 'Star Fox'),
    ('Pikachu', 100, 40, 25, 'Pokémon'),
    ('Luigi', 140, 25, 8, 'Super Mario Bros'),
    ('Ness', 90, 30, 20, 'EarthBound'),
    ('Captain Falcon', 130, 45, 40, 'F-Zero'),
    ('Jigglypuff', 100, 30, 20, 'Pokémon'),
    ('Peach', 120, 25, 15, 'Super Mario Bros'),
    ('Daisy', 120, 25, 15, 'Super Mario Bros'),
    ('Bowser', 180, 50, 5, 'Super Mario Bros'),
    ('Ice Climbers', 110, 35, 25, 'Ice Climber'),
    ('Sheik', 100, 40, 45, 'The Legend of Zelda'),
    ('Zelda', 120, 35, 20, 'The Legend of Zelda'),
    ('Dr. Mario', 140, 35, 10, 'Dr. Mario'),
    ('Pichu', 80, 45, 50, 'Pokémon'),
    ('Falco', 120, 45, 40, 'Star Fox'),
    ('Marth', 130, 40, 30, 'Fire Emblem'),
    ('Lucina', 130, 40, 30, 'Fire Emblem'),
    ('Young Link', 110, 35, 25, 'The Legend of Zelda'),
    ('Ganondorf', 160, 55, 10, 'The Legend of Zelda'),
    ('Mewtwo', 140, 50, 35, 'Pokémon'),
    ('Roy', 130, 45, 30, 'Fire Emblem'),
    ('Chrom', 130, 45, 30, 'Fire Emblem'),
    ('Mr. Game & Watch', 100, 30, 45, 'Game & Watch'),
    ('Meta Knight', 120, 50, 55, 'Kirby'),
    ('Pit', 130, 40, 35, 'Kid Icarus'),
    ('Dark Pit', 130, 40, 35, 'Kid Icarus'),
    ('Zero Suit Samus', 110, 55, 60, 'Metroid'),
    ('Wario', 160, 45, 20, 'Wario'),
    ('Snake', 150, 60, 25, 'Metal Gear'),
    ('Ike', 150, 55, 25, 'Fire Emblem'),
    ('Pokémon Trainer', 120, 35, 25, 'Pokémon'),
    ('Diddy Kong', 120, 50, 50, 'Donkey Kong'),
    ('Lucas', 100, 40, 30, 'EarthBound'),
    ('Sonic', 140, 55, 70, 'Sonic the Hedgehog'),
    ('King Dedede', 180, 50, 20, 'Kirby'),
    ('Olimar', 100, 35, 30, 'Pikmin'),
    ('Lucario', 140, 55, 45, 'Pokémon'),
    ('R.O.B.', 150, 40, 25, 'R.O.B.'),
    ('Toon Link', 110, 40, 35, 'The Legend of Zelda'),
    ('Wolf', 130, 60, 55, 'Star Fox'),
    ('Villager', 120, 35, 40, 'Animal Crossing'),
    ('Mega Man', 140, 60, 45, 'Mega Man'),
    ('Wii Fit Trainer', 130, 30, 40, 'Wii Fit'),
    ('Rosalina & Luma', 140, 45, 25, 'Super Mario Galaxy'),
    ('Little Mac', 110, 60, 70, 'Punch-Out!!'),
    ('Greninja', 130, 55, 65, 'Pokémon'),
    ('Palutena', 140, 45, 30, 'Kid Icarus'),
    ('Pac-Man', 140, 50, 40, 'Pac-Man'),
    ('Robin', 120, 40, 25, 'Fire Emblem'),
    ('Shulk', 140, 55, 35, 'Xenoblade Chronicles'),
    ('Bowser Jr.', 160, 50, 25, 'Super Mario Bros'),
    ('Duck Hunt', 120, 40, 50, 'Duck Hunt'),
    ('Ryu', 150, 65, 50, 'Street Fighter'),
    ('Ken', 150, 65, 50, 'Street Fighter'),
    ('Cloud', 150, 60, 40, 'Final Fantasy'),
    ('Corrin', 130, 50, 45, 'Fire Emblem'),
    ('Bayonetta', 130, 55, 60, 'Bayonetta'),
    ('Inkling', 120, 50, 55, 'Splatoon'),
    ('Ridley', 170, 65, 30, 'Metroid'),
    ('Simon', 140, 55, 35, 'Castlevania'),
    ('Richter', 140, 55, 35, 'Castlevania'),
    ('King K. Rool', 180, 60, 15, 'Donkey Kong'),
    ('Isabelle', 110, 35, 40, 'Animal Crossing'),
    ('Incineroar', 160, 65, 25, 'Pokémon');

