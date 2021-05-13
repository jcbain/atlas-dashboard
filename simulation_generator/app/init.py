from sqlalchemy import create_engine

db_name = 'simulation_files'
db_user = 'postgres'
db_pass = 'atlas'
db_host = 'db'
db_port = '5432'

# Connecto to the database
db_string = 'postgres://{}:{}@{}:{}/{}'.format(db_user, db_pass, db_host, db_port, db_name)
db = create_engine(db_string)

def add_new_row(n):
    # Insert new run file into the table
    db.execute("INSERT INTO sim_files (run_file) VALUES (n)")

if __name__ == '__main__':
    print('Application started')