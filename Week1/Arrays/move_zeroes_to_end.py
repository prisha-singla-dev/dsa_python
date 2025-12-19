# move zeroes to end
def move_zeroes_to_end(arr):
    n = len(arr)
    if n == 0:
        return arr

    write_index = 0

    for i in range(n):
        if arr[i] != 0:
            arr[write_index] = arr[i]
            write_index += 1

    for i in range(write_index, n):
        arr[i] = 0

    return arr
if __name__ == '__main__':
    arr = [0, 1, 0, 3, 12]
    result_arr = move_zeroes_to_end(arr)
    print("Array after moving zeroes to the end:", result_arr)