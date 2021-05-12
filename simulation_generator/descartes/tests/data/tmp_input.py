tmp_string = """
// Initial random seed:
1636161544096

// RunInitializeCallbacks():
initializeMutationRate(1e-05);
initializeMutationType(1, 0.5, "n", 0, 0.05);
initializeGenomicElementType(1, m1, 1);
initializeGenomicElement(g1, 20001, 20002);
initializeGenomicElement(g1, 27501, 27502);
(...initializeGenomicElement() calls omitted...)
initializeRecombinationRate(1e-06);

// Starting run at generation <start>:
1

"m39 position select_coef p1_freq p2_freq origin_gen migr_rate mut_rate recomb_rate fitness_width output_gen
m39 170001 0.0327583 0 0.0005 3997 1e-10 1e-05 1e-06 2 4000
m39 170002 0.0874342 0 0.0665 3881 1e-10 1e-05 1e-06 2 4000
m39 207501 -0.0398141 0.002 0 3987 1e-10 1e-05 1e-06 2 4000
"
"p33 pop phen migr_rate mut_rate recomb_rate fitness_width output_gen
p33 0 0.990399 3913 1e-10 1e-05 1e-06 2 4000
p33 0 1.03297 3913 1e-10 1e-05 1e-06 2 4000
p33 0 1.07076 3913 1e-10 1e-05 1e-06 2 4000
p33 1 -1.11325 3913 1e-10 1e-05 1e-06 2 4000
p33 1 -0.922318 3913 1e-10 1e-05 1e-06 2 4000
p33 1 -1.09379 3913 1e-10 1e-05 1e-06 2 4000
"
"m39 position select_coef p1_freq p2_freq origin_gen migr_rate mut_rate recomb_rate fitness_width output_gen
m39 20002 -0.0493517 0.0055 0 4953 1e-10 1e-05 1e-06 2 5000
m39 132502 0.0409857 0 0.0035 4985 1e-10 1e-05 1e-06 2 5000
m39 192501 -0.0646652 0.0155 0 4783 1e-10 1e-05 1e-06 2 5000
"
"p33 pop phen migr_rate mut_rate recomb_rate fitness_width output_gen
p33 0 0.998324 5000 1e-10 1e-05 1e-06 2 5000
p33 0 0.977073 5000 1e-10 1e-05 1e-06 2 5000
p33 1 -1.0629 5000 1e-10 1e-05 1e-06 2 5000
p33 1 -0.977372 5000 1e-10 1e-05 1e-06 2 5000
p33 1 -1.02028 5000 1e-10 1e-05 1e-06 2 5000
"
"""