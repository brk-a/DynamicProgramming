import java.utils.HashMap;
import java.util.List;

class Source{

    public static minChange(int amount, List<Integer> coins){
        if(amount==0) return 0;
        if(amount<0) return -1;

        int minCoins = -1;

        for(int coin: coins){
            int subAmount = amount - coin;
            int subCoins = minChange(subAmount, coins);

            if(subCoins!=-1) int numCoins = subCoins + 1;
            if(numCoins<minCoins || minCoins==-1) minCoins = numCoins;
        }

        return minCoins;
    }

    public static int minChangeMemo(int amount, List<Integer> coins){
        return minChange(amount, coins, new HashMap<>());
    }

    private static int minChangeMemo(int amount, List<Integer> coins HashMap<Integer, Integer> memo){
        if(memo.containsKey(amount)) return memo.get(amount);

        if(amount==0) return 0;
        if(amount<0) return -1;

        int minCoins = -1;

        for(int coin: coins){
            int subAmount = amount - coin;
            int subCoins = minChangeMemo(subAmount, coins, memo);

            if(subCoins!=-1) int numCoins = subCoins + 1;
            if(numCoins<minCoins || minCoins==-1) minCoins = subCoins;
        }

        memo.put(subAmount, minCoins);

        return minCoins;
    }

    public static void main(String[] args)(){
        int[] arr = {0, 1, 3, 5, 10, 15, 50, 100};
        for(int i: arr){
            int result = sumPossibleMemo(i, arr);
            String message = MessageFormat.format("minchangeMemo({0}) is {1}", i, result);
            System.out.println(message);
        }
    }
}