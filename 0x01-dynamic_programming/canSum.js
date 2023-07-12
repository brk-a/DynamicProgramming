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
 * take canSum(7, [5, 3, 4, 7]).
 * it should return `true` because the sum of 3 and 4 is 7, also,
 * 7 is a member of the array
 * 
 * take canSum(12, [5, 3, 4, 7]).
 * it should return `true` because the sum of 5 and 7 is 12,
 * as is the sum of 3, 4 and 5
 * 
 * take canSum(1, [5, 3, 4, 7]).
 * it should return `false` because none of the numbers in the array
 * add up to 1
 */

/**
 * take canSum(7, [5, 3, 4, 7])
 * add constraint: new targetSum cannot be negative
 * 
 * root level: targetSum = 7. four options: 5, 3, 4, 7
 *      option 1: 5. reduce targetSum by 5. new targetSum is 2
 *      option 2: 3. reduce targetSum by 3. new targetSum is 4
 *      option 3: 4. reduce targetSum by 4. new targetSum is 3
 *      option 4: 7. reduce targetSum by 7. new targetSum is 0
 * notice, in option 1, the new targetSum is less than the least member of the array
 * notice, in option 4, the new targetSum is zero
 * 
 * level 1: targetSum = 4 and targetSum = 3
 *      targetSum = 4. two options: 3 and 4
 *          option 1: 3. reduce targetSum by 3. new targetSum is 1
 *          option 2: 4. reduce targetSum by 4. new targetSum is 0
 *          notice, in option 1,  the new targetSum is less than the least member of the
 *          available options and in option 2, new targetSum is zero
 *      targetSum = 3. one options: 3
 *          option 1: 3. reduce targetSum by 3. new targetSum is 0
 *      notice, in option 1,  there is only one option because targetSum is equal to the
 *      least member of the available options, also, new targetSum is zero
 * 
 * leaf-level `targetSum`s: 2, 1, 0, 0, 0
 *      this means:
 *          1. 5 !== 7 (7 - 5 = 2)
 *          2. 3 + 3 !== 7 (7 - 3 - 3 = 1)
 *          3. 3 + 4 === 7 (7 - 3 - 4 = 0)
 *          4. 4 + 3 === 7 (7 - 4 - 3 = 0)
 *          5. 7 === 7 (7 - 7 = 0)
 * 
 * base case(s):
 *      1. return `true` IFF targetSum = 0
 *      2. return `false` if targetSum is:
 *          a. less than the least member of the array or
 *          b. less than zero
 *      3. return `true` to a parent if at least one child is `true`
 */

/**
 * verify using another case: canSum(7, [4, 2]) (expected return: `false`)
 * 
 * root level: targetSum = 7. two options: 4 and 2
 *      option 1: 4. reduce targetSum by 4. new targetSum is 3
 *      option 2: 2. reduce targetSum by 2. new targetSum is 5
 * 
 * level 1: targetSum = 3 and targetSum = 5
 *      targetSum = 3. one option: 2
 *          option 1: 2. reduce targetSum by 2. new targetSum is 1 (base case -> `false`)
 *      targetSum = 5. two options: 4 and 2
 *          option 1: 4. reduce targetSum by 4. new targetSum is 1 (base case -> `false`)
 *          option 2: 2. reduce targetSum by 2. new targetSum is 3
 * 
 * level 2: targetSum = 3. the rest are 1 so return `false`
 *      targetSum = 3. one option: 2
 *          option 1: 2. reduce targetSum by 2. new targetSum is 1 (base case -> `false`)
 * 
 * leaf-level `targetSum`s: 1, 1, 1
 *      1. 4 + 2 !== 7 (7 - 4 - 2 = 1)
 *      2. 2 + 4 !== 7 (7 - 2 - 4 = 1)
 *      3. 2 + 2 + 2 !== 7 (7 - 2 - 2 - 2 = 1)
 * 
 * new insight: root-level node should return `true` if any leaf-level node
 * returns `true`
 */

const canSum = (targetSum, numbers) => {
    if(targetSum===0) return true
    if(targetSum<0) return false

    for(let i of numbers){
        const rem = targetSum - i
        if (canSum(rem, numbers)===true){
            return true
        }
    }

    return false
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
]

arr.forEach(obj => {
    console.log(`input: (${obj.targetSum}, [${obj.numbers}]): return: ${canSum(obj.targetSum, obj.numbers)}`);
})

/**canSum has exponential time complexity and linear space complexity
 * 
 * let m be the target sum and n be the length of the array of candidates
 * 
 * worst-case scenario max-depth: the array contains `1` (algo will subtract 1 at each edge until base case)
 * therefore, the worst-case max depth of the tree is m
 * 
 * worst-case scenario branching factor: at level 1, the algo must branch n times; one for each member of the
 * array. may or may not happen at other levels, therefore, worst-case scenario branching factor is n
 * 
 * time complexity is O(n^m) and space complexity is O(m)
 * 
*/

const canSumMemo = (targetSum, numbers, memo={}) => {
    if (!numbers ||!Array.isArray(numbers)) throw new Error('Invalid input')

    if(targetSum in memo) return memo[targetSum]
    if(targetSum===0) return true
    if(targetSum<0) return false

    for(let i of numbers){
        const remainder = targetSum - i
        if(canSum(remainder, numbers, memo)===true){
            memo[targetSum] = true
            return true
        }
    }

    memo[targetSum] = false
    return false
}

arr.forEach(obj => {
    console.log(`input: (${obj.targetSum}, [${obj.numbers}]): return: ${canSumMemo(obj.targetSum, obj.numbers)}`);
})

/**canSumMemo has constant time complexity and linear space complexity
 * 
 * let m be the target sum and n be the length of the array of candidates
 * 
 * worst-case scenario max-depth: the array contains `1` (algo will subtract 1 at each edge until base case)
 * therefore, the worst-case max depth of the tree is m
 * 
 * worst-case scenario branching factor: at level 1, the algo must branch n times; one for each member of the
 * array. may or may not happen at other levels, however, intermediate results are cached into the memo object.
 * a recursive call will check the memo to see if a similar call has been evaluated,therefore, worst-case scenario
 * branching factor is n (there will be n * m nodes)
 * 
 * time complexity is O(n*m) and space complexity is O(m)
 * 
*/