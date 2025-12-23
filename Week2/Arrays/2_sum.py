# 2 sum
# First type - if the sum is to be found from any two numbers, return yes or no
def two_sum(nums, target):
    # Brute Force Approach
    # n = len(nums)
    # for i in range(n):
    #     for j in range(i+1, n):
    #         if nums[i] + nums[j] == target:
    #             return True
    # return False
    # Time Complexity: O(n^2), Space Complexity: O(1)

    # Better Approach using HashMap
    num_map = {}
    for num in nums:
        complement = target - num
        if complement in num_map:
            return True
        num_map[num] = True
    return False
    # Time Complexity: O(n), Space Complexity: O(n)

    # Optimal Approach - Sorting and Two Pointers
    # nums.sort()
    # left, right = 0, len(nums) - 1
    # while left < right:
    #     current_sum = nums[left] + nums[right]
    #     if current_sum == target:
    #         return True
    #     elif current_sum < target:
    #         left += 1
    #     else:
    #         right -= 1
    # return False
    # Time Complexity: O(n log n) due to sorting, Space Complexity: O(1)
    
    
# Second type - return indices of the two numbers such that they add up to a specific target
def two_sum(nums, target):
    # Brute Force Approach
    # n = len(nums)
    # for i in range(n):
    #     for j in range(i+1, n):
    #         if nums[i] + nums[j] == target:
    #             return (i, j)
    # return None
    # Time Complexity: O(n^2), Space Complexity: O(1)

    # Better Approach using HashMap
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return (num_map[complement], i)
        num_map[num] = i
    return None



if __name__ == "__main__":
    nums = [2,7,11,15]
    target = 9
    result = two_sum(nums, target)
    print("Two sum result:", result)