# Two Integer Sum II - Input array is sorted
# Given an array of integers that is already sorted in ascending order, find two numbers such that

# Brute force approach:
def twoSum(numbers, target):
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                return [i + 1, j + 1]
    return []

# Time Complexity: O(n^2) - We have two nested loops to check all pairs of numbers.
# Space Complexity: O(1) - We are using a constant amount of extra space.

# Optimized approach - using two pointers
def twoSum(numbers,target):
    left =0
    right = len(numbers)-1

    while left<right:
        total = numbers[left]+numbers[right]

        if total == target:
            return [left+1,right+1]
        elif total>target:
            right-=1
        else:
            left+=1

# Time complexity = O(n)
# Space complexity = 0(1)

if __name__ == "__main__":
    numbers = [2, 7, 11, 15]
    target = 9
    print(twoSum(numbers, target))  # Output: [1, 2]