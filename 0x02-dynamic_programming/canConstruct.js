/**
 * write a function `canConstruct(target, wordBank)` that accepts a target string
 * and an array of strings
 * 
 * said fn should return a boolean that indicates whether or not `target` can
 * be  constructed by concatenating elements of `wordBank`
 * 
 * feel free to reuse as many elements of `wordBank` as many times as required
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
 * take canConstruct('', ['oh,', 'for', 'fox', 'sake', '!'])
 * 
 * target is an empty string; no way to construct an empty string
 * 
 * canConstruct should return `true`. this is a base/seed case
 */

/**
 * walk through canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']) -> true
 * 
 * create an array, `table`, of length target.length plus one; initialise it with `false`
 * why target.length+1? Eaa...sy! indices of the array represent a substring of `target`
 * whose length is the index, that is, index zero represents an empty target string and
 * so on. this allows us to have a base/seed case.
 * in other words, table[i] represents a substring of `target` starting at index zero up to,
 * but not including, i: target.slice(0, i). table[0] = target.slice(0, 0) = ''
 * table[1] = target.slice(0, 1) = 'a'. table[2] = target.slice(0, 2) = 'ab' and so on
 * array viz:
 *      [`false`, `false`, `false`, `false`, `false`, `false`, `false`]
 * 
 * recall canConstruct('', [...]) -> true; set table[0] to `true`
 *  array viz:
 *      [`true`, `false`, `false`, `false`, `false`, `false`, `false`]
 * 
 * for i in `table` do:
 *      1. check if table[i] === true
 *      2. table[i] !== true: continue
 *      3. table[i] === true: for j in `wordBank` do:
 *          a. evaluate k = wordBank[j].length
 *          b. add i and k
 *          c. check if i+k > target.length
 *          d. i+k > target.length: continue
 *          e. i+k <= target.length: check if wordbank[j]===target.slice(i, i+k)
 *          f. wordbank[j]!==target.slice(i, i+k]): continue
 *          g. wordbank[j]===target.slice(i, i+k]): set table[i+k] to `true`
 *      4. return table[target.length]
 * 
 * first pass. current position: table[0] = `true`  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[0] = target.slice(0, 0) = '' = `true`; traverse `wordBank`
 *      2. traversing `wordBank`
 *          a. 0+2=2 <= 7; wordBank[0]===target.slice(0, 2): set table[2] to `true`
 *          b. 0+3=3 <= 7; wordBank[1]===target.slice(0, 3): set table[3] to `true`
 *          c. 0+2=2 <= 7; wordBank[2]!==target.slice(0, 2): continue
 *          d. 0+3=3 <= 7; wordBank[3]!==target.slice(0, 3): continue
 *          e. 0+4=4 <= 7; wordBank[4]===target.slice(0, 4): set table[4] to `true`
 *      table viz:
 *          [`true`, `false`, `true`, `true`, `true`, `false`, `false`]
 * 
 * second pass. current position: table[1] = `false`,  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[1] = target.slice(0, 1) = 'a' = `false`;  do not traverse `wordBank`
 *      table viz:
 *          [`true`, `false`, `true`, `true`, `true`, `false`, `false`]
 * 
 * third pass. current position: table[2] = `true`,  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[2] = target.slice(0, 2) = 'ab' = `true`; traverse `wordBank`
 *      2. traversing `wordBank`
 *          a. 2+2=4 <= 7; wordBank[0]!==target.slice(2, 4): continue
 *          b. 2+3=5 <= 7; wordBank[1]!==target.slice(2, 5): continue
 *          c. 2+2=4 <= 7; wordBank[2]===target.slice(2, 4): set table[4] to `true`
 *          d. 2+3=5 <= 7; wordBank[3]!==target.slice(2, 5): continue
 *          e. 2+4=6 <= 7; wordBank[4]!==target.slice(2, 6): continue
 *      table viz:
 *           [`true`, `false`, `true`, `true`, `true`, `false`, `false`]
 * 
 * fourth pass. current position: table[3] = `true`,  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[3] = target.slice(0, 3) = 'abc' = `true`; traverse `wordBank`
 *      2. traversing `wordBank`
 *          a. 3+2=5 <= 7; wordBank[0]!==target.slice(3, 5): continue
 *          b. 3+3=6 <= 7; wordBank[1]!==target.slice(3, 6): continue
 *          c. 3+2=5 <= 7; wordBank[2]!==target.slice(3, 5): continue
 *          d. 3+3=6 <= 7; wordBank[3]===target.slice(3, 6): set table[6] to `true`
 *          e. 3+4=7 <= 7; wordBank[4]!==target.slice(3, 7): continue
 *      table viz:
 *           [`true`, `false`, `true`, `true`, `true`, `false`, `true`]
 * 
 * fifth pass. current position: table[4] = `true`,  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[4] = target.slice(0, 4) = 'abcd' `true`; traverse `wordBank`
 *      2. traversing `wordBank`
 *          a. 4+2=6 <= 7; wordBank[0]!==target.slice(4, 6): continue
 *          b. 4+3=7 <= 7; wordBank[1]!==target.slice(4, 7): continue
 *          c. 4+2=6 <= 7; wordBank[2]!==target.slice(4, 6): continue
 *          d. 4+3=7 <= 7; wordBank[3]!==target.slice(4, 7): continue
 *          e. 4+4=8 > 7;  continue
 *      table viz:
 *          [`true`, `false`, `true`, `true`, `true`, `false`, `true`]
 * 
 * sixth pass. current position: table[5] = `false`,  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[5] = target.slice(0, 5) = 'abcde' = `false`;  do not traverse `wordBank`
 *      table viz:
 *          [`true`, `false`, `true`, `true`, `true`, `false`, `true`]
 * 
 * seventh pass. current position: table[6] = `true`,  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[6] = target.slice(0, 6) = 'abcdef' `true`; traverse `wordBank`
 *      2. traversing `wordBank`
 *          a. 6+2=8 > 7; continue
 *          b. 6+3=9 > 7; continue
 *          c. 6+2=8 > 7; continue
 *          d. 6+3=9 > 7; continue
 *          e. 6+4=10 > 7; continue
 *      table viz:
 *          [`true`, `false`, `true`, `true`, `true`, `false`, `true`]
 * 
 * return
 *      table[target.length] = table[6] = `true`
 *      meaning that it is possible to create the string `abcdef` by concatenating elements of
 *      `wordBank`
 *      sanity check: abcdef = abc + def
 * 
 * possible early return:
 *      notice that table[target.length] = table[6] = `true` at the fourth pass
 */

/**
 * complexity; complexity everywhere.
 * 
 * let m =  target.length and n = wordBank.length
 * 
 * canConstruct has quadratic time complexity and quadratic space complexity
 * 
 * size of `table` will always be m. worst-case scenario: iterate over m elements
 * while performing n operations on each. also, we have to choose the elements of `wordBank`
 * that match the next element of the string `target`; worst-case length of the next matching
 * element is m. time complexity is O((m^2)*n)
 * m
 * 
 * #ops performed per iteration/pass depends on #words in wordBank; in other words, n
 * worst-case scenario: every element of wordBank appears at the beginning of
 * target; the number of ops will be n
 * 
 * the  `slice` op on `target`: requires that target be iterated on. worst-case scenario
 * is the same as size of table, m
 * 
 * time complexity is O((m^2) * n) and space complexity is O(m^2)
 */

const canConstruct = (target, wordBank) => {
    const table = new Array(target.length+1).fill(false)
    table[0] = true

    for(let i=0; i<=target.length; ++i){
        if(table[i]===true){
            for(let j of wordBank){
                const k = j.length
                if(target.slice(i, i+k)===j){
                    table[i+k] = true
                }
            }

            // if(table[target]===true) return table[target] //optional early return
        }
    }
    
    return table[target.length]
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
        target: 'bougainvellia',
        wordBank: ['ou', 'gain', 'vil', 'bo', 'liea'],
    },
    {
        target: '',
        wordBank: ['oh,', 'for', 'fox', 'sake', '!'],
    },
    {
        target: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef',
        wordBank: ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'],
    },
]

arr.forEach(obj => {
    console.log(`input: ${obj.target}: return: ${canConstruct(obj.target, obj.wordBank)}`);
})