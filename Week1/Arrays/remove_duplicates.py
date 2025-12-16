# Remove duplicates from a sorted array in-place and return the new length.
# Brute force approach - using a set
def remove_duplicates_brute_force(arr):
    unique_elements = set()
    for num in arr:
        unique_elements.add(num)

    index = 0
    for num in sorted(unique_elements):
        arr[index] = num
        index += 1

    return index


# optimal approach - 2 pointer technique
def remove_duplicates(arr):
    if not arr:
        return 0

    write_index = 1

    for i in range(1, len(arr)):
        if arr[i] != arr[i - 1]:
            arr[write_index] = arr[i]
            write_index += 1

    return write_index

if __name__ == '__main__':
    arr = [1, 1, 2, 2, 3, 4, 4, 5]
    new_length = remove_duplicates(arr)
    print("The array after removing duplicates is:", arr[:new_length])
    print("The new length of the array is:", new_length)