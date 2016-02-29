-- The Main DDL for the website
CREATE TABLE Project(
	id INTEGER PRIMARY KEY,
	title VARCHAR(128) NOT NULL,
	description TEXT,
	country CHAR(2) NOT NULL,
	city VARCHAR(128) NOT NULL,
	category VARCHAR(32) NOT NULL,
	date_created TIMESTAMP
);

CREATE TABLE Project_Reward(
	name VARCHAR(64),
	project INTEGER REFERENCES Project(id),
	description TEXT NOT NULL,
	max NUMERIC CHECK(max > 0),
	price NUMERIC CHECK(price > 0.0),
	PRIMARY KEY(name, project)
);

CREATE TABLE Member(
	username VARCHAR(32) PRIMARY KEY,
	password CHAR(40) NOT NULL,
	last_login TIMESTAMP,
	registered_date TIMESTAMP,
	address VARCHAR(256),
	avatar VARCHAR(256),
	email VARCHAR(256)
);

CREATE TABLE Project_Owner(
	role VARCHAR(32) NOT NULL,
	member VARCHAR(32) REFERENCES Member(username),
	project INTEGER REFERENCES Project(id)	
);

CREATE TABLE Project_Backer(
	member VARCHAR(32) REFERENCES Member(username),
	project INTEGER REFERENCES Project(id),
	tier VARCHAR(64),
	FOREIGN KEY (project, tier) REFERENCES Project_Reward(project, name)
);

CREATE TABLE Project_Image(
	filename VARCHAR(64) PRIMARY KEY,
	description TEXT,
	project INTEGER REFERENCES Project(id)
);

CREATE TABLE Project_Comment(
	id INTEGER PRIMARY KEY,
	content TEXT NOT NULL,
	posted TIMESTAMP,
	member VARCHAR(32) REFERENCES Member(username),
	project INTEGER REFERENCES Project(id),
	parent INTEGER NULL REFERENCES Project_Comment(id)
);

CREATE TABLE Project_News(
	id INTEGER PRIMARY KEY,
	title VARCHAR(64) NOT NULL,
	content TEXT NOT NULL,
	posted TIMESTAMP,
	member VARCHAR(32) REFERENCES Member(username),
	project INTEGER REFERENCES Project(id)
);

CREATE TABLE News_Comment(
	id INTEGER PRIMARY KEY,
	content TEXT NOT NULL,
	posted TIMESTAMP,
	member VARCHAR(32) REFERENCES Member(username),
	news INTEGER REFERENCES Project_News(id),
	parent INTEGER NULL REFERENCES News_Comment(id)
);

CREATE TABLE Transaction(
	id INTEGER PRIMARY KEY,
	type VARCHAR(32) CHECK(type = 'Credit' OR type = 'Debit')
);

CREATE TABLE Receipt(
	id INTEGER PRIMARY KEY,
	address TEXT,
	amount NUMERIC CHECK(amount > 0.0),
	transaction INTEGER REFERENCES Transaction(id)
);
