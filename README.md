# Super Smash Bros. Ultimate Database 💥
![foto do jogo](https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000012332/ac4d1fc9824876ce756406f0525d50c57ded4b2a666f6dfe40a6ac5c3563fad9)

## Sobre
Super Smash Bros. Ultimate, chamado no Japão de Super Smash Bros. Special, é um jogo eletrônico de luta, desenvolvido pela Bandai Namco Studios e Sora Ltd. e publicado pela Nintendo. É o quinto jogo da série Super Smash Bros., sucedendo Super Smash Bros. for Nintendo 3DS & Wii U.

## Passos iniciais
- Instale o aplicativo Insomnia e selecione a opção "__Use the local Scratch Pad__", caso não tenha conta.
- Ao abrir o projeto pelo VSCode, rode os comandos:
- *npm install -y*
- *npm install nodemon*
- *npm install express*
- *npm run dev*

Assim, o código será hospedado em um link localhost.

## Tabelas

- As tabelas disponíveis são FIGHTERS e BATTLE_HISTORY.
- As informações das tabelas são armazenadas dentro da pasta *database* do projeto, no arquivo *script.sql*.

### Como consultar a tabela?
- Copie e cole o link localhost:9876 no aplicativo Insomnia. A porta está pre-settada para 9876.
- Utilize "*localhost:9876/[nome da tabela]*" após o link para indicar que você está buscando dentros das tabelas fighters ou battle_history, utilizando o método *GET*.

- Utilize "*localhost:9876/[nome da tabela]/[id do registro]*" para indicar que você está buscando um registro específico,utilizando seu ID como número. Utilize e o método *GET*.

### Como buscar um lutador por nome? 

- Utilize o método *GET* e link *localhost:9876/fighters/name/[nome do lutador]*.
- O resultado deverá aparecer como uma lista de lutadores com o nome informado.

### Como buscar um lutador por jogo?

- Utilize o método *GET* e link *localhost:9876/fighters/game/[nome do jogo]*.
- O resultado deverá aparecer como uma lista de lutadores com o jogo informado.

### Como registrar um novo lutador?
- Dentro do Insomnia, utilize o método *POST* e o link '*localhost:9876/fighters*'.
- Na opção *"body"*, selecione *JSON* e faça o registro entre chaves *{ }* de acordo com os dados da tabela *fighters* em script.sql.

- Exemplo:
```
{
	"f_name":"mii gunner",
	"hp": "900",
	"atk": "900",
	"spd": "900",
	"game": "nintendo"
}
```	

### Como atualizar um lutador?
- Utilize o mesmo link para registrar um novo lutador, agora com o método *PUT*, e adicione os dados que deseja atualizar em *JSON*.

- Exemplo:
```
{
	"f_name":"mii brawler",
	"hp": "999",
	"atk": "999",
	"spd": "999",
	"game": "nintendo"
}
```

### Como deletar um lutador?
- Utilize o mesmo link para consultar um lutador específico: *localhost:9876/[nome da tabela]/[id do registro]*, mas agora com o método *DELETE*.

## Histórico de Batalha

- A tabela de Histórico de Batalha (battle_history) contém as informações de todos os lutadores que participaram de um combate.
- Os critérios para vencer um combate são: atk > spd > hp. Se o atk (ataque) for maior, o lutador vence. Porém se for igual, passa a ser avaliado qual spd (velocidade) é maior, caso for empate novamente, passa a ser avaliado qual hp (vida) é maior.

### Como Simular uma batalha?

- Utilize o método *GET* para esta consulta. O link para esta consulta é: *localhost:9876/battle_history/fighters/[id do lutador 1]/[id do lutador 2]*
- Há 70 dos lutadores préviamente registrados, todos com o ID em modo serial. 

- Ao executar o comando, o Insomnia irá mostrar o resultado da batalha.

### Como consultar o histórico de batalhas de um lutador?

- Para isso, utilize o método *GET* e link *localhost:9876/battle_history/fighters/[id do lutador]*.
- O resultado deverá aparecer como uma lista de batalhas que o lutador escolhido participou. Exibindo o total de batalhas participadas, vencedor e o perdedor.

### Como consultar todas as batalhas?

- Utilizando o método *GET* e link *localhost:9876/battle_history*.
- O resultado deverá aparecer como uma lista de batalhas que participaram de todos os lutadores. Exibindo o total de batalhas já travadas, vencedor e o perdedor.

## Referências

- *https://github.com/thiago-rferreira/atividade-herois-batalha.git*
- *https://pt.wikipedia.org/wiki/Super_Smash_Bros._Ultimate*
- *https://www.nintendo.com/pt-br/store/products/super-smash-bros-ultimate-switch/*
- *https://www.smashbros.com/en_US/*

## Assinatura

Trabalho feito por Júlia Ferreira da Silva, aluna do curso de Desenvolvimento de Sistemas, da Escola SENAI Valinhos.
Turma 3TDS2
