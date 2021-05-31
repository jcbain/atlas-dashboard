import re

def create_params(param_str, *opts):
    """
    Creates a list of explicit simulation parameter options for a single parameter.

    Parameters
    ----------
    param_str: str
       A string parameter option to be modified which will generally take on the for of "<param>=". For example, to
       specify the rate of migration (m) you would input "m=".
    opts: str
       Any number of parameter values that you wish to run for any given parameter. For example, if you wanted to run a
       simulation with migrations rates of 1e-5 and 1e-3 then you would pass `"1e-5", "1e-3"` as arguments after the
       `param_str` option.

    Returns
    -------
    list
        A list of strings explicitly specifying the parameter to be run within the slim script.

    Examples
    --------
    To specify a simulation that runs migration rates (m) set to 1-e5 and 1-e4 you would:
    >>> create_params("m=", "1e-5", "1e-3")
    ["m=1e-5", "m=1e-6"]
    """
    return [param_str + "{}".format(opt) for opt in opts]

def reformat_param(param):
    """
    Reformats the parameter option to a more friendly file string.

    Parameters
    ----------
    param: string
        Takes a string with param=value. For example `m=1e-6`.
    
    Returns
    -------
    reformated: string
        Reformated param with pamam_value. For example `m1e-6`.
    """
    reformated = re.sub("=", "", param)
    return reformated

def create_file_name(*params):
    """
    Takes a list of reformated params and concatenates them to a file
        name.
    
    Parameters
    ----------
    params: multiple (strings)
        Takes in multiple parameters, reformats them and then 
        concatenates them as a file name.
    """
    reformated_params = [reformat_param(param) for param in params]
    file_name = "_".join(reformated_params) + "_mutations.txt" 
    return file_name
