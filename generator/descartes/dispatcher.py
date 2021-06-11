from __future__ import print_function
import subprocess
import os
import random
import sys
import csv

import db
from time import gmtime, strftime
from helpers import output_manipulators, file_cleaners

def run_slim_process():
    cwd = os.getcwd() + '/'
    output_dir = cwd + 'uploads/run' + strftime("%Y%m%d_%H%M%S", gmtime()) + '_' + str(random.randint(1, 1000)) + '/'
    os.mkdir(output_dir)

    full = []
    args = sys.argv[1:]
    file_name = file_cleaners.create_file_name(args)
    d = dict(arg.split("=") for arg in args)

    try:
        reps = int(d["rep"])
        args.pop(d.keys().index("rep"))
    except:
        reps = 3

    params = (' -d ').join(args)
    db.add_param_column('param_variables', d.keys())
    db.insert_param_row(", ".join(d.keys()), ", ".join(d.values()), file_name)

    for i in range(reps):
        command = "slim -d {} /usr/src/uploads/slimFile.slim".format(params)
        process = subprocess.Popen([command], shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                                    universal_newlines=True)
        out, err = process.communicate()

        init_clause, body = output_manipulators.split_data_output(out)
        body = output_manipulators.clean_body(body)
        body = output_manipulators.append_replicate(body, i, 'rep')
        header = body[0].replace("\n", "").split(" ")
        data = body[1:]
        
        for arr in data:
            d = arr.replace("\n", "").split(" ")
            res = dict(zip(header, d))
            full.append(res)

    create_csv(full, output_dir, file_name)
    db.dump_csv()


def create_csv(full, output_dir, file_name):
    header = full[0].keys()
    filePath = output_dir+file_name
    
    with open(filePath, "w")  as f:
        dict_writer = csv.DictWriter(f, header)
        dict_writer.writeheader()
        dict_writer.writerows(full)
        f.close()

    db.save_output_file(filePath, file_name)


if __name__ == "__main__":
    files = db.db.execute("SELECT path FROM output_files;")
    
    if(len(files.fetchall()) <= 0):
        try:
            run_slim_process()
        except:
            print("No slim/jobs files uploaded.")
    else:
        db.dump_csv()