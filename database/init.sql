CREATE SEQUENCE user_id_seq;

CREATE TABLE IF NOT EXISTS param_variables (
    output_pk TEXT
);

CREATE TABLE IF NOT EXISTS output_files (
    file_path TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS output_data ();