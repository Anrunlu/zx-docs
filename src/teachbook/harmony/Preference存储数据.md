---
title: 使用Preferences保存数据

icon: iconfont icon-a-outline-harmony-one
author: 周子力
order: 20
category:
  - 教学文档
tag:
  - HarmonyOS
  - TypeScript
---

## 概述


## 示例代码

```typescript
import { preferences } from "@kit.ArkData";
import { Context } from "@kit.AbilityKit";
import { Task } from "../model/TaskModel";
import { getObjKeys, getObjValues } from "./getObjKeys";

export class StoreClass{
  static context:Context
  static meomo_key:string="MEMO_KEY"

  static init(context:Context){
    StoreClass.context=context
  }

  static getMemoStore(){

   return  preferences.getPreferencesSync(StoreClass.context,{
      name: `${StoreClass.meomo_key}`
    })

  }

   static async addMemoMessage(memoMsg:Task){
    const store=StoreClass.getMemoStore()
     try{store.putSync(memoMsg.title,JSON.stringify(memoMsg))
       await store.flush()}
     catch (e) {
      console.error("写入失败")
     }
  }

  static async delMemoMessage(memoMsg:Task) {
    const store = StoreClass.getMemoStore()
    try {
      store.deleteSync(memoMsg.title)
      await store.flush()
    } catch (e) {
      console.error("删除失败")
    }
  }

  static  getAllMemoMessage() {
    const store = StoreClass.getMemoStore()
    const all = store.getAllSync()
    return all
  }


}

```

## 示例说明

```typescript
//使用getAllMemoMessage()获取所有备忘录信息

aboutToAppear(): void {
    // getallmemos().then((res:AxiosResponse)=>{
    //   this.taskList=res.data.data
    // })
    let infos=StoreClass.getAllMemoMessage()
    const infos2=Object.values(infos) as string[]
    const tasks: Task[] = infos2.map(item => JSON.parse(item) as Task);
    this.taskList=tasks
  }

```

```typescript

StoreClass.addMemoMessage(tempTask)  //添加备忘录信息

StoreClass.delMemoMessage(this.taskList[index])  //删除备忘录信息


```
