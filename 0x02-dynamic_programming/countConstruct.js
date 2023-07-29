/**
 * write a function `countConstruct(target, wordBank)` that accepts a target string
 * and an array of strings
 * 
 * said fn should return an int that indicates the #ways `target` can
 * be  constructed by concatenating elements of `wordBank`
 * 
 * feel free to re-use as many elements of `wordBank` as many times as required
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
 * target is an empty string. only one way to construct an empty string from
 * an array of non-empty strings: concatenate nothing from the array 
 * 
 * countConstruct should return 1. we have a base/seed case
 */

/**
 * walk through countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
 * 
 * create an array, `table`, of length target.length plus one; initialise it with `0`
 * array viz:
 *      [0, 0, 0, 0, 0, 0, 0]
 * recall, countConstruct('', [...]) -> 0; set table[0] to zero
 * array viz:
 *      [1, 0, 0, 0, 0, 0, 0]
 * now, table[i] is target.slice(0, i); that is, table[i] is the substring of `target`
 * starting  at the beginning of `target` up to, but not including, index i
 * 
 * for i in table do:
 *      1. check if table[i] === 0
 *      2. table[i] === 0: continue
 *      3. table[i] !== 0: for j in wordBank do:
 *          a. evaluate k = wordBank[j].length
 *          b. evaluate i+k
 *          c. check if target.slice(i, i+k) === j
 *          d. target.slice(i, i+k) !== j: continue
 *          e. target.slice(i, i+k) === j: add 1 to table[i+k]
 *      4. return table[target.length]
 * 
 * first pass.current position: table[0] = 1  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[0] !== 0: traverse `wordBank`
 *      2. traversing `wordBank`: k=[2, 3, 2, 3, 4]
 *          a. target.slice(0, 2) === 'ab'; set table[2] to table[2]+1 = 0+1 = 1
 *          b. target.slice(0, 3) === 'abc'; set table[3] to table[3]+1 = 0+1 = 1
 *          c. target.slice(0, 2) !== 'cd'; continue
 *          d. target.slice(0, 3) !== 'def'; continue
 *          e. target.slice(0, 4) === 'abcd'; set table[4] to table[4]+1 = 0+1 = 1
 *      array viz:
 *          [1, 0, 1, 1, 1, 0, 0]
 * 
 * second pass.current position: table[1] = 0  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[1] === 0: continue
 *      array viz:
 *          [1, 0, 1, 1, 1, 0, 0]
 * 
 * third pass.current position: table[2] = 1  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[2] !== 0: traverse `wordBank`
 *      2. traversing `wordBank`: k=[2, 3, 2, 3, 4]
 *          a. target.slice(2, 4) !== 'ab'; continue
 *          b. target.slice(2, 5) !== 'abc'; continue
 *          c. target.slice(2, 4) === 'cd'; set table[4] to table[4]+1= 1+1 = 2
 *          d. target.slice(2, 5) !== 'def'; continue
 *          e. target.slice(2, 6) !== 'abcd'; continue
 *      array viz:
 *          [1, 0, 1, 1, 2, 0, 0]
 * 
 * fourth pass.current position: table[3] = 1  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[3] !== 0: traverse `wordBank`
 *      2. traversing `wordBank`: k=[2, 3, 2, 3, 4]
 *          a. target.slice(3, 5) !== 'ab'; continue
 *          b. target.slice(3, 6) !== 'abc'; continue
 *          c. target.slice(3, 5) !== 'cd'; continue
 *          d. target.slice(3, 6) === 'def'; set table[6] to table[46]+1= 0+1 = 1
 *          e. target.slice(3, 7) !== 'abcd'; continue
 *      array viz:
 *          [1, 0, 1, 1, 2, 0, 1]
 * 
 * fifth pass.current position: table[4] = 2  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[4] !== 0: traverse `wordBank`
 *      2. traversing `wordBank`: k=[2, 3, 2, 3, 4]
 *          a. target.slice(4, 5) !== 'ab'; continue
 *          b. target.slice(4, 6) !== 'abc'; continue
 *          c. target.slice(4, 5) !== 'cd'; continue
 *          d. target.slice(4, 6) !== 'def'; continue
 *          e. target.slice(4, 7) !== 'abcd'; continue
 *      array viz:
 *          [1, 0, 1, 1, 2, 0, 1]
 * 
 * sixth pass.current position: table[5] = 0  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[5] === 0: continue
 *      array viz:
 *          [1, 0, 1, 1, 2, 0, 1]
 * 
 * seventh pass.current position: table[6] = 1  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[4] !== 0: traverse `wordBank`
 *      2. traversing `wordBank`: k=[2, 3, 2, 3, 4]
 *          a. target.slice(6, 8) !== 'ab'; continue
 *          b. target.slice(6, 9) !== 'abc'; continue
 *          c. target.slice(6, 8) !== 'cd'; continue
 *          d. target.slice(6, 9) !== 'def'; continue
 *          e. target.slice(6, 10) !== 'abcd'; continue
 *      array viz:
 *          [1, 0, 1, 1, 2, 0, 1]
 * 
 * return
 *      table[target.length] = table[6] = 1
 *      meaning there is only one way to create the string `abcdef` by concatenating elements of
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
 * countConstruct has quadratic time complexity and linear space complexity
 * 
 * size of `table` will always be m. worst-case scenario: iterate over m elements
 * while performing n operations on each. also, we have to choose the elements of `wordBank`
 * that match the next element of the string `target`; worst-case length of the next matching
 * element is m. time complexity is O((m^2)*n)
 * 
 * #ops performed per iteration/pass depends on #words in wordBank; in other words, n
 * worst-case scenario: every element of wordBank appears at the beginning of
 * target; the number of ops will be n
 * 
 * the  `slice` op on `target`: requires that target be iterated on. worst-case scenario
 * is the same as size of table, m
 * 
 * time complexity is O((m^2) * n) and space complexity is O(m)
 */

const countConstruct = (target, wordBank) => {
    const table = new Array(target.length+1).fill(0)
    table[0] = 1

    for(let i=0; i<=target.length; ++i){
        if(table[i]!==0){
            for(let j of wordBank){
                const k = j.length
                if(target.slice(i, i+k)===j){
                    table[i+k] += table[i]
                }
            }
            // if(table[target.length]===1) return table[target.length] //optional return
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
        target: 'purple',
        wordBank: ['purp', 'p', 'ur', 'le', 'purpl'],
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
    console.log(`input: ${obj.target}: return: ${countConstruct(obj.target, obj.wordBank)}`);
})