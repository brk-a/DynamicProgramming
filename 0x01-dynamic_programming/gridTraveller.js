/**
 * Say you are a traveller on a 2D grid. You begin at the 
 * top left corner. Your goal is to travel to the bottom right corner
 * as efficiently as possible. The constraints are these: you may only
 * move right or down
 * 
 * Q: In how many ways can you achieve the goal on an m by n grid?
 */

/**
 * Take a 2 * 3 grid.
 * There are 3 ways to achieve the goal:
 *  1. right-right-down
 *  2. right-down-right
 *  3. down-right-right
 * 
 * Take a 1 * 1 grid.
 * There is only 1 way to achieve the goal:
 *  1. the start is the end, therefore, all one has to 
 *      do is be at the start
 * 
 * Take a 1 * n grid. (n>1)
 * There is only 1 way to achieve the goal:
 *  1. take (n - 1) steps to the right
 * 
 * Take a m * 1 grid. (m>1)
 * There is only 1 way to achieve the goal:
 *  1. take (m - 1) steps down
 * 
 * Take a 0 * n grid. (n>0)
 * There is no way to achieve the goal because a grid, by definition,
 * must have at least 1 row
 * 
 * Take a m * 0 grid. (m>0)
 * There is no way to achieve the goal because a grid, by definition,
 * must have at least 1 column
 * 
 * Take a 0 * 0 grid.
 * There is no way to achieve the goal because a grid, by definition,
 * must have at least 1 row and at least 1 column
 * 
 * These are the base cases:
 *      1. return 1 if m = n = 1
 *      2. return 0 if m = 0 or n = 0
 */

/**
 * Consider the 2 * 3 grid again. 
 * You are at the start; pick a direction arbitrarily (say, right).
 * What do you notice? You are now at the top left of a 2 * 2 grid
 * Pick a direction arbitrarily, again (say, down)
 * What do you notice? You are now at the top left of a 1 * 2 grid
 * Also, notice that you have hit a base case (1 * 2 grid)
 * There is only one way: 1 step right
 * You have taken the path `right-down-right`
 * 
 * grid(2, 3) became grid(2, 2) became grid(1, 2) became grid(1, 1)  => job done
 * 
 * the path `right-right-down` looks viz:
 *  grid(2, 3) -> grid(2, 2) -> grid(2, 1) -> grid(1, 1) => job done
 * 
 * the path `down-right-right` looks viz:
 *  grid(2, 3) -> grid(1, 3) -> grid(1, 2) -> grid(1, 1) => job done
 * 
 * looks like recoursion, innit?
 */

const gridTraveller = (m, n) => {
    if(m===1 && n===1) return 1
    if(m===0 || n===0) return 0

    return gridTraveller(m-1, n) + gridTraveller(m, n-1)
}

const arr = [
    {
        m: 1,
        n: 1,
    },
    {
        m: 2,
        n: 3,
    },
    {
        m: 3,
        n: 2,
    },
    {
        m: 5,
        n: 5,
    },
    {
        m: 18,
        n: 18,
    },
]

arr.forEach(obj => {
    console.log(`${obj.m} by ${obj.n} grid: ${gridTraveller(obj.m, obj.n)} ways`);
})

/**
 * gridTraveller has O(2^(n+m)) time complexity
 * why? Eaa...sy! You move either to the right or down, that is,
 * subtract one from either n (down) or m (right) but not both
 * simultaneously (diagonal) -> left branch is down, right branch is right.
 * For one path, to get to the goal (grid(1, 1)), therefore, you make
 * (n+m) function calls
 * 
 * gridTraveller has O(n+m) space complexity
 * why? You make (n+m) function calls, meaning that the max depth of the recursion
 * tree is (n+m-1). Throw away the constant when doing big O, therefore, space complexity
 * is O(n+m)
 */