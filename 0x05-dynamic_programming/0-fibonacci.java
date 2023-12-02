import java.util.HashMap;

class Source{
    public static int fibonacciRecusive(int n){
        if(n==0 || n==1) return n;

        return fibonacciRecusive(n-1) + fibonacciRecusive(n-2);
    }

    public static int fibonacciMemo(int n){
        return fibonacciMemo(n, new HashMap<>());
    }

    private static int fibonacciMemo(int n, HashMap<Integer, Integer> memo){
        if(memo.containsKey(n)) return memo.get(n);
        if(n==0 || n==1) return n;

        int result = fibonacciMemo(n-1, memo) + fibonacciMemo(n-2, memo);
        memo.put(n, result);

        return result;
    }

    public static void main(String[] args){
        int[] arr = {0, 1, 3, 5, 10, 15, 50, 100};
        for(int i: arr){
            int result = fibonacciMemo(i);
            String message = MessageFormat.format("fib({0}) is {1}", i, result);
            System.out.println(message);
        }
    }
}