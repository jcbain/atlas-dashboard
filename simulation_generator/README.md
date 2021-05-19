# SLiM/Python3/Slurm container 

An evolutionary simulation framework by [Messer Lab](https://messerlab.org/)

# Installation
1. clone repo
2. navigate to clone directory
3. create docker image
```sh
$ docker build -t <image-name> .
```
4. set container hostname and run the container
```sh
$ docker run --hostname slurm_host -it --rm <image-name>
```
5. start services (munge, slurmctld, slurmd)
```sh
$ ./start.sh
```
6. run batch script
```sh
$ sbatch batch_jobs.sh
```