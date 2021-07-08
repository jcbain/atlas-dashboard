from __future__ import print_function
import subprocess
import os
import random
import sys
import csv

from time import gmtime, strftime
from helpers import output_manipulators, file_cleaners

def run_slim_process():
    cwd = os.getcwd() + '/uploads/'
    output_dir = cwd + 'run' + strftime("%Y%m%d_%H%M%S", gmtime()) + '_' + str(random.randint(1, 1000)) + '/'
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

    for i in range(reps):
        command = "slim -d {} {}slimFile.slim".format(params, cwd)
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

    create_csv(full, output_dir+file_name)


def create_csv(full, filePath):
    header = full[0].keys()
    
    with open(filePath, "w")  as f:
        dict_writer = csv.DictWriter(f, header)
        dict_writer.writeheader()
        dict_writer.writerows(full)
        f.close()


if __name__ == "__main__":
    try:
        run_slim_process()
    except:
        print("No slim/jobs files uploaded.")