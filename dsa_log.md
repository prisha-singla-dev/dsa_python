# DSA Practice Log

## Day 1 - Sunday, Jan 4, 2026

### Problems Solved Today: 3 ✅

---

#### 1. Two Sum (Easy) ✅
- **Time taken:** ~20 min
- **Difficulty:** Easy
- **Pattern:** Hash Map for O(1) lookup
- **Key insight:** Store complement while iterating through array
- **Code:**
```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```
- **Real-world connection:** This is EXACTLY like cache.get() in my Cost Firewall! Hash map for instant lookups.
- **Interview confidence:** ✅ HIGH - Would solve this easily

---

#### 2. Valid Anagram (Easy) ✅
- **Time taken:** ~15 min
- **Difficulty:** Easy
- **Pattern:** Frequency counting with hash map
- **Key insight:** Count character frequencies and compare
- **Code:**
```python
from collections import Counter

def is_anagram(s, t):
    return Counter(s) == Counter(t)

# Or manual approach:
def is_anagram_manual(s, t):
    if len(s) != len(t):
        return False
    
    counts = {}
    for char in s:
        counts[char] = counts.get(char, 0) + 1
    
    for char in t:
        if char not in counts or counts[char] == 0:
            return False
        counts[char] -= 1
    
    return True
```
- **Real-world connection:** Keyword frequency analysis in my query complexity analyzer
- **Interview confidence:** ✅ HIGH - Simple and clear

---

#### 3. Contains Duplicate (Easy) ✅
- **Time taken:** ~10 min
- **Difficulty:** Easy
- **Pattern:** Set for uniqueness check
- **Key insight:** If set length != array length, there are duplicates
- **Code:**
```python
def contains_duplicate(nums):
    return len(nums) != len(set(nums))

# Or with hash map for O(n) single pass:
def contains_duplicate_v2(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False
```
- **Real-world connection:** Checking for duplicate cache keys
- **Interview confidence:** ✅ HIGH - Very straightforward

---

### Today's Statistics
- **Total problems:** 3
- **Easy:** 3
- **Medium:** 0
- **Total time:** ~45 minutes
- **Success rate:** 100%

### Key Learnings
1. **Hash maps are fundamental** - All 3 problems used dictionaries/sets
2. **Python's built-ins are powerful** - Counter and set make solutions elegant
3. **O(1) lookup pattern repeats** - This is the bread and butter of optimization
4. **My project uses these exact patterns** - Great talking point for interviews!

### Patterns Mastered Today
- ✅ Hash map for O(1) lookup (Two Sum)
- ✅ Frequency counting (Valid Anagram)
- ✅ Set for uniqueness (Contains Duplicate)

### What Clicked
The Two Sum pattern is literally my cache implementation! When I do `cache.get(query, model)`, I'm using the same hash map O(1) lookup concept. This makes DSA feel way more relevant.

### Next Session Goals (Tomorrow)
- Solve: 3 more problems
- Focus: Sliding window (new pattern to learn)
- Target problems:
  1. Best Time to Buy/Sell Stock (Easy)
  2. Longest Substring Without Repeating Characters (Medium)
  3. Minimum Window Substring (Hard - stretch goal)

---

## Progress Tracker
- **Week 1:** 3/50 problems ✅
- **Current streak:** 1 day
- **Total time invested:** 45 min
- **Patterns learned:** 3