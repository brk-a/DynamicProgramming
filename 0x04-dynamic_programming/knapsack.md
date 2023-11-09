# 0/1 knapsack problem

### the problem
* say there are four items viz:

    |Item no.|mass (kg)|value (KES)|
    |:---|:---:|:---:|
    |1|8|7,500.00|
    |2|2|22,250.00|
    |3|6|31,500.00|
    |4|1|4,500.00|

    * say that the container (the knapsack) has a capacity of 12 kg
    *  what would you carry?
* idea is to write a programme that *decides* what to carry based on the constraints:
    * mass = {8, 2, 6, 1}
    * value = {7500, 22500, 31500, 4500}
    * load capacity of container = 12
* return 1 when the item is included, else, 0

### complexity
* total number of total solutions, for N items, is 2^N
    * time complexity is exponential -> O(2*N)
    * idea is to get to linear time -> O(N*M) where m is the load capacity of the container

### approach
* choose the items whose sum of values gives the greatest amount of value but whose sum of masses do not exceed the load capacity
    * therefore, this is an optimisation problem
* bottom-up approach to dynamic programming
    * bottom-up avoid recursion
    * method to use: memoisation

### memoisation
*  have a 2D array: x represents #items (zero to N) and y represents load capacity (zero to M) in increments of 1

    |0|1|2|3|4|5|6|7|8|9|10|11|12|
    |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
    |1|||||||||||||
    |2|||||||||||||
    |3|||||||||||||
    |4|||||||||||||

* each blank cell represents the optimal value of the items count specified by the row that can be carried at the load capacity specified by the column 
    * example: cell (3, 4) represents the optimal value of 3 items carried in a container of load cap 4
* the value of interest is in the bottom-right cell; it represents the optimal value of N items that  can be carried in a container of load cap M


    |0|1|2|3|4|5|6|7|8|9|...|M-1|M|
    |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
    |1|||||||||||||
    |...|||||||||||||
    |N-1|||||||||||||
    |N||||||||||||(N, M)|

* 