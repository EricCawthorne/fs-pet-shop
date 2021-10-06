DROP TABLE IF EXISTS pets; 

CREATE TABLE pets (
    pet_id serial,
    name text, 
    age integer,
    kind text
);

INSERT INTO pets (name, age, kind) VALUES ('Fido', 7, 'Dog');
INSERT INTO pets (name, age, kind) VALUES ('Buttons', 5, 'Snake');

SELECT * FROM pets;