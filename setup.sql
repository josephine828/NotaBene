-- DROP DATABASE notabene;
CREATE DATABASE notabene;
\c notabene

-- DROP TABLE lists;
-- DROP TABLE categories;
-- DROP TABLE allTasks;
-- DROP TABLE shownTasks;
-- DROP TABLE groups;
-- DROP TABLE notes;
-- DROP TABLE counters;

CREATE TABLE lists (
	id SERIAL PRIMARY KEY,
	listName VARCHAR(64),
	taskID INT NULL
);
CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	categoryName VARCHAR(64),
	taskID INT NULL
);
CREATE TABLE allTasks (
	id SERIAL PRIMARY KEY,
	title VARCHAR(15),
	genre VARCHAR(25),
	quality BOOLEAN
);
CREATE TABLE shownTasks (
	id SERIAL PRIMARY KEY,
	taskName VARCHAR(64),
	taskDescription VARCHAR(256),
	dueDate DATE,
	modified TIME
);
CREATE TABLE groups (
	id SERIAL PRIMARY KEY,
	groupName VARCHAR(64)
);
CREATE TABLE notes (
	id SERIAL PRIMARY KEY,
	noteName VARCHAR(64),
	notesContent TEXT,
	groupName VARCHAR(64),
	modified TIME
);
CREATE TABLE counters (
	id SERIAL PRIMARY KEY,
	taskCounter INT,
	notesCounter INT,
	currentTaskID INT,
	currentNoteID INT,
	currentTheme INT
);
