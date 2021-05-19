#!/bin/bash
#SBATCH --mail-type=BEGIN
#SBATCH --mail-type=END
#SBATCH --array=1-32

CMD=$(sed -n "${SLURM_ARRAY_TASK_ID}p" m_jobs)
python3 dispatcher.py $CMD
