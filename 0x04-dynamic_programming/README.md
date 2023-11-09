# 0x04-dynamic_programming

### discuss and solve the 0/1 knapsack problem

### the problem
* there are N items; each has a mass (weight, if you like) and value
* get as much \[value\] as you can into a container in as short a period of time as you can
* constraint: you can only carry as much as the container(knapsack) can hold (that is, the knapsack has limited mass/load capacity, say, X kg)

* example: say there are four items viz:

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

### tools
* C#

