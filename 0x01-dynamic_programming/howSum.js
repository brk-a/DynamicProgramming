/**
 * write a function, `howSum(targetSum, numbers)`, that takes the args
 * `targetSum` -> int and `numbers` -> array.
 * said fn should return an array containing any combination of elements
 * that add up to the targetSum, else, null.
 * if there are multiple combinations, the fn can return any one.
 * 
 * constraints
 *      (1) use an element of the array as many times as needed
 *      (2) assume that all elements in the array are non-negative
 */

/**
 * take howSum(7, [5, 3, 4, 7]).
 * it should return [3, 4] or [7] because the sum of 3 and 4 is 7, also,
 * 7 is a member of the array
 * 
 * take howSum(8, [5, 3, 2]).
 * it should return [5, 3] or [2, 2, 2, 2] because the sum of 5 and 3 is 8,
 * as is the sum of 2, 2, 2 and 2
 * 
 * take howSum(1, [5, 3, 4, 7]).
 * it should return `null` because none of the numbers in the array
 * add up to 1
 * 
 * take howSum(0, [1, 2, 3]).
 * it should return [] because no positive numbers add up to zero. also,
 * zero is neither positive nor negative
 */

/**
 * take howSum(7, [5, 3, 4, 7])
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
 *      1. return [] IFF targetSum = 0
 *      2. return `null` if targetSum is:
 *          a. less than the least member of the array or
 *          b. less than zero
 *      3. return an array to a parent if at least one child returns an array
 *      4. return when one combination is found (we only care about one combination)
 *
 * return:
 * level 2: targetSum = 1 or 0 or 0
 *      targetSum = 1: return `null`
 *      targetSum = 0: return []
 *      targetSum = 0: return []
 * level 1: targetSum = 2, or 4 or 3 or 0
 *      targetSum = 2: return `null`
 *      targetSum = 4: push 4 into empty array. return [4] (4 because this is the number at the edge)
 *      targetSum = 3: push 3 into empty array. return [3]
 *      targetSum = 0: return []
 * root level: targetSum = 7
 *      push 3 into array containing [4]. return [4, 3]
 *      ======== OR ================
 *      push 4 into array containing [3]. return [3, 4]
 *      ======== OR ================
 *      return [7]
 */

const howSum = (targetSum, numbers) => {
    if(targetSum===0) return []
    if(targetSum<0) return null

    for(let i of numbers){
        const rem = targetSum - i
        const remResult = howSum(rem, numbers)
        if(remResult!==null){
            return [...remResult, i]
        }
    }

    return null
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
    console.log(`input: (${obj.targetSum}, [${obj.numbers}]): return: ${howSum(obj.targetSum, obj.numbers)}`);
})

/**howSum has exponential time complexity and linear space complexity
 * 
 * let m be the target sum and n be the length of the array of candidates
 * 
 * worst-case scenario max-depth: the array contains `1` (algo will subtract 1 at each edge until base case)
 * therefore, the worst-case max depth of the tree is m
 * 
 * the operation `return [...remResult, i]` is, technically, an iteration process. it takes a linear #steps
 * to copy each element of the array then add a new element. the max-level length of the 
 * iteration is the length of the array; that is, m. say targetSum = 50 and numbers = [1, 1, 1, 1 ].
 * the #steps to iterate on remResult would be 50 which, non-coincidentally, happens to be m. 
 * 
 * worst-case scenario branching factor: at level 1, the algo must branch n times; one for each member of the
 * array. may or may not happen at other levels, therefore, worst-case scenario branching factor is n
 * 
 * base of the exponent is the branching factor; power is the depth of the tree, therefore (n^m)
 * 
 * time complexity is O((n^m) * m) and space complexity is O(m)
 * 
*/

const howSumMemo = (targetSum, numbers, memo={}) => {
    if (!numbers ||!Array.isArray(numbers)) return null

    if(targetSum in memo) return memo[targetSum] 
    if(targetSum===0) return []
    if(targetSum<0) return null

    for(let i of numbers){
        const remainder = targetSum - i
        const remainderResult = howSumMemo(remainder, numbers, memo)

        if(remainderResult!==null){
            memo[targetSum] = [...remainderResult, i]
            return memo[targetSum]
        }
    }

    memo[targetSum] = null
    return null
}

arr.forEach(obj => {
    console.log(`input: (${obj.targetSum}, [${obj.numbers}]): return: ${howSumMemo(obj.targetSum, obj.numbers)}`);
})

/**
 * howSumMemo has quadratic time and space complexity
 * 
 * #recursive calls are the same as howSum -> n*m.
 * each recursive call requires a copy operation (spread the array and add a new member).
 * array will be, at most, m elements long.
 * (n*m) recursive calls each making m copy ops equals (n*m*m) or n*(m^2)
 * 
 * keys of memo obj are all the unique values of `targetSum`; value can be  null or an array.
 * max length of an array is m.
 * m keys with values of length m, at worst, equals (m*m) or (m^2) max space required 
 * 
 * time complexity is O(n*(m^2)) and space complexity is O(m^2)
 * 
 * recall, for howSum: time complexity is O((n^m) * m) and space complexity is O(m)
 * trade-offs
 *      1. time: decreased complexity from exponential to quadratic
 *      2. space: increased complexity from linear to quadratic 
 *      3. overall: the algo is quicker but requires more memory
 * 
 * insights:
 *      1. prefer the memoised algo to the brute force, overall
 *      2. pick the brute force algo when you are not in a hurry and have limited memory
 *      3. pick the memoised algo when you are in a hurry and have memory to spare
 */