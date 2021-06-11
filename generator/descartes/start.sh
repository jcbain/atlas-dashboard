# start services for slurm
# run descartes to generate output files when user uploads slim files
while !([ -f /usr/src/uploads/slimFile.slim ] && [ -f /usr/src/uploads/jobsFile.txt ] || [ -f /usr/src/uploads/dataFile.csv ])
    do
        sleep 1
    done

sudo /etc/init.d/munge start
sudo service slurmctld start
sudo service slurmd start
#give permissions
sudo chmod 777 ./batch_jobs.sh
srun ./batch_jobs.sh