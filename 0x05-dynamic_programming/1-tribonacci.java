import java.utils.HashMap;

class Source{
    public static int tribonacciRecursive(int n){
        if(n==0 || n==1) return n;
        if(n==2) return 1;

        return tribonacciRecursive(n-1) +
            tribonacciRecursive(n-2) +
            tribonacciRecursive(n - 3);
    }

    public static int tribonacciMemo(int n){
        return tribonacciMemo(n, new HashMap<>());
    }

    private static int tribonacciMemo(int n, HashMap<Integer, Integer> memo){
        if(memo.containsKey(n)) return memo.get(n);

        if(n==0 || n==1) return n;
        if(n==2) return 1;

        int result = tribonacciMemo(n-1, memo) +
            tribonacciMemo(n-2, memo) +
            tribonacciMemo(n-3, memo);
        
        memo.put(n, result);

        return result;
    }

    public static void main(String[] args){
        int[] arr = {0, 1, 3, 5, 10, 15, 50, 100};
        for(int i: arr){
            int res = tribonacciMemo(i);
            String message = MessageFormat.format("fib({0}) is {1}", i, result);
            System.out.println(message);
        }
    }
}