# Left roatate the array by one place 

def left_rotate_by_one(arr):
    n = len(arr)
    if n == 0:
        return arr

    first_element = arr[0]
    for i in range(1, n):
        arr[i - 1] = arr[i]
    arr[n - 1] = first_element

    return arr

if __name__ == '__main__':
    arr = [1, 2, 3, 4, 5]
    rotated_arr = left_rotate_by_one(arr)
    print("Array after left rotation by one place:", rotated_arr)