CREATE SEQUENCE user_id_seq;

CREATE TABLE IF NOT EXISTS param_variables (
    output_pk TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS output_files (
    id SERIAL PRIMARY KEY,
    file_name TEXT references param_variables(output_pk),
    path TEXT
);

CREATE TABLE IF NOT EXISTS data ();