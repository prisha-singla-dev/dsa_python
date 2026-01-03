# 2 sum 

# Second type - return indices of the two numbers such that they add up to a specific target
def two_sum(nums, target):
    # Brute force approach 
    # n = len(nums)
    # for i in range(n):
    #     for j in range(i+1, n):
    #         if nums[i]+nums[j] ==target:
    #             return (i,j)
    # return None
    # TC - O(n^2) ; SC - O(1)

    # Better Approach using HashMap
    num_mpp ={}
    for i,num in enumerate(nums):
        complement = target - num
        if complement in num_mpp:
            return [num_mpp[complement],i]
        num_mpp[num] = i
    return None
    # TC - O(n) ; SC - O(n)
    # Real-world use: Exactly how your cache works!

if __name__ =="__main__":
    nums = [2,7,11,15]
    target = 9
    result = two_sum(nums, target)
    if result:
        print(f"Indices of the two numbers that add up to {target} are: {result}")
    else:
        print("No two numbers add up to the target.")
    
