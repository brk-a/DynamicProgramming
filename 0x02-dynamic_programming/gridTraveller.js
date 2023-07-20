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
 *      1. gridTraveller(m, n) is 1 if m = n = 1
 *      2. gridTraveller(m, n) is 0 if m = 0 or n = 0
 */

/**
 * tablulation using a 3 by 3 grid as an example. should return 6
 * (there are 6 ways to traverse a 3 by 3 grid under the constraints)
 * 
 * the table is a 2D array of dims 4 by 4 initialised with zeroes viz:
 * [
 *      [0, 0, 0, 0],
 *      [0, 0, 0, 0],
 *      [0, 0, 0, 0],
 *      [0, 0, 0, 0],
 * ]
 * m = n = 4 because zero-based indexing; the bottom right element is at
 * position (3, 3). this is convenient for us
 * 
 * recall: base case (1, 1) is 1. that is, gridTraveller(1, 1) is 1.
 * set arr[1, 1] to 1 viz:
 * [
 *      [0, 0, 0, 0],
 *      [0, 1, 0, 0],
 *      [0, 0, 0, 0],
 *      [0, 0, 0, 0],
 * ]
 * 
 * recall: base case (0, n) or (m, 0) is 0. that is, gridTraveller(m, n)
 * where m = 0 or n = 0 is 0, therefore:
 *      1. gridTraveller(0, 0) is the beginning/initial position
 *      2. gridTraveller(0, n) tells the traveller to move down
 *      3. gridTraveller(m, 0) tells the traveller to move right
 * 
 * add the element at the (i, j) i<m and j<n position to the elements at the (i+1, j)
 * and (i, j+1) positions, that is, the element on its right and the one below it.
 * repeat process for all elements until (i, j) = (m, n). make sure you account for
 * out-of-bounds indices
 * 
 * the final grid viz:
 * 
 * [
 *      [0, 0, 0, 0],
 *      [0, 1, 1, 1],
 *      [0, 1, 2, 3],
 *      [0, 1, 3, 6],
 * ]
 * 
 * return the element at position (m, n), 6 in this case
 */

/**
 * linear (best-case) and quadratic(worst-case) time complexity.
 * quadratic because a square grid means that m = n.
 * there are m rows and n columns to traverse while performing addition ops on,
 * therefore, time complexity is O(mn)
 * 
 * linear (best-case) and quadratic(worst-case) space complexity.
 * quadratic because a square grid means that m = n.
 * there are m rows and n columns in a grid. the grid is all we need; no
 * intermediate arrays and/or memos to operate on, therefore, space
 * complexity is O(mn)
 */

const gridTraveller = (m, n) => {
    const table = new Array(m+1)
        .fill()
        .map(() => Array(n+1).fill(0))
    table[1][1] = 1

    for(let i=0; i<=m; i++){
        for(let j=0; j<=n; j++){
            const current = table[i][j]
            if(i+1<=m) table[i+1][j] += current
            if(j+1<=n) table[i][j+1] += current
        }
    }

    return table[m][n]
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
        m: 15,
        n: 5,
    },
    {
        m: 8,
        n: 18,
    },
    {
        m: 100,
        n: 100,
    },
]

arr.forEach(obj => {
    console.log(`${obj.m} by ${obj.n} grid: ${gridTraveller(obj.m, obj.n)} ways`);
})