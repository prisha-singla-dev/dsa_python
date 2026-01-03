# contains duplicate
def contains_duplicate(nums):
    # # Brute Force Approach
    # n = len(nums)
    # for i in range(n):
    #     for j in range(i+1,n):
    #         if(nums[i]==nums[j]):
    #             return False
    # return True
    # # TC- O(n^2), SC- O(1)

    # Better approach using HashMap
    # num_mpp ={}
    # for num in nums:
    #     if num in num_mpp:
    #         return False
    #     num_mpp[num] = True
    # return True
    # TC- O(n), SC- O(n)

    # Optimal Approach - Using Set
    # num_set = set()
    # for num in nums:
    #     if num in num_set:
    #         return False
    #     num_set.add(num)
    # return True
    # TC- O(n), SC- O(n)

    # since set only keeps unique elements, we can compare lengths
    return len(nums) == len(set(nums))


if __name__ == "__main__":
    nums = [1,2,3,1]
    result = contains_duplicate(nums)
    if result:
        print("No duplicates found.")
    else:
        print("Duplicates exist in the array.")

