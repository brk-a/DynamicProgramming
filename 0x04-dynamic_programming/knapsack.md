# 0/1 knapsack problem

### the problem
* say there are four items viz:

    |Item no.|mass (kg)|value (KES)|
    |:---|:---:|:---:|
    |1|8|7,500.00|
    |2|2|22,250.00|
    |3|6|31,500.00|
    |4|1|4,500.00|

    * say that the container (the knapsack) has a capacity of, say, 10 kg
    *  what would you carry?
* idea is to write a programme that *decides* what to carry based on the constraints:
    * mass = {8, 2, 6, 1}
    * value = {7500, 22500, 31500, 4500}
    * load capacity of container = 10
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

    |0|1|2|3|4|5|6|7|8|9|10|
    |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
    |1|||||||||||
    |2|||||||||||
    |3|||||||||||
    |4|||||||||||

* each blank cell represents the optimal value of the items count specified by the row that can be carried at the load capacity specified by the column 
    * example: cell (3, 4) represents the optimal value of 3 items carried in a container of load cap 4
* the value of interest is in the bottom-right cell; it represents the optimal value of N items that  can be carried in a container of load cap M


    |0|1|2|3|4|5|6|7|...|M-1|M|
    |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
    |1|||||||||||
    |...|||||||||||
    |N-1|||||||||||
    |N||||||||||(N, M)|

### how it works
* see code at [0-knapsack.cs][def]
* #items, N, = 4, load capacity, M, = 10 and is named `loadCap`, the 2D array is named `memo`, rows are indexed by `i` and cols are indexed by `j`
* masses and values of objects to consider are in respective arrays named `masses` and `values`
* the cells of the first row, (0, j), in `memo` will be set to zero because at the points of execution of the algo, pertinent to these cells, `i` is zero
    * code in the `if` block executes
* cell (1, 0): the considered capacity is zero, therefore, the cell is set to zero
    * you cannot store anything in nothing
* cell (1, 1): the considered capacity is 1. item 1's mass is 8. 1 < 8; the `if` and `else-if` return false, therefore, set cell (1, 1) to `memo[1, 1-1]` = `memo[1, 0]` = zero
* cell (1, 8): considered capacity is 8. item 1's mass is 8. 8 = 8; the `else-if` returns true, therefore, find the max of `values[1]+memo[1-1, 8-masses[1]]` and `memo[1-1, 8]`
    * values[1]+memo[1-1, 8-masses[1]] = 7500+memo[0, 8-8] = 7500+memo[0, 0] = 7500+zero = 7500
    * memo[1-1, 8] = memo[0, 8] = zero
    * max(7500, 0) = 7500
    * store the value 7500 at cell (1, 8)
* cell (1, 9): considered capacity is 9. item 1's mass is 8. 9 > 8; the `if` and `else-if` return false, therefore, set cell (1, 9) to `memo[1, 9-1]` = `memo[1, 8]` = 7500
* cell (2, 0): considered capacity is zero. item 2's mass is 2, therefore, the cell is set to zero
    * you cannot store anything in nothing
* cell (2, 1). considered capacity is 1. item 2's mass is 2. 1 < 2; the `if` and `else-if` return false, therefore, set cell (2, 1) to `memo[2, 1-1]` = `memo[2, 0]` = zero
* cell (2, 2): considered capacity is 2. item 2's mass is 2. 2 = 2; the `else-if` returns true, therefore, find the max of `values[2]+memo[2-1, 2-masses[2]]` and `memo[2-1, 2]`
    * values[2]+memo[2-1, 2-masses[2]] = 22500+memo[1, 2-2] = 22500+memo[1, 0] = 22500+zero = 22500
    * memo[2-1, 2] = memo[1, 2] = zero
    * max(22500, 0) = 22500
    * store the value 22500 at cell (2, 2)
* cell (2, 8). considered capacity is 8. item 2 plus item 3's mass = 8. 8 = 8; the `else-if` returns true, therefore, find the max of `values[2]+memo[2-1, 8-masses[2]]` and `memo[2-1, 8]`
    * values[2]+memo[2-1, 8-masses[2]] = 22500+memo[1, 8-2] = 22500+memo[1, 6] = 22500+zero = 22500
    * memo[2-1, 8] = memo[1, 8] = 7500
    * max(22500, 7500) = 22500
    * store the value 22500 at cell (2, 8)
* cell (2, 10). considered capacity is 10. item 1 plus item 2's mass = 10. 10 = 10; the `else-if` returns true, therefore, find the max of `values[2]+memo[2-1, 10-masses[2]]` and `memo[2-1, 10]`
    * values[2]+memo[2-1, 10-masses[2]] = 22500+memo[1, 10-2] = 22500+memo[1, 8] = 22500+7500 = 30000
    * memo[2-1, 10] = memo[1, 10] = 7500
    * max(30000, 7500) = 30000
    * store the value 30000 at cell (2, 10)
* cell (3, 0): the considered capacity is zero, therefore, the cell is set to zero
    * you cannot store anything in nothing
* cell (3, 1): the considered capacity is 1. item 3's mass is 6. 1 < 6; the `if` and `else-if` return false, therefore, set cell (3, 1) to `memo[3, 1-1]` = `memo[3, 0]` = zero
* cell (3, 6): considered capacity is 6. item 3's mass is 6. 6 = 6; the `else-if` returns true, therefore, find the max of `values[3]+memo[3-1, 6-masses[3]]` and `memo[3-1, 6]`
    * values[3]+memo[3-1, 6-masses[3]] = 31500+memo[2, 6-6] = 31500+memo[2, 0] = 31500+zero = 31500
    * memo[3-1, 6] = memo[2, 6] = 22500
    * max(31500, 22500) = 31500
    * store the value 31500 at cell (3, 6)
* cell (3, 8). considered capacity is 8. item 2 plus item 3's mass = 8. 8 = 8; the `else-if` returns true, therefore, find the max of `values[3]+memo[3-1, 8-masses[3]]` and `memo[3-1, 8]`
    * values[3]+memo[3-1, 8-masses[3]] = 31500+memo[2, 8-6] = 31500+memo[2, 2] = 31500+22500 = 54000
    * memo[3-1, 8] = memo[2, 8] = 22500
    * max(54000, 22500) = 54000
    * store the value 22500 at cell (3, 8)
* cell (3, 10). considered capacity is 10. item 1 plus item 2's mass = 10. 10 = 10. item 2 plus item 3's mass = 8. 8 <= 10; the `else-if` returns true, therefore, find the max of `values[3]+memo[3-1, 10-masses[3]]` and `memo[3-1, 10]`
    * values[3]+memo[3-1, 10-masses[3]] = 31500+memo[2, 10-2] = 31500+memo[2, 8] = 31500+22500 = 54000
    * memo[3-1, 10] = memo[2, 10] = 30000
    * max(54000, 30000) = 54000
    * store the value 54000 at cell (3, 10)
* cell (3, 0): the considered capacity is zero, therefore, the cell is set to zero
    * you cannot store anything in nothing
* cell (4, 1): considered capacity is 1. item 4's mass is 1. 1 = 1; the `else-if` returns true, therefore, find the max of `values[4]+memo[4-1, 1-masses[4]]` and `memo[4-1, 1]`
    * values[4]+memo[4-1, 1-masses[4]] = 4500+memo[3, 1-1] = 4500+memo[3, 0] = 4500+zero = 4500
    * memo[4-1, 1] = memo[3, 1] = zero
    * max(4500, 0) = 4500
    * store the value 4500 at cell (4, 1)
* cell (4, 2): considered capacity is 2. item 2's mass is 2. 2 = 2; the `else-if` returns true, therefore, find the max of `values[4]+memo[4-1, 2-masses[4]]` and `memo[4-1, 2]`
    * values[4]+memo[4-1, 2-masses[4]] = 4500+memo[3, 2-1] = 4500+memo[3, 1] = 4500+zero = 4500
    * memo[4-1, 2] = memo[3, 2] = 22500
    * max(4500, 22500) = 22500
    * store the value 22500 at cell (4, 2)
* cell (4, 3): max of item 2 plus item 4 and item 2
    * store 27000 in cell (4, 3)
* cell (4, 6): max of item 2 plus item 4 and item 3
    * store 31500 in cell (4, 6)
* cell (4, 7): max of item 3 plus item 4 and item 3
    * store 36000 in cell (4, 7)
* cell (4, 8): max of item 2 plus item 3, item 3 plus item 4 and item 1
    * store 54000 in cell (4, 8)
* cell (4, 9): max of item 1 plus item 4 and item 2 plus item 3 plus item 4
    * store 58500 in cell (4, 9)
* cell (4, 10): max of item 1 plus item 2 and item 2 plus item 3 plus item 4
    * store 58500 in cell (4, 10)

* the complete 2D array viz:

    |0|1|2|3|4|5|6|7|8|9|10|
    |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
    |1|0|0|0|0|0|0|0|7500|7500|7500|
    |2|0|0|22500|22500|22500|22500|22500|22500|22500|30000|
    |3|0|0|22500|22500|22500|31500|31500|54000|54000|54000|
    |4|0|22500|27000|27000|27000|31500|36000|54000|58500|58500|

* return 58,500.00; this is the value of item 2, 3 and 4
    * given four items with masses {8, 2, 6, 1}, values {7500, 22500, 31500, 4500} and a container with a load capacity of 10kg, carry items 2, 3 and 4 because they maximise the load cap and value 

### conslusion
* using the bottom-up approach to dynamic programming, the time complexity is linear, O(N*M), where N is the number of items and M is the load cap of the container; recursion (top-down approach) would have yielded O(2^N) or exponential time complexity

[def]: ./knapsack.cs