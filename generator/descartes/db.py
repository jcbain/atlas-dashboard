from sqlalchemy import create_engine
import csv
import pandas as pd

db_name = 'atlas_simulation'
db_user = 'postgres'
db_pass = 'postgres'
db_host = 'db'
db_port = '5432'

db_string = 'postgresql://{}:{}@{}:{}/{}'.format(db_user, db_pass, db_host, db_port, db_name)
db = create_engine(db_string)

def add_param_column(table, columns):
    for column in columns:
        db.execute (
            """
                ALTER TABLE {}
                ADD COLUMN IF NOT EXISTS {} double precision;
            """.format(table, column)
        )

def insert_param_row(column, row, output):
    db.execute(
        """
            INSERT INTO param_variables (output_pk, {})
            VALUES('{}', {});
        """.format(column, output, row)
    )

def save_output_file(filePath, fileName):
    db.execute(
        """
            INSERT INTO output_files (path, file_name) 
            VALUES ('{}', '{}');
        """.format(filePath, fileName)
    )

def dump_csv():
    files = db.execute("SELECT path FROM output_files;")

    for r in files:
        path = r[0]
        df = pd.read_csv(path)

        with open(path, newline='') as csvfile:
            r = csv.reader(csvfile)
            headers = next(r, None)
            
            add_param_column('data', headers)
            
        df.to_sql('data', con=db, index=False, if_exists='append')
        db.execute("DELETE FROM output_files WHERE path='{}';".format(path))
