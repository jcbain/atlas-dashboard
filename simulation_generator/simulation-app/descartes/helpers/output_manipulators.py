def split_data_output(string_output):
    """
    Splits the output from the slim script into the initialization statement and
        body of the data.

    Parameters
    ----------
    string_output: string
        Slim script output.

    Returns
    -------
    data: list
        A list where the first item is a string of the initialization clause of the
        slim output and the second item is the body of the data.
    """
    data = string_output.split("// Starting run at generation <start>:\n1 \n\n")
    return data

def clean_body(body):
    """
    Cleans up the data portion of the slim output for easy manipulation.

    Parameters
    ----------
    body: string
        The body portion returned from `slit_data_output`.
    
    Returns
    -------
    body: list
        A clean list of all of the rows of data.
    """
    quotes_remove = body.replace('"', '')
    body_list = quotes_remove.split('\n')
    body = list(filter(lambda x: x != '', body_list))

    return body


def append_replicate(body, rep_num, rep_name = "rep"):
    """
    Appends appropriate replicate number to the replicate run.

    Parameters
    ----------
    body: list
        The body of the data.

    rep_num: int
        The current replicate run number.

    rep_name: string
        Column name for replicate to be appended to the header row.

    Returns
    -------
    data: list
        A list with the replicate appended to each row.
    """
    header = "{}{}".format(body[0], rep_name)
    data = ["{} {}".format(i, rep_num) for i in body[1:]]
    data.insert(0, header)
    return data