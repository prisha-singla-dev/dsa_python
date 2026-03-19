# longest subsequence
# Brute force approach
def longest_subsequence(arr):
    longest = 0

    for num in arr:
        current = num
        length = 1

        while current + 1 in arr:
            current += 1
            length += 1

        longest = max(longest, length)
    return longest
# Time Complexity: O(n^2) - In the worst case, we may have to check each element for every other element in the array.
# Space Complexity: O(1) - We are using a constant amount of extra space.

# Optimized approach - using a set to achieve O(n) time complexity
def longest_subsequence(arr):
    num_set = set(arr)
    longest = 0

    for num in arr:
        if num - 1 not in num_set:  # Check if it's the start of a sequence
            current = num
            length = 1

            while current + 1 in num_set:
                current += 1
                length += 1

            longest = max(longest, length)

    return longest

# Time Complexity: O(n) - We traverse the array once to create the set and then again to find the longest sequence. Each lookup in the set is O(1).
# Space Complexity: O(n) - We are using a set to store the unique elements of

if __name__ == "__main__":
    arr = [100, 4, 200, 1, 3, 2]
    print(longest_subsequence(arr))  # Output: 4 (the longest sequence is [1, 2, 3, 4])