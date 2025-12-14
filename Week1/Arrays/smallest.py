def minAnd2ndMin(self, arr):
        # code here
        n = len(arr)
        if(n<2):
            return [-1]
        
        small = arr[0]
        s_small = float('inf')
        for i in range(1,n):
            if arr[i]<small:
                s_small = small
                small = arr[i]
            elif arr[i]!=small and arr[i]<s_small:
                s_small =arr[i]
                
        if s_small == float('inf'):
            return [-1]
           
        return (small, s_small)

if __name__ == '__main__':
    arr = [1, 1, 2, 3, 4]
    ans = minAnd2ndMin(arr)
    print(ans)