# union of 2 sorted arrays
def union_sorted_array(arr1,arr2):
    # Brute Force Approach
    # return sorted(set(arr1) | set(arr2))

    # optimal approach - 2 pointer technique
    i, j = 0,0
    n,m = len(arr1), len(arr2)
    result =[]
    while i<n and j<m:
        if arr1[i]<= arr2[j]:
            if not result or result[-1] != arr1[i]:
                result.append(arr1[i])
            i+=1
        else:
            if not result or result[-1] != arr2[j]:
                result.append(arr2[j])
            j+=1

    while i<n:
        if not result or result[-1] != arr1[i]:
            result.append(arr1[i])
        i+=1
    while j<m:
        if not result or result[-1] != arr2[j]:
            result.append(arr2[j])
        j+=1
    
    return result

if __name__ == '__main__':
    arr1 = [1, 2, 4, 5, 6]
    arr2 = [2, 3, 5, 7]
    union_arr = union_sorted_array(arr1, arr2)
    print("Union of the two sorted arrays is:", union_arr)