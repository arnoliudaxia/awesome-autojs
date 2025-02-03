# UI
涉及到和用户界面相关的

如果需要调用无障碍服务（例如点击控件），需要`auto()`，如果有快速交互的需求可以`auto(fast) `，可以确保无障碍服务开启。

## UiSelector选择器
```jsx
var sendButton = text("发送").findOne();
sendButton.click();
```

这里的选择器的设计模式类似SQL，支持链式筛选

```jsx
text(str)
textContains(str)
textStartsWith(prefix)
textEndsWith(suffix)
textMatches(reg) //正则形式建议采取JS格式不要用字符串格式
//等等
```

查找（上面不会开始找）

```jsx
.findOne() //阻塞式
.findOne(timeout)
.findOnce()==.findOne(1)
.findOnce(i) //返回第 i + 1 个符合条件的控件
.filter(func)
.exits() 判断控件是否存在
.waitFor() 等待控件出现

```

属性与方法

- `UiObject.child(i)`, `UiObject.parent()`
- button
    - `click()` 点击。点击一个控件，前提是这个控件的clickable属性为true
    - `longClick()` 长按。长按一个控件，前提是这个控件的longClickable属性为true
- 输入框
    - `setText(text)` 设置文本，用于编辑框控件设置文本。
    - `setSelection(0, 2);` `*//选中前两个字` ;* `setSelection(1,1)`把光标设置在第一个字符的后面
        - `copy()` 复制选中部分
        - **cut()**
    - **paste()**
- `scrollForward()`, `scrollBackward()` 滑动。滑动一个控件(列表等), 前提是这个控件的scrollable属性为true
