/**
 * get the nth term of the Fib
 * sequence in a little time as possible
 *
 */

// classic/conventional way to get the nth term -> recursion:
const fib = (n) => {
    if (n <= 2) return 1
    return fib(n - 1) + fib(n - 2) 
}

const arr = [1, 2, 5, 8, 10, 20, 50]
for (let i=0; i<arr.length; ++i){
    console.log(`fib ${arr[i]}: ${fib(arr[i])}`)
}

/**
 * notice how the algo gets progressively slower
 * what can be done?
 * relaaax... uncle Frankie's got you
 */
 
//1. understand why it takes so long
// suppose you have two functions: dib and lib
const dib = (n) => {
    if (n<=1) return 1
    dib(n-1)
    dib(n-1)
}

const lib = () => {
    if (n<=1) return 1
    lib(n-2)
    lib(n-2)
}

// dib()  will take exponential time because each call is recursive twice for n
// dib() takes constant time because only n calls will be made per branch and branches are evaluated sequentially
// english: say n=5. 
/**
 * level 0; root: dib(5) calls dib(4) and dib(4). 
 * level 1; LHS: dib(4) calls dib(3)  and dib(3) RHS:  dib(4) calls dib(3) and  dib(3)
 * level 2; LHS: dib(3) calls dib(2)  and dib(2), dib(3) calls dib(2) and dib(2) RHS:  dib(3) calls dib(2) and dib(2), dib(3) calls dib(2) and dib(2)
 * level 3; LHS: dib(2) calls dib(1)  and dib(1), dib(2) calls dib(1)  and dib(1), dib(2) calls dib(1)  and dib(1), dib(2) calls dib(1)  and dib(1) RHS: dib(2) calls dib(1)  and dib(1), dib(2) calls dib(1)  and dib(1), dib(2) calls dib(1)  and dib(1), dib(2) calls dib(1)  and dib(1)
 * 
 * dib(1) is base case; return 1 to parent. long story short return 1 up the tree so that dib(5) returns 1
 * 
 * notice the recursive calls increase by a factor of 2, that is, 2 to the nth power as we go down the tree
 * machine evaluates dib 5, 4, 3, 2, 1; gets to the base case; base case returns 1; other node of base case returns 1; etc
 * */

// lib()  will take exponential time because each call is recursive twice for n
// lib() takes constant time because only n calls will be made per branch and branches are evaluated sequentially
// english: say n=5. 
/**
 * level 0; root: lib(5) calls lib(3) and lib(3). 
 * level 1; LHS: lib(3) calls lib(1)  and lib(1) RHS:  lib(3) calls lib(1) and  lib(1)
 * 
 * lib(1) is base case; return 1 to parent. long story short return 1 up the tree so that lib(5) returns 1
 * 
 * notice the recursive calls increase by a factor of 2, that is, 2 to the nth power as we go down the tree
 * machine evaluates lib 5, 3, 1; gets to the base case; base case returns 1; other node of base case returns 1; etc
 * */

/**
 * time complexity:
 * dib -> o(n), lib -> o(n)
 * 
 * space complexity:
 * dib -> o(2^n), lib -> o(2^n)
 * 
 * fib is in the middle; think about it this way:
 * fib calls fib(n-1) as dib does; fib calls fib(n-2) as lib does
 * 
 * therefore, the time and space complexity is, more or less, between dib and lib
 * which means that fib has  o(n) time complexity and o(2^n) space complexity
 */

//memoisation -> store the intermediate results so you can resuse them
const fibMemo = (n, memo={}) => {
    if(n in memo) return memo[n]
    if(n<=2) return 1
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]
}
for (let i=0; i<arr.length; ++i){
    console.log(`fibMemo ${arr[i]}: ${fibMemo(arr[i])}`)
}

/**
 * fibMemo has 2 params: n, the nth fib number and memo an object (default, empty)
 * new base case: check if n is in memo. if yes, return memo[n]
 * base case: check if n <=2. if yes, return 1
 * key n of object memo, if not base case, is the sum of the nth - 1 and nth - 2 terms
 *      notice how memo is passed to the recursive call. it is a cache of intrmediate values
 * return key n of memo once done 
 */

/**
 * say you want to evaluate fibMemo(5)...
 * call fibMemo(5); empty object
 * level 0: fibMemo(5) calls fibMemo(4) and fibMemo(3)
 * level 1: LHS: fibMemo(4) calls fibMemo(3) and fibMemo(2)[base case], RHS fibMemo(3) calls fibMemo(2)[base case] and fibMemo(1)[base case]
 * level 2: LHS: fibMemo(3) calls fibMemo(2)[base case] and fibMemo(1)[base case]
 * 
 * ####################################
 * level 2: LHS: fibMemo(2) returns 1 and fibMemo(1) returns 1. memo is set to {"3": 2}
 * level 1: LHS: fibMemo(3) is fetched from memo and fibMemo(2) returns 1. memo is set to {"3": 2, "4": 3}, RHS: fibMemo(3) is fetched from memo and fibMemo(2) returns 1. fibMemo(3) is already in memo
 * level 0: LHS: fibMemo(4) is fetched from memo, RHS:  fibMemo(3) is fetched from memo. memo is set to {"3": 2, "4": 3, "5", 5}. return memo[5] which is 5
 * fibMemo(5) returns 5
 * 
 * time complexity reduces from O(2^n) to O(n)
 */