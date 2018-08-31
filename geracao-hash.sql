USE cppg;

DROP TABLE IF EXISTS certificados;
CREATE TABLE IF NOT EXISTS certificados(
	siapeServidor INT NOT NULL,
    idProjeto CHAR(10) NOT NULL,
    hashCertificado CHAR(10),
    idCertificado INT AUTO_INCREMENT NOT NULL,
    generationDate DATETIME,
    PRIMARY KEY (idCertificado),
    FOREIGN KEY (siapeServidor) REFERENCES servidor(siapeServidor) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (idProjeto) REFERENCES projeto(idProjeto) ON DELETE CASCADE ON UPDATE CASCADE
    );

DROP PROCEDURE IF EXISTS proc_verificaSeRowExiste;    
DELIMITER $$
CREATE PROCEDURE proc_verificaSeRowExiste (IN siapeServidor INT, IN idProjeto CHAR(10), OUT resposta BOOL)
BEGIN
	IF '0' IN (
		SELECT EXISTS (SELECT * FROM certificados C WHERE C.siapeServidor = siapeServidor AND C.idProjeto = idProjeto)
        ) THEN
			SET resposta = false;
		ELSE SET resposta = true;
	END IF;
END $$;
DELIMITER ;

DROP TRIGGER IF EXISTS tgr_geraCertificado;
DELIMITER $$
CREATE TRIGGER tgr_geraCertificado BEFORE INSERT ON certificados
FOR EACH ROW
BEGIN
	CALL proc_verificaSeRowExiste(2149237,'2017CPPG06',@existe);
    IF(@existe = false) THEN
		set @hash = RIGHT(MD5(concat(NEW.siapeServidor, NEW.idCertificado)),10);
		SET NEW.hashCertificado = @hash;
	ELSE SET NEW.siapeServidor = NULL;
	END IF;
END$$
DELIMITER ;

INSERT INTO certificados (siapeServidor, idProjeto) VALUES (2149237,'2017CPPG06');
INSERT INTO certificados (siapeServidor, idProjeto) VALUES (2149237,'2017CPPG06');

SELECT * FROM certificados;