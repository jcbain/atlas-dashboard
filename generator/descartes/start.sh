# start services for slurm
sudo /etc/init.d/munge start \
sudo service slurmctld start \
sudo service slurmd start \
# run descartes to generate output files when user uploads slim files
while [ ! -f /usr/src/uploads/slimFile.slim ]; do sleep 1; done
python3 -u dispatcher.py