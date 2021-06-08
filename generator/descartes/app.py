from sqlalchemy import create_engine

db_name = 'atlas_simulation'
db_user = 'postgres'
db_pass = 'postgres'
db_host = 'db'
db_port = '5432'

db_string = 'postgresql://{}:{}@{}:{}/{}'.format(db_user, db_pass, db_host, db_port, db_name)
db = create_engine(db_string)

def save_output_file(file_path):
    db.execute(
        """
            INSERT INTO output_files (path) VALUES ('{}');
        """.format(file_path)
    )