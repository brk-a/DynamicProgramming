import java.util.List;
import java.util.HashMap;

class Source{
    public static int maxNonAdjacentSumRecursive(List<Integer> nums){
        return maxNonAdjacentSumRecursive(nums, 0);
    }

    private static int maxNonAdjacentSumRecursive(List<Integer> nums, int i){
        if(i>=nums.size()) return 0;

        return Math.max(nums.get(i) + maxNonAdjacentSumRecursive(nums, i+2),
            maxNonAdjacentSumRecursive(nums, i+1));
    }

    public static int maxNonAdjacentSumMemo(List<Integer> nums){
        return maxNonAdjacentSumMemo(sum, 0, new HashMap<>());
    }

    private static int maxNonAdjacentSumMemo(List<Integer> nums, int i, HashMap<Integer, Integer> memo){
        if(i>=nums.size()) return 0;
        if(memo.containsKey(i)) return memo.get(i)

        int result = Math.max(nums.get(i) + maxNonAdjacentSumMemo(nums, i+2, memo),
            maxNonAdjacentSumMemo(nums, i+1, memo));
        
        memo.put(i, result);

        return result;
    }

    public static void main(String[] args){
        List<Integer> arr = {1, -1, -2, 2, 3, -3, -4, 4};

        int result = maxNonAdjacentSumRecursive(arr);
        String message = MessageFormat.format("maxNonAdjacentSumRecursive({0}) is {1}", arr, result);
        System.out.println(message);

        int result = maxNonAdjacentSumMemo(arr);
        String message = MessageFormat.format("maxNonAdjacentSumMemo({0}) is {1}", arr, result);
        System.out.println(message);
    }
}