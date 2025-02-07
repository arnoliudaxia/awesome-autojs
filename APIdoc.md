首先给出功能的概览
根据文档内容，AutoJs6 实现了多种功能，具体如下：

1. **图像处理与文字识别**：
   - 提供了图片处理和找图找色功能。
   - 支持光学字符识别 (OCR)，能够识别图像中的文本，支持 Google ML Kit 和 Baidu PaddlePaddle 两种工作模式。

2. **自动化操作**：
   - 模拟触摸、点击、滑动等操作。
   - 基于控件的操作，例如点击包含指定文本的控件、长按控件、设置输入框的内容等。
   - Root权限下的高级操作，如使用 `RootAutomator` 进行无延迟的触摸模拟。

3. **UI交互**：
   - 显示消息浮动框 (Toast)。
   - 创建并显示消息通知 (Notice)。
   - 提供对话框 (Dialogs)，包括提示框、确认框、输入框、选择框等，用于与用户进行交互。

4. **文件处理与多媒体处理**：
   - 多媒体编程支持，包括音乐播放和媒体文件扫描。
   - Shell命令执行，可以通过 `shell` 模块执行 Unix Shell 命令。

5. **传感器信息**：
   - 获取手机上各种传感器的信息，如距离传感器、光线传感器、重力传感器等。

6. **定时任务**：
   - 提供定时器 (Timers)，可以在未来的某个时间点调用调度函数。

7. **事件监听**：
   - 监听手机通知、按键、触摸等事件。

8. **悬浮窗**：
   - 提供悬浮窗 (Floaty) 功能，可以在屏幕上显示自定义悬浮窗，控制其大小和位置。

9. **国际化**：
   - 支持国际化功能。

10. **工具**：
    - 设备信息、传感器信息、控件信息的获取。
    - Base64 编解码、密文生成。
    - 数学运算、颜色转换。

下面是整个文档，可以直接喂给LLM（需要>=16K的context size）

```markdown
阅读下面的autojsv6的文档，回答用户的问题
======文档开始=====
# 综述 (Overview)
AutoJs6: 安卓平台 JavaScript 自动化工具.
脚本语言: JavaScript
脚本引擎: Rhino
支持特性: ES5 (全部), ES6 (部分)
文档阅读示例
colors
[m] rgb
rgb(red, green, blue)
... ...
上述 rgb 表示 colors.rgb.
参数类型
colors.rgb(red, green, blue)
red { number }
green { number }
blue { number }
需要传入三个 number 类型参数。
属性类型
colors.RED
{ number }
属性类型包裹在一对花括号中.
上述示例表示 colors 的 RED 属性是 number 类型数据.
对象字面量形式的类型则用一对双花括号表示:
properties {{ name: string; age: number }}
多行形式:
properties {{
name: string;
age: number;
laugh(decibel?: number);
}}




可存取的属性在读取时如果有非 undefined 默认值, 则以一对方括号表示:
[ 1200 ] { number }
上述示例表示一个默认值为 1200 的可存取属性.
以一对双方括号表示常量:
[[ 0.5 ]] { number }
上述示例表示一个值为 0.5 的常量属性.


可变参数
files.join(parent, ...child)：可变参数，可传入任意个参数。


可选参数
device.vibrate(text, delay?)
上述示例的 delay 参数是可选的 (以 "?" 标注).
可选参数描述时会以 "[]" 标注:
[ delay ] { number }
如果可选参数包含默认值, 则会以 "=" 标注:
[ delay = 0 ] { number }
方法全局化
Global
images.requestScreenCapture(landscape)
包含 "Global" 标签的方法, 表示支持全局化使用, 可省略模块对象调用.
因此以下两种调用方式等效:
images.requestScreenCapture(false);
requestScreenCapture(false);
CopyErrorCopied


AutoJs6 功能简介
AutoJs6 是 Android 平台支持无障碍服务的 JavaScript 自动化工具.
可用作 JavaScript IDE, 支持 [ 代码补全 / 变量重命名 / 代码格式化 ] 等.
AutoJs6 封装了丰富的 JavaScript 模块, 提供丰富功能, 内置实用工具:
功能
图像处理 / 文字识别
自动化操作 / 控件操作 / 应用操作
UI 交互 / 对话框交互 / 悬浮窗控件 / 画布控件
多线程编程 / 协程 / 异步编程 / 事件监听
文件处理 / 多媒体处理
定时任务 / 消息通知
HTTP 请求
Shell 语句
国际化
... ...
工具
设备信息 / 传感器信息 / 控件信息
Base64 编解码 / 密文生成
数学运算 / 颜色转换
... ...
代码转换
AutoJs6 支持直接调用 [ Java / Android / 扩展库 ] 等 API.
对于 AutoJs6 没有内置的功能, 可进行 Java 脚本化, 即直接参照 Java (或 Kotlin 等) 源码, 转换为 JavaScript 代码.
例如:
import android.graphics.Bitmap;
import android.graphics.Matrix;
public static Bitmap rotate(Bitmap src, int degrees, float px, float py) {
    if (degrees == 0) return src;
    Matrix matrix = new Matrix();
    matrix.setRotate(degrees, px, py);
    Bitmap ret = Bitmap.createBitmap(src, 0, 0, src.getWidth(), src.getHeight(), matrix, true);
    return ret;
}
CopyErrorCopied
转换为 JavaScript 代码:
importClass(android.graphics.Bitmap);
importClass(android.graphics.Matrix);
function rotate(src, degrees, px, py) {
    if (degrees == 0) return src;
    let matrix = new Matrix();
    matrix.setRotate(degrees, px, py);
    let ret = Bitmap.createBitmap(src, 0, 0, src.getWidth(), src.getHeight(), matrix, true);
    return ret;
}
# 章节——Global - 全局对象
AutoJs6 对部分全局对象及内置模块增加了覆写保护.
受覆写保护的对象有:
selector
continuation
[@] global
global 为 AutoJs6 的默认顶级作用域对象, 可作为全局对象使用:






#### sleep
**sleep(millis)**  
Global, Overload 1/3, Non-UI  
暂停当前线程指定毫秒数。  





**sleep(millisMin, millisMax)**  
6.2.0+, Global, Overload 2/3, Non-UI  
随机暂停在 `[millisMin, millisMax]` 范围内。  





**sleep(millis, bounds)**  
6.2.0+, Global, Overload 3/3, Non-UI  
随机暂停在 `millis ± bounds` 范围内。  






#### toast 和 notice
分别为 `toast` 和 `notice` 模块的全局化对象。
#### random
**random()**  
返回 `[0, 1)` 的随机数。**random(min, max)**  
返回 `[min, max]` 的随机数。注: random(min, max) 右边界闭合, 而 random() 右边界开放.
#### wait
阻塞等待条件满足或超时。
**wait(condition)**  
默认等待 10 秒，间隔 200 毫秒检查一次。  





**wait(condition, limit)**  
增加检测限制（次数或时间）。  





**wait(condition, limit, interval)**  
设置检测间隔。  





**wait(condition, callback)**  
提供回调处理成功或失败。  






#### waitForPackage
等待指定包名的应用出现，结构与 `wait` 一致：






waitForPackage(packageName)
6.2.0 Global Overload 1/6 A11Y? Non-UI
packageName { string } - 目标应用包名
returns { boolean }
参阅:wait(condition)
waitForPackage(packageName, limit)
waitForPackage(packageName, limit, interval)
waitForPackage(packageName, callback)
waitForPackage(packageName, limit, callback)
waitForPackage(packageName, limit, interval, callback)
#### exit
停止脚本运行：






#### requiresApi
设置最低 API 级别要求：






#### importPackage 和 importClass
导入 Java 包或类：






#### currentPackage 和 currentActivity
获取当前应用包名或活动名称：








#### pickup 和 detect
拾取选择器和控件探测：






#### existsAll 和 existsOne
判断选择器是否全部或任一存在：








[m] existsOne
existsOne(...selectors)
Global - selectors { ...PickupSelector[] } - 混合选择器参数
returns { boolean } - 选择器任一满足 "存在" 条件
提供的选择器参数任一满足 "存在" 条件, 即 selector.exists() === true.
# 章节——Automator - 自动化
本章介绍如何通过自动化工具模拟触摸、点击、滑动等操作，适用于Android设备。内容分为基于坐标的触摸模拟和基于控件的操作两部分。
控件和坐标也可以相互结合. 一些控件是无法点击的(clickable为false), 无法通过.click()函数来点击, 这时如果安卓版本在7.0以上或者有root权限, 就可以通过以下方式来点击：
//获取这个控件
var widget = id("xxx").findOne();
//获取其中心位置并点击
click(widget.bounds().centerX(), widget.bounds().centerY());
基于坐标的触摸模拟


#### 点击操作
**`click(x, y)`**模拟点击坐标 `(x, y)`。返回是否成功（布尔值）。示例：





使用该函数模拟连续点击时可能有点击速度过慢的问题, 这时可以用press()函数代替.
**`longClick(x, y)`**模拟长按坐标 `(x, y)`。返回是否成功（布尔值）。示例：






**`press(x, y, duration)`**按住坐标 `(x, y)`，持续 `duration` 毫秒。如果 `duration < 500ms`，视为点击；如果 `duration >= 500ms`，视为长按。示例：







#### 滑动操作
**`swipe(x1, y1, x2, y2, duration)`**模拟从 `(x1, y1)` 滑动到 `(x2, y2)`，持续 `duration` 毫秒。示例：






**`gesture(duration, [x1, y1], [x2, y2], ...)`**模拟复杂手势，例如多点滑动。示例：






**`gestures([delay1, duration1, [x1, y1], [x2, y2]], ...)`**同时模拟多个手势。示例：









例如手指捏合：
gestures([0, 500, [800, 300], [500, 1000]],
         [0, 500, [300, 1500], [500, 1000]]);


Root权限下的高级操作
#### 使用 `RootAutomator`
`RootAutomator是一个使用root权限来模拟触摸的对象, 用它可以完成触摸与多点触摸, 并且这些动作的执行没有延迟.
**初始化与退出**





**常用方法****`tap(x, y[, id])`**模拟点击 `(x, y)`，可指定 `id` 区分多点触摸。示例：






**`swipe(x1, y1, x2, y2[, duration, id])`**模拟滑动，可指定 `id` 和持续时间。示例：






**`press(x, y, duration[, id])`**按住 `(x, y)`，持续 `duration` 毫秒。示例：






**`longPress(x, y[, id])`**模拟长按 `(x, y)`。示例：






**底层触摸控制****`touchDown(x, y[, id])`**：模拟手指按下。**`touchMove(x, y[, id])`**：模拟手指移动。**`touchUp([id])`**：模拟手指抬起。




一个脚本中最好只存在一个RootAutomator, 并且保证脚本结束退出他. 可以在exit事件中退出RootAutomator, 例如：
var ra = new RootAutomator();
events.on('exit', function(){
  ra.exit();
});
//执行一些点击操作
...
CopyErrorCopied


## 二、基于控件的操作
基于控件的操作指的是选择屏幕上的控件, 获取其信息或对其进行操作. 对于一般软件而言, 基于控件的操作对不同机型有很好的兼容性；但是对于游戏而言, 由于游戏界面并不是由控件构成, 无法采用本章节的方法, 也无法使用本章节的函数. 有关游戏脚本的编写, 请参考《基于坐标的操作》.
基于控件的操作依赖于无障碍服务, 因此最好在脚本开头使用auto()函数来确保无障碍服务已经启用. 如果运行到某个需要权限的语句无障碍服务并没启动, 则会抛出异常并跳转到无障碍服务界面. 这样的用户体验并不好, 因为需要重新运行脚本, 后续会加入等待无障碍服务启动并让脚本继续运行的函数.
### 1. 控件操作基础
基于控件的操作依赖于无障碍服务，建议在脚本开头启用无障碍服务：






### 2. 常用控件操作函数
**`click(text[, i])`**点击屏幕上包含指定文本的控件。参数 `i` 表示第几个匹配项（从0开始）。当不指定参数i时则会尝试点击屏幕上出现的所有文字text并返回是否全部点击成功.
i是从0开始计算的, 也就是, click("啦啦啦", 0)表示点击屏幕上第一个"啦啦啦", click("啦啦啦", 1)表示点击屏幕上第二个"啦啦啦".示例：






**`longClick(text[, i])`**长按指定文本的控件。示例：






**`scrollUp([i])`**上滑或左滑第 `i+1` 个可滑动控件。不加参数时，默认滑动面积最大的可滑动控件。示例：






**`scrollDown([i])`**下滑或右滑第 `i+1` 个可滑动控件。示例：






**`setText([i, ]text)`**设置第 `i+1` 个输入框的内容为 `text`。不加参数时，设置所有输入框的内容。示例：






**`input([i, ]text)`**在第 `i+1` 个输入框中追加内容 `text`。不加参数时，追加到所有输入框。示例：







---
# 章节——Color - 颜色
`colors` 模块用于颜色模式转换、色彩空间转换、颜色分量合成及分解等，同时包含亮度计算、相似度比较等工具功能。与 `images` 模块配合使用，可完成更多图色相关功能。
#### 颜色表示方式
**颜色代码 (ColorHex)**  格式：`#RGB`、`#RRGGBB`、`#AARRGGBB`示例：`#F00`（红色）、`#FF0000`（红色）、`#80FF0000`（半透明红色）
**颜色整数 (ColorInt)**  格式：`0xAARRGGBB`示例：`0x8000FF00`（半透明绿色）
**方法生成**  `colors.rgb(255, 0, 0)` → 红色  `colors.argb(128, 255, 0, 0)` → 半透明红色  `colors.hsv(0, 1, 1)` → 红色
**常量**  示例：`colors.RED`、`colors.BLACK`

---
#### 核心方法
**颜色转换**`toInt(color)`：将颜色参数转为颜色整数。





`toHex(color)`：将颜色参数转为颜色代码。






**颜色分量操作**获取分量：`colors.red(color)` → R 分量  `colors.green(color)` → G 分量  `colors.blue(color)` → B 分量  `colors.alpha(color)` → A 分量
设置分量：`colors.setRed(color, value)`  `colors.setAlpha(color, value)`

**颜色相似度**[m] isSimilar
isSimilar(colorA, colorB, threshold?, algorithm?)
[6.2.0] Overload [1-3]/4
colorA { OmniColor } - 颜色参数
colorB { OmniColor } - 颜色参数
[ threshold = 4 ] { IntRange[0..255] } - 颜色匹配阈值
[ algorithm = 'diff' ] { ColorDetectionAlgorithm } - 颜色检测算法
returns { boolean } - 两个颜色是否相似
判断两个颜色是否相似.
不同阈值对结果的影响 (阈值越高, 条件越宽松, 阈值越低, 条件越严格):
colors.isSimilar('orange', 'dark-orange', 5); /* false, 阈值较小, 条件相对严格. */
colors.isSimilar('orange', 'dark-orange', 10); /* true, 阈值增大, 条件趋于宽松. */
CopyErrorCopied
不同 颜色检测算法 对结果的影响:
colors.isSimilar('orange', 'dark-orange', 9, 'rgb+'); // false
colors.isSimilar('orange', 'dark-orange', 9, 'diff'); // true
colors.isSimilar('orange', 'dark-orange', 9, 'hs'); // true
colors.isSimilar('orange', 'dark-orange', 8, 'rgb+'); // false
colors.isSimilar('orange', 'dark-orange', 8, 'diff'); // false
colors.isSimilar('orange', 'dark-orange', 8, 'hs'); // true
CopyErrorCopied
isSimilar(colorA, colorB, options)
6.2.0 Overload 4/4
colorA { OmniColor } - 颜色参数
colorB { OmniColor } - 颜色参数
options {{
[ similarity ≈ 0.9843 ]?: Range[0..1] - 颜色匹配相似度
[ threshold = 4 ]?: IntRange[0..255] - 颜色匹配阈值
[ algorithm = 'diff' ]?: ColorDetectionAlgorithm - 颜色检测算法
}} - 选项参数
returns { boolean } - 两个颜色是否相似
判断两个颜色是否相似.
此方法将非必要参数集中于 options 对象中.
colors.isSimilar('#010101', '#020202', { similarity: 0.95 }); // true
CopyErrorCopied
[m] isEqual
isEqual(colorA, colorB, alphaMatters?)
6.2.0 Overload[1-2]/2
colorA { OmniColor } - 颜色参数
colorB { OmniColor } - 颜色参数
[ alphaMatters = false ] { boolean } - 是否考虑 A (alpha) 分量
returns { boolean } - 两个颜色是否相等
判断两个颜色是否相等, 比较时由 alphaMatters 参数决定是否考虑 A (alpha) 分量:
/* Hex 代码. */
colors.isEqual('#FF0000', '#FF0000'); // true
colors.isEqual('#FF0000', '#F00'); /* 同上, 三位数简写形式. */
/* 颜色整数. */
colors.isEqual(-65536, 0xFF0000); // true
/* 颜色名称. */
colors.isEqual('red', 'RED'); /* true, 不区分大小写. */
colors.isEqual('orange', 'Orange'); /* true, 不区分大小写. */
colors.isEqual('dark-gray', 'DARK_GRAY'); /* true, 连字符与下划线均被支持. */
/* 不同类型比较. */
colors.isEqual('red', '#FF0000'); // true
colors.isEqual('orange', '#FFA500'); // true
/* A (alpha) 分量的不同情况. */
colors.isEqual('#A1FF0000', '#A2FF0000'); /* true, 默认忽略 A 分量. */
colors.isEqual('#A1FF0000', '#A2FF0000', true); /* false, 需考虑 A 分量. */
CopyErrorCopied
[m] equals
equals(colorA, colorB)
DEPRECATED
colorA { number | string } - 颜色参数
colorB { number | string } - 颜色参数
returns { boolean } - 两个颜色是否相等 (忽略 A (alpha) 分量)
判断两个颜色是否相等, 比较时忽略 A (alpha) 分量:
/* Hex 代码. */
colors.equals('#FF0000', '#FF0000'); // true
/* 颜色整数. */
colors.equals(-65536, 0xFF0000); // true
/* 颜色名称. */
colors.equals('red', 'RED'); // true
/* 不同类型比较. */
colors.equals('red', '#FF0000'); // true
/* A (alpha) 分量将被忽略. */
colors.equals('#A1FF0000', '#A2FF0000'); // true
CopyErrorCopied
但以下示例将全部抛出异常:
colors.equals('orange', '#FFA500'); /* 抛出异常. */
colors.equals('dark-gray', '#444'); /* 抛出异常. */
colors.equals('#FF0000', '#F00'); /* 抛出异常. */
CopyErrorCopied
上述示例对于 colors.isEqual 则全部返回 true.
除非需要考虑多版本兼容, 否则建议始终使用 colors.isEqual 替代 colors.equals.





[m] luminance
luminance(color)
6.2.0
color { OmniColor } - 颜色参数
returns { Range[0..1] } - 颜色亮度
获取颜色的 亮度 (Luminance), 取值范围 [0..1].
colors.luminance(colors.WHITE); // 1
colors.luminance(colors.BLACK); // 0
colors.luminance(colors.RED); // 0.2126
colors.luminance(colors.GREEN); // 0.7152
colors.luminance(colors.BLUE); // 0.0722
colors.luminance(colors.YELLOW); // 0.9278
CopyErrorCopied
参阅: W3C Wiki


# 章节——Image - 图像
images 模块提供图片处理和找图找色功能，分为 图片处理 和 找图找色 两部分。注意：创建的 Image 对象需及时回收（调用 recycle() 方法），避免内存泄漏。
### 图像 (Images)
#### 图像读取与保存
**读取图片**  
`images.read(path)`  
参数：`path` (图片路径)  
返回值：`Image`对象或`null`  **加载网络图片**  
`images.load(url)`  
参数：`url` (图片URL地址)  
返回值：`Image`对象或`null`  **保存图片**  
`images.save(image, path[, format = "png", quality = 100])`  
参数：`image` (图片), `path` (路径), `format` (图片格式), `quality` (图片质量)  
功能：保存图片至指定路径。**从Base64解码图片**  
`images.fromBase64(base64)`  
参数：`base64` (Base64数据)  
返回值：`Image`对象或`null`**将图片编码为Base64**  
`images.toBase64(img[, format = "png", quality = 100])`  
参数：`img` (图片), `format` (图片格式), `quality` (图片质量)  
返回值：`string` (Base64数据)**从字节数组解码图片**  
`images.fromBytes(bytes)`  
参数：`bytes` (字节数组)  
返回值：`Image`对象或`null`**将图片编码为字节数组**  
`images.toBytes(img[, format = "png", quality = 100])`  
参数：`img` (图片), `format` (图片格式), `quality` (图片质量)  
返回值：`byte[]` (字节数组)
#### 图像处理
**裁剪图片**  
`images.clip(img, x, y, w, h)`  
参数：`img` (图片), `x` (左上角横坐标), `y` (左上角纵坐标), `w` (宽度), `h` (高度)  
返回值：裁剪后的`Image`对象**调整图片大小**  
`images.resize(img, size[, interpolation])`  
参数：`img` (图片), `size` (目标尺寸), `interpolation` (插值方法)  
返回值：调整后的`Image`对象**缩放图片**  
`images.scale(img, fx, fy[, interpolation])`  
参数：`img` (图片), `fx` (宽度缩放倍数), `fy` (高度缩放倍数), `interpolation` (插值方法)  
返回值：缩放后的`Image`对象**旋转图片**  
`images.rotate(img, degree[, x, y])`  
参数：`img` (图片), `degree` (旋转角度), `x` (旋转中心x坐标), `y` (旋转中心y坐标)  
返回值：旋转后的`Image`对象**合并图片**  
`images.concat(img1, img2[, direction])`  
参数：`img1` (图片1), `img2` (图片2), `direction` (连接方向)  
返回值：合并后的`Image`对象**灰度化图片**  
`images.grayscale(img)`  
参数：`img` (图片)  
返回值：灰度化的`Image`对象**图片二值化**  
`images.threshold(img, threshold, maxVal[, type])`  
参数：`img` (图片), `threshold` (阈值), `maxVal` (最大值), `type` (阈值化类型)  
返回值：二值化后的`Image`对象**自适应阈值化**  
`images.adaptiveThreshold(img, maxValue, adaptiveMethod, thresholdType, blockSize, C)`  
参数：`img` (图片), `maxValue` (最大值), `adaptiveMethod` (自适应方法), `thresholdType` (阈值化类型), `blockSize` (邻域块大小), `C` (偏移值调整量)  
返回值：自适应阈值化后的`Image`对象**颜色空间转换**  
`images.cvtColor(img, code[, dstCn])`  
参数：`img` (图片), `code` (颜色空间转换类型), `dstCn` (目标图像的颜色通道数量)  
返回值：转换后的`Image`对象**图片二值化（区间）**  
`images.interval(img, color, interval)`  
参数：`img` (图片), `color` (颜色值), `interval` (每个通道的范围间隔)  
返回值：二值化后的`Image`对象**模糊处理**  
`images.blur(img, size[, anchor, type])`  
参数：`img` (图片), `size` (滤波器大小), `anchor` (锚点位置), `type` (边缘像素类型)  
返回值：模糊后的`Image`对象**中值滤波**  
`images.medianBlur(img, size)`  
参数：`img` (图片), `size` (滤波器大小)  
返回值：中值滤波后的`Image`对象**高斯模糊**  
`images.gaussianBlur(img, size[, sigmaX, sigmaY, type])`  
参数：`img` (图片), `size` (滤波器大小), `sigmaX` (x方向标准方差), `sigmaY` (y方向标准方差), `type` (边缘像素类型)  
返回值：高斯模糊后的`Image`对象**Mat对象转Image对象**  
`images.matToImage(mat)`  
参数：`mat` (OpenCV的Mat对象)  
返回值：`Image`对象
#### 屏幕截图与找图找色
**申请屏幕截图权限**  
`images.requestScreenCapture([landscape])`  
参数：`landscape` (布尔值, 是否为横屏截图)  
返回值：是否请求成功**截取当前屏幕**  
`images.captureScreen()`  
返回值：截取的`Image`对象**在指定位置获取像素颜色**  
`images.pixel(image, x, y)`  
参数：`image` (图片), `x` (横坐标), `y` (纵坐标)  
返回值：像素的ARGB值**在图片中寻找颜色**  
`images.findColor(image, color, options)`  
参数：`image` (图片), `color` (颜色值), `options` (找色选项)  
返回值：找到的`Point`或`null`**在指定区域寻找颜色**  
`images.findColorInRegion(img, color, x, y[, width, height, threshold])`  
参数：`img` (图片), `color` (颜色值), `x` (左上角横坐标), `y` (左上角纵坐标), `width` (宽度), `height` (高度), `threshold` (颜色相似度临界值)  
返回值：找到的`Point`或`null`**多点找色**  
`images.findMultiColors(img, firstColor, colors[, options])`  
参数：`img` (图片), `firstColor` (第一个点的颜色), `colors` (剩余点的位置和颜色), `options` (找色选项)  
返回值：找到的第一个点的`Point`或`null`**检测颜色**  
`images.detectsColor(image, color, x, y[, threshold = 16, algorithm = "diff"])`  
参数：`image` (图片), `color` (颜色值), `x` (横坐标), `y` (纵坐标), `threshold` (颜色相似度临界值), `algorithm` (颜色匹配算法)  
返回值：是否匹配到颜色**在图片中寻找模板图片**  
`images.findImage(img, template[, options])`  
参数：`img` (大图片), `template` (小图片), `options` (找图选项)  
返回值：找到的`Point`或`null`**在指定区域寻找模板图片**  
`images.findImageInRegion(img, template, x, y[, width, height, threshold])`  
参数：`img` (图片), `template` (小图片), `x` (左上角横坐标), `y` (左上角纵坐标), `width` (宽度), `height` (高度), `threshold` (图片相似度)  
返回值：找到的`Point`或`null`**匹配模板图片**  
`images.matchTemplate(img, template, options)`  
参数：`img` (大图片), `template` (小图片), `options` (找图选项)  
返回值：`MatchingResult`对象
一个循环找色的例子如下：
requestScreenCapture();
//循环找色, 找到红色(#ff0000)时停止并报告坐标
while(true){
    var img = captureScreen();
    var point = findColor(img, "#ff0000");
    if(point){
        toast("找到红色, 坐标为(" + point.x + ", " + point.y + ")");
    }
}
CopyErrorCopied
一个区域找色的例子如下：
//读取本地图片/sdcard/1.png
var img = images.read("/sdcard/1.png");
//判断图片是否加载成功
if(!img){
    toast("没有该图片");
    exit();
}
//在该图片中找色, 指定找色区域为在位置(400, 500)的宽为300长为200的区域, 指定找色临界值为4
var point = findColor(img, "#00ff00", {
     region: [400, 500, 300, 200],
     threshold: 4
 });
if(point){
    toast("找到啦:" + point);
}else{
    toast("没找到");
}
CopyErrorCopied
一个判断微博客户端的某个微博是否被点赞过的例子：
requestScreenCapture();
//找到点赞控件
var like = id("ly_feed_like_icon").findOne();
//获取该控件中点坐标
var x = like.bounds().centerX();
var y = like.bounds().centerY();
//截图
var img = captureScreen();
//判断在该坐标的颜色是否为橙红色
if(images.detectsColor(img, "#fed9a8", x, y)){
    //是的话则已经是点赞过的了, 不做任何动作
}else{
    //否则点击点赞按钮
    like.click();
}
一个最简单的找图例子如下：
var img = images.read("/sdcard/大图.png");
var templ = images.read("/sdcard/小图.png");
var p = findImage(img, templ);
if(p){
    toast("找到啦:" + p);
}else{
    toast("没找到");
}
CopyErrorCopied
稍微复杂点的区域找图例子如下：
auto();
requestScreenCapture();
var wx = images.read("/sdcard/微信图标.png");
//返回桌面
home();
//截图并找图
var p = findImage(captureScreen(), wx, {
    region: [0, 50],
    threshold: 0.8
});
if(p){
    toast("在桌面找到了微信图标啦: " + p);
}else{
    toast("在桌面没有找到微信图标");
}
CopyErrorCopied
barcode 模块用于识别图像中的条码.
interface Barcode {






}
qrcode 模块用于识别图像中的二维码.
interface QrCode {






}
# 章节——光学字符识别 (OCR)
AutoJs6 的 OCR模块用于识别图像中的文本，支持两种工作模式：Google ML Kit 和 Baidu PaddlePaddle。
#### 主要方法
**ocr()****功能**: 识别当前屏幕截图中包含的所有文本。**语法**:





**返回值**: 字符串数组 `string[]`。
**ocr(region)****功能**: 识别指定区域内当前屏幕截图中的所有文本。**语法**:





**返回值**: 字符串数组 `string[]`。
**ocr(img, options?)****功能**: 识别图像中包含的所有文本。**语法**:





**返回值**: 字符串数组 `string[]`。
**ocr(img, region)****功能**: 识别指定区域内图像中的所有文本。**语法**:





**返回值**: 字符串数组 `string[]`。
**ocr(imgPath, options?)****功能**: 识别指定路径图像中包含的所有文本。**语法**:





**返回值**: 字符串数组 `string[]`。
**ocr(imgPath, region)****功能**: 识别指定路径图像在指定区域内包含的所有文本。**语法**:





**返回值**: 字符串数组 `string[]`。

#### OCR工作模式
**获取/设置工作模式**:





**切换工作模式**:





**获取OCR功能摘要**:






#### 注意事项
使用Paddle工作模式时，建议开启AutoJs6的“忽略电池优化”开关，以避免应用崩溃。OCR识别结果包含文本标签、置信度、位置矩形等信息。
按键 (Keys)
按键模拟部分提供了模拟物理按键的全局函数，包括 Home 键、音量键、照相键等。这些函数可以分为两类：
**依赖无障碍服务**：如 `back()`、`home()`、`powerDialog()` 等。**依赖 root 权限**：如 `Home()`、`Back()`、`Power()` 等。返回值：`boolean`，表示是否执行成功。
##### 其他方法
**Text(text)**输入指定的文字。参数：`text {string}`，要输入的文字，只能为英文或英文符号。

# 存储 (Storages)
存储模块 (`storages`) 用于保存简单数据、配置信息、列表清单等。保存的数据在脚本间共享，因此不适合存储敏感数据。每个存储名称对应一个独立的本地存储，但不能像 Web 开发中的 `LocalStorage` 那样提供域名独立的存储，因为脚本路径可能会随时改变。
#### 主要方法
**create(name)**参数：`name {string}` - 存储名称返回值：`Storage` - 返回一个 `Storage` 实例。描述：以 `name` 参数为名称创建一个本地存储。示例：






**remove(name)**参数：`name {string}` - 存储名称返回值：`boolean` - 表示 `name` 参数对应的本地存储是否存在。描述：清除名为 `name` 的本地存储包含的全部数据。示例：







#### 存储实例 (`Storage`)
**put(key, value)**参数：`key {string}` - 键，`value` - 值描述：将键值对存入存储。示例：






**get(key)**参数：`key {string}` - 键返回值：`any` - 对应键的值。描述：获取键对应的值。示例：






**clear()**返回值：`void`描述：清除当前存储中的所有数据。示例：






**remove(key)**参数：`key {string}` - 键返回值：`boolean` - 表示 `key` 是否存在于存储中。描述：移除存储中的指定键。示例：







#### 支持的数据类型
支持存储的数据类型包括：`number`、`boolean`、`string`、`null`、`Array`、`Object`。存入时，数据会被 `JSON.stringify` 序列化为 `string` 类型，读取时，会被 `JSON.parse` 还原为原本的数据类型。
#### 示例






#### 注意事项
**数据安全性**：由于存储的数据在脚本间共享，不适合存储敏感数据。**存储名称**：存储名称应尽量具体，以便确保数据的安全性和唯一性。例如，`storages.create('project-publishing-schedule')`。
消息浮动框 (Toast)
`toast` 模块用于显示、消除和定制消息浮动框。
#### 主要方法
**toast(text)**参数：`text {string}` - 消息内容返回值：`void`描述：显示一个消息浮动框，默认显示时间为 2 秒钟。消息框的显示是依次进行的。示例：






**toast(text, isLong)**参数：`text {string}` - 消息内容，`isLong {'long' | 'l' | 'short' | 's' | boolean}` - 是否以较长时间显示返回值：`void`描述：控制单个消息框的显示时长。`isLong` 参数可以是 `'long'`、`'l'`、`'short'`、`'s'` 或布尔值 `true`/`false`。示例：






**toast(text, isLong, isForcible)**参数：`text {string}` - 消息内容，`isLong {'long' | 'l' | 'short' | 's' | boolean}` - 是否以较长时间显示，`isForcible {'forcible' | 'f' | boolean}` - 是否强制覆盖显示返回值：`void`描述：使用 `isForcible` 参数可以立即显示消息框，覆盖之前的消息框。示例：






**toast(text, isForcible)**参数：`text {string}` - 消息内容，`isForcible {'forcible' | 'f'}` - 强制覆盖显示（字符标识）返回值：`void`描述：此方法相当于忽略 `isLong` 参数，强制覆盖显示当前消息框。示例：






**dismissAll()**返回值：`void`描述：强制消除所有由 AutoJs6 产生的消息框，包括正在显示的及等待显示的。示例：







#### 注意事项
**显示时长**：仅有“长”和“短”两种时长，由安卓系统决定，通常短时为 2 秒，长时为 3.5 秒。**强制覆盖**：强制覆盖仅对当前脚本有效，对其他脚本及应用程序无效。**权限要求**：部分设备和操作系统需要授予“后台弹出页面”权限才能正常显示 Toast 消息。**通知权限**：部分设备的 Toast 消息正常显示依赖通知权限，当未授予通知权限或通知被阻止时，Toast 可能无法正常显示。
# 消息通知 (Notice)
`notice` 模块用于创建并显示消息通知，位于通知栏，可应用于消息提醒、信息通信及执行操作等场景。不同安卓系统的通知表现可能存在较大差异，与文档描述也可能存在出入。
提示：可以配合手表实现手表监控
#### 简单操作
**显示一条通知**:





**显示两条独立的通知**:





**显示两条可覆盖的通知**:**方法 A: 通过指定相同的通知 ID 实现通知覆盖**:





**方法 B: 通过 `notice.config` 配置 `notice` 的默认选项**:



#### 主要方法
**notice(content)**参数：`content {string}` - 通知消息的内容返回值：`number` - 通知 ID描述：发送通知，包含内容。示例：






**notice(title, content)**参数：`title {string}` - 通知消息的标题，`content {string}` - 通知消息的内容返回值：`number` - 通知 ID描述：发送通知，包含标题及内容。示例：






**notice(options)**参数：`options {NoticeOptions}` - 通知选项配置返回值：`number` - 通知 ID描述：发送通知，并进行选项配置。示例：






**notice(content, options)**参数：`content {string}` - 通知消息的内容，`options {NoticeOptions}` - 通知选项配置返回值：`number` - 通知 ID描述：发送通知，包含内容，并进行选项配置。示例：






**notice(title, content, options)**参数：`title {string}` - 通知消息的标题，`content {string}` - 通知消息的内容，`options {NoticeOptions}` - 通知选项配置返回值：`number` - 通知 ID描述：发送通知，包含标题及内容，并进行选项配置。示例：






**notice(builder)**参数：`builder {NoticeBuilder}` - 通知构建器返回值：`number` - 通知 ID描述：使用通知构建器发送通知。示例：






**notice.isEnabled()**返回值：`boolean`描述：检测 AutoJs6 的通知是否未被阻止。示例：






**notice.ensureEnabled()**返回值：`void`描述：确保 AutoJs6 的通知未被阻止。当通知被阻止时将抛出 Exception 异常。
**notice.launchSettings()**返回值：`void`描述：跳转至 AutoJs6 的通知设置页面。示例：






**notice.cancel(id)**参数：`id {number}` - 通知 ID返回值：`void`描述：消除通知。示例：






**notice.getBuilder()**返回值：`NoticeBuilder`描述：获取一个简单通知构建器。示例：






**notice.config(preset)**参数：`preset {NoticePresetConfiguration}` - 通知预设配置对象返回值：`void`描述：配置通知渠道与通知发送的默认行为。示例：






**notice.channel.create(channelId)**参数：`channelId {string | number}` - 渠道 ID返回值：`string` - 渠道 ID描述：创建通知渠道，并指定渠道 ID。示例：






**notice.channel.create(channelId, options)**参数：`channelId {string | number}` - 渠道 ID，`options {NoticeChannelOptions}` - 渠道创建选项返回值：`string` - 渠道 ID描述：创建通知渠道，指定渠道 ID 并进行渠道配置。示例：






**notice.channel.create(options)**参数：`options {NoticeChannelOptions}` - 渠道创建选项返回值：`string` - 渠道 ID描述：创建通知渠道，与 `notice.channel.create(channelId, options)` 方法类似，但省略 `channelId` 参数。示例：






**notice.channel.contains(channelId)**参数：`channelId {string | number}` - 渠道 ID返回值：`boolean` - 当前渠道 ID 是否已被创建描述：返回指定渠道 ID 的 AutoJs6 渠道是否存在。示例：






**notice.channel.remove(channelId)**参数：`channelId {string | number}` - 渠道 ID返回值：`boolean` - 删除前，当前渠道 ID 是否已被创建描述：根据渠道 ID 删除 AutoJs6 的渠道实例。示例：






**notice.channel.get(channelId)**参数：`channelId {string | number}` - 渠道 ID返回值：`android.app.NotificationChannel | null` - 渠道实例描述：根据渠道 ID 获取 AutoJs6 的渠道实例，不存在时返回 `null`。示例：






**notice.channel.getAll()**返回值：`android.app.NotificationChannel[]` - 渠道实例数组描述：获取 AutoJs6 的所有通知渠道实例（不包含已被删除的）。示例：









# Shell
`shell` 模块用于在安卓设备上执行 Unix Shell 命令。它大致等同于使用 `adb shell` 命令。Shell 提供了两种方式来执行命令：一种是通过 `java.lang.Runtime.exec`，另一种是通过内嵌终端模拟器。
#### 主要方法
**shell(cmd[, root])**参数：`cmd {string}` - 要执行的命令，`root {Boolean}` - 是否以 root 权限运行，默认为 `false`。返回值：`{code: number, result: string, error: string}` - 返回一个对象，包含命令的返回码、运行结果和错误信息。描述：一次性执行命令 `cmd`，并返回命令的执行结果。示例：






**new Shell(root)**参数：`root {Boolean}` - 是否以 root 权限运行一个 shell 进程，默认为 `false`。返回值：`Shell` - 返回一个 `Shell` 对象。描述：创建一个新的 `Shell` 对象，用于执行一系列命令。示例：






**Shell.exec(cmd)**参数：`cmd {string}` - 要执行的命令。返回值：`void`描述：执行命令 `cmd`。该函数不会返回任何值，命令执行是异步的、非阻塞的。示例：






**Shell.exit()**返回值：`void`描述：直接退出 shell。正在执行的命令会被强制退出。示例：






**Shell.exitAndWaitFor()**返回值：`void`描述：执行 "exit" 命令并等待执行命令执行完成、退出 shell。示例：






**Shell.setCallback(callback)**参数：`callback {Object}` - 回调函数，包含以下属性：`onOutput {Function}` - 每当 shell 有新的输出时便会调用该函数。其参数是一个字符串。`onNewLine {Function}` - 每当 shell 有新的一行输出时便会调用该函数。其参数是一个字符串（不包括最后的换行符）。
返回值：`void`描述：设置该 `Shell` 的回调函数，以便监听 `Shell` 的输出。示例：









#### 注意事项
**root 权限**：执行需要 root 权限的命令时，确保设备已授予 root 权限。**命令执行**：Shell 命令的执行是异步的，因此需要处理命令执行的完成情况。**错误处理**：在执行命令时，捕获并处理可能的错误信息。


# Shizuku
通过 **Shizuku** 可以获得 ADB 特权并使用系统 API。Shizuku 是一款安卓应用，允许开发者在不 root 设备的情况下访问系统级别的权限。以下是使用 Shizuku 的基本要求和方法。
### Shizuku 全局对象
`shizuku` 可作为全局对象使用，用于执行 Shell 命令并返回结果。






#### 方法
##### shizuku(cmd)
**参数**:`cmd` { string } - 待执行命令。
**返回值**:{ ShellResult } - Shell 结果。
**描述**:
使用 Shizuku 执行单行命令。
**示例**:






##### shizuku(cmdList)
**参数**:`cmdList` { string[] } - 待执行的多行命令。
**返回值**:{ ShellResult } - Shell 结果。
**描述**:
使用 Shizuku 一次性执行多行命令，每行命令对应 `cmdList` 数组中的一个元素。
**示例**:






---
### ShellResult 对象
执行 Shizuku 命令后，返回一个 `ShellResult` 对象，包含以下属性：
`code`: 返回码。执行成功时为 `0`，失败时为非 `0` 的数字。`result`: 运行结果（标准输出 `stdout`）。`error`: 运行的错误信息（标准错误 `stderr`）。
**示例**:








# 多媒体 (Media)
`media` 模块提供多媒体编程的支持，目前主要支持音乐播放和媒体文件扫描。
#### 注意事项
使用该模块播放音乐时是在后台异步播放的，在脚本结束后会自动结束播放。因此，可能需要插入诸如 `sleep()` 的语句来使脚本保持运行，确保音乐播放完毕。
#### 主要方法
##### media.playMusic(path[, volume, looping])
**参数**:`path {string}` - 音乐文件路径。`volume {number}` - 播放音量，为 `0~1` 的浮点数，默认为 `1`。`looping {boolean}` - 是否循环播放，默认为 `false`。
**描述**:
播放音乐文件 `path`。该函数不会显示任何音乐播放界面。如果文件不存在或者文件不是受支持的音乐格式，则抛出 `UncheckedIOException` 异常。**示例**:





如果要循环播放音乐，则使用 `looping` 参数：






如果要使用音乐播放器播放音乐，调用 `app.viewFile(path)` 函数。

##### media.musicSeekTo(msec)
**参数**:`msec {number}` - 毫秒数，表示音乐进度。
**描述**:
把当前播放进度调整到时间 `msec` 的位置。如果当前没有在播放音乐，则调用函数没有任何效果。**示例**:






##### media.pauseMusic()
**描述**:
暂停音乐播放。如果当前没有在播放音乐，则调用函数没有任何效果。
##### media.resumeMusic()
**描述**:
继续音乐播放。如果当前没有播放过音乐，则调用该函数没有任何效果。
##### media.stopMusic()
**描述**:
停止音乐播放。如果当前没有在播放音乐，则调用函数没有任何效果。
##### media.isMusicPlaying()
**返回值**:`{boolean}` - 返回当前是否正在播放音乐。

##### media.getMusicDuration()
**返回值**:`{number}` - 返回当前音乐的时长。单位毫秒。

##### media.getMusicCurrentPosition()
**返回值**:`{number}` - 返回当前音乐的播放进度（已经播放的时间），单位毫秒。



# 传感器 (Sensors)
`Sensors` 模块提供了获取手机上各种传感器信息的支持，这些传感器包括距离传感器、光线传感器、重力传感器、方向传感器等。脚本只能获取传感器的数据，不能模拟或伪造传感器的数据和事件。因此，诸如模拟摇一摇的功能是无法实现的。
在一般开发中不会经常用到。详情参阅具体文档。
# 定时器 (Timers)
`timers` 模块提供了一组全局 API，用于在未来的某个时间点调用调度函数。这些 API 类似于 Web 浏览器中的定时器 API，但基于 Android 的 Looper-Handler 消息循环机制实现。这些定时器是单线程的，这意味着如果脚本中有耗时操作或死循环，定时器可能会延迟执行。
#### 主要方法
##### setTimeout(callback, delay[, ...args])
**参数**:`callback {Function}` - 定时器到期后要调用的函数。`delay {number}` - 等待的时间，单位为毫秒。`...args {any}` - 可选参数，将在调用 `callback` 时传递。
**返回值**:`{number}` - 一个用于 `clearTimeout()` 的 id。
**描述**:
预定在 `delay` 毫秒后执行 `callback`。当 `delay` 小于 0 时，`delay` 会被设为 0。**注意事项**:回调函数可能不会精确地在 `delay` 毫秒后被调用。Auto.js 不能保证回调被触发的确切时间，也不能保证它们的顺序。回调函数会在尽可能接近所指定的时间上调用。
**示例**:






##### setInterval(callback, delay[, ...args])
**参数**:`callback {Function}` - 定时器到期后要调用的函数。`delay {number}` - 等待的时间，单位为毫秒。`...args {any}` - 可选参数，将在调用 `callback` 时传递。
**返回值**:`{number}` - 一个用于 `clearInterval()` 的 id。
**描述**:
预定每隔 `delay` 毫秒重复执行 `callback`。当 `delay` 小于 0 时，`delay` 会被设为 0。**注意事项**:如果脚本中有耗时操作或死循环，定时器可能会延迟执行。
**示例**:






##### setImmediate(callback[, ...args])
**参数**:`callback {Function}` - 在 Looper 循环的当前回合结束时要调用的函数。`...args {any}` - 可选参数，将在调用 `callback` 时传递。
**返回值**:`{number}` - 一个用于 `clearImmediate()` 的 id。
**描述**:
预定立即执行 `callback`，但它会在 I/O 事件的回调之后被触发。**注意事项**:当多次调用 `setImmediate()` 时，`callback` 函数会按照它们被创建的顺序依次执行。每次事件循环迭代都会处理整个回调队列。如果一个立即定时器是被一个正在执行的回调排入队列的，则该定时器直到下一次事件循环迭代才会被触发。
**示例**:






#### 取消定时器
##### clearInterval(id)
**参数**:`id {number}` - 一个 `setInterval()` 返回的 id。
**描述**:
取消一个由 `setInterval()` 创建的循环定时任务。**示例**:






##### clearTimeout(id)
**参数**:`id {number}` - 一个 `setTimeout()` 返回的 id。
**描述**:
取消一个由 `setTimeout()` 创建的定时任务。**示例**:






##### clearImmediate(id)
**参数**:`id {number}` - 一个 `setImmediate()` 返回的 id。
**描述**:
取消一个由 `setImmediate()` 创建的 Immediate 对象。**示例**:






#### 示例








# 用户界面 (UI)
这个模块允许用户以超文本形式定制UI界面，但是由于其内容过于复杂，具体等到用的时候再参阅详情。
# 悬浮窗 (Floaty)
`floaty` 模块提供了悬浮窗的相关函数，可以在屏幕上显示自定义悬浮窗，控制悬浮窗的大小、位置等。由于悬浮窗的实现基于 UI 实现，在此省略。
# 对话框 (Dialogs)
`dialogs` 模块提供了简单的对话框支持，可以通过对话框和用户进行交互。对话框模块包括多种类型的对话框，例如提示框、确认框、输入框、选择框等。对话框可以用于获取用户输入、显示消息或进行简单的用户交互。
#### 主要方法
##### dialogs.alert(title[, content, callback])
**参数**:`title {string}` - 对话框的标题。`content {string}` - 可选，对话框的内容，默认为空。`callback {Function}` - 可选，回调函数。当用户点击确定时被调用，一般用于 UI 模式。
**描述**:显示一个只包含“确定”按钮的提示对话框。直至用户点击确定脚本才继续运行。该函数也可以作为全局函数使用。
**示例**:






##### dialogs.confirm(title[, content, callback])
**参数**:`title {string}` - 对话框的标题。`content {string}` - 可选，对话框的内容，默认为空。`callback {Function}` - 可选，回调函数。当用户点击确定时被调用，一般用于 UI 模式。
**描述**:显示一个包含“确定”和“取消”按钮的提示对话框。如果用户点击“确定”则返回 `true`，否则返回 `false`。该函数也可以作为全局函数使用。
**示例**:






##### dialogs.rawInput(title[, prefill, callback])
**参数**:`title {string}` - 对话框的标题。`prefill {string}` - 输入框的初始内容，可选，默认为空。`callback {Function}` - 可选，回调函数。当用户点击确定时被调用，一般用于 UI 模式。
**描述**:显示一个包含输入框的对话框，等待用户输入内容，并在用户点击确定时将输入的字符串返回。如果用户取消了输入，返回 `null`。
**示例**:






##### dialogs.input(title[, prefill, callback])
**参数**:`title {string}` - 对话框的标题。`prefill {string}` - 输入框的初始内容，可选，默认为空。`callback {Function}` - 可选，回调函数。当用户点击确定时被调用，一般用于 UI 模式。
**描述**:等效于 `eval(dialogs.rawInput(title, prefill, callback))`，会把输入的字符串用 `eval` 计算一遍再返回，返回的可能不是字符串。可以用于输入数字、数组等。
**示例**:






##### dialogs.prompt(title[, prefill, callback])
**参数**:`title {string}` - 对话框的标题。`prefill {string}` - 输入框的初始内容，可选，默认为空。`callback {Function}` - 可选，回调函数。当用户点击确定时被调用，一般用于 UI 模式。
**描述**:等效于 `dialogs.rawInput()`，用于获取用户输入的字符串。
**示例**:






##### dialogs.select(title, items, callback)
**参数**:`title {string}` - 对话框的标题。`items {Array}` - 对话框的选项列表，是一个字符串数组。`callback {Function}` - 可选，回调函数。当用户点击确定时被调用，一般用于 UI 模式。
**描述**:显示一个带有选项列表的对话框，等待用户选择，返回用户选择的选项索引（0 ~ item.length - 1）。如果用户取消了选择，返回 `-1`。
**示例**:






##### dialogs.singleChoice(title, items[, index, callback])
**参数**:`title {string}` - 对话框的标题。`items {Array}` - 对话框的选项列表，是一个字符串数组。`index {number}` - 对话框的初始选项的位置，默认为 `0`。`callback {Function}` - 可选，回调函数。当用户点击确定时被调用，一般用于 UI 模式。
**描述**:显示一个单选列表对话框，等待用户选择，返回用户选择的选项索引（0 ~ item.length - 1）。如果用户取消了选择，返回 `-1`。
**示例**:






##### dialogs.multiChoice(title, items[, indices, callback])
**参数**:`title {string}` - 对话框的标题。`items {Array}` - 对话框的选项列表，是一个字符串数组。`indices {Array}` - 选项列表中初始选中的项目索引的数组，默认为空数组。`callback {Function}` - 可选，回调函数。当用户点击确定时被调用，一般用于 UI 模式。
**描述**:显示一个多选列表对话框，等待用户选择，返回用户选择的选项索引的数组。如果用户取消了选择，返回 `[]`。
**示例**:






##### dialogs.build(properties)
**参数**:`properties {Object}` - 对话框属性，用于配置对话框。
**返回值**:`{Dialog}` - 返回一个可自定义的对话框对象。
**描述**:创建一个可自定义的对话框，支持标题、内容、按钮、选项列表等多种配置。
**示例**:






#### 事件
**show**对话框显示时触发的事件。
**cancel**对话框被取消时触发的事件。
**dismiss**对话框消失时触发的事件。
**positive**确定按钮按下时触发的事件。
**negative**取消按钮按下时触发的事件。
**neutral**中性按钮按下时触发的事件。
**any**任意按钮按下时触发的事件。
**item_select**列表项目被点击选中时触发的事件。
**single_choice**单选列表项目被选中并点击确定时触发的事件。
**multi_choice**多选列表项目被选中并点击确定时触发的事件。
**input**带有输入框的对话框当点击确定时触发的事件。
**input_change**对话框的输入框的文本发生变化时触发的事件。

#### 示例






#### 注意事项
对话框在 UI 模式下不能像通常那样使用，应该使用回调函数或者 Promise 的形式。对话框可以自定义配置，包括标题、内容、按钮、选项列表、输入框等。对话框可以监听各种事件，包括按钮点击、选项选择、输入框变化等。




# 事件监听 (Events)
#### 事件模块概述
`events` 模块提供了监听手机通知、按键、触摸的接口。`events` 是一个 `EventEmitter`，包含内置事件如按键事件、通知事件、Toast 事件等。
#### 注意事项
事件处理是单线程的，仍在原线程执行。脚本主体或其他事件处理中的耗时操作可能导致事件无法及时处理。
#### 事件监听函数
**观察按键**`events.observeKey()`：启用按键监听，需无障碍服务开启。`events.onKeyDown(keyName, listener)`：监听按键按下事件。`events.onKeyUp(keyName, listener)`：监听按键弹起事件。`events.onceKeyDown(keyName, listener)`：监听一次按键按下事件。`events.onceKeyUp(keyName, listener)`：监听一次按键弹起事件。`events.removeAllKeyDownListeners(keyName)`：移除按键按下事件监听。`events.removeAllKeyUpListeners(keyName)`：移除按键弹起事件监听。`events.setKeyInterceptionEnabled([key], enabled)`：启用/禁用按键屏蔽功能。
**观察触摸**`events.observeTouch()`：启用触摸监听，需 root 权限。`events.setTouchEventTimeout(timeout)`：设置触摸事件的最小间隔。`events.onTouch(listener)`：注册触摸监听函数。
**观察通知**`events.observeNotification()`：启用通知监听，依赖通知服务。`events.onNotification(listener)`：监听通知事件。
**观察 Toast**`events.observeToast()`：启用 Toast 监听，依赖无障碍服务。`events.onToast(listener)`：监听 Toast 事件。

#### 事件类型
`'key'`：按键被按下或弹起。`'key_down'`：按键被按下。`'key_up'`：按键被弹起。`'exit'`：脚本退出。`'notification'`：收到新通知。`'toast'`：收到 Toast。
#### 示例






#### EventEmiiter 方法
`emitter.on(eventName, listener)`：添加事件监听器。`emitter.once(eventName, listener)`：添加一次性事件监听器。`emitter.removeListener(eventName, listener)`：移除事件监听器。`emitter.removeAllListeners([eventName])`：移除所有或指定事件的监听器。`emitter.setMaxListeners(n)`：设置监听器的最大数量。
#### 脚本间广播
`events.broadcast.emit(eventName, ...args)`：发送广播。`events.broadcast.on(eventName, listener)`：监听广播。
# 选择器 (UiSelector)
`UiSelector` 是一个用于通过附加条件筛选控件节点的工具，可以用于执行控件行为（如点击、长按、设置文本）、判断位置、获取文本内容、获取控件特定状态、以及在控件层级中进行导航等操作。
建议使用官方工具来找控件，如果不行去看文档https://docs.autojs6.com/#/uiSelectorType吧，内容非常多。
======文档结束=====




```