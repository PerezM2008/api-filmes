CREATE DATABASE db_locadora_filme_ds2t_25_2;

-- Criação da tabela Filme
CREATE TABLE tbl_filme(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	sinopse TEXT,
	data_lancamento DATE,
	duracao TIME NOT NULL,
	orcamento DECIMAL NOT NULL,
	trailer VARCHAR(200),
	capa VARCHAR(200) NOT NULL
);

insert into tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
values ("Jogo Sujo",
    "Segue Parker, um artesão e ladrão profissional que aborda seu trabalho com uma ética de trabalho direta e sem bobagens.",
    "2025-10-01",
    "02:05:00",
    190000000.00,
    "https://www.imdb.com/pt/video/vi2552612889/?playlistId=tt18392014&ref_=tt_ov_ov_vi",
    "https://www.imdb.com/pt/title/tt18392014/mediaviewer/rm3543377922/?ref_=tt_ov_i"
);

insert into tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
values ("O Aprendiz de Feiticeiro",
    "O mestre feiticeiro Balthazar Blake deve encontrar e treinar o descendente de Merlin para derrotar Morgana la Fée, a feiticeira das trevas.",
    "2010-08-13",
    "01:49:00",
    150000000.00,
    "https://www.imdb.com/pt/video/vi780142105/?playlistId=tt0963966&ref_=tt_ov_ov_vi",
    "https://www.imdb.com/pt/title/tt0963966/mediaviewer/rm147224832/?ref_=tt_ov_i"
);

insert into tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
values ("Hotel Costiera",
    "Daniel De Luca é um ex-marinheiro meio italiano que retorna à Itália, terra de sua infância, e começa a resolver problemas em um dos hotéis mais luxuosos do mundo, localizado na espetacular costa de Positano.",
    "2025-09-24",
    "01:49:00",
    150000000.00,
    "https://www.imdb.com/pt/video/vi1780795417/?playlistId=tt13924416&ref_=tt_ov_pr_ov_vi",
    "https://www.imdb.com/pt/title/tt13924416/mediaviewer/rm2396239618/?ref_=tt_ov_i"
);



-- Criação da tabela Genero
CREATE TABLE tbl_genero (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome VARCHAR (50) NOT NULL
);



-- Criação da tabela Cenário
CREATE TABLE tbl_cenario (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR (150) NOT NULL,
    localidade VARCHAR (200) NOT NULL

);

insert into tbl_cenario(nome, localidade)
values ("Rota de tiro", "Rio de Janeiro");

insert into tbl_cenario(nome, localidade)
values ("Caminho florestal", "Amazonia");

insert into tbl_cenario(nome, localidade)
values ("Prédio abandonado", "São Paulo");

-- Criação da tabela Personagens

CREATE TABLE tbl_personagens(
    id_personagens INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR (50) NOT NULL,
    data_idade DATE NOT NULL,
    localidade VARCHAR (300) NOT NULL
);

insert into tbl_personagens(nome, data_idade, localidade)
values ("Celso Mussumano", "02-07-1678", "Rio de Janeiro")

insert into tbl_personagens(nome, data_idade, localidade)
values ("Kishura Muytu", "09-10-2019", "Japão")


-- Criação da tabela Diretor
CREATE TABLE tbl_diretor(
    id_diretor INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR (50) NOT NULL,
    data_nascimento DATE NOT NULL,
    nacionalidade VARCHAR (150) NOT NULL,
    cpf VARCHAR (15) NOT NULL,
    tempo_carreira VARCHAR (150) NULL
);

-- Criação da tabela Ator
CREATE TABLE tbl_ator (
    id_ator INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR (50) NOT NULL,
    data_nascimento DATE NOT NULL,
    nascionalidade VARCHAR (150) NOT NULL,
    cpf VARCHAR (15) NOT NULL,
    tempo_carreira VARCHAR (150) NULL
);

-- Criação da tabela Produtora
CREATE TABLE tbl_produtora (
    id_produtora INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome VARCHAR (50) NOT NULL,
    email VARCHAR (100) NOT NULL,
    nascionalidade VARCHAR (150) NOT NULL,
    cnpj VARCHAR (20) NOT NULL,
    data_fundacao DATE NULL
);