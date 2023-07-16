/**
 * write a function `canConstruct(target, wordBank)` that accepts a taret string
 * and an array of strings
 * 
 * said fn should return a boolean that indicates whether or not `target` can
 * be  constructed by concatenating elements of `wordBank`
 * 
 * feel free to reuse as many elements of `wordBank` as many times as required
 * 
 * 
 */

/**
 * take canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
 * 
 * Q: can you construct the string `abcdef` from the elements of the array?
 * 
 * only one way to construct the string: `abc` plus `def` equals `abcdef`
 * 
 * canConstruct should return `true`
 */

/**
 * take canConstruct('bougainvellia', ['ou', 'gain', 'vil', 'bo', 'liea'])
 * 
 * no way to construct the string
 * 
 * canConstruct should return `false`
 */

/**
 * take canConstruct('', ['oh', ',', 'fox', 'sake', '!'])
 * 
 * target is an empty string; no way to construct an empty string
 * 
 * canConstruct should return `true`
 */

/**
 * walk through canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
 * 
 * flow:
 *      1. check if a substring appears at the beginning of target
 *      2. [No for 1]: is substring === target?
 *      3. [Yes for 1 and 2]: remove substring from target; create new node; repeat steps 1 and 2
 *      4. [No for 2]: return `false`
 *      5. target is empty string: return `true`
 * 
 * root level. target = abcef. 5 options: ab, abc, cd, def, abcd
 *      option 1, ab: ab appears at the beginning of target. new target -> cdef
 *      option 2, abc: appears at the beginning of target. new target -> def
 *      option 3, cd: does not appear at the beginning of target. return `false`
 *      option 4, def: does not appear at the beginning of target. return `false`
 *      option 5, abcd: appears at the beginning of target. new target -> ef
 * 
 * level 1. targets: cdef, def, ef. 5 options for each as in root level
 *      target `cdef`. only one viable option: cd; the rest return `false`
 *          viable option, cd: appears at the beginning of target. new target -> ef
 *      target `def`. only one viable option: `def`; the rest return `false`
 *          viable option, `def`: substring === target. new target => ''. return `true`
 *      target `ef`. no viable options. return `false`
 * 
 * level 2. targets: ef
 *      target `ef`. no viable options. return `false`
 * 
 * ========== return ==========
 *
 * level 2. node `ef`
 *      return `false to parent `cdef`
 * 
 * level 1. nodes:`cdef`, `def`, `ef`
 *      node `cdef`: all children return `false`, therefore, return `false` to parent
 *      node `def`: all children except one return `false`, therefore, return `true` to parent
 *      node `ef`: returns `false`, therefore, return `false` to parent
 * 
 * root level. node `abcdef`
 *      children `cdef` and `ef` return `false`
 *      child `def` returns `true`
 *      root node returns `true` meaning it is possible to create the string `abcdef`
 *      from the array ['ab', 'abc', 'cd', 'def', 'abcd']. 
 *      simple language `abc` + `def` = `abcdef`
 * 
 * base case(s)
 *      1. return `true` IFF target === ''
 *      2. return `false` if substring does not appear at the beginning of target
 *      
 */

const canConstruct = (target, wordBank) => {
    if(target==='') return true

    for(let i of wordBank){
        if(target.indexOf(i)===0){
            const rem = target.slice(i.length)
            if(canConstruct(rem, wordBank)===true){
                return true
            }
        }
    }

    return false
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

arr.forEach(obj => {
    console.log(`input: ${obj.target}: return: ${canConstruct(obj.target, obj.wordBank)}`);
})

/**
 * let m =  target.length and n = wordBank.length
 * 
 * time complexity will be predicted by the #nodes in tree; space
 * complexity will be predicted by height of tree
 * 
 * canConstruct has exponential time complexity and quadratic space complexity
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

const canConstructMemo = (target, wordBank, memo={}) => {
    if(target in memo) return memo[target]
    if(target==='') return true

    for(let i of wordBank){
        if(target.indexOf(i)===0){
            const remainder = target.slice(i.length)
            if(canConstruct(remainder, wordBank, memo)===true){
                memo[target] = true
                return true
            }
        }
    }

    memo[target] = false
    return false
}

arr.forEach(obj => {
    console.log(`input: ${obj.target}: return: ${canConstructMemo(obj.target, obj.wordBank)}`);
})

/**
 * canConstructMemo has quadratic time and space complexity
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