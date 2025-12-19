# right rotate

def right_rotate_by_one(arr):
    n = len(arr)
    if n == 0:
        return arr

    last_element = arr[n - 1]
    for i in range(n - 2, -1, -1):
        arr[i + 1] = arr[i]
    arr[0] = last_element

    return arr

if __name__ == '__main__':
    arr = [1, 2, 3, 4, 5]
    rotated_arr = right_rotate_by_one(arr)
    print("Array after right rotation by one place:", rotated_arr)