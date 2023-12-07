import java.util.List;
import java.util.HashMap;

class Source{
    public static int summingSquaresRecursive(int target){
        return (int) summingSquaresRecursive(target);
    }

    private static double summingSquaresRecursive(int target){
        if(target==0) return 0;

        double minSquares = Double.POSITIVE_INFINITY;

        for(int i=1; i<=Math.sqrt(target); i++){
            int square = i * i;
            double numSquares = summingSquaresRecursive(target - square) + 1;

            if(numSquares<minSquares) minSquares = numSquares;
        }

        return minSquares;
    }

    public static int summingSquaresMemo(int target){
        return (int) summingSquaresMemo(int target, new HashMap<>());
    }

    private static double summingSquaresMemo(int target, HashMap<Integer, Double> memo){
        if(memo.containsKey(target)) return memo.get(target);
        if(target==0) return 0;

        double minSquares = Double.POSITIVE_INFINITY;

        for(int i=1; i<=Math.sqrt(target); i++){
            int square = i * i;
            double numSquares = summingSquaresMemo(target-square, memo) + 1;

            if(numSquares<minSquares) minSquares = numSquares;
        }

        memo.put(target, minSquares);

        return minSquares;
    }

    public static void main(String[] args){
        List<Integer> arr = {10, 28, 99, 343, 10001, 99999, 1000001};

        for(int i: arr){
            int result = summingSquaresRecursive(arr);
            String message = MessageFormat.format("summingSquaresRecursive({0}) is {1}", i, result);
            System.out.println(message);
        }

        for(int i: arr){
            int result = summingSquaresMemo(arr);
            String message = MessageFormat.format("summingSquaresMemo({0}) is {1}", i, result);
            System.out.println(message)
        }
    }
}