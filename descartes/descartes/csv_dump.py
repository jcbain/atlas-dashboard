from sqlalchemy import create_engine
import os
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

def dump_csv(path):
    df = pd.read_csv(path)
    
    with open(path, newline='') as csvfile:
        r = csv.reader(csvfile)
        headers = next(r, None)
        
        add_param_column('raw_data', headers)
        
    df.to_sql('raw_data', con=db, index=False, if_exists='append')

if __name__ == "__main__":
    volume = "/usr/src/uploads/"

    for filename in os.listdir(volume):
        if filename.endswith(".csv"):
            dump_csv(volume+filename)

        else:
            try:
                os.chdir(volume+filename)
                current = os.getcwd()

                for files in os.listdir(current):
                    csvPath = "{}/{}".format(current, files)
                    dump_csv(csvPath)

            except:
                print(filename)