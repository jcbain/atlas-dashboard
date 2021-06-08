from __future__ import print_function
import subprocess
import argparse
import os
import random

import app
from time import gmtime, strftime
from helpers import output_manipulators, file_cleaners
import csv

def run_slim_process():
    cwd = os.getcwd() + '/'
    output_dir = cwd + 'uploads/run' + strftime("%Y%m%d_%H%M%S", gmtime()) + '_' + str(random.randint(1, 1000)) + '/'
    os.mkdir(output_dir)

    parser = argparse.ArgumentParser()

    parser.add_argument('--rep', action='store', type=int, default=3)
    parser.add_argument('--m', action='store', type=str, default="1e-5")
    parser.add_argument('--mu', action='store', type=str, default="1e-6")
    parser.add_argument('--numpos', action='store', type=str, default="160")
    parser.add_argument('--r', action='store', type=str, default="0.00625")
    parser.add_argument('--sigsqr', action='store', type=str, default="5")
    parser.add_argument('--n', action='store', type=str, default="1000")
    parser.add_argument('--alpha', action='store', type=str, default="0.1")
    parser.add_argument('--outputEvery', action='store', type=str, default="10")

    results = parser.parse_args()

    m = file_cleaners.create_params("m=", results.m)[0]
    mu = file_cleaners.create_params("mu=", results.mu)[0]
    num_pos = file_cleaners.create_params("numpos=", results.numpos)[0]
    r = file_cleaners.create_params("r=", results.r)[0]
    sigsqr = file_cleaners.create_params("sigsqr=", results.sigsqr)[0]
    n = file_cleaners.create_params("N=", results.n)[0]
    alpha = file_cleaners.create_params("alpha=", results.alpha)[0]
    output_every = file_cleaners.create_params("outputEvery=", results.outputEvery)[0]
    reps = results.rep

    file_name = file_cleaners.create_file_name(m, mu, num_pos, n, r, alpha, sigsqr)

    # Full is an array of dictionaries (header: body)
    full = []
    
    try:
        for i in range(reps):
            command = "slim -d {} -d {} -d {} -d {} -d {} -d {} -d {} -d {} /usr/src/uploads/slimFile.slim".format(m, mu, num_pos, r, sigsqr, n, alpha, output_every)
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

    except:
        print("Waiting for file upload.")

    create_csv(full, output_dir + file_name)

def create_csv(full, filePath):
    header = full[0].keys()

    with open(filePath, "w")  as f:
        dict_writer = csv.DictWriter(f, header)
        dict_writer.writeheader()
        dict_writer.writerows(full)
        f.close()

    app.save_output_file(filePath)

if __name__ == "__main__":
    run_slim_process()