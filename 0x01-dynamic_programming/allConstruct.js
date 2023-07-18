/**
 * write a function `allConstruct(target, wordBank)` that accepts a taret string
 * and an array of strings
 * 
 * said fn should return an 2D array that contains all the ways `target` can
 * be  constructed by concatenating elements of `wordBank`; each element of said
 * array represents one combination, else, []
 * 
 * feel free to reuse as many elements of `wordBank` as many times as required
 * 
 */

/**
 * consider allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])
 *
 * Q: how many ways can you construct the string `purple` from the elements
 * of the array? 
 * A: two
 * 
 * allConstruct should return the following:
 * [
 *      ['purp', 'le'],
 *      ['p', 'ur', 'p', 'le'],
 * ]
 * 
 */

/**
 * take allConstruct('bougainvellia', ['ou', 'gain', 'vil', 'bo', 'liea'])
 * 
 * no way to construct the string
 * 
 * countConstruct should return []
 */

/**
 * take countConstruct('', ['oh,'for ',', 'fox', 'sake', '!'])
 * 
 * target is an empty string; no way to construct an empty string
 * from an array of non-empty strings
 * 
 * allConstruct should return an array of an empty array viz: [[]]
 */

/**
 * take allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
 * 
 * only one way to construct the string: `abc` plus `def` equals `abcdef`
 * 
 * allConstruct should return the following
 * [
 *      ['abc', 'def'],
 * ]
 */

/**
 * walk through allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
 * 
 * flow:
 *      1. check if a substring appears at the beginning of target
 *      2. [No for 1]: is substring === target?
 *      3. [Yes for 1 and 2]: remove substring from target; create new node; repeat steps 1 and 2
 *      4. [No for 2]: return []
 *      5. target is empty string: return [[]]
 * 
 * root level. target = abcef. 5 options: ab, abc, cd, def, abcd
 *      option 1, ab: ab appears at the beginning of target. new target -> cdef
 *      option 2, abc: appears at the beginning of target. new target -> def
 *      option 3, cd: does not appear at the beginning of target. return  []
 *      option 4, def: does not appear at the beginning of target. return  []
 *      option 5, abcd: appears at the beginning of target. new target -> ef
 * 
 * level 1. targets: cdef, def, ef. 5 options for each as in root level
 *      target `cdef`. only one viable option: cd; the rest return  []
 *          viable option, cd: appears at the beginning of target. new target -> ef
 *      target `def`. only one viable option: `def`; the rest return  []
 *          viable option, `def`: substring === target. new target => ''. return [[]]
 *      target `ef`. no viable options. return []
 * 
 * level 2. targets: ef
 *      target `ef`. no viable options. return []
 * 
 * ========== return ==========
 *
 * level 2. node `ef`
 *      return [] to parent `cdef`
 * 
 * level 1. nodes:`cdef`, `def`, `ef`
 *      node `cdef`: all children return  []; return  [] to parent
 *      node `def`: all children except one return  []. push `def` into inner array.
 *          return [['def']] to parent
 *      node `ef`: returns [], therefore, return [] to parent
 * 
 * root level. node `abcdef`
 *      children `cdef` and `ef` return [] 
 *      child `def` returns [['def']]
 *      push `abc` into inner array of  `[['def']]`
 *      root node returns [['abc', 'def']] meaning there is only one way to create the
 *          string `abcdef` from the array ['ab', 'abc', 'cd', 'def', 'abcd']. 
 *      simple language `abc` + `def` = `abcdef`
 * 
 * base case(s)
 *      1. return [[]] IFF target === ''
 *      2. return  [] if substring does not appear at the beginning of target
 *      
 */


const allConstruct = (target, wordBank) => {
    if(target==='') return [[]]

    const totalWays = []

    for(let i of wordBank){
        if(target.indexOf(i)===0){
            const rem = target.slice(i.length)
            const remWays = allConstruct(rem, wordBank)
            const targetWays = remWays.map(way => [i, ...way])
            totalWays.push(...targetWays)
        }
    }

    return totalWays
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
        target: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        wordBank: ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'],
    },
]

arr.forEach(obj => {
    console.log(`input: ${obj.target}: return: ${allConstruct(obj.target, obj.wordBank)}`);
})

const allConstructMemo = (target, wordBank, memo={}) => {
    if(target in memo) return memo[target]
    if(target==='') return [[]]

    const totalWays = []

    for(let i of wordBank){
        if(target.indexOf(i)===0){
            const rem = target.slice(i.length)
            const remWays = allConstruct(rem, wordBank, memo)
            const targetWays = remWays.map(way => [i, ...way])
            totalWays.push(...targetWays)
        }
    }

    memo[target] = totalWays
    return totalWays
}

arr.forEach(obj => {
    console.log(`input: ${obj.target}: return: ${allConstructMemo(obj.target, obj.wordBank)}`);
})

/**
 * let m = target.length and n = wordBank.length
 * 
 * height of the tree is m; n recursive calls
 * a slice op and two spread ops per iteration
 * worst-case #combinations is n^m
 * worst-case space on stack frame is at least m^3
 * 
 * allConstruct and allConstructMemo have exponential time complexity
 * allConstruct and allConstructMemo have polynomial (specifically >= cubic) space complexity
 */