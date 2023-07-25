/**
 * write a function `howSum(targetSum, numbers)` that takes an int, targetSum, and
 * an array, numbers. said function should return an array whose elements are any
 * combination of `numbers` that can be used to  genrate `targetSum`, else, `null`
 * 
 * feel free to reuse the elements of `numbers` as much as you want
 * 
 * constraints
 *      1. i >= 0 for i in numbers
 *      2. return any combination of `numbers` in case there are multiple cominations
 */

/**
 * take howSum(7, [5, 3, 4, 7]).
 * it should return [3, 4], [4, 3] or [7] because the sum of 3 and 4 is 7, also,
 * 7 is a member of the array
 * 
 * take howSum(8, [5, 3, 2]).
 * it should return [5, 3], [3, 5] or [2, 2, 2, 2] because the sum of 5 and 3 is 8,
 * as is the sum of 2, 2, 2 and 2
 * 
 * take howSum(1, [5, 3, 4, 7]).
 * it should return `null` because none of the numbers in the array
 * add up to 1
 * 
 * take howSum(0, [1, 2, 3]).
 * it should return [] because no positive numbers add up to zero. also,
 * zero is neither positive nor negative. we have a base/seed case
 */

/**
 * walkthrough using howSum(7, [5, 3, 4, 7]) -> [3, 4], [4, 3] or [7]
 * 
 * intialise an array, table, of size `targetSum` plus one filled with `null` because
 * zero-based indexing and `null` is a rational choice of initial value (because of the
 * return value)
 *      [null, null, null, null, null, null, null, null, null]
 * 
 * recall canSum(0, [...]) -> []; this is the seed value of the table
 * table viz:
 *      [[], null, null, null, null, null, null, null, null]
 * 
 * for i in  `table` do:
 *      1. check if table[i] === null
 *      2. table[i] === null: continue
 *      3. table[i] !== null: for j in `numbers` do:
 *          a. check if (i+j) <= targetSum
 *          b. i+j > targetSum: continue
 *          c. i+j <= targetSum: set table[i+j] to table[i]
 *          d. include j in table, that is, table = [...table, j]
 *      4. return table[targetSum]
 * 
 * first pass. current position: table[0] = [],  numbers = [5, 3, 4, 7]
 *      1. table[0] != `null`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 0+5=5 <= 7; set table[5] to [...table, 5] -> [5] 
 *          b. 0+3=3 <= 7; set table[3] to [...table, 3] -> [3]
 *          c. 0+4=4 <= 7; set table[4] to [...table, 4] -> [4]
 *          d. 0+7=7 <= 7; set table[7] to [...table, 7] -> [7]
 *      table viz:
 *          [[], `null`, `null`, [3], [4], [5], `null`, [7]]
 * 
 * second pass. current position: table[1] = `null`,  numbers = [5, 3, 4, 7]
 *      1. table[1] = `null`;  do not traverse `numbers`
 *      table viz:
 *          [[], `null`, `null`, [3], [4], [5], `null`, [7]]
 * 
 * third pass. current position: table[2] = `null`,  numbers = [5, 3, 4, 7]
 *      1. table[2] = `null`;  do not traverse `numbers`
 *      table viz:
 *          [[], `null`, `null`, [3], [4], [5], `null`, [7]]
 * 
 * fourth pass. current position: table[3] = [3],  numbers = [5, 3, 4, 7]
 *      1. table[4] != `null`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 3+5=8 > 7; continue
 *          b. 3+3=6 <= 7; set table[6] to [...table, 3] -> [3, 3]
 *          c. 3+4=7 <= 7; set table[7] to [...table, 4] -> [3, 4]
 *          d. 3+7=10 > 7; continue
 *      table viz:
 *          [[], `null`, `null`, [3], [4], [5], [3, 3], [3, 4]]
 * 
 * fifth pass. current position: table[4] = [4],  numbers = [5, 3, 4, 7]
 *      1. table[4] != null; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 4+5=9 > 7;  continue
 *          b. 4+3=7 <= 7; set table[7] to [...table, 3] -> [4, 3]
 *          c. 4+4=8 > 7;  continue
 *          d. 4+7=11 > 7; continue
 *      table viz:
 *          [[], `null`, `null`, [3], [4], [5], [3, 3], [4, 3]]
 * 
 * sixth pass. current position: table[5] = [5],  numbers = [5, 3, 4, 7]
 *      1. table[5] != `null`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 5+5=10 > 7; continue
 *          b. 5+3=8 > 7; continue
 *          c. 5+4=9 > 7; continue
 *          d. 5+7=12 > 7; continue
 *      table viz:
 *          [[], `null`, `null`, [3], [4], [5], [3, 3], [4, 3]]
 * 
 * seventh pass. current position: table[6] = [3, 3],  numbers = [5, 3, 4, 7]
 *      1. table[6] != `null`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 6+5=11 > 7; continue
 *          b. 6+3=9 > 7; continue
 *          c. 6+4=10 > 7; continue
 *          d. 6+7=13 > 7; continue
 *      table viz:
 *          [[], `null`, `null`, [3], [4], [5], [3, 3], [4, 3]]
 * 
 * eighth pass. current position: table[7] = [4, 3],  numbers = [5, 3, 4, 7]
 *      1. table[7] != `null`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 7+5=12 > 7; continue
 *          b. 7+3=10 > 7; continue
 *          c. 7+4=11 > 7; continue
 *          d. 7+7=14 > 7; continue
 *      table viz:
 *          [[], `null`, `null`, [3], [4], [5], [3, 3], [4, 3]]
 * 
 * return:
 *      table[targetSum] = table[7] === [4, 3]
 *      that is, it is possible to generate 7 by adding 4 and 3
 *      which are members of [5, 3, 4, 7]
 *      sanity check: 3+4=7, 4+3=7 and 7+nothing=7
 * 
 * notice we can return early
 *      1. first pass: table[targetSum] = [7] meaning 7+nothing=7 (elegant solution)
 *      2. fourth pass: table[targetSum] = [3, 4] meaning 3+4=7
 */

/**
 * complexity; complexity everywhere
 * 
 * howSum has quadratic time complexity space complexity
 * 
 * let targetSum = m and numbers.length = n
 * 
 * size of `table` will always be m. worst-case scenario: iterate over m elements
 * while performing n spread operations on each. during the spread op, n = m, worst
 * case (example: howSum(7, [1, 1, 1, 1, 1, 1, 1])). time complexity is O((m^2)*n)
 * 
 * size of table = m. intermediate data/variables to store and/or update: the sub-array
 * at `table[i]`. worst-case scenario: n = m during spread op 
 * intermediate ops (addition and comparison) do not require significant space
 * therefore, space complexity is O(m^2) 
 */

const howSum = (targetSum, numbers) => {
    const table = new Array(targetSum+1).fill(null)
    table[0] = []

    for(let i=0; i<=targetSum; ++i){
        if(table[i]!==null){
            for(let j of numbers){
                if(i+j<=targetSum){
                    table[i+j] = [...table[i], j]
                }
            }
            if(table[targetSum]!==null) return table[targetSum] //optional early return
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
        numbers: [1, 1, 1, 1, 1],
    },
    {
        targetSum: 1000,
        numbers: [2, 2, 2, 2, 2],
    },
    // {
    //     targetSum: 1234567890,
    //     numbers: [1, 8, 15, 22, 29],
    // },
]

arr.forEach(obj => {
    console.log(`input: (${obj.targetSum}, [${obj.numbers}]): return: ${howSum(obj.targetSum, obj.numbers)}`);
})