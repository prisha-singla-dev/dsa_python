# interesction of a sorted array
def intersection_sorted_array(arr1, arr2):
    # brute force approach
    # return sorted(set(arr1) & set(arr2))
    # O(n + m) time complexity and O(min(n,m)) space complexity

    # brute force approach without function 
    # i,j = 0,0
    # n,m = len(arr1), len(arr2)
    # visited = [0]*m
    # result = []
    # for i in range(0,n):
    #     for j in range(0,m):
    #         if arr1[i] == arr2[j] and visited[j] ==0:
    #             result.append(arr1[i])
    #             visited[j]=1
    #             break
    #         if arr1[i] < arr2[j]:
    #             break

    # return result 
    # O(n*m) time complexity and O(m) space complexity    

    # optimal approach - 2 pointer technique
    i,j =0,0
    n,m = len(arr1), len(arr2)
    result = []

    while(i<n and j<m):
        if arr1[i] == arr2[j]:
            if not result or result[-1] != arr1[i]:
                result.append(arr1[i])
            i+=1
            j+=1
        elif arr1[i] < arr2[j]:
            i+=1
        else:
            j+=1

    return result
    # O(n + m) time complexity and O(min(n,m)) space complexity and O(1) extra space complexity




if __name__ == '__main__':
    arr1 = [1, 2, 4, 5, 6]
    arr2 = [2, 3, 5, 7]
    intersection_arr = intersection_sorted_array(arr1, arr2)
    print("Intersection of the two sorted arrays is:", intersection_arr)
