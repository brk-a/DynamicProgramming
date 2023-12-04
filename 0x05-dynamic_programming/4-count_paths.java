import java.util.List;
import java.util.HashMap;

class Source{
    public static int countPathsRecursive(List<List<String>> grid){
        return countPathsRecursive(0, 0, grid);
    }

    private static int countPathsRecursive(int r, int c,List<List<String>> grid){
        if(r==grid.size() || c==grid.get(0).size()) return 0;
        if(grid.get(r).get(c)=="X") return 0;
        if(r==grid.size()-1 && c==grid.get(0).size()-1) return 1;

        return countPathsRecursive(r+1, c, grid) + countPathsRecursive(r, c+1, grid);
    }

    public static int countPathsMemo(List<List<String>> grid){
        return countPathsMemo(0, 0, grid, new HashMap<>());
    }

    private static int countPathsMemo(int r, int c,List <List<String>> grid, HashMap<List<Integer>, Integer> memo){
        List<Integer> pos = List.of(r, c);
        if(memo.containsKey(pos)) return memo.get(pos);

        if(r==grid.size() || c==grid.get(0).size()) return 0;
        if(grid.get(r).get(c)=="X") return 0;
        if(r==grid.size()-1 && c==grid.get(0).size()-1) return 1;

        int result = countPathsRecursive(r+1, c, grid, memo) + countPathsRecursive(r, c+1, grid, memo);
        memo.put(pos, result);

        return result;
    }

    public static void main(String[] args){
        List<List<String>> arr = {
            {"O", "O", "O", "X", "X"},
            {"X", "O", "O", "O", "O"},
            {"O", "X", "O", "X", "O"},
            {"O", "O", "X", "O", "O"},
            {"X", "O", "O", "X", "O"},
            {"O", "X", "O", "0", "O"},
        };
        
        for(int i: arr){
            int result = countPathsRecursive(arr);
            String message = MessageFormat.format("countPathsRecursive({0}) is {1}", i, result);
            System.out.println(message);
        }
        for(int i: arr){
            int result = countPathsMemo(arr);
            String message = MessageFormat.format("countPathsMemo({0}) is {1}", i, result);
            System.out.println(message);
        }
    }
}