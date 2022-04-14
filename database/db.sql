CREATE DATABASE db_links;

USE db_links;

CREATE TABLE users(
    id INT NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
ADD PRIMARY KEY (id);

ALTER TABLE users
MODIFY id INT NOT NULL AUTO_INCREMENT;

DESCRIE users;

CREATE TABLE links(
    id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT,
    create_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

ALTER TABLE links 
ADD PRIMARY KEY(id);

ALTER TABLE links
MODIFY id INT NOT NULL AUTO_INCREMENT;

DESCRIBE users;
DESCRIBE links;