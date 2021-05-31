# start services for slurm
sudo /etc/init.d/munge start \
sudo service slurmctld start \
sudo service slurmd start \
# sbatch batch_jobs.sh \
# run batch scripts
python3 -u dispatcher.py