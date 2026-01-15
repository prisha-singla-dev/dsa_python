# product array.py
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