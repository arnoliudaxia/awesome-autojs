# OS
涉及调用安卓操作系统的 api

APP

```jsx
launchApp("Auto.js");
```

文件

```jsx
//查看文本文件
app.viewFile("/sdcard/1.txt");
//编辑文本文件
app.editFile("/sdcard/1.txt/");
```

网络

```jsx
app.openUrl(url)
```

## 数据持久化

> 数据存储的实体是一个**storages，**一个**storages对应一个数据字典**
> 

```jsx
var storage = storages.create("ABC"); 
storage.put("a", 123);
log("a = " + storage.get("a"));
```

由于对于所有脚本来说名字是唯一标示符，所以避免冲突尽量取一个隔离的名字storages.create("2732014414@qq.com:ABC");

- **storages.remove(name)**
- **get(key[, defaultValue])**
    - 如果该存储中不包含该数据，这时若指定了默认值参数则返回默认值，否则返回undefined。
- **put(key, value)**
    - 实际上是使用JSON.stringify把value转换为字符串再保存，因此value必须是可JSON化的
- **Storage.remove(key)**
- **Storage.contains(key)**
- **Storage.clear()**
