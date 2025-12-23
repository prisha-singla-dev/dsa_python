# max consective ones 

def max_consective_ones(arr):
    n = len(arr)
    max_count = 0
    current_count = 0

    for i in range(n):
        if arr[i] == 1:
            current_count += 1
            max_count = max(max_count, current_count)
        else:
            current_count = 0

    return max_count

if __name__ == '__main__':
    arr = [1, 1, 0, 1, 1, 1, 0, 1, 1]
    result = max_consective_ones(arr)
    print("Maximum consecutive ones in the array:", result)