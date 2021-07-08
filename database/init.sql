CREATE SEQUENCE user_id_seq;

CREATE TABLE IF NOT EXISTS raw_data ();


CREATE TABLE IF NOT EXISTS selection (
    id SERIAL PRIMARY KEY
);


CREATE TABLE IF NOT EXISTS visual (
    param_id INTEGER REFERENCES selection(id),
    x double precision,
    y double precision,
    color double precision
);