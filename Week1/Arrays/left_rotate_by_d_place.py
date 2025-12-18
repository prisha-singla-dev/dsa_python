# left rotate the array by d places

# Brute Force Approach
def left_rotate_by_d_places(arr, d):
    n = len(arr)
    if n == 0:
        return arr
    
    if(d>=n):
        d = d%n
    # Brute Force Approach
    # temp = []
    
    # for i in range (0, d):
    #     temp.append(arr[i])

    # for i in range (d,n):
    #     arr[i - d] = arr[i]

    # for i in range(n-d,n):
    #     arr[i] = temp[i-(n-d)]
        
    # return arr  
    # Time complexity: O(n-d), Space Complexity(Extra space): O(d)

    # Optimal Approach  
    # reverse(arr, 0, d-1)
    # reverse(arr, d, n-1)
    # reverse(arr, 0, n - 1)
    # return arr

    rotated_arr = arr[d:] + arr[:d]
    return rotated_arr


# def reverse(arr,start,end):
#     while(start<end):
#         arr[start],arr[end] = arr[end],arr[start]
#         start+=1
#         end-=1
#     return arr


if __name__ == '__main__':
    arr = [1, 2, 3, 4, 5]
    d = 2
    rotated_arr = left_rotate_by_d_places(arr, d)
    print(f"Array after left rotation by {d} places:", rotated_arr)
