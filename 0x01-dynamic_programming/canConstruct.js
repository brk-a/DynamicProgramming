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
