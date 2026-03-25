# 3 sum 
# Brute Force Approach: O(n^3) time complexity
# def threeSum(nums):
#     n = len(nums)
#     result = set()
#     for i in range(n-2):
#         for j in range(i+1,n-1):
#             for k in range(j+1,n):

#                 total = nums[i]+nums[j]+nums[k]
#                 if total == 0:
#                     triplet = tuple(sorted([nums[i],nums[j],nums[k]]))
#                     result.add(triplet)
#     return result
# Time Complexity: O(n^3) - We have three nested loops to check all combinations of three numbers.
# Space Complexity: O(m) - Where m is the number of unique triplets that sum

# Optimized Approach: O(n^2) time complexity, space complexity - 0(1)
def threeSum(nums):
    nums.sort()
    result = []
    n = len(nums)

    for i in range(n):
        if i>0 and nums[i] == nums[i-1]:
            continue

        left = i+1
        right = n-1

        while left<right:
            total = nums[i]+nums[left]+nums[right]

            if total == 0 :
                result.append([nums[i],nums[left],nums[right]])
                while left<right and nums[left] == nums[left+1]:
                    left+=1
                while left<right and nums[right]==nums[right-1]:
                    right -=1

                left+=1
                right-=1
            
            elif total<0:
                left+=1
            else:
                right-=1
    return result



if __name__ == "__main__":
    nums = [-1, 0, 1, 2, -1, -4]
    print(threeSum(nums))  # Output: {(-1, -1, 2), (-1, 0, 1)}