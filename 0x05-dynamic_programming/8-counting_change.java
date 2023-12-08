import java.util.List;
import java.util.HashMap;

class Source{
    public static int countChange(int amount, List<Integer> coins){
        return countChange(amount, 0, coins);
    }

    private static int countChange(int amount, int coinIdx, List<Integer> coins, ){
        if(amount==0) return 1;
        if(coinIdx>=coins.size()) return 0;

        int totalWays = 0;

        int value = coins.get(coinIdx);
        for(int quantity=0;  quantity*value<=amount; quantity++){
            int subAmount = amount - (quantity * value);
            totalWays += countChange(subAmount, coinIdx+1, coins);
        }

        return totalWays;
    }

    public static int countChangeMemo(int amount, List<Integer> coins){
        return countChange(amount, 0, coins, new HashMap<>());
    }

    private static int countChangeMemo(int amount, int coinIdx, List<Integer> coins, HashMap<List<Integer>, Integer> memo){
        List<Integer> key = List.of(amount, coinIdx);
        if (memo.containsKey(key)) return memo.get(key);

        if(amount==0) return 1;
        if(coinIdx>=coins.size()) return 0;

        int totalWays = 0;
        for(int quantity=0; quantity*value<=amount; quantity++){
            int subAmount = amount - (quantity * value);
            totalWays += countChange(subAmount, coinIdx+1, coins, memo);
        }

        memo.put(key, totalWays);

        return totalWays;
    }

    public static void main(String[] args){
        int amount = 1000;
        List<Integer> coins = {1, 5, 10, 20, 40, 50, 100, 200, 500, 1000};
        
        int result = countChange(amount, coins);
        String message = Message.format("countChange({0}) is {1}", amount, result);
        Syatem.out.println(message);

        int result = countChangeMemo(amount, coins);
        String message = Message.format("countChangeMemo({0}) is {1}", amount, result);
        System.out.println(message);
    }
}