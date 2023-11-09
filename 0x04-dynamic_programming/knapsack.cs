using System;

namespace ZeroOneKnapsackSolution
{
    class Program
    {
        static void Main(string[] args)
        {
            /*
                mass = {8, 2, 6, 1}
                value = {7500, 22500, 31500, 4500}
                load cap = 12
            */

            int[] masses = new int[]{0, 8, 2, 6, 1};
            int[] values = new int[]{7500, 22500,31500, 4500};

            int[,] memo - new int[5, 13];

            const int n = 4;
            const int loadCap = 10;

            for(int i=0; i<=n; i++)
            {
                for(int j=0; j<=loadCap; j++)
                {
                    if(i==0 || j==0)
                    {
                        memo[i, j] = 0;
                    }
                    else if(masses[i]<=j)
                    {
                        memo[i, j] = Math.Max(
                            values[i] + memo[i-1, j-masses[i]],
                            memo[i-1, j]
                        );
                    }
                    else
                    {
                        memo[i, j] = memo[i, j-1];
                    }
                }
            }
            Console.WriteLine($"Max value of items included in container: {memo[i, j]}");
            Console.ReadKey();
        }
    }
}