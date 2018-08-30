USE cppg;

DROP TABLE certificados;
CREATE TABLE IF NOT EXISTS certificados(
	siapeServidor INT NOT NULL,
    idProjeto CHAR(10) NOT NULL,
    hashCertificado CHAR(10),
    idCertificado INT AUTO_INCREMENT NOT NULL,
    PRIMARY KEY (idCertificado),
    FOREIGN KEY (siapeServidor) REFERENCES servidor(siapeServidor) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (idProjeto) REFERENCES projeto(idProjeto) ON DELETE CASCADE ON UPDATE CASCADE
    );
    
DELIMITER $$
CREATE TRIGGER tgr_geraCertificado BEFORE INSERT ON certificados
FOR EACH ROW
BEGIN
	set @hash = RIGHT(MD5(concat(NEW.siapeServidor, NEW.idCertificado)),10);
	SET NEW.hashCertificado = @hash;
END$$
DELIMITER ;

INSERT INTO certificados (siapeServidor, idProjeto) VALUES (1112099,'0010012012');
SELECT * FROM certificados;