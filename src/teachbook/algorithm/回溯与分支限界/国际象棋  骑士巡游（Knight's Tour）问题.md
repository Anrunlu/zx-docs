---
title: 国际象棋  骑士巡游（Knight's Tour）问题
icon: fas fa-p
author: 李镓永
order: 7
category:
  - 教学文档
tag:
  - 回溯与分支限界-dfs
---


# 国际象棋  骑士巡游（Knight's Tour）问题
## 描述

在国际象棋中，马（骑士）是一种特殊的棋子，它的移动方式为“日”或者“L”形：可以向前、后、左、右各两格再向垂直方向一格，或者先向垂直方向一格再向水平方向两格。给定一个标准的8x8国际象棋棋盘，编写一个程序来判断马能否从指定的起始位置出发，按照上述规则走遍棋盘上的每一个格子恰好一次，并且不重复访问任何格子。

### 输入

- 第一行包含一个字符串 `pos`，表示马的起始位置，格式为 "a1" 到 "h8" 中的一个。例如 "e4" 表示第5行第5列（从白方视角）。

### 输出

- 如果存在这样的路径，则输出 "Solution exists" 并打印出解决方案矩阵。每个格子中的数字代表马访问该格子的顺序（从1开始），未访问的格子用 -1 表示。输出时，请使用国际象棋的坐标系统，即从白方视角，从左到右依次为 a, b, c, d, e, f, g, h，从前到后依次为 1, 2, 3, 4, 5, 6, 7, 8。
- 如果不存在这样的路径，则输出 "No solution"。

![](C:\Users\Li-pc\AppData\Roaming\marktext\images\2024-12-10-08-26-22-image.png)

（国际象棋中马的走法及标准记谱法如图所示，没有楚河汉界，没有蹩马腿）

### 提示

- 使用回溯法尝试所有可能的路径。
- 可选地，应用沃恩斯警告策略（Warnsdorff's rule）来优化搜索过程，即优先选择那些具有最少后续移动选择的格子。
- 注意边界条件和已经访问过的格子。
- 在输出解决方案矩阵时，确保遵循国际象棋的坐标系统。

### 

### 参考答案（可以使用沃恩斯警告策略）

参考程序没有直接实现沃恩斯警告策略，因为它会显著增加代码复杂度。如果你想要加入这个优化，你需要在`choose_next_move`函数中实现逻辑，并在`solve_knight_tour`函数中调用它来选择下一个最佳移动位置。

    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    #define N 8
    
    // 检查位置是否有效
    int is_valid(int x, int y, int board[N][N]) {
        return (x >= 0 && y >= 0 && x < N && y < N && board[x][y] == -1);
    }
    
    // 获取下一步的可选位置数量
    int get_next_moves_count(int x, int y, int board[N][N], int next_x[], int next_y[]) {
        int count = 0;
        for (int i = 0; i < 8; ++i) {
            int nextX = x + next_x[i];
            int nextY = y + next_y[i];
            if (is_valid(nextX, nextY, board)) {
                count++;
            }
        }
        return count;
    }
    
    // 使用沃恩斯警告策略选择下一个位置
    void choose_next_move(int *x, int *y, int board[N][N], int next_x[], int next_y[]) {
        int min_deg_idx = -1, c, min_deg = 8;
        for (int i = 0; i < 8; ++i) {
            int nextX = *x + next_x[i];
            int nextY = *y + next_y[i];
            if (is_valid(nextX, nextY, board)) {
                c = get_next_moves_count(nextX, nextY, board, next_x, next_y);
                if (c < min_deg) {
                    min_deg_idx = i;
                    min_deg = c;
                }
            }
        }
        if (min_deg_idx != -1) {
            *x += next_x[min_deg_idx];
            *y += next_y[min_deg_idx];
        }
    }
    
    // 尝试解决问题
    int solve_knight_tour(int x, int y, int move_i, int board[N][N], int next_x[], int next_y[]) {
        int nextX, nextY;
        if (move_i == N * N)
            return 1;
    
        for (int i = 0; i < 8; ++i) {
            nextX = x + next_x[i];
            nextY = y + next_y[i];
            if (is_valid(nextX, nextY, board)) {
                board[nextX][nextY] = move_i;
                if (solve_knight_tour(nextX, nextY, move_i + 1, board, next_x, next_y))
                    return 1;
                else
                    board[nextX][nextY] = -1; // 回溯
            }
        }
    
        return 0;
    }
    
    // 打印棋盘
    void print_solution(int board[N][N]) {
        char cols[] = "abcdefgh";
        printf("  a b c d e f g h\n");
        for (int i = N - 1; i >= 0; --i) {
            printf("%d ", i + 1);
            for (int j = 0; j < N; ++j) {
                printf("%2d", board[j][i]);
                if (board[j][i] >= 0 && board[j][i] <= 9)
                    printf(" ");
            }
            printf(" %d\n", i + 1);
        }
        printf("  a b c d e f g h\n");
    }
    
    int main() {
        int board[N][N];
        memset(board, -1, sizeof(board));
    
        // 马的所有可能移动方向
        int next_x[] = {2, 1, -1, -2, -2, -1, 1, 2};
        int next_y[] = {1, 2, 2, 1, -1, -2, -2, -1};
    
        char start_pos[3];
        scanf("%s", start_pos);
    
        // 将输入的位置转换为数组索引
        int start_x = start_pos[0] - 'a';
        int start_y = start_pos[1] - '1';
    
        // 设置起始位置
        board[start_x][start_y] = 0;
    
        // 解决问题
        if (!solve_knight_tour(start_x, start_y, 1, board, next_x, next_y)) {
            printf("No solution\n");
        } else {
            printf("Solution exists\n");
            print_solution(board);
        }
    
        return 0;
    }




