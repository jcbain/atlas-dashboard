#!/bin/bash
sudo /etc/init.d/munge start
sudo service slurmctld start
sudo service slurmd start

sudo chmod 777 ./batch_jobs.sh
srun ./batch_jobs.sh 2>/dev/null