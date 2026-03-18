#valid sudoku
# Brute Force Approach:
# we can check each row, column, and 3x3 box for duplicates. This approach has a time complexity of O(9^2) = O(81) since we are checking 9 rows, 9 columns, and 9 boxes.
# but this process becomes repetitive

# optimized approach1:
def isValidSudoku(board):
    rows = {}
    cols = {}
    boxes = {}

    for i in range(9):
        for j in range(9):
            num = board[i][j]
            if num != '.':
                # Check row
                if (i, num) in rows:
                    return False
                rows[(i, num)] = True

                # Check column
                if (j, num) in cols:
                    return False
                cols[(j, num)] = True

                # Check box
                box_index = (i // 3, j // 3)
                if (box_index, num) in boxes:
                    return False
                boxes[(box_index, num)] = True

    return True
    # Time Complexity: O(1) - The board size is fixed (9x9), so the time complexity is constant.
    # Space Complexity: O(1) - The space used for the hash maps is also
    # constant since the board size is fixed.

# optimal approach2:
def isValidSudoku(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]

    for i in range(9):
        for j in range(9):

            val = board[i][j]

            if val == ".":
                continue

            box_index = (i // 3) * 3 + (j // 3)

            if val in rows[i] or val in cols[j] or val in boxes[box_index]:
                return False

            rows[i].add(val)
            cols[j].add(val)
            boxes[box_index].add(val)

    return True
    

if __name__ == "__main__":
    board = [
        ["5","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
    ]
    print(isValidSudoku(board))  # Output: True