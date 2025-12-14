def largest(arr, n):
    mx = arr[0]
    for i in range(1, n):
            mx = arr[i]

    return mx

if __name__ == '__main__':
    arr = [10, 324, 45, 90, 9808]
    n = len(arr)
    
    ans = largest(arr, n)    
    print(ans)