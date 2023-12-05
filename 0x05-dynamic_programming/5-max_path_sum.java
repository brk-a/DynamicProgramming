import java.util.List;
import java.util.HashMap;

class Source{
    public static int maxPathSumRecursive(List<List<Integer>> grid){
        return (int) maxPathSumRecursive(0, 0, grid);
    }

    private static double maxPathSumRecursive(int r, int c, List<List<Integer>> grid){
        if(r==grid.size() || c==grid.get(0).size()) return Double.NEGATIVE_INFINITY;
        if(r==grid.size()-1 && c==grid.get(0).size()-1) return grid.get(r).get(c);

        return grid.get(r).get(c) + Math.max(maxPathSumRecursive(r+1, c, grid), maxPathSumRecursive(r, c+1, grid));
    }

    public static int maxPathSumMemo(List<List<Integer>> grid){
        return (int) maxPathSumMemo(0, 0, grid, new HashMap<>());
    }

    private static double maxPathSumMemo(int r, int c, List<List<Integer>> grid, HashMap<List<Integer>, Double> memo){
        List<Integer> pos = List.of(r, c);
        if(memo.containsKey(pos)) return memo.get(pos);

        if(r==grid.size() || c==grid.get(0).size()) return Double.NEGATIVE_INFINITY;
        if(r==grid.size()-1 && c==grid.get(0).size()-1) return grid.get(r).get(c);

        double result = grid.get(r).get(c) + Math.max(maxPathSumRecursive(r+1, c, grid, memo), maxPathSumRecursive(r, c+1, grid, memo));
        memo.put(pos, result);

        return result;
    }


    public static void main(String[] args){
        List<List<String>> arr = {
            {1, 2, 3, 4, 5, 6},
            {6, 5, 4, 3, 2, 1},
            {3, 2, 1, 1, 2, 3},
        };
        
        int result = maxPathSumRecursive(arr);
        String message = MessageFormat.format("maxPathSumRecursive({0}) is {1}", i, result);
        System.out.println(message);

        int result = maxPathSumMemo(arr);
        String message = MessageFormat.format("maxPathSumMemo({0}) is {1}", i, result);
        System.out.println(message);
    }
}