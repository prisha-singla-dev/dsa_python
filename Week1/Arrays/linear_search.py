# linear search in an array
def linear_search(arr, target):
    n = len(arr)
    for i in range(n):
        if arr[i] == target:
            return i
    return -1

if __name__ == '__main__':
    arr = [4, 2, 3, 1, 5]
    target = 3
    result = linear_search(arr, target)
    if result != -1:
        print(f"Element {target} found at index {result}.")
    else:
        print(f"Element {target} not found in the array.")
        