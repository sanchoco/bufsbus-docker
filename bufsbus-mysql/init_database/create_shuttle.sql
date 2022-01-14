USE bufsbus;

DROP TABLE IF EXISTS shuttle_university;
CREATE TABLE shuttle_university (arrive time PRIMARY KEY);

INSERT INTO shuttle_university
VALUES
	-- ('08:10:00'),
	-- ('08:20:00'),
	-- ('08:25:00'),
	-- ('08:30:00'),
	-- ('08:35:00'),
	-- ('08:50:00'),
	-- ('09:00:00'),
	-- ('09:05:00'),
	-- ('09:10:00'),
	-- ('09:15:00'),
	-- ('09:30:00'),
	-- ('09:40:00'),
	-- ('09:45:00'),
	-- ('09:50:00'),
	-- ('10:00:00'),
	-- ('10:10:00'),
	-- ('10:20:00'),
	-- ('10:25:00'),
	-- ('10:30:00'),
	-- ('10:40:00'),
	-- ('10:50:00'),
	-- ('11:00:00'),
	-- ('11:10:00'),
	-- ('11:20:00'),
	-- ('11:30:00'),
	-- ('11:40:00'),
	-- ('11:50:00'),
	-- ('12:00:00'),
	-- ('12:10:00'),
	-- ('12:20:00'),
	-- ('12:30:00'),
	-- ('12:40:00'),
	-- ('12:50:00'),
	-- ('13:00:00'),
	-- ('13:10:00'),
	-- ('13:30:00'),
	-- ('13:40:00'),
	-- ('13:50:00'),
	-- ('14:00:00'),
	-- ('14:10:00'),
	-- ('14:20:00'),
	-- ('14:30:00'),
	-- ('14:40:00'),
	-- ('14:50:00'),
	-- ('15:00:00'),
	-- ('15:10:00'),
	-- ('15:20:00'),
	-- ('15:30:00'),
	-- ('15:40:00'),
	-- ('15:50:00'),
	-- ('16:00:00'),
	-- ('16:10:00'),
	-- ('16:20:00'),
	-- ('16:30:00'),
	-- ('16:40:00'),
	-- ('16:50:00'),
	-- ('17:00:00'),
	-- ('17:10:00'),
	-- ('17:15:00'),
	-- ('17:20:00'),
	-- ('17:30:00'),
	-- ('17:40:00'),
	-- ('17:50:00'),
	-- ('18:00:00'),
	-- ('18:10:00'),
	-- ('18:15:00'),
	-- ('18:20:00'),
	-- ('18:30:00'),
	-- ('18:40:00'),
	-- ('18:50:00'),
	-- ('19:00:00'),
	-- ('19:20:00'),
	-- ('19:40:00'),
	-- ('20:00:00'),
	-- ('20:20:00'),
	-- ('20:40:00'),
	-- ('21:00:00'),
	-- ('21:30:00'),
	-- ('22:00:00');

DROP VIEW IF EXISTS shuttle_domitory;
CREATE VIEW shuttle_domitory AS
SELECT DATE_ADD(arrive, INTERVAL 4 MINUTE) AS "arrive"
FROM shuttle_university;

DROP VIEW IF EXISTS shuttle_beomeosa;
CREATE VIEW shuttle_beomeosa AS
SELECT DATE_ADD(arrive, INTERVAL 9 MINUTE) AS "arrive"
FROM shuttle_university;

DROP VIEW IF EXISTS shuttle_namsan;
CREATE VIEW shuttle_namsan AS
SELECT DATE_ADD(arrive, INTERVAL 11 MINUTE) AS "arrive"
FROM shuttle_university;

DROP VIEW IF EXISTS shuttle_fire;
CREATE VIEW shuttle_fire AS
SELECT DATE_ADD(arrive, INTERVAL 15 MINUTE) AS "arrive"
FROM shuttle_university;


