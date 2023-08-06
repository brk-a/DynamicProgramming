'''
write a fn `fib(n)` that takes an int as an argument
said fn should return the nth term of the Fibonacci
sequence in a little time as possible

fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, ...
fib(n) = fib (n-1) + fib(n-2)
fib(0) = 0 and fib(1) = 1
'''

# Method 1: Recursion

def fib(n):
    """ get the nth number in the sequence"""
    if n<0:
        print("n must be greater than or equal to zero")
        return
    if n==0:
        return 0
    if n==1 or n==2:
        return 1
    return fib(n-1) + fib(n-2)

arr = [-1, 0, 1, 3, 5, 10, 20, 100 ]

# for i in arr:
#     print(f"n = {i}: fib({i}) = {fib(i)}")

#########################################################################

# Method 2: Memoisation
def fibMemo(n, memo={}):
    """ get the nth number in the sequence"""
    if n in memo.keys():
        return memo[n]
    if n<0:
        print("n must be greater than or equal to zero")
        return
    if n==0:
        return 0
    if n==1 or n==2:
        return 1
    memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo)
    return memo[n]

# for i in arr:
#     print(f"n = {i}: fibMemo({i}) = {fibMemo(i)}")

#########################################################################

# Method 3: Tabulation
def fibTab(n):
    """ get the nth number in the sequence"""
    if n<0:
        print("n must be greater than or equal to zero")
        return
    if n==0:
        return 0
    if n==1:
        return 1
    if n>=2:
        table = [0 for i in range(n+1)]
        table[1] = 1

        for i in range(2, n+1):
            table[i] = table[i-1] +  table[i-2]

    return table[n]

for i in arr:
    print(f"n = {i}: fibTab({i}) = {fibTab(i)}")

#########################################################################
