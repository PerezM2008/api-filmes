

Banco de Dados

CREATE DATABASE db_locadoura_filme_ds2t_25_2;

CREATE TABLE tbl_filmes(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
sinopse TEXT NULL,
data_lancamento DATE NULL,
duracao TIME NOT NULL,
orcamento DECIMAL NOT NULL,
trailer VARCHAR(200)  NULL,
capa VARCHAR(200) NOT NULL
);

INSERT INTO tbl_filmes (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
VALUES (
    'Star Wars: Episódio IV – Uma Nova Esperança',
    'O jovem fazendeiro Luke Skywalker encontra uma mensagem da Princesa Leia em um dróide o que o leva a se juntar à Aliança Rebelde para resgatá-la e lutar contra o Império Galáctico e a temível Estrela da Morte',
    '1977-11-18',
    '02:01:00',
    11000000.00,
    'https://www.youtube.com/watch?v=Q8b09bE1iGQ','https://pt.wikipedia.org/wiki/Star_Wars:_Epis%C3%B3dio_IV_%E2%80%93_Uma_Nova_Esperan%C3%A7a#/media/Ficheiro:Star_Wars_Epis%C3%B3dio_IV_Uma_Nova_Esperan%C3%A7a.jpg'
);

INSERT INTO tbl_filmes (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
VALUES (
'Star Wars: Episódio V – O Império Contra-Ataca',
'a Aliança Rebelde é dispersa após um ataque do Império em Hoth. Enquanto Luke Skywalker treina com o Mestre Jedi Yoda, Han Solo e a Princesa Leia são perseguidos pelo Império e pelo caçador de recompensas Boba Fett. Luke eventualmente enfrenta Darth Vader e descobre uma verdade chocante sobre seu passado',
'1980-07-21',
'02:04:00',
30000000.00,
'https://youtu.be/JNwNXF9Y6kY?si=gv8gX_Z7SD7RRvaJ',
'https://upload.wikimedia.org/wikipedia/pt/thumb/5/5c/The_Empire_Strikes_Back.jpg/250px-The_Empire_Strikes_Back.jpg'
);

