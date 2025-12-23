# missing nums
def find_missing_numbers(arr, n):
    # Brute Force Approach
    # for i in range(1,n):
    #     flag = 0
    #     for j in range(len(arr)):
    #         if arr[j] == i:
    #             flag = 1
    #             break
    #     if flag == 0:
    #         return i
        # Could not return all missing numbers, only first missing number is returned
        # Time Complexity: O(n^2), Space Complexity: O(1)
    
    # Better Approach
    # s = set(arr)
    # for i in range(n + 1):
    #     if i not in s:
    #         return i
    # Time Complexity: O(n), Space Complexity: O(n)

    # Optimal Approach-1 Using Sum Formula
    # total = n * (n + 1) // 2
    # sum_of_array = sum(arr)
    # return total - sum_of_array
    # Time Complexity: O(n), Space Complexity: O(1)

    # Optimal Approach-2 Using XOR
    n = len(arr)
    xor1,xor2 =0,0
    for i in range(n):
        xor1 ^= i
        xor2 ^= arr[i]

    xor1 ^= n   # include the last number

    return xor1 ^ xor2
    # return xor1 ^ xor2 ^ n
    # Time Complexity: O(n), Space Complexity: O(1)
        

    

if __name__ == '__main__':
    arr = [1, 2, 4, 5]
    n = 5
    missing_numbers = find_missing_numbers(arr, n)
    print("Missing numbers in the array are:", missing_numbers)