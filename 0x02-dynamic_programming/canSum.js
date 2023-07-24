/**
 * write a function `canSum(targetSum, numbers)` that takes in
 * a target sum (targetSum) and an array of ints (numbers) as
 * args.
 * 
 * task: function should return a boolean such that `true` means
 * that it is possible to generate `targetSum` using `numbers`.
 * 
 * constraints:
 *      (1) use an element of the array as many times as needed
 *      (2) assume that all elements in the array are non-negative
 */

/**
 * take canSum(7, [5, 3, 4, 7])
 * it should return `true` because the sum of 3 and 4 is 7, also,
 * 7 is a member of the array
 * 
 * take canSum(12, [5, 3, 4, 7])
 * it should return `true` because the sum of 5 and 7 is 12,
 * as is the sum of 3, 4 and 5
 * 
 * take canSum(1, [5, 3, 4, 7])
 * it should return `false` because none of the numbers in the array
 * add up to 1
 * 
 * take canSum(0, [5, 3, 4, 7])
 * it should return `true` because no sum  of non-negative numbers,
 * each number greater than zero, is zero. also, zero is neither positive
 * nor negative. we have a base/seed case
 */

/**
 * walkthrough using canSum(7, [5, 3, 4, 7])
 * add constraint: new targetSum cannot be negative
 * 
 * create an array, `table`, of length `targetSum` plus one; initialise
 * it with `false`
 * 
 * why `targetSum` plus one? glad you asked. two reasons: zero-based indexing &
 * accommodates the seed case
 * why `false`? `canSum` returns a boolean;  rational choice
 * 
 * `canSum(0, [...])` -> `true`, therefore, set `table[0]` to `true`
 * array viz:
 *      [`true`, `false`, `false`, `false`, `false`, `false`, `false`, `false`]
 * 
 * iterate through `table` and perform the following:
 *      1. check if table[i] === true
 *      2. table[i] !== true: continue
 *      3. table[i] === true: for j in `numbers` do
 *          a. add i and j
 *          b. check if i+j > targetSum
 *          c.  i+j > targetSum: continue
 *          d.  i+j <= targetSum: set table[i+j] to `true`
 *      4. return table[targetSum]
 * 
 * first pass. current position: table[0] = `true`,  numbers = [5, 3, 4, 7]
 *      1. table[0] = `true`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 0+5=5 <= 7; set table[5] to `true`
 *          b. 0+3=3 <= 7; set table[3] to `true`
 *          c. 0+4=4 <= 7; set table[4] to `true`
 *          d. 0+7=7 <= 7; set table[7] to `true`
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `false`, `false`, `true`]
 * 
 * second pass. current position: table[1] = `false`,  numbers = [5, 3, 4, 7]
 *      1. table[1] = `false`;  do not traverse `numbers`
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `false`, `false`, `true`]
 * 
 * third pass. current position: table[2] = `true`,  numbers = [5, 3, 4, 7]
 *      1. table[2] = `true`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 2+5=7 <= 7; set table[7] to `true`
 *          b. 2+3=5 <= 7; set table[5] to `true`
 *          c. 2+4=6 <= 7; set table[6] to `true`
 *          d. 2+7=9 <= 7; continue
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `true`, `true`, `true`]
 * 
 * fourth pass. current position: table[3] = `true`,  numbers = [5, 3, 4, 7]
 *      1. table[4] = `true`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 3+5=8 > 7; continue
 *          b. 3+3=6 <= 7; set table[6] to `true`
 *          c. 3+4=7 <= 7; set table[7] to `true`
 *          d. 3+7=10 > 7; continue
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `true`, `true`, `true`]
 * 
 * fifth pass. current position: table[4] = `true`,  numbers = [5, 3, 4, 7]
 *      1. table[4] = `true`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 4+5=9 > 7;  continue
 *          b. 4+3=7 <= 7; set table[7] to `true`
 *          c. 4+4=8 > 7;  continue
 *          d. 4+7=11 > 7; continue
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `true`, `true`, `true`]
 * 
 * sixth pass. current position: table[5] = `true`,  numbers = [5, 3, 4, 7]
 *      1. table[5] = `true`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 5+5=10 > 7; continue
 *          b. 5+3=8 > 7; continue
 *          c. 5+4=9 > 7; continue
 *          d. 5+7=12 > 7; continue
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `true`, `true`, `true`]
 * 
 * seventh pass. current position: table[6] = `true`,  numbers = [5, 3, 4, 7]
 *      1. table[0] = `true`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 6+5=11 > 7; continue
 *          b. 6+3=9 > 7; continue
 *          c. 6+4=10 > 7; continue
 *          d. 6+7=13 > 7; continue
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `true`, `true`, `true`]
 * 
 * eighth pass. current position: table[7] = `true`,  numbers = [5, 3, 4, 7]
 *      1. table[0] = `true`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 7+5=12 > 7; continue
 *          b. 7+3=10 > 7; continue
 *          c. 7+4=11 > 7; continue
 *          d. 7+7=14 > 7; continue
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `true`, `true`, `true`]
 * 
 * return:
 *      table[targetSum] = table[7] === true
 *      that is, it is possible to generate 7 by adding certain members of [5, 3, 4, 7]
 *      sanity check: 3+4=7, 4+3=7 and 7+nothing=7
 */

/**
 * notice we can return early; table[7] === true after ops in the first pass
 */

/**
 * complexity; complexity everywhere
 * 
 * canSum has linear (worst-case quadratic) time complexity and linear space complexity
 * 
 * let targetSum = m and numbers.length = n
 * 
 * size of `table` will always be m. worst-case scenario: iterate over m elements
 * while performing n operations on each. time complexity is O(mn)
 * 
 * size of table = m. no intermediate data/variables to store and/or update. also, 
 * intermediate ops (addition, comparison and setting) donot require significant space.
 * therefore, space complexity is O(m) 
 */

const canSum = (targetSum, numbers) => {
    const table = new Array(targetSum+1).fill(false)
    table[0] = true

    for(let i=0; i<=targetSum; i++){
        if(table[i]===true){
            for(let j of numbers){
                table[i+j] = true
            }
            // if(table[targetSum]===true) return table[targetSum] //early return
        }
    }

    return table[targetSum]
}

const arr = [
    {
        targetSum: 7,
        numbers: [2, 3],
    },
    {
        targetSum: 7,
        numbers: [5, 3, 4, 7],
    },
    {
        targetSum: 8,
        numbers: [2, 3, 5],
    },
    {
        targetSum: 7,
        numbers: [2, 4],
    },
    {
        targetSum: 300,
        numbers: [7, 14],
    },
    {
        targetSum: 100,
        numbers: [1],
    },
    {
        targetSum: 300,
        numbers: [7, 14],
    },
    {
        targetSum: 1000,
        numbers: [4, 11],
    },
    // {
    //     targetSum: 1234567890,
    //     numbers: [2, 9, 16, 23, 30],
    // },
]

arr.forEach(obj => {
    console.log(`input: (${obj.targetSum}, [${obj.numbers}]): return: ${canSum(obj.targetSum, obj.numbers)}`);
})