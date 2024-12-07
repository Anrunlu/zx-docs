---
title: N皇后问题
icon: fas fa-m
author: 路九阳
order: 7
category:
  - 教学文档
tag:
  - 回溯与分支限界-dfs
---

## N皇后问题
### 题目描述 
N皇后问题是经典的回溯算法问题之一。问题的目标是在N×N的国际象棋棋盘上放置N个皇后，使得它们互相之间不能攻击对方。由于皇后的移动规则是可以在同一行、同一列以及同一对角线上无限距离地移动，所以需要确保任意两个皇后都不在同一行、同一列或同一对角线上。 
###  输入格式
输入一个整数N，表示棋盘的大小为N×N。 
###  输出格式
输出所有可能的解决方案，每个方案用一个N×N的字符矩阵表示，其中'Q'表示皇后的位置，'.'表示空位。每个解决方案后跟一条分隔线（"-----------------------------"），最后输出总的解决方案数量。
### 输入样例

输入棋盘大小：4

### 输出样例
![![f88549fbae11501f18fd6dc71c00c57a.png]() 1](https://oss.docs.z-xin.net/e13245c2bb0d4d674b5b37a4df2e236894e0cd32f6b1109a71a26d6fe16843ad.png)  






### 解题思路
该问题使用了回溯算法来解决。核心思想是逐层尝试在每一行放置一个皇后，并检查是否满足条件。如果当前行的所有位置都无法放置皇后，则回溯至上一行重新选择位置。当成功放置完所有N个皇后时，记录下这个解决方案，并继续探索其他可能性。
1. 初始化一个N×N的棋盘，所有位置都填充为空位'.'。
2. 定义`fillTheBoard`函数用于递归尝试在每一行放置皇后。
3. 在`fillTheBoard`中，对于当前行的每一个位置，调用`checkPosition`函数检查当前位置是否可以放置皇后。
4. `checkPosition`函数会检查当前位置所在的列及两条对角线是否有其他皇后存在，如果有则返回false；否则返回true。
5. 如果当前位置可以放置皇后，则进行放置，并递归调用`fillTheBoard`处理下一行。
6. 当递归到达最后一行并成功放置皇后后，打印当前棋盘状态作为解决方案之一。
7. 每次尝试完一种可能性后，移除最后一个放置的皇后以恢复棋盘状态，以便尝试其他可能性。
8. 最终输出所有的解决方案及总数量。 注意：该实现方式会输出所有可行的解，并且会在控制台打印出这些解。对于较大的N值，解决方案的数量可能会非常大，因此实际应用中可能需要考虑优化输出或者限制输出解的数量。

### 代码实现
```cpp
//N皇后问题
#include<iostream>
using namespace std;
int sum = 0; //记录解法总数
bool checkPosition(char **chessBoard, int layer, int I, int N);
void fillTheBoard(char **chessBoard, int layer, int N){ //按层次遍历，layer表示当前层数
	//递归到最底层打印整个棋盘
	if(layer == N){
		sum++;
		for(int i = 0; i < N; i++){
			for(int j = 0; j < N; j++){
				cout << chessBoard[i][j] << " ";
			} cout << endl;
		}
		cout << "-----------------------------" << endl;
		return; //递归函数出口
	}
	for(int i = 0; i < N; i++){ //遍历一行
		//检查该位置能否填充
		if(checkPosition(chessBoard, layer, i, N)){
			chessBoard[layer][i] = 'Q';
			//递归调用函数本身fillTheBoard，遍历下一层（layer+=1）
			fillTheBoard(chessBoard, layer + 1, N);
			chessBoard[layer][i] = '.';		//之后把皇后去掉，为了继续探寻其他可能性
		}
	//	cout << layer << " ";
	}
}
bool checkPosition(char **chessBoard, int row, int col, int N){//检查函数，判断[layer, I]是否可以填充
	//检查所在列
	for(int j = 0; j < row; j++){
		if(j == row)continue;
		if(chessBoard[j][col] == 'Q')return false;
	}
	//检查斜对角1
		//   ↗
		for(int i = row-1,j = col+1; i>=0 && j<N; i--,j++){
			if(chessBoard[i][j] == 'Q')return false;
		}
	//检查斜对角2
        //  ↖
		for(int i = row-1,j = col-1; i>=0 && j>=0; i--,j--){
			if(chessBoard[i][j] == 'Q')return false;
		}

	return true;
}
int main(){
	int N;
	cout << "输入棋盘大小：";cin >> N;
	//先初始化一个N*N的空棋盘，空位用"."填充
	char **chessBoard = new char* [N];
	for(int i = 0; i < N; i++){
		chessBoard[i] = new char[N];
		for(int j = 0; j < N; j++){
			chessBoard[i][j] = '.';
		}
	}
	//打印初始化的棋盘
	for(int i = 0; i < N; i++){
			for(int j = 0; j < N; j++){
				cout << chessBoard[i][j] << " ";
			}
		cout << endl;
		}
	int layer = 0;
	cout << "==================================" <<endl;
	fillTheBoard(chessBoard, layer, N);	
	//清除动态分配的内存
	for (int i = 0; i < N; i++) {
	        delete[] chessBoard[i];
	    }
	    delete[] chessBoard;
	cout << "解法总数：" << sum;
	return 0;
}
```


