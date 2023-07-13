/**
 * write a function, `bestSum(targetSum, numbers)`, that takes the args
 * `targetSum` -> int and `numbers` -> array.
 * 
 * said fn should return an array containing the shortest combination of
 * elements that add up to the targetSum, else, null.
 * 
 * if there are multiple combinations, the fn can return any one.
 * 
 * constraints
 *      (1) use an element of the array as many times as needed
 *      (2) assume that all elements in the array are non-negative
 */

/**
 * take bestSum(7, [5, 3, 4, 7]).
 * two possible combinations: [4, 3] or [7]
 * bestSum should return [7] because it is the shortest combination
 * 
 * take bestSum(8, [5, 3, 2]).
 * three possible combos: [2, 3, 3], [5, 3] or [2, 2, 2, 2]
 * bestSum should return [5, 3] because it is the shortest combination
 * 
 * take bestSum(1, [5, 3, 4, 7]).
 * it should return `null` because none of the numbers in the array
 * add up to 1
 * 
 * take bestSum(0, [1, 2, 3]).
 * it should return [] because no positive numbers add up to zero. also,
 * zero is neither positive nor negative
 */

/**
 * take bestSum(7, [5, 3, 4, 7])
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
 *      4. return shortest array to parent when two combinations are found
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
 *      push 3 into array containing [4]. combination 1: [4, 3]
 *      push 4 into array containing [3]. combination 2: [3, 4]
 *      push 7 into empty array. combination 3: [7]
 *      return [7] because it is the shortest
 */

const bestSum = (targetSum, numbers) => {
    if(targetSum===0) return []
    if(targetSum<0) return null

    let shortestCombination = null

    for(let i of numbers){
        const rem = targetSum - i
        const remCombination = bestSum(rem, numbers)
        
        if(remCombination!==null){
            const combination = [...remCombination, i]
            if(shortestCombination===null || combination.length<shortestCombination.length){
                shortestCombination = combination
            }
        }
    }

    return shortestCombination
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
]

arr.forEach(obj => {
    console.log(`input: (${obj.targetSum}, [${obj.numbers}]): return: ${bestSum(obj.targetSum, obj.numbers)}`);
})