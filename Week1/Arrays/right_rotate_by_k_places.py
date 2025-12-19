# rotate by k places to the right
def right_rotate_by_k_places(arr, k):
    n = len(arr)
    if n == 0:
        return arr
    
    k = k % n  # In case k is greater than n

    # Optimal Approach  
    rotated_arr = arr[-k:] + arr[:-k]
    return rotated_arr

if __name__ == '__main__':
    arr = [1, 2, 3, 4, 5]
    k = 2
    rotated_arr = right_rotate_by_k_places(arr, k)
    print(f"Array after right rotation by {k} places:", rotated_arr)
    