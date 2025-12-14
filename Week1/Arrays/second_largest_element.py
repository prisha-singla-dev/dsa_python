# Brute force approach
# Sort the array and check from the last , whether arr[n-1] is equal to arr[n-2] if yes then return arr[n-3] else return arr[n-2]

# Better approach
# first pass - find the largest element in the array
# second pass - find the largest element which is less than the largest element found in first pass


# optimal approach
def secondLargest(arr, n):
    largest = arr[0]
    second_largest = -1
    for i in range(1, n):
        if arr[i]>largest:
            second_largest = largest
            largest = arr[i]
        elif arr[i]!=largest and arr[i]>second_largest:
            second_largest = arr[i]


    return second_largest
if __name__ == '__main__':   
    arr = [12, 35, 1, 10, 34, 1]
    n = len(arr)
    
    ans = secondLargest(arr, n)    
    print(ans)