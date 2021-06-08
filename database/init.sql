CREATE SEQUENCE user_id_seq;
CREATE TABLE IF NOT EXISTS output_data ();
CREATE TABLE IF NOT EXISTS output_files (
    id SERIAL NOT NULL,
    path TEXT,
    PRIMARY KEY (id)
);