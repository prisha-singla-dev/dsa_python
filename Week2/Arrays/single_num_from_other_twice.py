# find the single number in an array where every other number appears twice
def single_number(nums):
    # Brute Force Approach
    # n = len(nums)
    # for i in range(0,n):
    #     num = nums[i]
    #     count = 0
    #     for j in range(0,n):
    #         if nums[j] == num:
    #             count += 1
    #     if count == 1:
    #         return num
    # Time Complexity: O(n^2), Space Complexity: O(1)

    # Better approach using HashMap
    # num_count = {}
    # for num in nums:
    #     if num in num_count:
    #         num_count[num] += 1
    #     else:
    #         num_count[num] = 1
    # for num, count in num_count.items():
    #     if count == 1:
    #         return num
    # Time Complexity: O(n), Space Complexity: O(n)
    # But we cant use hashmap everytime - in case of negative numbers or large range of numbers
    # instead we use a ordered map
    # Optimal approach using XOR
    single_num = 0
    for num in nums:
        single_num ^= num
    return single_num
    # Time Complexity: O(n), Space Complexity: O(1)
        


if __name__ == "__main__":
    nums = [4,1,2,1,2]
    print(single_number(nums))
