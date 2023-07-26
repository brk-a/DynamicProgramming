/**
 * write a function, `bestSum(targetSum, numbers)`, that takes the args
 * `targetSum` -> int and `numbers` -> array.
 * 
 * said fn should return an array containing the shortest combination of
 * elements that add up to `targetSum`, else, `null`.
 * 
 * if there are multiple combinations, the fn can return any one.
 * 
 * constraints
 *      (1) use elements of the array as many times as needed
 *      (2) assume that all elements in the array are non-negative
 */

/**
 * take bestSum(7, [5, 3, 4, 7]).
 * possible combinations: [4, 3], [3, 4] or [7]
 * bestSum should return [7] because it is the shortest combination
 * 
 * take bestSum(8, [5, 3, 2]).
 * possible combos: [2, 3, 3], [5, 3], [3, 5] or [2, 2, 2, 2]
 * bestSum should return [5, 3] because it is the first of the shortest
 * combinations
 * 
 * take bestSum(1, [5, 3, 4, 7]).
 * it should return `null` because none of the numbers in the array
 * add up to 1. base/seed case
 * 
 * take bestSum(0, [1, 2, 3]).
 * it should return [] because no positive numbers add up to zero. also,
 * zero is neither positive nor negative. base/seed case
 */

/**
 * walkthrough using bestSum(7, [5, 3, 4, 7]) -> [3, 4]
 * 
 * intialise an array, table, of size `targetSum` plus one filled with `null` because
 * zero-based indexing and `null` is a rational choice of initial value (because of the
 * return value)
 *      [null, null, null, null, null, null, null, null, null]
 * 
 * recall bestSum(0, [...]) -> [] and bestSum(1, [i]) where i>1 -> `null`; this are the
 * seed values of the table
 * table viz:
 *      [[], null, null, null, null, null, null, null, null]
 * 
 * for i in  `table` do:
 *      1. check if table[i] === null
 *      2. table[i] === null: continue
 *      3. table[i] !== null: for j in `numbers` do:
 *          a. check if (i+j) <= targetSum
 *          b. i+j > targetSum: continue
 *          c. i+j <= targetSum: append table[i] to table[i+j]
 *          d. include j in table, that is, table[i+j] = [...table[i+j], j]
 *          e. find the shortest array in tanle[i+j]; pop the rest
 *      4. return table[targetSum]
 * 
 * first pass. current position: table[0] = [],  numbers = [5, 3, 4, 7]
 *      1. table[0] != `null`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 0+5=5 <= 7; set table[5] to [...table[5], 5] -> [5] 
 *          b. 0+3=3 <= 7; set table[3] to [...table[3], 3] -> [3]
 *          c. 0+4=4 <= 7; set table[4] to [...table[4], 4] -> [4]
 *          d. 0+7=7 <= 7; set table[7] to [...table[7], 7] -> [7]
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
 *          b. 3+3=6 <= 7; set table[6] to [...table[6], 3] -> [[3, 3]]
 *          c. 3+4=7 <= 7; set table[7] to [...table[7], 4] -> [[7], [3, 4]]
 *          d. 3+7=10 > 7; continue
 *      3. [7] is shorter than [3, 4]; keep [7]
 *      table viz:
 *          [[], `null`, `null`, [3], [4], [5], [3, 3], [7]]
 * 
 * fifth pass. current position: table[4] = [4],  numbers = [5, 3, 4, 7]
 *      1. table[4] != null; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 4+5=9 > 7;  continue
 *          b. 4+3=7 <= 7; set table[7] to [...table[7], 3] -> [[4, 3], [7]]
 *          c. 4+4=8 > 7;  continue
 *          d. 4+7=11 > 7; continue
 *      3. 3. [7] is shorter than [4, 3]; keep [7]
 *      table viz:
 *          [[], `null`, `null`, [3], [4], [5], [3, 3], [7]]
 * 
 * sixth pass. current position: table[5] = [5],  numbers = [5, 3, 4, 7]
 *      1. table[5] != `null`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 5+5=10 > 7; continue
 *          b. 5+3=8 > 7; continue
 *          c. 5+4=9 > 7; continue
 *          d. 5+7=12 > 7; continue
 *      table viz:
 *          [[], `null`, `null`, [3], [4], [5], [3, 3], [7]]
 * 
 * seventh pass. current position: table[6] = [3, 3],  numbers = [5, 3, 4, 7]
 *      1. table[6] != `null`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 6+5=11 > 7; continue
 *          b. 6+3=9 > 7; continue
 *          c. 6+4=10 > 7; continue
 *          d. 6+7=13 > 7; continue
 *      table viz:
 *          [[], `null`, `null`, [3], [4], [5], [3, 3], [7]]
 * 
 * eighth pass. current position: table[7] = [4, 3],  numbers = [5, 3, 4, 7]
 *      1. table[7] != `null`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 7+5=12 > 7; continue
 *          b. 7+3=10 > 7; continue
 *          c. 7+4=11 > 7; continue
 *          d. 7+7=14 > 7; continue
 *      table viz:
 *          [[], `null`, `null`, [3], [4], [5], [3, 3], [7]]
 * 
 * return:
 *      table[targetSum] = table[7] === [7]
 *      that is, it is possible to generate 7 by adding 7 and nothing
 *      from the members of [5, 3, 4, 7]
 *      sanity check: 3+4=7, 4+3=7 and 7+nothing=7
 * 
 * notice we can return early
 *      1. first pass: table[targetSum] = [7] meaning 7+nothing=7 (elegant solution, but not quite;
 *          see bestSum(8, [1, 4, 5]) with and w/o early return)
 */


/**
 * complexity; complexity everywhere
 * 
 * bestSum has quadratic time and space complexity
 * 
 * let targetSum = m and numbers.length = n
 * 
 * size of `table` will always be m. worst-case scenario: iterate over m elements
 * while performing n spread operations on each. during the spread op, n = m, worst
 * case (example: bestSum(7, [1, 1, 1, 1, 1, 1, 1])). pop op does not take significant
 * time, therefore, time complexity is O((m^2)*n)
 * 
 * size of table = m. intermediate data/variables to store and/or update: the sub-array
 * at `table[i]`. worst-case scenario: n = m during spread op 
 * intermediate ops (addition and comparison) do not require significant space
 * therefore, space complexity is O(m^2) 
 */

const bestSum = (targetSum, numbers) => {
    const table = new Array(targetSum+1).fill(null)
    table[0] = []

    for(let i=0; i<=targetSum; ++i){
        if(table[i]!==null){
            for(let j of numbers){
                const currentCombination = [...table[i], j]
                if(!table[i+j] || table[i+j].length>currentCombination.length){
                    table[i+j] = currentCombination
                }
            }

            // if(table[targetSum]!==null) return table[targetSum] //optional early return
        }
    }
    return table[targetSum]
}

const arr = [
    {
        targetSum: 8,
        numbers: [1, 4, 5],
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
        targetSum: 1,
        numbers: [2, 4],
    },
    {
        targetSum: 100,
        numbers: [1, 2, 5, 25],
    },
    {
        targetSum: 676,
        numbers: [5, 12, 19, 26],
    },
    {
        targetSum: 1000,
        numbers: [6, 13, 20, 27],
    },
    {
        targetSum: 10000,
        numbers: [1, 8, 15, 22, 29],
    },
    // {
    //     targetSum: 1234567890,
    //     numbers: [3, 10, 17, 24, 31],
    // },
]

arr.forEach(obj => {
    console.log(`input: (${obj.targetSum}, [${obj.numbers}]): return: ${bestSum(obj.targetSum, obj.numbers)}`);
})