# Descartes
**A `python` dispatching wrapper around the [`SLiM`](https://messerlab.org/slim/) simulation program.**

This project provides a dispatching script to run a `slim` simulation file. The script is `dispatcher.py` which can serve as either the primary wrapper for which to run a simulation file or a skeleton for more complex simulations.

There is also a script to run a single permuation at a time with the different parameters. This script is called `dispatcher_single.py`.

## Usage
The most basic usage pattern is as follows:
```bash
python dispatcher.py --rep 1 [opts]
```
For the single set of params you can run:
```bash
python dispatcher_single.py
```

This is the simplest example and parameters are set to their default. If you are wanting to change the individual parameter values, it is as simple as calling the parameter name as an option followed by the value. For example:

```bash
python dispatcher_single.py --m 1e-3 --r 1e-7
```

## Files
- `all_permutations.py`: Takes in a list of all the values for each parameter and outputs all possible permutations. This script is helpful if you are running a bunch of individual parameter sets, which is often the case when trying to save on memory and time...
- `dispatcher_single.py`: Runs a single set of parameter values.
- `dispatcher.py`: Runs all permutations of values for parameters.
- `local_adaptation.slim`: The slim simulation file dispatched in the dispatching scripts.
