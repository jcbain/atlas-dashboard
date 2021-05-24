CREATE SEQUENCE user_id_seq;
CREATE TABLE IF NOT EXISTS output_files (
    id SERIAL NOT NULL,
    run_file BYTEA,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS input_files (
    name TEXT NOT NULL PRIMARY KEY,
    content BYTEA
);


