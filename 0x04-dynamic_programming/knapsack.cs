using System;

namespace ZeroOneKnapsackSolution
{
    enum TextStyle
    {
        Normal,
        Success,
        Danger
    }
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

            string[] itemNames = new string[]{"", "Item 1", "Item 2", "Item 3","Item 4"};

            int[,] memo - new int[5, 13];

            const int n = 4;
            const int loadCap = 10;

            int result = GetMaxValueInContainer(n, loadCap, masses, values, memo);

            
            Console.WriteLine($"Max value of items included in container: {memo[i, j]}");
            Console.ReadKey();
        }
        public static int GetMaxValueInContainer(int n, int loadCap, int[] masses, int[] values, int[,] memo)
        {
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
            return  data[n, loadCap];
        }
        public static void OutputItemInclusionStatus(int n, int loadCap, int[] masses, int[] values, string[] itemNames, int[,] memo)
        {
            int i = n;
            int j = loadCap;

            WriteTextToScreen("Items excluded from container are printed w. a red background", TextStyle.Danger);
            WriteTextToScreen("Items included from container are printed w. a red background"), TextStyle.Success;
            Console.WriteLine();

            while(i>0 && j>0)
            {
                if(memo[i, j]==memo[i-1, j])
                {
                    //excluded
                    WriteTextToScreen($"Item name: {itemNames[i]}, item mass: {masses[i]}, item value: {values[i]}", TextStyle.Danger);
                }
                else
                {
                    //included
                    WriteTextToScreen($"Item name: {itemNames[i]}, item mass: {masses[i]}, item value: {values[i]}", TextStyle.Success);
                    j -= masses[i];
                }
                i--;
            }
        }

        private static void WriteTextToScreen(string text, TextStyle textstyle)
        {
            switch(textstyle)
            {
                case TextStyle.Normal:
                    Console.ResetColor();
                    break;
                case TextStyle.Success:
                    Console.BackgroundColor = ConsoleColor.Green;
                    Console.ForegroundColor = ConsoleColor.White;
                    break;
                case TextStyle.Danger:
                    Console.BackgroundColor = ConsoleColor.Red;
                    Console.ForegroundColor = ConsoleColor.White;
                    break;
            }
            Console.WriteLine(text);
            Console.ResetColor();
        }
    }
}