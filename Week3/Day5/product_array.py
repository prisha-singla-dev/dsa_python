# product array.py
# Brute Force Approach: O(n^2) time complexity
# def product_array(arr):
#     n = len(arr)
#     if n == 0:   
#         return []
#     prod = []
#     for i in range(n):
#         product = 1
#         for j in range(n):
#             if i != j:
#                 product *= arr[j]
#         prod.append(product)
#     return prod

# Better Approach: O(n) time complexity but uses extra space
# def product_array(arr):
#     n = len(arr)
#     if n == 0:
#         return []
#     left_prod = [1] * n
#     right_prod = [1] * n
#     prod = [1] * n
#     for i in range(1, n):
#         left_prod[i] = left_prod[i - 1] * arr[i - 1]
#     for i in range(n - 2, -1, -1):
#         right_prod[i] = right_prod[i + 1] * arr[i + 1]
#     for i in range(n):
#         prod[i] = left_prod[i] * right_prod[i]
#     return prod


# Optimized Approach: O(n) time complexity
def product_array(arr):
    n = len(arr)
    if n == 0:
        return []

    # Initialize the product array with 1s
    prod = [1] * n

    # Calculate the product of elements to the left of each index
    left_product = 1
    for i in range(n):
        prod[i] = left_product
        left_product *= arr[i]

    # Calculate the product of elements to the right of each index
    right_product = 1
    for i in range(n - 1, -1, -1):
        prod[i] *= right_product
        right_product *= arr[i]

    return prod

if __name__ == "__main__":
    arr = [1, 2, 3, 4]
    print(product_array(arr))  # Output: [24, 12, 8, 6]