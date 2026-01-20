#valid sudoku
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