---
title: Python excel操作
icon: fas fa-list
author: 周子力
order: 53
category:
  - 教学文档
tag:
  - Python
---

# Python excel操作
## 1. 工具包
- xlrd:读取xls、xlsx文件，效率非常高。不支持修改！(高版本不支持xlsx,pip install xlrd==1.2.0)
- xlwt:写入新xls、xlsx文件，效率非常高。但不支持修改已有表格！
- openpyxl:可读可写可修改！数据从（1，1）开始.[官网](https://openpyxl.readthedocs.io/en/stable/)
- xlwings:可读可写可修改，支持xls、xlsx。可以与VAB交互。但依赖于Excel程序存在
## 2. Excel文档
![picture 0](https://oss.docs.z-xin.net/e4a0c812e3fabec5ace1345047e1e24d95f175c4d220de795a2fcb864ca9fba0.png)  

## 3.工具包安装
```python
pip install 包名
pip install  -i https://pypi.tuna.tsinghua.edu.cn/simple 包名
```
## 4. excel操作
### 4.1 读取excel文档
```python
def read_openpyxl():

    #打开一个excel文档
    wb = openpyxl.load_workbook("e:\\test.xlsx")
    #获取excel文档中所有的Sheet
    ws_sheets = wb.sheetnames

    #读取excel文档中的一个Sheet,名字为"Sheet1"
    ws = wb['Sheet1']

    #获取该Sheet中的最大行数和最大列数
    # ws.max_row,ws.max_column 最大行列数
    print(ws.max_row,ws.max_column)

    #读取Sheet中的某一个Cell中的元素,注意这里的Cell是从(1，1)开始计数的。
    print(ws.cell(1,2).value)
```
### 4.2 写excel文档
```python
import openpyxl
from openpyxl.styles import Font
from openpyxl.chart import BarChart, Reference
def write_openpyxl():
    #新建一个工作薄
    wb = openpyxl.Workbook()
    #激活该工作薄
    ws = wb.active
    ws.title = 'Data'
    #新建一个Sheet
    ws2 = wb.create_sheet()
    ws2.title = "测试sheet"
    #删除一个Sheet
    wb.remove(ws2)
    #对Cell进行操作
    #在某一个cell写入一个数值
    ws.cell(row=1, column=1).value = 'test'
    #将test改成cyber
    ws.cell(row=1, column=1).value = 'cyber'

    #可以直接通过表的分配的标号
    ws['A8']='A8'

    #可以直接用append列表的形式,从激活的cell开始填写
    ws.append([1,2,3,4])

    #可以自动进行格式转换
    import datetime
    ws['A3']=datetime.datetime.now()

    wb.save('e:\\wtest.xlsx')
def write_excel():
    wb=openpyxl.Workbook()
    ws=wb.active
    data=[["Type", "Leaf Color", "Height"], ["Maple", "Red", 549], ["Oak", "Green", 783], ["Pine", "Green", 1204]]
    for d in data:
        ws.append(d)


    #修改格式
    ft=Font(bold=True,italic=True)
    for row in ws['A1:C1']:
        for cell in row:
            cell.font = ft

    #添加图表
    chart=BarChart()
    chart.type='col'
    chart.title='测试'
    chart.x_axis.title='x'
    chart.y_axis.title='y'
    chart.legend=None

    data = Reference(ws, min_col=3, min_row=2, max_row=4, max_col=3)
    categories = Reference(ws, min_col=1, min_row=2, max_row=4, max_col=1)
    chart.add_data(data)
    chart.set_categories(categories)

    ws.add_chart(chart, "E1")
    # ws.merge_cells(‘A2: D2’)  # 合并单元格
    # ws.unmerge_cells(‘A2: D2’)  # 解除合并单元格
    # ws.append(list)  # 追加数据到最后
    # ws.delete_rows(1)
    # ws.delete_cols(1)
    # ws.insert_rows(row_index, amount=1) 在第row_index行上方插入amount行，默认插入1行
    # ws.insert_cols(col_index, amount=1) 在第col_index列左侧插入amount列，默认插入1列
    #保存工作薄
    wb.save('e:\\wtest2.xlsx')

if __name__ == '__main__':
    # write_openpyxl()
    write_excel()

```

