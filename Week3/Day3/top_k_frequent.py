# top k frequenet elements
def top_k_frequent(nums, k):
    # Brute Force Approach
    # freq = []

    # for num in nums:
    #     count = nums.count(num)
    #     freq.append(num,count)
    
    # freq = list(set(freq))
    # freq.sort(keys = lambda x:x[1], reverse=True)

    # result = []
    # for i in range(k):
    #     result.append(freq[i][0])
    
    # return result
    # Time Complexity: O(n^2); Space Complexity: O(n)

    # Better Approach - Hashmap + Sorting
    # freq = {}

    # for num in nums:
    #     if num in freq:
    #         freq[num]+=1
    #     else:
    #         freq[num]=1
    # sorted_freq = sorted(freq.items(), key=lambda x: x[1], reverse=True)
    # result = []
    # for i in range(k):
    #     result.append(sorted_freq[i][0])
    # return result
    # # Time Complexity: O(n log n); Space Complexity: O(n)

    # Optimal Approach
    # from collections import defaultdict
    # freq = defaultdict(int)
    # for num in nums:
    #     freq[num] += 1
    # bucket = [[] for _ in range(len(nums) + 1)]
    # for num, count in freq.items():
    #     bucket[count].append(num)
    # result = []
    # for i in range(len(bucket) - 1, 0, -1):
    #     for num in bucket[i]:
    #         result.append(num)
    #         if len(result) == k:
    #             return result
    # Time Complexity: O(n); Space Complexity: O(n)
    
    # Optimal with built-in Counter
    from collections import Counter
    return [num for num, _ in Counter(nums).most_common(k)]

if __name__ == "__main__":
    nums = [1,1,1,2,2,3]
    k = 2
    print(top_k_frequent(nums, k))  # Output: [1, 2]

