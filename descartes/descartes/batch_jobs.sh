#!/bin/bash
#SBATCH --account=def-yeaman
#SBATCH --mem=5G
#SBATCH --time=144:00:00
#SBATCH --mail-user=james.bain@ucalgary.ca
#SBATCH --mail-type=BEGIN
#SBATCH --mail-type=END
#SBATCH --array=1-32

{
  input="/usr/src/uploads/jobsFile.txt"
  while IFS= read -r line
  do
    echo "$line"
    python3 -u dispatcher.py $line
  done < "$input"
} || {
  echo "No data generated from descartes."
}

