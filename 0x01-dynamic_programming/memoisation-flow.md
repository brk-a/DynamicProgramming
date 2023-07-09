# Guide on how to memoise

## ft. F Njakai (aka uncle Frankie)

* from `fib-memoisation` and `gridTraveller`, there emerges a pattern:
    * make it work (have a slow, clunky etc solution)
    * make it efficient (optimise said solution)
    _first, it works; make-up baadaye_

#### make it work
* visualise the problem as a tree, if possible (apply [Cartesian logic][def])
    * nodes are problems, edges mean shrinking the problem
* implement the tree using recursion
    * leaves are base case(s), root is the problem to solve
* test it
    * should give correct answers/solutions; it's alright if, for large(r) input,
    it is slow (time complexity increases exponentially with size of inputs)

#### make it efficient
* add a memo object
    * keys are args to the function, values are the return values of the function call given said args
    * share said memo object to all recursive calls in the tree (default empty object
    at the top-level function call)
* check whether an arg has already been computed before calling the actual function
    * add a base case to return memo values if they exist in the memo object
    * store return values in the memo



[def]: https://en.wikipedia.org/wiki/Cartesian_doubt#Technique