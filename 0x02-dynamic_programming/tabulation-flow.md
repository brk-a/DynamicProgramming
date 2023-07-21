# Guide on how to tabulate

## ft. F Njakai (aka uncle Frankie)

* from `fibonacci` and `gridTraveller`, there emerges a pattern:
    * visualise the problem as a table; if possible, apply [Cartesian logic](def)
        * what are the dimensions of said table? 1-D? 2D? n-D (n>2)?
        * what is the size of said tale? _m_ rows by _n_ cols
        * what is the data type of the elements of the table?
    * initialise the table with default values
        * e.g. zeroes; zeroes everywhere
    * seed the trivial answer(s)/base case(s)/initial values in the table
    * traverse the table while performing an operation on each element
        * this is done iteratively
        * fill further positions on the table based on the current one
    * return element _(m, n)_ of the _m_ by _n_ table

[def]: https://en.wikipedia.org/wiki/Cartesian_doubt#Technique