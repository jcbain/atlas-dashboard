#!/bin/bash
#SBATCH --account=def-yeaman
#SBATCH --mem=5G
#SBATCH --time=144:00:00
#SBATCH --mail-user=james.bain@ucalgary.ca
#SBATCH --mail-type=BEGIN
#SBATCH --mail-type=END
#SBATCH --array=1-32

CMD=$(sed -n "${SLURM_ARRAY_TASK_ID}p" m_jobs)
python3 dispatcher.py $CMD