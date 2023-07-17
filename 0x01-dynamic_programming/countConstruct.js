/**
 * write a function `countConstruct(target, wordBank)` that accepts a taret string
 * and an array of strings
 * 
 * said fn should return an int that indicates the #ways `target` can
 * be  constructed by concatenating elements of `wordBank`
 * 
 * feel free to reuse as many elements of `wordBank` as many times as required
 * 
 */

/**
 * take countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
 * 
 * Q: how many ways can you construct the string `abcdef` from the elements
 * of the array?
 * 
 * only one way to construct the string: `abc` plus `def` equals `abcdef`
 * 
 * countConstruct should return 1
 */

/**
 * take countConstruct('bougainvellia', ['ou', 'gain', 'vil', 'bo', 'liea'])
 * 
 * no way to construct the string
 * 
 * countConstruct should return 0
 */

/**
 * take countConstruct('', ['oh,'for ',', 'fox', 'sake', '!'])
 * 
 * target is an empty string; no way to construct an empty string
 * 
 * countConstruct should return 0
 */

/**
 * walk through countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
 * 
 * flow:
 *      1. check if a substring appears at the beginning of target
 *      2. [No for 1]: is substring === target?
 *      3. [Yes for 1 and 2]: remove substring from target; create new node; repeat steps 1 and 2
 *      4. [No for 2]: return 0
 *      5. target is empty string: return 1
 * 
 * root level. target = abcef. 5 options: ab, abc, cd, def, abcd
 *      option 1, ab: ab appears at the beginning of target. new target -> cdef
 *      option 2, abc: appears at the beginning of target. new target -> def
 *      option 3, cd: does not appear at the beginning of target. return  0
 *      option 4, def: does not appear at the beginning of target. return  0
 *      option 5, abcd: appears at the beginning of target. new target -> ef
 * 
 * level 1. targets: cdef, def, ef. 5 options for each as in root level
 *      target `cdef`. only one viable option: cd; the rest return  0
 *          viable option, cd: appears at the beginning of target. new target -> ef
 *      target `def`. only one viable option: `def`; the rest return  0
 *          viable option, `def`: substring === target. new target => ''. return 1
 *      target `ef`. no viable options. return 0
 * 
 * level 2. targets: ef
 *      target `ef`. no viable options. return 0
 * 
 * ========== return ==========
 *
 * level 2. node `ef`
 *      return 0 to parent `cdef`
 * 
 * level 1. nodes:`cdef`, `def`, `ef`
 *      node `cdef`: all children return  0; add the zeroes. return  0 to parent
 *      node `def`: all children except one return  0; sum is 1. return 1 to parent
 *      node `ef`: returns 0, therefore, return 0 to parent
 * 
 * root level. node `abcdef`
 *      children `cdef` and `ef` return 0 
 *      child `def` returns 1
 *      sum  is 0 + 0 + 1 = 1
 *      root node returns 1 meaning there is only one way to create the string `abcdef`
 *      from the array ['ab', 'abc', 'cd', 'def', 'abcd']. 
 *      simple language `abc` + `def` = `abcdef`
 * 
 * base case(s)
 *      1. return 1 IFF target === ''
 *      2. return  0 if substring does not appear at the beginning of target
 *      
 */

const countConstruct = (target, wordBank) => {
    if(target==='') return 1

    let totalCount = 0

    for(let i of wordBank){
        if(target.indexOf(i)===0){
            const rem = target.slice(i.length)
            const numWays = countConstruct(rem, wordBank)
            totalCount += numWays
        }
    }

    return totalCount
}

arr = [
    {
        target: 'abcdef',
        wordBank: ['ab', 'abc', 'cd', 'def', 'abcd'],
    },
    {
        target: 'skateboard',
        wordBank: ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'],
    },
    {
        target: 'enterapotentpot',
        wordBank: ['a', 'p', 'ent', 'enter', 'ot', 'o', 't'],
    },
    {
        target: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef',
        wordBank: ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'],
    },
]

// arr.forEach(obj => {
//     console.log(`input: ${obj.target}: return: ${countConstruct(obj.target, obj.wordBank)}`);
// })


/**
 * let m =  target.length and n = wordBank.length
 * 
 * time complexity will be predicted by the #nodes in tree; space
 * complexity will be predicted by height of tree
 * 
 * countConstruct has exponential time complexity and quadratic space complexity
 * 
 * height of tree in worst-case scenario is the length of target, m
 * 
 * branching factor is affected by #words in wordBank; in other words, n
 * worst-case scenario: every element of wordBank appears at the beginning of
 * target; the number of branches will be n
 * assume worst-case scenario branching for subsequent nodes; this means multiply n
 * by itsels m times, or (n^m)
 * 
 * the  `slice` op on `target`: requires that target be iterated on. worst-case scenario
 * is the same as height of the tree, m
 * 
 * time complexity is O((n^m) * m) and space complexity is O(m^2)
 */

const countConstructMemo = (target, wordBank, memo={}) => {
    if(target in memo) return memo[target]
    if(target==='') return 1

    let totalCount = 0

    for(let i of wordBank){
        if(target.indexOf(i)===0){
            const remainder = target.slice(i.length)
            const numWays = countConstruct(remainder, wordBank, memo)
            totalCount += numWays
        }
    }

    memo[target] = totalCount
    return totalCount
}

arr.forEach(obj => {
    console.log(`input: ${obj.target}: return: ${countConstructMemo(obj.target, obj.wordBank)}`);
})

/**
 * countConstructMemo has quadratic time and space complexity
 * 
 * #recursive calls are the same as canConstruct -> n*m.
 * each recursive call requires a slice operation.
 * array will be, at most, m elements long.
 * (n*m) recursive calls each making m slice ops equals (n*m*m) or n*(m^2)
 * 
 * keys of memo obj are all the unique values of `target`.
 * max length of an array is m.
 * m keys with values of length m, at worst, equals (m*m) or (m^2) max space required 
 * 
 * time complexity is O(n*(m^2)) and space complexity is O(m^2)
 * 
 * recall, for canConstruct: time complexity is O((n^m) * m) and space complexity is O(m)
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