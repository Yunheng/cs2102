BEGIN TRANSACTION;

-- The Main DDL for the website
CREATE TABLE Project(
	id SERIAL PRIMARY KEY,
	title VARCHAR(128) NOT NULL,
	description TEXT,
	country CHAR(2) NOT NULL,
	city VARCHAR(128) NOT NULL,
	category VARCHAR(32) NOT NULL,
	date_created TIMESTAMP,
	status CHAR(8) CHECK (status = 'ONGOING' OR status = 'COMPLETE' OR status = 'REVOKED')
);

CREATE TABLE Project_Reward(
	name VARCHAR(64),
	project INTEGER REFERENCES Project(id),
	description TEXT NOT NULL,
	maxBackers INTEGER CHECK(maxBackers IS NULL OR maxBackers > 0),
	minAmount MONEY CHECK(minAmount > 0.0),
	PRIMARY KEY(name, project)
);

CREATE TABLE "user" (
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
	member VARCHAR(32) REFERENCES "user"(username),
	project INTEGER REFERENCES Project(id),
	PRIMARY KEY(member, project)
);

CREATE TABLE Project_Backer(
	member VARCHAR(32) REFERENCES "user"(username),
	project INTEGER REFERENCES Project(id),
	amount MONEY,
	reward VARCHAR(64),
	FOREIGN KEY (reward, project) REFERENCES Project_Reward(name, project),
	PRIMARY KEY (member, project)
);

CREATE TABLE Project_Image(
	filename VARCHAR(64) PRIMARY KEY,
	description TEXT,
	project INTEGER REFERENCES Project(id)
);

CREATE TABLE Project_Comment(
	id SERIAL PRIMARY KEY,
	content TEXT NOT NULL,
	posted TIMESTAMP,
	member VARCHAR(32) REFERENCES "user"(username),
	project INTEGER REFERENCES Project(id),
	parent INTEGER NULL REFERENCES Project_Comment(id)
);

CREATE TABLE Project_News(
	id SERIAL PRIMARY KEY,
	title VARCHAR(64) NOT NULL,
	content TEXT NOT NULL,
	posted TIMESTAMP,
	member VARCHAR(32) REFERENCES "user"(username),
	project INTEGER REFERENCES Project(id)
);

CREATE TABLE News_Comment(
	id SERIAL PRIMARY KEY,
	content TEXT NOT NULL,
	posted TIMESTAMP,
	member VARCHAR(32) REFERENCES "user"(username),
	news INTEGER REFERENCES Project_News(id),
	parent INTEGER NULL REFERENCES News_Comment(id)
);

CREATE TABLE Transaction(
	code CHAR(12) PRIMARY KEY,
	type CHAR(6) CHECK(type = 'Credit' OR type = 'Debit'),
	amount NUMERIC CHECK(amount > 0.0),
	"user" VARCHAR(32) REFERENCES "user"(username)
);

CREATE TABLE Receipt(
	receiptNo CHAR(12) PRIMARY KEY,
	address TEXT,
	amount NUMERIC CHECK(amount > 0.0),
	transaction CHAR(12) REFERENCES Transaction(code)
);

CREATE OR REPLACE FUNCTION random_string(length integer) returns text AS
$$
DECLARE
  chars text[] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
  result text := '';
  i integer := 0;
BEGIN
  if length < 0 then
    raise exception 'Given length cannot be less than 0';
  end if;
  for i in 1..length loop
    result := result || chars[1+random()*(array_length(chars, 1)-1)];
  end loop;
  return result;
END;
$$ language plpgsql;

COMMIT;
