# check whether the array is sorted or not
def is_array_sorted(arr):
    n = len(arr)
    for i in range(1, n):
        if arr[i] < arr[i - 1]:
            return False
    return True

if __name__ == '__main__':
    arr = [10, 20, 10, 40, 50]
    if is_array_sorted(arr):
        print("The array is sorted.")
    else:
        print("The array is not sorted.")