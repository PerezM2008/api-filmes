CREATE DATABASE db_locadora_filme_ds2t_25_2;

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