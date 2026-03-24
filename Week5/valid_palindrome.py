# valid palindrome
# Brute force approach:
def isPalindrome(s):
    cleaned = ''
    for char in s:
        if char.isalnum():
            cleaned += char.lower()
    return cleaned == cleaned[::-1]
# Time Complexity: O(n) - We traverse the string once to clean it and then compare it with its reverse.
# Space Complexity: O(n) - We create a new string to store the cleaned version.

# Optimized approach - using two pointers
def isPalindrome(s):
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True

# Time Complexity: O(n) - We traverse the string once with two pointers.
# Space Complexity: O(1) - We are using a constant amount of extra space for

if __name__ == "__main__":
    s = "Was it a car or a cat I saw?"
    print(isPalindrome(s))  # Output: True