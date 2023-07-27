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
 * take canConstruct('', ['oh', ',', 'fox', 'sake', '!'])
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
 *          c. check if i+k > targetSum
 *          d. i+k > targetSum: continue
 *          e. i+k <= targetSum: check if wordbank[j].slice[0, 1]===target[i+1]
 *          f. wordbank[j].slice[0, 1]!==target[i+1]: continue
 *          g. wordbank[j].slice[0, 1]===target[i+1]: set table[i+k] to `true`
 *      4. return table[target.length]
 * 
 * first pass. current position: table[0] = `true`,  wordBank = ['ab', 'abc', 'cd', 'def', 'abcd']
 *      1. table[0] = `true`; traverse `wordBank`
 *      2. traversing `wordBank`
 *          a. 0+2=2 <= 7; wordBank[0].slice[0,1]===target[2]: set table[2] to `true`
 *          b. 0+3=3 <= 7; wordBank[0].slice[0,1]===target[2]: set table[2] to `true`
 *          c. 0+2=2 <= 7; wordBank[0].slice[0,1]===target[2]: set table[2] to `true`
 *          d. 0+3=3 <= 7; wordBank[0].slice[0,1]===target[2]: set table[2] to `true`
 *          e. 0+4=4 <= 7; 
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `false`, `false`, `true`]
 * 
 * second pass. current position: table[1] = `false`,  numbers = [5, 3, 4, 7]
 *      1. table[1] = `false`;  do not traverse `numbers`
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `false`, `false`, `true`]
 * 
 * third pass. current position: table[2] = `true`,  numbers = [5, 3, 4, 7]
 *      1. table[2] = `true`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 2+5=7 <= 7; set table[7] to `true`
 *          b. 2+3=5 <= 7; set table[5] to `true`
 *          c. 2+4=6 <= 7; set table[6] to `true`
 *          d. 2+7=9 <= 7; continue
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `true`, `true`, `true`]
 * 
 * fourth pass. current position: table[3] = `true`,  numbers = [5, 3, 4, 7]
 *      1. table[4] = `true`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 3+5=8 > 7; continue
 *          b. 3+3=6 <= 7; set table[6] to `true`
 *          c. 3+4=7 <= 7; set table[7] to `true`
 *          d. 3+7=10 > 7; continue
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `true`, `true`, `true`]
 * 
 * fifth pass. current position: table[4] = `true`,  numbers = [5, 3, 4, 7]
 *      1. table[4] = `true`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 4+5=9 > 7;  continue
 *          b. 4+3=7 <= 7; set table[7] to `true`
 *          c. 4+4=8 > 7;  continue
 *          d. 4+7=11 > 7; continue
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `true`, `true`, `true`]
 * 
 * sixth pass. current position: table[5] = `true`,  numbers = [5, 3, 4, 7]
 *      1. table[5] = `true`; traverse `numbers`
 *      2. traversing `numbers`
 *          a. 5+5=10 > 7; continue
 *          b. 5+3=8 > 7; continue
 *          c. 5+4=9 > 7; continue
 *          d. 5+7=12 > 7; continue
 *      table viz:
 *          [`true`, `false`, `false`, `true`, `true`, `true`, `true`, `true`]
 * 
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