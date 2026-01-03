# Check if 2 strings are anagrams
from collections import Counter
def are_anagrams(str1, str2):
    # Brute Force Approach
    # if len(str1)!=len(str2):
    #     return False    
    # str2 = list(str2)
    # for char in str1:
    #     if char in str2:
    #         str2.remove(char)
    #     else:
    #         return False
    # return True
    # TC - O(n^2) ; SC - O(1)

    # Better Approach using Sorting
    # if len(str1)!=len(str2):
    #     return False
    # return sorted(str1) == sorted(str2)
    # TC - O(n log n) ; SC - O(n)

    # Optimal Approach using HashMap
    if len(str1)!=len(str2):
        return False
    char_count = {}
    for char in str1:
        char_count[char] = char_count.get(char, 0)
    for char in str2:
        if char not in char_count:
            return False
        char_count[char] -= 1
        if char_count[char] < 0:
            return False
    return True
    # TC - O(n) ; SC - O(n)

    # Optimal Pro Max    
    return Counter(s) == Counter(t)




if __name__ == "__main__":
    str1 = "listen"
    str2 = "silcten"
    result = are_anagrams(str1, str2)
    if result:
        print(f'"{str1}" and "{str2}" are anagrams.')
    else:
        print(f'"{str1}" and "{str2}" are not anagrams.')