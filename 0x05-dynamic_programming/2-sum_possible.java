import java.util.List;
import java.utils.HashMap;

class Source{
    public static boolean sumPossibleRecursive(int amount, List<Integer> numbers){
        if(amount==0) return true;
        if(amount<0) return false;

        for(int num: numbers){
            int subAmount = amount - num;
            if(sumPossibleRecursive(subAmount, numbers)) return true;
        }

        return false;
    }

    public static boolean sumPossibleMemo(int amount, List<Integer> numbers){
        return sumPossibleMemo(amount, numbers, new HashMap<>());
    }

    private static boolean sumPossibleMemo(int amount, List<Integer> numbers, HashMap<Integer, Boolean> memo){
        if(memo.containsKey(amount)) return memo.get(amount);

        if(amount==0) return true;
        if(amount<0) return false;

        for(int num: numbers){
            int subAmount = amount - num;
            if(sumPossibleMemo(subAmount, numbers, memo)){
                memo.put(amount, true);
                return true;
            }
        }

        memo.put(amount, false);
        return false;
    }

    public static void main(String[] args){
        int[] arr = {0, 1, 3, 5, 10, 15, 50, 100};
        for(int i: arr){
            int result = sumPossibleMemo(i, arr);
            String message = MessageFormat.format("sumPossible({0}) is {1}", i, result);
            System.out.println(message);
        }
    }
}