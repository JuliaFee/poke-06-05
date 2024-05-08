# Super Smash Bros. Ultimate Database 💥
![foto do jogo](https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000012332/ac4d1fc9824876ce756406f0525d50c57ded4b2a666f6dfe40a6ac5c3563fad9)

## Sobre
Super Smash Bros. Ultimate, chamado no Japão de Super Smash Bros. Special, é um jogo eletrônico de luta, desenvolvido pela Bandai Namco Studios e Sora Ltd. e publicado pela Nintendo. É o quinto jogo da série Super Smash Bros., sucedendo Super Smash Bros. for Nintendo 3DS & Wii U.

## Passos iniciais
- Instale o aplicativo Insomnia e selecione a opção "__Use the local Scratch Pad__", caso não tenha conta.
- Ao abrir o projeto pelo VSCode, rode os comandos:
- *npm install -y*
- *npm install nodemon*
- *npm install axios*
- *npm install express*
- *npm run dev*

Assim, o código será hospedado em um link localhost.

# Tabelas

- As tabelas disponíveis são FIGHTERS e BATTLE_HISTORY.
- As informações das tabelas são armazenadas dentro da pasta __database__ do projeto, no arquivo __script.sql__.
## Como consultar a tabela?
- Copie e cole o link localhost:9876 no aplicativo Insomnia. A porta está pre-settada para 9876.
- Utilize "__localhost:9876/[nome da tabela]__" após o link para indicar que você está buscando dentros das tabelas fighters ou battle_history, utilizando o método __GET__.
- Utilize "__localhost:9876/[nome da tabela]/[id do registro]__" para indicar que você está buscando um registro específico,utilizando seu ID como número. Utilize e o método __GET__.

