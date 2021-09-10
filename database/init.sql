CREATE SEQUENCE user_id_seq;


CREATE TABLE IF NOT EXISTS raw_data (
    position double precision,
    alpha double precision,
    output_gen double precision,
    select_coef double precision,
    p1_freq double precision,
    origin_gen double precision,
    p2_freq double precision,
    migr_rate double precision,
    mut_rate double precision,
    rep double precision,
    fitness_width double precision,
    recomb_rate double precision,
    n double precision
);


\COPY raw_data FROM './defaultData.csv' DELIMITER ',' CSV HEADER;


CREATE TABLE IF NOT EXISTS selection (
    id SERIAL PRIMARY KEY
);


CREATE TABLE IF NOT EXISTS visual (
    param_id INTEGER REFERENCES selection(id),
    x double precision,
    y double precision,
    color double precision
);