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