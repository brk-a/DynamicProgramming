/**
 * write a fn `fib(n)` that takes an int as an argument
 * said fn should return the nth term of the Fibonacci
 * sequence in a little time as possible
 *
 * Assume that:
 *      1. fib(0) = 0
 *      2. fib(1) = 1
 *      3. fib(n) = fib(n-1) + fib(n-2)
 */

/**
 * WTF is tabulation?
 * 
 * glad you asked. tabulation is simply that; making a
 * table. idea is to solve the problem by iteration instead
 * of recursion
 * 
 * how TF do you do that?
 * eaa...sy; uncle Frankie's here for you 
 */

/**
 * say you want to calculate fib(6) (we know it will return 8)
 * 
 * your table will be an array of length 7 initialised with
 * zeroes viz: [0, 0, 0, 0, 0, 0, 0]
 * 
 * why an array? a 1-D array is, simply, a 1 by n table; 1 row by
 * n columns, where n is the length of the array
 * 
 * why zeroes? this particular problem requires addition (recall
 * assumption #3). zero is a rational initial value
 * 
 * why 7 and not 6? very good question. the problem requires this
 * and the nature of JS (zero-based indexing) lends itself well
 * to the problem. (zero to six is seven digits but six spaces; we
 * are interested in the digits, not spaces)
 * if, for example, the assumptions #1 and #2 were fib(1) = 1 and 
 * fib(2) = 1 then we would require an array of size 6,not 7
 * 
 * each element of the array is the return value of fib(n) where n
 * is the index of the array. we know that fib(0) = 0; so happens
 * (from the initial values we assigned) that the element at position
 * 0 is zero. fib(1) = 1, however, the element at position 1 is zero;
 * make that 1. the array viz: [0, 1, 0, 0, 0, 0, 0, 0]
 * 
 * recall assumption #3: fib(n-1) + fib(n-2). this tells us that
 * fib(n+1) and fib(n+2) require fib(n); that is, the next two elements
 * in the array require the current element. example, say n = 4. fib(4) =
 * fib(3) + fib(2). fib(3) = fib(2) + fib(1), fib(2) = fib(1) + fib(0).
 * the base cases, fib(1) and fib(0) are 1 and zero respectively.
 * if we are standing at position 2 (our current element)
 * we can see that said element will be required by the next one (fib(3))
 * and the one after (fib(4)), therefore, we can start a loop from
 * position 0
 * 
 * recall array viz: [0, 1, 0, 0, 0, 0, 0, 0]
 * `for` loop: start at position 0. take the element at that position and add it
 * to the elements in the next two positions
 * 
 * position 0: value of current element = 0
 *      value of next elem (n+1): 1. add 0. value = 1
 *      value of elem after (n+2): 0. add 0. value = 0
 * 
 * position 1: value of current element = 1
 *      value of next elem (n+1): 0. add 1. value = 1
 *      value of elem after (n+2): 0. add 1. value = 1
 * 
 * position 2: value of current element = 1
 *      value of next elem (n+1): 1. add 1. value = 2
 *      value of elem after (n+2): 0. add 1. value = 1
 * 
 * position 3: value of current element = 2
 *      value of next elem (n+1): 1. add 2. value = 3
 *      value of elem after (n+2): 0. add 2. value = 2
 * 
 * position 4: value of current element = 3
 *      value of next elem (n+1): 2. add 3. value = 5
 *      value of elem after (n+2): 0. add 3. value = 3
 * 
 * position 5: value of current element = 5
 *      value of next elem (n+1): 3. add 5. value = 8
 *      value of elem after (n+2): 0. add 5. value = 5
 *      however, elem at (n+2) is out of bounds, therefore,
 *      do not add anything to it. end operation instead.
 * 
 * operation ended: array viz: [0, 1, 1, 2, 3, 5, 8]
 * 
 * return array[-1] = 8, therefore, fib(6) returns 8; job done.
 *      
*/

/**
 * 
 * this method has linear time and space complexity
 * 
 * time complexity is O(n) because we, simply, iterate over an array
 * whose worst-case length is its length, n.
 * 
 * space complexity is O(n) because we, simply, manipulate the elements of the
 * array in place; the additions ops take negligible space on the stack frame
 * 
 */

const fib = (n) => {
    const table = new Array(n + 1).fill(0)
    // initialise first two values as base cases for Fibonacci sequence
    // table[0] = 0 //not necessary
    table[1] = 1

    for(let i=0; i<=n; ++i){ //i++ has the same effect in this case
        table[i+1] += table[i]
        table[i+2] += table[i] //=+ works too
    }

    return table[n]

}

const arr = [1, 2, 5, 8, 10, 20, 50]
for (let i=0; i<arr.length; ++i){
    console.log(`fib ${arr[i]}: ${fib(arr[i])}`)
}