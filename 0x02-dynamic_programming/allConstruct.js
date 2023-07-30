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
 * countConstruct should return []. we have a base/seed case
 */

/**
 * take countConstruct('', ['oh, ', 'for', 'fox', 'sake', '!'])
 * 
 * target is an empty string;  only one way to construct an empty string from
 * an array of non-empty strings: concatenate nothing from the array 
 * 
 * allConstruct should return an array of an empty array viz: [[]]
 * we have a base/seed case
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
 * walk through allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd']) -> [['abc', 'def']]
 * 
 *  * create an array, `table`, of length target.length plus one; initialise it with `[]` refer
 * to `allConstruct('bougainvellia', ['ou', 'gain', 'vil', 'bo', 'liea'])` above
 * array viz:
 *      [[], [], [], [], [], [], []]
 * 
 * recall: allConstruct('', [...]) -> [[]]; set table[0] to be [[]]
 * array viz:
 *      [[[]], [], [], [], [], [], []]
 * 
 * for i in table do:
 *      1. check if table[i] === []
 *      2. table[i] === []: continue
 *      3. table[i] !== []: for j in wordBank do:
 *          a. evaluate k = wordBank[j].length
 *          b. evaluate i+k
 *          c. check if target.slice(i, i+k) === j
 *          d. target.slice(i, i+k) !== j: continue
 *          e. target.slice(i, i+k) === j: spread j to  table[i]
 *          f. target.slice(i, i+k) === j: spread table[i] into table[i+k]
 *      4. return table[target.length]
 * 
 * first pass.current position: table[0] = [[]]  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[0] !== []: traverse `wordBank`
 *      2. traversing `wordBank`: k=[2, 3, 2, 3, 4]
 *          a. target.slice(0, 2) === 'ab': spread j into table[0]; spread table[0] to table[2] -> [['ab']]
 *          b. target.slice(0, 3) === 'abc': spread j into table[0]; spread table[0] to table[3] -> [['abc']]
 *          c. target.slice(0, 2) !== 'cd': continue
 *          d. target.slice(0, 3) !== 'def': continue
 *          e. target.slice(0, 4) === 'abcd': spread j into table[0]; spread table[0] to table[4] -> [['abcd']]
 *      array viz:
 *          [[[]], [], [['ab']], [['abc']], [['abcd']], [], []]
 * 
 * second pass.current position: table[1] = []  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[1] []== []: continue
 *      array viz:
 *          [[[]], [], [['ab']], [['abc']], [['abcd']], [], []]
 * 
 * third pass.current position: table[2] = [['ab']]  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[0] !== []: traverse `wordBank`
 *      2. traversing `wordBank`: k=[2, 3, 2, 3, 4]
 *          a. target.slice(2, 4) !== 'ab': continue
 *          b. target.slice(2, 5) !== 'abc': continue
 *          c. target.slice(2, 4) === 'cd': spread j into table[2]; spread table[2] to table[4] -> [['abcd'], ['ab','cd']]
 *          d. target.slice(2, 5) !== 'def': continue
 *          e. target.slice(2, 6) !== 'abcd': continue
 *      array viz:
 *          [[[]], [], [['ab']], [['abc']], [['abcd'], ['ab', 'cd']], [], []]
 * 
 * fourth pass.current position: table[3] = [['abc']]  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[3] !== []: traverse `wordBank`
 *      2. traversing `wordBank`: k=[2, 3, 2, 3, 4]
 *          a. target.slice(3, 5) !== 'ab': continue
 *          b. target.slice(3, 6) !== 'abc': continue
 *          c. target.slice(3, 5) === 'cd': continue
 *          d. target.slice(3, 6) === 'def': spread j into table[3]; spread table[3] to table[6] -> [['abc', 'def']]
 *          e. target.slice(3, 7) !== 'abcd': continue
 *      array viz:
 *          [[[]], [], [['ab']], [['abc']], [['abcd'], ['ab', 'cd']], [], [['abc', 'def']]]
 * 
 * fifth pass.current position: table[4] = [['abcd'], ['ab', 'cd']]  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[4] !== []: traverse `wordBank`
 *      2. traversing `wordBank`: k=[2, 3, 2, 3, 4]
 *          a. target.slice(4, 6) !== 'ab': continue
 *          b. target.slice(4, 7) !== 'abc': continue
 *          c. target.slice(4, 6) 1== 'cd': continue
 *          d. target.slice(4, 7) !== 'def': continue
 *          e. target.slice(4, 8) !== 'abcd': continue
 *      array viz:
 *          [[[]], [], [['ab']], [['abc']], [['abcd'], ['ab', 'cd']], [], [['abc', 'def']]]
 * 
 * sixth pass.current position: table[5] = []  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[5] === []: continue
 *      array viz:
 *          [[[]], [], [['ab']], [['abc']], [['abcd'], ['ab', 'cd']], [], [['abc', 'def']]]
 * 
 * seventh pass.current position: table[6] = [['abc', 'def']] wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[6] !== []: traverse `wordBank`
 *      2. traversing `wordBank`: k=[2, 3, 2, 3, 4]
 *          a. target.slice(6, 8) !== 'ab': continue
 *          b. target.slice(6, 9) !== 'abc': continue
 *          c. target.slice(6, 8) 1== 'cd': continue
 *          d. target.slice(6, 9) !== 'def': continue
 *          e. target.slice(6, 10) !== 'abcd': continue
 *      array viz:
 *          [[[]], [], [['ab']], [['abc']], [['abcd'], ['ab', 'cd']], [], [['abc', 'def']]]
 * 
 * return
 *      table[target.length] = table[6] = [['abc', 'def']]
 *       meaning there is only one way to create the string `abcdef` by concatenating elements of
 *      `wordBank`
 *      sanity check: abcdef = abc + def
 */

/**
 * complexity; complexity everywhere...
 * 
 * let m = target.length and n  wordBank.length
 * 
 * allConstruct has exponential time and space complexity
 * 
 * m iterations while performing n operations on, worst case, m sub-iterations (we have to
 * choose the elements of `wordBank`that match the next element of the string `target`; worst-case length of the next matching
 * element is m). time complexity is at least O(n^m)
 * 
 * size of `table` will always be m. each element of `table` is a 2D array of, worst-case, size n
 * 
 * time and space  complexity are ~O(n^m)
 */

const allConstruct = (target, wordBank) => {
    const table = new Array(target.length+1).fill().map(() => [])
    table[0] = [[]]

    for(i=0; i<=target.length; ++i){
        if(table[i]!==[]){
            for(j of wordBank){
                const k = j.length
                if(target.slice(i, i+k)===j){
                    table[i+k] = [...table[i+k], table[i].map(subArray => [...subArray, j])]
                }
            }
            //no early return because solution requires all combinations
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
    console.log(`input: ${obj.target}: return: ${allConstruct(obj.target, obj.wordBank)}`);
})