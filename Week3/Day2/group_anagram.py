# group anagrams.py
from collections import defaultdict
def group_anagrams(words):
    # Brute Force Approach (Commented Out)
    # anagram_groups = []
    # visited = [False] * len(words)
    # for i in range(len(words)):
    #     if visited[i]:
    #         continue
    #     current_group = [words[i]]
    #     visited[i] = True
    #     for j in range(i + 1, len(words)):
    #         if sorted(words[i]) == sorted(words[j]):
    #             current_group.append(words[j])
    #             visited[j] = True
    #     anagram_groups.append(current_group)
    # return anagram_groups
    # TC - O(N^2 * K log K), SC - O(N * K)

    # Better approach using a dictionary to group anagrams
    # anagram_dict = {}    
    # for word in words:
    #     # Sort the word to create a key
    #     sorted_word = ''.join(sorted(word))        
    #     # Add the word to the corresponding anagram group
    #     if sorted_word in anagram_dict:
    #         anagram_dict[sorted_word].append(word)
    #     else:
    #         anagram_dict[sorted_word] = [word]    
    # # Return the list of anagram groups
    # return list(anagram_dict.values())
    # Time Complexity: O(N * K log K) where N is the number of words and K is the maximum length of a word.
    # Space Complexity: O(N * K) for storing the anagram groups.

    # Optimal approach using character count as key
    group = defaultdict(list)
    for word in words:
        count = [0] * 26  # Assuming only lowercase a-z
        for char in word:
            count[ord(char) - ord('a')] += 1
        key = tuple(count)
        if key in group:
            group[key].append(word)
        else:
            group[key] = [word] 

    return group.values()
    # Time Complexity: O(N * K) where N is the number of words and K is the maximum length of a word.
    # Space Complexity: O(N * K) for storing the anagram groups.


    


# Example usage
if __name__ == "__main__":
    words = ["eat", "tea", "tan", "ate", "nat", "bat"]
    grouped_anagrams = group_anagrams(words)
    print(grouped_anagrams)