# left rotate the array by d places
def left_rotate_by_d_places(arr, d):
    n = len(arr)
    if n == 0:
        return arr

    d = d % n  # In case d is greater than n
    rotated_arr = arr[d:] + arr[:d]
    return rotated_arr

if __name__ == '__main__':
    arr = [1, 2, 3, 4, 5]
    d = 2
    rotated_arr = left_rotate_by_d_places(arr, d)
    print(f"Array after left rotation by {d} places:", rotated_arr)
    