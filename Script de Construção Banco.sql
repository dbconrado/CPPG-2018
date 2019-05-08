-- MySQL dump 10.13  Distrib 5.7.26, for Linux (i686)
--
-- Host: localhost    Database: cppg
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aluno`
--

DROP TABLE IF EXISTS `aluno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aluno` (
  `matriculaAluno` int(11) NOT NULL,
  `nomeAluno` varchar(255) NOT NULL,
  `idCurso` varchar(244) NOT NULL,
  `matriz` year(4) DEFAULT NULL,
  `ingresso` date DEFAULT NULL,
  `situação` varchar(45) DEFAULT NULL,
  `conclusão` date DEFAULT NULL,
  `colaçãoDeGrau` date DEFAULT NULL,
  PRIMARY KEY (`matriculaAluno`),
  KEY `fk_Aluno_Curso1_idx` (`idCurso`),
  CONSTRAINT `fk_Aluno_Curso1` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Alunos matriculados no IFMG';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno`
--

LOCK TABLES `aluno` WRITE;
/*!40000 ALTER TABLE `aluno` DISABLE KEYS */;
INSERT INTO `aluno` VALUES (12235,'Luan Carlos Mateus Ferreira','2',2012,'2012-02-06','Formado','2014-12-12','2015-03-27'),(12244,'Letícia Bárbara Moraes Fernandes','6',2015,'2015-02-26','Desligado',NULL,NULL),(12254,'Gláucia Teixeira Moreira','2',2013,'2013-02-06','Formado','2015-12-21','2016-03-23'),(12256,'Gabrielle Cristina Monteiro','2',2013,'2013-02-06','Formado','2015-12-21','2016-03-23'),(12267,'Camila dos Santos','2',2013,'2013-02-06','Formado','2015-12-21','2016-03-23'),(12270,'Alice Ribeiro Gomes da Silva','2',2013,'2013-02-06','Formado','2015-12-21','2016-03-23'),(12294,'Lais Rodrigues Guimarães','1',2013,'2013-03-06','Transferência de Matriz',NULL,NULL),(12376,'Laura Ester Martins Santos','1',2013,'2013-02-06','Transferência de Matriz',NULL,NULL),(12519,'Lucas Mendes dos Santos','1',2013,'2013-02-22','Transferência de Matriz',NULL,NULL),(12561,'Lucas Pereira de Azevedo','1',2013,'2013-02-05','Formado','2016-12-21','2017-04-01'),(12567,'Marco Aurélio Soares','1',2013,'2013-02-05','Formado','2016-12-21','2017-04-01'),(12620,'Nayane França Gomes','1',2013,'2013-03-01','Matriculado (PD)',NULL,NULL),(12623,'Rodrigo Ferreira de Brito','1',2013,'2013-02-05','Formado','2016-12-21','2017-04-01'),(12668,'Welton Thiago Martins de Sousa','1',2013,'2013-02-05','Matriculado (PD)',NULL,NULL),(13426,'Débora Carmelita de Oliveira','7',2011,'2011-03-14','Formado','2016-07-15','2016-09-22'),(14084,'Marilza Lopes','7',2013,'2013-02-06','Formado','2016-12-21','2017-04-01'),(14097,'Jacqueline Pereira Borges Cruz','7',2012,'2012-02-13','Formado','2015-12-21','2016-03-23'),(14123,'Samille Lacerda Guedes','1',2017,'2017-03-02','Matriculado (PD)',NULL,NULL),(14491,'Douglas Pacheco Ferraz','1',2014,'2014-02-03','Matriculado (PD)',NULL,NULL),(14499,'Lara Cadar Cunha','1',2014,'2014-02-03','Matriculado (PD)',NULL,NULL),(14515,'Deylon Carlo Fidelis Couto','1',2014,'2014-01-31','Matriculado (PD)',NULL,NULL),(14516,'Guilherme A. Soares','1',2014,'2014-02-04','Matriculado (PD)',NULL,NULL),(21494,'Gabriele Cristina de Carvalho','4',2017,'2015-02-27','Concluído',NULL,NULL),(21496,'Heitor Mateus Fonseca','4',2017,'2015-02-27','Concluído',NULL,NULL),(21503,'Milton Rodrigues Santos Júnior','4',2017,'2015-02-27','Concluído',NULL,NULL),(21508,'Tabata Amanda Cerqueira de Carvalho','4',2017,'2015-02-27','Concluído',NULL,NULL),(21565,'Lucas P. Leal','5',2015,'0000-00-00','Concluído',NULL,NULL),(21849,'Mirian Célia do Carmo Santos','4',2017,'2015-02-27','Concluído',NULL,NULL),(21925,'Bárbara Heliodora Siqueira de Oliveira','1',2015,'2015-02-26','Matriculado (PD)',NULL,NULL),(21926,'Bruna Azevedo Guimarães Santos','1',2015,'2015-02-26','Matriculado (PD)',NULL,NULL),(21977,'Emanuelle Azevedo Martins','1',2015,'2015-02-26','Matriculado (PD)',NULL,NULL),(22017,'Pedro Artur Lourenço','1',2015,'2015-02-26','Trancado',NULL,NULL),(22019,'Rafael Ocelli da Costa Ferreira','1',2015,'2015-02-26','Matriculado (PD)',NULL,NULL),(27351,'Bianca da Silva Matias','7',2016,'2016-02-25','Matriculado (PD)',NULL,NULL),(27579,'Gabriel Alan Dias Miranda','1',2016,'2016-02-25','Matriculado (PD)',NULL,NULL),(27593,'Gustavo Yallen de Souza Azevedo','1',2016,'2016-02-25','Matriculado (PD)',NULL,NULL),(27594,'Hudson Ferreira Lopes','1',2016,'2016-02-25','Matriculado (PD)',NULL,NULL),(27609,'Leandro Oliveira Pereira','1',2016,'2016-02-25','Matriculado (PD)',NULL,NULL),(30136,'Patrícia Scoralick Martins Lopes','1',2016,'2016-08-01','Matriculado (PD)',NULL,NULL);
/*!40000 ALTER TABLE `aluno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aluno_participa_grupo`
--

DROP TABLE IF EXISTS `aluno_participa_grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aluno_participa_grupo` (
  `matriculaAluno` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL,
  `dataInclusao` date DEFAULT NULL,
  PRIMARY KEY (`matriculaAluno`,`idGrupo`),
  KEY `idGrupo` (`idGrupo`),
  CONSTRAINT `aluno_participa_grupo_ibfk_1` FOREIGN KEY (`matriculaAluno`) REFERENCES `aluno` (`matriculaAluno`),
  CONSTRAINT `aluno_participa_grupo_ibfk_2` FOREIGN KEY (`idGrupo`) REFERENCES `grupo_pesquisa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno_participa_grupo`
--

LOCK TABLES `aluno_participa_grupo` WRITE;
/*!40000 ALTER TABLE `aluno_participa_grupo` DISABLE KEYS */;
INSERT INTO `aluno_participa_grupo` VALUES (12294,2,'2017-09-07'),(12376,2,'2017-09-07'),(12623,2,'2017-09-07'),(12623,4,'2014-09-02'),(12668,2,'2017-09-07'),(14515,2,'2017-09-07'),(14515,4,'2015-08-07'),(21926,4,'2017-08-22'),(21977,4,'2017-08-18'),(22017,5,'2017-09-09'),(27351,3,'2017-04-10'),(27579,3,'2016-08-25'),(27594,3,'2016-11-11'),(27609,3,'2016-12-07'),(30136,5,'2017-10-17');
/*!40000 ALTER TABLE `aluno_participa_grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aluno_participa_projeto`
--

DROP TABLE IF EXISTS `aluno_participa_projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aluno_participa_projeto` (
  `matriculaAluno` int(11) NOT NULL,
  `idProjeto` char(11) NOT NULL,
  `modalidadeBolsa` varchar(20) DEFAULT NULL,
  `agenteFinanciadorBolsa` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idProjeto`,`matriculaAluno`),
  KEY `fk_Aluno_participa_Projeto_Aluno1_idx` (`matriculaAluno`),
  CONSTRAINT `fk_Aluno_participa_Projeto_Aluno1` FOREIGN KEY (`matriculaAluno`) REFERENCES `aluno` (`matriculaAluno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Aluno_participa_Projeto_idProjeto` FOREIGN KEY (`idProjeto`) REFERENCES `projeto` (`idProjeto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Relacionamento entre alunos e projetos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno_participa_projeto`
--

LOCK TABLES `aluno_participa_projeto` WRITE;
/*!40000 ALTER TABLE `aluno_participa_projeto` DISABLE KEYS */;
INSERT INTO `aluno_participa_projeto` VALUES (12519,'100012013','PIBIC','Interno'),(12235,'10012012','PIBIC-JR','FAPEMIG e Interno'),(12244,'20012012','PIBIC-JR','Interno'),(12620,'20012013','PIBITI','Interno'),(12623,'2013CPPG01','PIBIC','CNPq'),(22019,'2013CPPG02','PIBIC','Interno'),(21565,'2015CPPG01','PIBIC-JR','Interno'),(22017,'2015CPPG01','PIBITI','Interno'),(14491,'2015CPPG02','PIBIC','Interno'),(14499,'2015CPPG02','PIBIC','Interno'),(14515,'2015CPPG02','Voluntário',NULL),(14516,'2015CPPG02','Voluntário',NULL),(12294,'2015CPPG03','PIBIC','Interno'),(21503,'2015CPPG04','PIBIC-JR','Interno'),(21977,'2015CPPG04','PIBIC','Interno'),(12561,'2015CPPG05','PIBITI','CNPq'),(12567,'2015CPPG05','PIBITI','CNPq'),(12376,'2016CPPG01','Voluntário','Interno'),(21494,'2016CPPG02','PIBIC-JR','Interno'),(21849,'2016CPPG02','PIBIC-JR','Interno'),(21496,'2016CPPG03','PIBIC-JR','Interno'),(21926,'2016CPPG05','PIBIC','Interno'),(12294,'2016CPPG06','PIBIC','Interno'),(21508,'2016CPPG06','PIBIC-JR','Interno'),(21503,'2016CPPG07','PIBIC-JR','Interno'),(21977,'2016CPPG07','PIBIC','Interno'),(27351,'2016CPPG08','PIBIC',NULL),(27579,'2016CPPG08','PIBITI','Interno'),(27594,'2016CPPG08','PIBITI','Interno'),(27609,'2016CPPG08','PIBITI',NULL),(14123,'30012012','PIBIC','CNPq'),(12561,'30012013','Voluntário','Interno'),(13426,'40012012','PIBIC','Interno'),(12668,'40012013','PIBIC','Interno'),(14097,'50012012','PIBIC','Interno'),(12254,'50012013','PIBIC-JR','Interno'),(12256,'50012013','PIBIC-JR','Interno'),(12267,'50012013','PIBIC-JR','Interno'),(12270,'50012013','PIBIC-JR','Interno'),(14084,'50012013','PIBIC','Interno'),(12235,'7','PIBEX','Interno'),(12376,'7','PIBEX','Interno'),(21926,'7','PIBEX','Interno');
/*!40000 ALTER TABLE `aluno_participa_projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aluno_publica`
--

DROP TABLE IF EXISTS `aluno_publica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aluno_publica` (
  `codPublicacao` int(11) NOT NULL,
  `matriculaAluno` int(11) NOT NULL,
  `codEvento` int(11) DEFAULT NULL,
  `ediçãoEvento` varchar(10) DEFAULT NULL,
  `codPeriodico` int(11) DEFAULT NULL,
  `ediçãoPeriodico` int(11) DEFAULT NULL,
  `ano` year(4) NOT NULL,
  `local` varchar(200) NOT NULL,
  `estado` varchar(200) DEFAULT NULL,
  `país` varchar(100) DEFAULT 'BRASIL',
  PRIMARY KEY (`codPublicacao`,`matriculaAluno`),
  KEY `fk_aluno_publica_publicacao1_idx` (`codPublicacao`),
  KEY `fk_aluno_publica_aluno1_idx` (`matriculaAluno`),
  KEY `fk_aluno_publica_Evento` (`codEvento`),
  KEY `fk_aluno_publica_periodico` (`codPeriodico`),
  CONSTRAINT `fk_aluno_publica_Evento` FOREIGN KEY (`codEvento`) REFERENCES `evento` (`codEvento`),
  CONSTRAINT `fk_aluno_publica_aluno1` FOREIGN KEY (`matriculaAluno`) REFERENCES `aluno` (`matriculaAluno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_aluno_publica_periodico` FOREIGN KEY (`codPeriodico`) REFERENCES `periodico` (`codPeriodico`),
  CONSTRAINT `fk_aluno_publica_publicacao1` FOREIGN KEY (`codPublicacao`) REFERENCES `publicacao` (`codPublicacao`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno_publica`
--

LOCK TABLES `aluno_publica` WRITE;
/*!40000 ALTER TABLE `aluno_publica` DISABLE KEYS */;
INSERT INTO `aluno_publica` VALUES (1,12668,1,'XXXV',NULL,NULL,2014,'Natal','RN','BRASIL'),(2,12623,2,'I',NULL,NULL,2014,'São Paulo','SP','BRASIL'),(3,12668,2,'I',NULL,NULL,2014,'São Paulo','SP','BRASIL'),(4,14515,3,'XLVII',NULL,NULL,2015,'Porto de Galinhas','PE','BRASIL'),(5,14515,5,'III',NULL,NULL,2015,'Vitória','ES','BRASIL'),(6,14515,4,'XXXVI',NULL,NULL,2015,'Rio de Janeiro','RJ','BRASIL'),(7,12623,4,'XXXVI',NULL,NULL,2015,'Rio de Janeiro','RJ','BRASIL'),(8,14515,6,'V',NULL,NULL,2016,'Bambuí','MG','BRASIL'),(9,12561,6,'V',NULL,NULL,2016,'Bambuí','MG','BRASIL'),(9,12567,6,'V',NULL,NULL,2016,'Bambuí','MG','BRASIL'),(9,12623,6,'V',NULL,NULL,2016,'Bambuí','MG','BRASIL'),(10,12294,4,'XXXVI',NULL,NULL,2015,'Rio de Janeiro','RJ','BRASIL'),(11,12376,3,'XLVIII',NULL,NULL,2016,'Vitória','ES','BRASIL'),(12,12376,4,'XXXVII',NULL,NULL,2016,'Brasília','DF','BRASIL'),(13,12623,3,'XLVII',NULL,NULL,2015,'Porto de Galinhas','PE','BRASIL'),(14,12623,6,'V',NULL,NULL,2016,'Bambuí','MG','BRASIL'),(15,30136,7,'12',NULL,NULL,2017,'Lisboa',NULL,'Portugal'),(16,12294,8,'2017',NULL,NULL,2017,'São José do Rio Preto','SP','Brasil');
/*!40000 ALTER TABLE `aluno_publica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apresentacao_cisp`
--

DROP TABLE IF EXISTS `apresentacao_cisp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apresentacao_cisp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `apresentador` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `data` datetime DEFAULT NULL,
  `publico` varchar(255) DEFAULT 'Aberto ao público',
  `apresentado` tinyint(1) DEFAULT '0',
  `local` varchar(255) DEFAULT 'Auditório do IFMG Sabará',
  `resumo` text,
  `sobre_apresentador` text,
  `galeria_imagens` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apresentacao_cisp`
--

LOCK TABLES `apresentacao_cisp` WRITE;
/*!40000 ALTER TABLE `apresentacao_cisp` DISABLE KEYS */;
INSERT INTO `apresentacao_cisp` VALUES (1,'Prof. Me. Daniel Conrado','Elaboração de um jogo digital terapêutico para apoiar o tratatamento e bem-estar de crianças com câncer','2018-01-01 00:00:00','Aberto ao público',1,'Auditório do IFMG Sabará',NULL,NULL,'/CPPG/assets/images/cisp/Apresentacao_DanielConrado/'),(2,'Profª. Drª. Luciane Almeida','Representações anticomunistas dos Evangélicos no Brasil (1917-1970)','2019-04-24 14:00:00','Aberto ao público',0,'Auditório do IFMG Sabará','A tese teve o objetivo central de estudar a participação política dos protestante ao longo da história do Brasil, neste sentido, apresentamos um estudo das manifestações anticomunistas elaboradas e difundidas pela Igreja Batista do Brasil e outros grupos evangélicos. Para auxiliar no entendimento destas construções ideológicas, analisaremos também as representações e aproximações no sentido prático deste grupo com cada governo ao longo do período estudado, enfatizando a contradição que tal postura representava para um grupo que reivindicava como um de seus princípios fundamentais o afastamento dos assuntos relacionado ao cotidiano político do País, as ditas “coisas deste mundo”. Cronologicamente a tese no período que vai de 1917, ano que marca a eclosão da Revolução Russa e que, segundo os pesquisadores do tema, marca também o advento do anticomunismo no Brasil; até 1970, quando percebemos a redução, e quase desaparecimento, dos discursos anticomunistas e pró-governo militar por parte dos batistas.','Professora efetiva do ensino básico, técnico e tecnológico no Instituto Federal de Minas Gerais, campus Sabará. Doutora em História (2016) na linha de pesquisa História e Culturas Políticas pela Universidade Federal de Minas Gerais, sob orientação do Prof. Dr. Rodrigo Patto Sá Motta. Mestre em História na área de concentração História, Cultura e Poder pela Universidade Estadual de Feira de Santana (2011) na Bahia. Graduada em História (2008) pela mesma instituição onde desenvolveu pesquisa como bolsista PROBIC/UEFS, por dois anos, sob orientação da professora doutora Elizete da Silva no Centro de Pesquisas das Religiões. Durante o mestrado permaneceu ligada a este núcleo como bolsista pela FAPESB. Como professora de graduação já atuou nas áreas de História da educação e psicopedagogia. Como pesquisadora, desenvolve trabalhos na área de História com ênfase em História das Religiões atuando nos seguintes temas: protestantismo e política no século XX, anticomunismo e culturas políticas.   Endereço para acessar o Currículo Lattes: http://lattes.cnpq.br/2003686159963628.',NULL);
/*!40000 ALTER TABLE `apresentacao_cisp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificados`
--

DROP TABLE IF EXISTS `certificados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `certificados` (
  `siapeServidor` int(11) NOT NULL,
  `idProjeto` char(10) NOT NULL,
  `hashCertificado` char(10) DEFAULT NULL,
  `idCertificado` int(11) NOT NULL AUTO_INCREMENT,
  `generationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idCertificado`),
  KEY `siapeServidor` (`siapeServidor`),
  KEY `idProjeto` (`idProjeto`),
  CONSTRAINT `certificados_ibfk_1` FOREIGN KEY (`siapeServidor`) REFERENCES `servidor` (`siapeServidor`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `certificados_ibfk_2` FOREIGN KEY (`idProjeto`) REFERENCES `projeto` (`idProjeto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificados`
--

LOCK TABLES `certificados` WRITE;
/*!40000 ALTER TABLE `certificados` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colaborador_externo`
--

DROP TABLE IF EXISTS `colaborador_externo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colaborador_externo` (
  `idColaborador` int(11) NOT NULL,
  `nomeColaborador` varchar(45) DEFAULT NULL,
  `codPublicacao` int(11) NOT NULL,
  `linkLattes` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idColaborador`,`codPublicacao`),
  KEY `fk_colaborador_externo_publicacao1_idx` (`codPublicacao`),
  CONSTRAINT `fk_colaborador_externo_publicacao1` FOREIGN KEY (`codPublicacao`) REFERENCES `publicacao` (`codPublicacao`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colaborador_externo`
--

LOCK TABLES `colaborador_externo` WRITE;
/*!40000 ALTER TABLE `colaborador_externo` DISABLE KEYS */;
/*!40000 ALTER TABLE `colaborador_externo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curso` (
  `idCurso` varchar(244) NOT NULL,
  `nomeCurso` varchar(255) NOT NULL,
  `matrizAtual` year(4) NOT NULL,
  `turnoCurso` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idCurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Cursos do IFMG (Integrado, Superior, etc)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES ('1','Bacharelado em Sistemas de Informação',2014,'Matutino'),('2','Técnico em Administração',2016,'Vespertino'),('3','Técnico em Administração Integrado ao Ensino Médio',2016,'Integral Diurno'),('4','Técnico em Eletrônica Integrado ao Ensino Médio',2017,'Integral Diurno'),('5','Técnico em Informática Integrado ao Ensino Médio',2016,'Integral Diurno'),('6','Tecnologia em Logística',2018,'Noturno'),('7','Tecnologia em Processos Gerenciais',2018,'Noturno');
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evento` (
  `codEvento` int(11) NOT NULL,
  `nomeEvento` varchar(255) NOT NULL,
  `siglaEvento` varchar(15) DEFAULT NULL,
  `frequenciaEvento` varchar(45) NOT NULL,
  `abrangência` varchar(20) NOT NULL,
  PRIMARY KEY (`codEvento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES (1,'Evento Nacional de Matemática Aplicada e Computacional','CNMAC','bienal','nacional'),(2,'Evento Brasileiro de Jovens Pesquisadores em Matemática Pura e Aplicada','CBJME','bienal','nacional'),(3,'Simpósio Brasileiro de Pesquisa Operacional','SBPO','anual','nacional'),(4,'Ibero-Latin American Congress on Computational Methods in Engineering','CILAMCE','anual','internacional'),(5,'Evento de Matemática Aplicada e Computacional - Sudeste','CMAC','anual','regional'),(6,'Seminário de Iniciação Científica do IFMG','SIC','anual','regional'),(7,'Conferência Ibérica de Sistemas e Tecnologias de Informação','CISTI','anual','internacional'),(8,'Conferência Brasileira de Dinâmica, Controle e Aplicações','DINCON','bienal','nacional');
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo_pesquisa`
--

DROP TABLE IF EXISTS `grupo_pesquisa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupo_pesquisa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `lider` varchar(255) DEFAULT NULL,
  `data_inicio` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo_pesquisa`
--

LOCK TABLES `grupo_pesquisa` WRITE;
/*!40000 ALTER TABLE `grupo_pesquisa` DISABLE KEYS */;
INSERT INTO `grupo_pesquisa` VALUES (1,'Vocação local do município de Sabará','Administração','Camila Cristina de Paula Pereira','2018-03-15'),(2,'EscOt - Escola de Otimização','Ciência da Computação','Carlos Alexandre Silva','2017-10-16'),(3,'Gestão, Negócios e Tecnologia da Informação (GENTI)','Administração','Lucas Maia do Santos','2016-08-25'),(4,'SIStemas de COMputação (SISCOM)','Ciência da Computação','Bruno Nonato Gomes e Kênia Carolina Gonçalves','2014-10-15'),(5,'TAE - Tecnologias Aplicadas à Educação','Ciência da Computação','Carlos Alexandre Silva','2017-10-16');
/*!40000 ALTER TABLE `grupo_pesquisa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `palavras_chave`
--

DROP TABLE IF EXISTS `palavras_chave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `palavras_chave` (
  `fk_idProjeto` char(11) NOT NULL,
  `palavra` varchar(200) NOT NULL,
  PRIMARY KEY (`fk_idProjeto`,`palavra`),
  CONSTRAINT `fk_Palavras_Chave_idProjeto` FOREIGN KEY (`fk_idProjeto`) REFERENCES `projeto` (`idProjeto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `palavras_chave`
--

LOCK TABLES `palavras_chave` WRITE;
/*!40000 ALTER TABLE `palavras_chave` DISABLE KEYS */;
/*!40000 ALTER TABLE `palavras_chave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `palavras_chave_publicacao`
--

DROP TABLE IF EXISTS `palavras_chave_publicacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `palavras_chave_publicacao` (
  `fk_codPublicacao` int(11) NOT NULL,
  `palavra` varchar(200) NOT NULL,
  PRIMARY KEY (`fk_codPublicacao`,`palavra`),
  CONSTRAINT `fk_Palavras_Chave_codPublicacao` FOREIGN KEY (`fk_codPublicacao`) REFERENCES `publicacao` (`codPublicacao`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `palavras_chave_publicacao`
--

LOCK TABLES `palavras_chave_publicacao` WRITE;
/*!40000 ALTER TABLE `palavras_chave_publicacao` DISABLE KEYS */;
INSERT INTO `palavras_chave_publicacao` VALUES (1,'Algoritmo Evolutivo'),(1,'Chaves Aleatórias'),(1,'Problemas de Roteamento de Veı́culos'),(2,'Heurı́stica'),(2,'Otimização combinatória'),(2,'Redes Eixo-Raio'),(3,'Algoritmo Evolutivo'),(3,'Chaves Aleatórias.'),(3,'Problemas de Roteamento de Veı́culos com Janela de Tempo'),(4,'Benchmark'),(4,'Firefly Algorithm'),(4,'Optimization'),(5,'Algoritmos de Inteligência por Enxame'),(5,'Colônia de vaga-lumes'),(5,'Otimização'),(6,'Colônia de vaga-lumes'),(6,'Inteligência computacional'),(6,'Otimização'),(7,'Combinatorial optimization'),(7,'Heuristic'),(7,'Hub-spoke networks'),(8,'Algoritmo Colônia de Vaga-lume'),(8,'Benchmarck'),(8,'Otimização'),(9,'automatização'),(9,'desenvolviemento web'),(9,'engenharia de software'),(11,'Aedes aegypti'),(11,'Algoritmo de vaga-lume'),(11,'Metaheurística'),(12,'Aedes aegypti'),(12,'Algoritmo de vaga-lume'),(12,'Otimização'),(13,'Heurı́sticas'),(13,'Otimização combinatória'),(13,'Redes Eixo-Raio'),(14,'Heurística'),(14,'Otimização combinatória'),(14,'Redes Eixo-Raio'),(16,'Número de Reprodutibilidade Basal'),(16,'Sensibilidade'),(16,'Worm');
/*!40000 ALTER TABLE `palavras_chave_publicacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `periodico`
--

DROP TABLE IF EXISTS `periodico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `periodico` (
  `codPeriodico` int(11) NOT NULL,
  `nomePeriodico` varchar(45) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  `recorrencia` varchar(45) DEFAULT NULL,
  `edicaoPeriodico` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`codPeriodico`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodico`
--

LOCK TABLES `periodico` WRITE;
/*!40000 ALTER TABLE `periodico` DISABLE KEYS */;
/*!40000 ALTER TABLE `periodico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto`
--

DROP TABLE IF EXISTS `projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projeto` (
  `idProjeto` char(10) NOT NULL,
  `nomeProjeto` varchar(255) NOT NULL,
  `numEdital` int(3) DEFAULT NULL,
  `anoEdital` year(4) DEFAULT NULL,
  `dataInicio` date,
  `dataTermino` date DEFAULT NULL,
  `categoriaProjeto` varchar(70) DEFAULT NULL,
  `entregouRelatorioFinal` char(1) NOT NULL DEFAULT 'F',
  PRIMARY KEY (`idProjeto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='\n\n              ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto`
--

LOCK TABLES `projeto` WRITE;
/*!40000 ALTER TABLE `projeto` DISABLE KEYS */;
INSERT INTO `projeto` VALUES ('0100012013','Aplicativo em Scilab para solução do problema de roteamento de veículos',139,2013,'2013-11-01','2015-10-30','Pesquisa','F'),('10012012','Características e especificidades das atividades de logísticas reversa em micro e pequenas empresas da cidade de Sabará-MG.',6,2011,'2012-02-01','2013-06-30','Pesquisa','F'),('16','Meninas Digitais',18,2016,NULL,NULL,'Pesquisa','F'),('17','O software Geogebra em sala de aula como ferramenta dinâmica no estudo de Matemática',7,2015,NULL,NULL,'Extensão','F'),('20012012','Controle Financeiro nas Micro e Pequenas Empresas da Cidade de Sabará-MG',4,2012,'2012-06-01','2013-09-30','Pesquisa','F'),('20012013','Sistema de Ponto Eletrônico para os docentes',2,2013,'2013-07-01','2015-07-30','Pesquisa','V'),('2013CPPG01','Investigação de abordagens heurísticas para resolução de projeto de redes eixo-raio com alocação simples',139,2013,'2013-03-25','2016-05-30','Pesquisa','V'),('2013CPPG02','Desenvolvimento de uma esteira instrumentada',156,2013,'2016-02-01','2016-08-30','Pesquisa','F'),('2014CPPG01','Análise e Implementações de Metaheurísticas Bio-inspiradas',129,2014,NULL,NULL,'Pesquisa','V'),('2015CPPG01','Desenvolvimento de jogo digital com cunho educacional, cultural e ambiental para o município de Sabará',7,2015,NULL,NULL,'Pesquisa','V'),('2015CPPG02','Roteirização dos pontos turísticos de Sabará via técnicas computacionais',7,2015,NULL,NULL,'Pesquisa','F'),('2015CPPG03','Estudo da dispersão de vírus computacional via equações diferenciais',7,2015,'2015-12-01','2016-11-30','Pesquisa','V'),('2015CPPG04','Sistema Aplicado à previsão de incêndios Florestais',7,2015,NULL,NULL,'Pesquisa','V'),('2015CPPG05','Desenvolvimento de Sistema de Informação Integrado para a Guarda Municipal de Sabará',169,2015,'2016-02-01','2017-02-28','Pesquisa','F'),('2016CPPG01','Uma abordagem ao problema de controle do Aedes aegypti via computação natural',10,2016,NULL,NULL,'Pesquisa','F'),('2016CPPG02','Painel eletrônico indicador de satisfação',18,2016,'2016-10-01','2017-09-30','Pesquisa','F'),('2016CPPG03','Placa Eletrônica para uso em aulas práticas',18,2016,'2016-10-01','2017-09-30','Pesquisa','V'),('2016CPPG05','Avaliação do crescimento urbano de sabará através de imagens de satélite e redes neurais',18,2016,NULL,NULL,'Pesquisa','F'),('2016CPPG06','Material didático sobre anatomia humana para auxiliar as aulas de biologia.',18,2016,NULL,NULL,'Pesquisa','F'),('2016CPPG07','Vant Aplicado à Previsão de Queimadas e Incêndios Naturais',104,2016,'2017-03-01','2019-02-28','Pesquisa','F'),('2016CPPG08','VIVASABARÁ: sistema para gestão e divulgação das informações referentes às ações de promoção e prevenção da saúde em sabará-mg',18,2016,NULL,NULL,'Pesquisa','F'),('2017CPPG01','Proposta de desenvolvimento de um sistema baseado em machine learning para a gestão da neurociência cognitiva',19,2017,NULL,NULL,'Pesquisa','F'),('2017CPPG02','Avaliação do impacto da temperatura na dinâmica do Aedes nas capitais brasileiras',19,2017,NULL,NULL,'Pesquisa','F'),('2017CPPG03','Extraindo conhecimento de dados educacionais por meio de técnicas de mineração de dados',19,2017,NULL,NULL,'Pesquisa','F'),('2017CPPG04','Identificação de perfis depressivos em redes sociais usando análise de sentimentos',19,2017,NULL,NULL,'Pesquisa','F'),('2017CPPG05','Análise da utilização de tecnologias de informação no ensino fundamental de Sabará',19,2017,NULL,NULL,'Pesquisa','F'),('2017CPPG06','Plataforma para Classificação da Amigabilidade de Gênero das Empresas de Tecnologia da Informação do Município de Belo Horizonte',19,2017,NULL,NULL,'Pesquisa','F'),('30012012','Análise da vocação local do município de Sabará para sediar um Arranjo Produtivo Local de Turismo Histórico',5,2011,'2012-03-01','2015-03-30','Pesquisa','F'),('30012013','Avaliação da evolução da popularidade de vídeos de diferentes países no youtube',2,2013,'2013-07-01','2015-06-30','Pesquisa','V'),('40012012','Turismo e proteção de crianças e adolescentes: avaliação da realidade sabarense acerca do preparo para o desenvolvimento do turismo aliad',5,2011,'2012-03-01','2015-03-01','Pesquisa','F'),('40012013','Uma Abordagem Via Algoritmo Genético Ao Problema de Roteamento de Veículos Com Janelas de Tempo',2,2013,NULL,NULL,'Pesquisa','V'),('50012012','Análise Da Gestão Financeira E Previsão De Risco De Liquidez Em Micro E Pequenas Empresas Da Região Metropolitana De Belo Horizonte',5,2011,'2012-03-01','2015-03-01','Pesquisa','F'),('50012013','Cidadania da criança e adolescente com deficiência no município de Sabará: uma análise da situação real a partir da análise do discurso de rede',2,2013,NULL,NULL,'Pesquisa','V'),('7','ConectivIDADE: uma ação voltada à inclusão social e digital para terceira idade Sabarense',7,2015,NULL,NULL,'Extensão','F');
/*!40000 ALTER TABLE `projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicacao`
--

DROP TABLE IF EXISTS `publicacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publicacao` (
  `codPublicacao` int(11) NOT NULL,
  `nomePublicacao` varchar(200) NOT NULL,
  `URN_Resumo` varchar(200) DEFAULT NULL,
  `URN_ArtigoCompleto` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`codPublicacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicacao`
--

LOCK TABLES `publicacao` WRITE;
/*!40000 ALTER TABLE `publicacao` DISABLE KEYS */;
INSERT INTO `publicacao` VALUES (1,'Um Algoritmo Evolutivo baseado em chaves Aleatórias Viciadas Aplicado ao Problema de Roteamento de Veículos com Janelas de Tempo',NULL,'https://proceedings.sbmac.org.br/sbmac/article/view/748/754'),(2,'Eficiente Heurística para o Projeto de Redes Eixo-Raio com Alocação Simples',NULL,NULL),(3,'Modelagem Computacional do Problema de Roteamento de Veículos com Janela de Tempo via Biased Random Key Genetic Algorithm',NULL,NULL),(4,'Otimização Irrestrita de Funções Multimodais via Algoritmo Colônia de Vaga-lumes',NULL,'http://www.din.uem.br/sbpo/sbpo2015/pdf/142818.pdf'),(5,'Algoritmo Colônia de Vaga-lumes Aplicado na Otimização de Funções N-dimensionais',NULL,'https://proceedings.sbmac.org.br/sbmac/article/view/1006'),(6,'Otimização de Funções Multimodais via Técnica de Inteligência Computacional baseada em Colônia de Vaga-umes',NULL,NULL),(7,'Um Estudo de Caso Abordando o Problema de Localização de Concentradores com Alocação Simples em um Estado Brasileiro',NULL,NULL),(8,'Análise e Implementações de Metaheurísticas Bio-Inspiradas',NULL,NULL),(9,'Desenvolvimento de Sistema de Informação Integrado para a Guarda Municipal de Sabará',NULL,NULL),(10,'Modelagem e Simulação de Dispersão Viral em um Ambiente Computacional via Equações Diferenciais Ordinárias',NULL,'https://proceedings.sbmac.org.br/sbmac/article/view/1545/1556'),(11,'Otimização via Algoritmo de Vaga-lumes em um Problema de Controle de Aedes Aegypti',NULL,'http://www.din.uem.br/sbpo/sbpo2016/pdf/162650.pdf'),(12,'Inteligência Computacional Aplicada ao Controle do Aedes Aegypt',NULL,NULL),(13,'Uma Eficiente Heurística para o Projeto de Redes Eixo-Raio: Um Estudo de Caso para as Cidades de Minas Gerais',NULL,'http://www.din.uem.br/sbpo/sbpo2015/pdf/142524.pdf'),(14,'Investigação de Abordagens Heurísticas para Resolução de Projeto de Redes Eixo-Raio com Alocação Simples',NULL,NULL),(15,'Uma Proposta de Arquitetura de Sistema de Informação baseado em Cognição Reflexiva direcionada ao Público Feminino',NULL,NULL),(16,'Estudo da Sensibilidade do Número de Reprodutibilidade Basal de um Modelo de Dispersão de Worm em Rede de Sensores sem Fio',NULL,NULL);
/*!40000 ALTER TABLE `publicacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servidor`
--

DROP TABLE IF EXISTS `servidor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servidor` (
  `siapeServidor` int(11) NOT NULL COMMENT '                      \n',
  `nomeServidor` varchar(255) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `cargo` varchar(150) NOT NULL,
  `ingressoIF` date NOT NULL,
  `Sexo` char(1) NOT NULL,
  PRIMARY KEY (`siapeServidor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Docentes e Servidores em geral do IFMG.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servidor`
--

LOCK TABLES `servidor` WRITE;
/*!40000 ALTER TABLE `servidor` DISABLE KEYS */;
INSERT INTO `servidor` VALUES (1112099,'BARBARA REGINA PINTO E OLIVEIRA','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2015-04-15','F'),(1345394,'CRISTIANE NORBIATO TARGA','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2013-02-07','F'),(1363248,'ESTELA MARIA PEREZ DIAZ','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2012-04-17','F'),(1442748,'FELIPE DE OLIVEIRA LUZZI','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2013-05-28','M'),(1453642,'ELIZA ANTONIA DE QUEIROZ','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2011-02-25','F'),(1587071,'CESAR DOS SANTOS MOREIRA','TEC.ADM','701010 - BIBLIOTECARIO-DOCUMENTALISTA','2010-01-01','M'),(1680859,'BRUNO NONATO GOMES','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2013-02-28','M'),(1730110,'TIAGO PEREIRA DA SILVA','TEC.ADM','701409 - AUXILIAR DE BIBLIOTECA','2013-04-25','M'),(1734304,'DANIELA FANTONI ALVARES','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2016-06-30','F'),(1789155,'JAMILE LENHAUS DETONI CIPRIANO','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2014-11-12','F'),(1802410,'CAMILA CRISTINA DE PAULA PEREIRA','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2012-02-09','F'),(1811218,'DANIEL NEVES ROCHA','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2010-08-25','M'),(1845858,'JOANA DARK PIMENTEL','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2011-02-11','F'),(1845891,'ALINE CAMPOS FIGUEIREDO','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2011-02-04','F'),(1845990,'FLAVIO VIANA GOMIDE','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2011-02-11','M'),(1846191,'LUCAS MAIA DOS SANTOS','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2011-02-11','M'),(1846217,'LUDMILA NOGUEIRA MURTA','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2011-02-11','F'),(1848591,'MICHELLE ADRIANE SILVA DE OLIVEIRA','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2011-02-18','F'),(1849901,'GLAUCO DOUGLAS MOREIRA','TEC.ADM','701226 - TEC DE TECNOLOGIA DA INFORMACAO','2011-02-21','M'),(1893633,'JOSE MARCELLO SALLES GIFFONI','TEC.ADM','701079 - TECNICO EM ASSUNTOS EDUCACIONAIS','2014-10-29','M'),(1945884,'MARIA ELIZARDA MACHADO DE PAULA','TEC.ADM','701200 - ASSISTENTE EM ADMINISTRACAO','2012-06-01','F'),(1964494,'CARLOS ALEXANDRE SILVA','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2013-02-07','M'),(1995023,'MARCIA BASILIA DE ARAUJO','TEC.ADM','701058 - PEDAGOGO-AREA','2013-02-01','F'),(1995115,'KENIA CAROLINA GONCALVES','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2013-02-07','F'),(2001345,'LUZIA MARIA DOS SANTOS PIRES','TEC.ADM','701200 - ASSISTENTE EM ADMINISTRACAO','2013-03-04','F'),(2015404,'PEDRO HENRIQUE TAFAS DUQUE','TEC.ADM','701200 - ASSISTENTE EM ADMINISTRACAO','2013-04-10','M'),(2031886,'GENIVALDO DE AZEVEDO INACIO','TEC.ADM','701200 - ASSISTENTE EM ADMINISTRACAO','2013-06-10','M'),(2061514,'EDSON DOS REIS CACHOEIRA','TEC.ADM','701200 - ASSISTENTE EM ADMINISTRACAO','2013-09-23','M'),(2128330,'RENATO MIRANDA FILHO','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2014-05-22','M'),(2149237,'ERICA MELANIE RIBEIRO NUNES','TEC.ADM','701079 - TECNICO EM ASSUNTOS EDUCACIONAIS','2014-08-08','F'),(2154703,'HELENA MARA DIAS PEDRO','TEC.ADM','701006 - ASSISTENTE SOCIAL','2014-08-22','F'),(2162500,'ANA KARINA GUIMARAES REIS','TEC.ADM','701076 - SECRETARIO EXECUTIVO','2014-09-22','F'),(2172295,'EDNA VIEIRA DA SILVA','TEC.ADM','701058 - PEDAGOGO-AREA','2014-10-17','F'),(2180055,'AION ANGELU FERRAZ SILVA','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2014-12-02','M'),(2180172,'PAULA RIBEIRO FERRAZ','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2014-12-03','F'),(2180640,'FILIPE BRAVIM TITO DE PAULA','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2014-12-01','M'),(2210702,'GABRIEL FELIPE CANDIDO NOVY','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2015-03-17','M'),(2211527,'MATEUS DO NASCIMENTO','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2015-03-30','M'),(2222407,'BRUNO ALVES MARQUES','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2015-04-10','M'),(2245582,'EDER AGUIAR MENDES DE OLIVEIRA','TEC.ADM','701403 - ASSISTENTE DE ALUNO','2015-07-31','M'),(2298574,'ERICK FONSECA BOAVENTURA','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2016-03-17','M'),(2299470,'MAXIMILIANO HENRIQUE BARBOSA','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2016-03-22','M'),(2300558,'MARIA APARECIDA DIAS VENANCIO','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2016-03-18','F'),(2300607,'RICARDO MACHADO ROCHA','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2016-03-17','M'),(2301319,'CARLOS ALBERTO SEVERIANO JUNIOR','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2016-03-28','M'),(2535965,'SABRINA SA E SANT ANNA DOS SANTOS','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2010-11-18','F'),(2681675,'ANDRE MONTEIRO KLEN','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2010-08-25','M'),(2912990,'RAQUEL APARECIDA SOARES REIS FRANCO','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2012-01-20','F'),(2926737,'GLAUCE SOARES MENDES','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2013-10-22','F'),(2970232,'DEBORA SILVA VELOSO ROCHA','DOCENTE','707001 - PROFESSOR ENS BASICO TECN TECNOLOGICO','2014-05-06','F');
/*!40000 ALTER TABLE `servidor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servidor_participa_grupo`
--

DROP TABLE IF EXISTS `servidor_participa_grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servidor_participa_grupo` (
  `siapeServidor` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL,
  `dataInclusao` date DEFAULT NULL,
  PRIMARY KEY (`siapeServidor`,`idGrupo`),
  KEY `idGrupo` (`idGrupo`),
  CONSTRAINT `servidor_participa_grupo_ibfk_1` FOREIGN KEY (`siapeServidor`) REFERENCES `servidor` (`siapeServidor`),
  CONSTRAINT `servidor_participa_grupo_ibfk_2` FOREIGN KEY (`idGrupo`) REFERENCES `grupo_pesquisa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servidor_participa_grupo`
--

LOCK TABLES `servidor_participa_grupo` WRITE;
/*!40000 ALTER TABLE `servidor_participa_grupo` DISABLE KEYS */;
INSERT INTO `servidor_participa_grupo` VALUES (1112099,2,'2017-09-07'),(1112099,3,'2018-05-14'),(1345394,4,'2014-09-02'),(1345394,5,'2017-09-16'),(1363248,1,'2018-03-06'),(1453642,3,'2016-08-19'),(1680859,2,'2017-09-07'),(1680859,4,'2014-09-02'),(1680859,5,'2017-09-16'),(1734304,3,'2018-06-18'),(1802410,1,'2018-03-06'),(1811218,5,'2017-10-17'),(1845858,3,'2018-05-14'),(1845891,3,'2018-05-14'),(1845990,3,'2018-05-14'),(1846191,3,'2016-05-18'),(1848591,3,'2018-05-14'),(1964494,2,'2017-08-24'),(1964494,4,'2014-09-02'),(1964494,5,'2017-08-24'),(1995023,5,'2017-09-09'),(1995115,2,'2017-09-12'),(1995115,4,'2014-09-02'),(1995115,5,'2017-09-16'),(2128330,2,'2017-09-07'),(2128330,4,'2014-09-02'),(2210702,3,'2016-08-12'),(2210702,4,'2015-05-26'),(2210702,5,'2017-10-17'),(2211527,1,'2018-12-18'),(2301319,2,'2017-09-07'),(2301319,4,'2017-11-15'),(2301319,5,'2017-09-16');
/*!40000 ALTER TABLE `servidor_participa_grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servidor_participa_projeto`
--

DROP TABLE IF EXISTS `servidor_participa_projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servidor_participa_projeto` (
  `siapeServidor` int(11) NOT NULL,
  `idProjeto` char(11) NOT NULL,
  `Função` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`siapeServidor`,`idProjeto`),
  KEY `fk_Servidor_participa_Projeto_Servidor_idx` (`siapeServidor`),
  KEY `fk_Servidor_participa_Projeto_Projeto1_idx` (`idProjeto`),
  CONSTRAINT `fk_Servidor_participa_Projeto_Servidor` FOREIGN KEY (`siapeServidor`) REFERENCES `servidor` (`siapeServidor`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Servidor_participa_Projeto_idProjeto` FOREIGN KEY (`idProjeto`) REFERENCES `projeto` (`idProjeto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Relacionamento entre Servidores e Projetos';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servidor_participa_projeto`
--

LOCK TABLES `servidor_participa_projeto` WRITE;
/*!40000 ALTER TABLE `servidor_participa_projeto` DISABLE KEYS */;
INSERT INTO `servidor_participa_projeto` VALUES (1345394,'16','Orientador'),(1345394,'2017CPPG04','Orientador'),(1345394,'30012013','Co-Orientador'),(1345394,'40012013','Co-Orientador'),(1345394,'7','Orientador'),(1363248,'2015CPPG01','Co-Orientador'),(1680859,'20012013','Co-Orientador'),(1680859,'2013CPPG01','Orientador'),(1680859,'2015CPPG02','Orientador'),(1680859,'2017CPPG03','Orientador'),(1680859,'30012013','Co-Orientador'),(1680859,'40012013','Co-Orientador'),(1789155,'2016CPPG06','Co-Orientador'),(1802410,'30012012','Orientador'),(1811218,'2013CPPG02','Orientador'),(1811218,'2015CPPG04','Orientador'),(1811218,'2016CPPG06','Orientador'),(1845891,'30012012','Co-Orientador'),(1846191,'10012012','Orientador'),(1846191,'20012012','Orientador'),(1846191,'2016CPPG08','Orientador'),(1846191,'50012012','Orientador'),(1846217,'40012012','Orientador'),(1846217,'50012013','Co-Orientador'),(1849901,'20012013','Co-Orientador'),(1964494,'20012013','Co-Orientador'),(1964494,'2014CPPG01','Orientador'),(1964494,'2015CPPG01','Orientador'),(1964494,'2015CPPG02','Co-Orientador'),(1964494,'2015CPPG03','Orientador'),(1964494,'2015CPPG05','Orientador'),(1964494,'2016CPPG01','Orientador'),(1964494,'2017CPPG01','Orientador'),(1964494,'2017CPPG02','Orientador'),(1964494,'2017CPPG05','Orientador'),(1964494,'30012013','Co-Orientador'),(1964494,'40012013','Orientador'),(1964494,'7','Co-Orientador'),(1995115,'20012013','Orientador'),(1995115,'30012013','Orientador'),(2128330,'2015CPPG04','Co-Orientador'),(2180055,'2016CPPG07','Co-Orientador'),(2210702,'2015CPPG01','Co-Orientador'),(2210702,'2016CPPG05','Orientador'),(2210702,'2016CPPG08','Co-Orientador'),(2210702,'7','Co-Orientador'),(2211527,'2015CPPG03','Co-Orientador'),(2298574,'2016CPPG02','Orientador'),(2298574,'2016CPPG03','Orientador'),(2681675,'0100012013','Orientador'),(2926737,'50012013','Orientador');
/*!40000 ALTER TABLE `servidor_participa_projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servidor_publica`
--

DROP TABLE IF EXISTS `servidor_publica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servidor_publica` (
  `codPublicacao` int(11) NOT NULL,
  `siapeServidor` int(11) NOT NULL,
  `codEvento` int(11) DEFAULT NULL,
  `ediçãoEvento` varchar(10) DEFAULT NULL,
  `codPeriodico` int(11) DEFAULT NULL,
  `ediçãoPeriodico` int(11) DEFAULT NULL,
  `ano` year(4) NOT NULL,
  `local` varchar(200) NOT NULL,
  `estado` varchar(200) DEFAULT NULL,
  `país` varchar(100) DEFAULT 'BRASIL',
  PRIMARY KEY (`codPublicacao`,`siapeServidor`),
  KEY `fk_servidor_publica_servidor1_idx` (`siapeServidor`),
  KEY `fk_servidor_publica_Evento` (`codEvento`),
  KEY `fk_servidor_publica_periodico` (`codPeriodico`),
  CONSTRAINT `fk_servidor_publica_Evento` FOREIGN KEY (`codEvento`) REFERENCES `evento` (`codEvento`),
  CONSTRAINT `fk_servidor_publica_periodico` FOREIGN KEY (`codPeriodico`) REFERENCES `periodico` (`codPeriodico`),
  CONSTRAINT `fk_servidor_publica_publicacao1` FOREIGN KEY (`codPublicacao`) REFERENCES `publicacao` (`codPublicacao`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_servidor_publica_servidor1` FOREIGN KEY (`siapeServidor`) REFERENCES `servidor` (`siapeServidor`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servidor_publica`
--

LOCK TABLES `servidor_publica` WRITE;
/*!40000 ALTER TABLE `servidor_publica` DISABLE KEYS */;
INSERT INTO `servidor_publica` VALUES (1,1964494,1,'XXXV',NULL,NULL,2014,'Natal','RN','BRASIL'),(2,1680859,2,'I',NULL,NULL,2014,'São Paulo','SP','BRASIL'),(3,1964494,2,'I',NULL,NULL,2014,'São Paulo','SP','BRASIL'),(4,1680859,3,'XLVII',NULL,NULL,2015,'Recife','PE','BRASIL'),(4,1964494,3,'XLVII',NULL,NULL,2015,'Recife','PE','BRASIL'),(5,1964494,5,'III',NULL,NULL,2015,'Vitória','ES','BRASIL'),(6,1964494,4,'XXXVI',NULL,NULL,2015,'Rio de Janeiro','RJ','BRASIL'),(7,1680859,4,'XXXVI',NULL,NULL,2015,'Rio de Janeiro','RJ','BRASIL'),(7,2180055,4,'XXXVI',NULL,NULL,2015,'Rio de Janeiro','RJ','BRASIL'),(8,1964494,6,'V',NULL,NULL,2016,'Bambuí','MG','BRASIL'),(9,1680859,6,'V',NULL,NULL,2016,'Bambuí','MG','BRASIL'),(9,1964494,6,'V',NULL,NULL,2016,'Bambuí','MG','BRASIL'),(9,2128330,6,'V',NULL,NULL,2016,'Bambuí','MG','BRASIL'),(10,1964494,1,'XXXVI',NULL,NULL,2016,'Gramado','RS','BRASIL'),(10,2211527,1,'XXXVI',NULL,NULL,2016,'Gramado','RS','BRASIL'),(11,1964494,3,'XLVIII',NULL,NULL,2016,'Vitória','ES','BRASIL'),(12,1964494,4,'XXXVII',NULL,NULL,2016,'Brasília','DF','BRASIL'),(13,1680859,3,'XLVII',NULL,NULL,2015,'Recife','PE','BRASIL'),(14,1680859,6,'V',NULL,NULL,2016,'Bambuí','MG','BRASIL'),(15,1345394,7,'12',NULL,NULL,2017,'Lisboa',NULL,'Portugal'),(15,1964494,7,'12',NULL,NULL,2017,'Lisboa',NULL,'Portugal'),(16,1964494,8,'2017',NULL,NULL,2017,'São José do Rio Preto','SP','Brasil'),(16,2211527,8,'2017',NULL,NULL,2017,'São José do Rio Preto','SP','Brasil');
/*!40000 ALTER TABLE `servidor_publica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-08 10:06:18
