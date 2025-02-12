### 用户界面 (UI)

`ui` 模块提供了编写用户界面的支持。给 Android 开发者或者高阶用户的一个提醒是，Auto.js 的 UI 系统来自于 Android，所有属性和方法都能在 Android 源码中找到。如果某些代码或属性没有出现在 Auto.js 的文档中，可以参考 Android 的文档。

#### 使用说明

- **指定 UI 模式**:
  - 脚本的最前面必须使用 `"ui";` 指定 UI 模式，否则脚本将不会以 UI 模式运行。
  - 正确示范:
    ```javascript
    "ui";
    // 脚本的其他代码
    ```
- **布局和控件**:
  - 界面是由视图 (View) 组成的，View 分成两种：控件 (Widget) 和 布局 (Layout)。
  - 控件 (Widget) 用来具体显示文字、图片、网页等，比如文本控件 (`text`) 用来显示文字，按钮控件 (`button`) 则可以显示一个按钮并提供点击效果，图片控件 (`img`) 则用来显示来自网络或者文件的图片。
  - 布局 (Layout) 则是装着一个或多个控件的“容器”，用于控制在其里面的控件的位置。例如：
    - `<vertical>`：垂直布局，会将其里面的控件从上往下依次显示（即纵向排列）。
    - `<horizontal>`：水平布局，会将其里面的控件从左往右依次显示（即横向排列）。
    - `<frame>`：帧布局，会将其里面的控件直接在左上角显示，如果有多个控件，后面的控件会重叠在前面的控件上。

#### XML 布局

- **编写界面**:
  - 使用 XML 来编写界面，并通过 `ui.layout()` 函数指定界面的布局 XML。
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <vertical>
            <button text="第一个按钮"/>
            <button text="第二个按钮"/>
        </vertical>
    );
    ```
- **布局和控件的属性**:
  - 布局和控件可以指定多个属性，用空格隔开即可。
  - 布局同样也可以指定属性，例如：
    ```javascript
    "ui";
    $ui.layout(
        <vertical bg="#ff0000">
            <button text="第一个按钮" textSize="20sp"/>
            <button text="第二个按钮"/>
        </vertical>
    );
    ```

#### 视图 (View)

- **子视图**:
  - 布局里面的控件是这个布局的子控件/子视图。
  - 实际上布局里面不仅仅只能有控件，还可以是嵌套的布局。因此用子视图 (Child View) 更准确一些。
- **父视图**:
  - 直接包含一个控件的布局是这个控件的父布局/父视图 (Parent View)。
- **View 的共用属性和函数**:
  - `attr(name, value)`:
    - 设置属性的值。
    - 示例:
      ```javascript
      "ui";
      $ui.layout(
          <frame>
              <text id="example" text="Hello"/>
          </frame>
      );
      // 5秒后执行
      $ui.post(() => {
          $ui.example.attr("text", "Hello, Auto.js UI");
          $ui.example.attr("bg", "#ff00ff");
          $ui.example.attr("h", "500dp");
      }, 5000);
      ```
  - `attr(name)`:
    - 返回属性的值。
    - 示例:
      ```javascript
      "ui";
      $ui.layout(
          <frame>
              <text id="example" text="1"/>
          </frame>
      );
      function plusOne() {
          let text = $ui.example.attr("text");
          let num = parseInt(text);
          num++;
          $ui.example.attr("text", String(num));
          $ui.post(plusOne, 1000);
      }
      plusOne();
      ```

#### 尺寸属性

- **宽度 (`w`) 和 高度 (`h`)**:
  - 可以设置的值为 `*`, `auto` 和具体数值。
  - `*` 表示宽度尽量填满父布局，而 `auto` 表示宽度将根据 View 的内容自动调整（自适应宽度）。
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <horizontal>
            <button w="auto" text="自适应宽度"/>
            <button w="*" text="填满父布局"/>
        </horizontal>
    );
    ```

#### 其他属性

- **ID (`id`)**:
  - 用来区分一个界面下的不同控件和布局。
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <frame>
            <button id="ok" text="确定"/>
        </frame>
    );
    // 通过 ui.ok 获取到按钮控件
    toast(ui.ok.getText());
    ```
- **重力 (`gravity`)**:
  - 用于决定 View 的内容相对于 View 的位置。
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <frame>
            <button gravity="right" w="*" h="auto" text="靠右的文字"/>
        </frame>
    );
    ```
- **布局重力 (`layout_gravity`)**:
  - 用于决定 View 本身在其父布局的位置。
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <frame w="*" h="*">
            <button layout_gravity="center" w="auto" h="auto" text="居中的按钮"/>
            <button layout_gravity="right|bottom" w="auto" h="auto" text="右下角的按钮"/>
        </frame>
    );
    ```
- **边距 (`margin`)**:
  - View 和其他 View 的间距，即外边距。
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <horizontal>
            <button margin="30" text="距离四周30"/>
            <button text="普通的按钮"/>
        </horizontal>
    );
    ```
- **内边距 (`padding`)**:
  - View 和其自身内容的间距，即内边距。
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <frame w="*" h="*" gravity="center">
            <text padding="10 20 30 40" bg="#ff0000" w="auto" h="auto" text="HelloWorld"/>
        </frame>
    );
    ```

#### 控件示例

- **文本控件 (`text`)**:
  - 用于显示文本，可以控制文本的字体大小、字体颜色、字体等。
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <vertical>
            <text id="myText" lines="3">
            </vertical>
    )
    // 通过 \n 换行
    ui.myText.setText("第一行\n第二行\n第三行\n第四行");
    ```
- **按钮控件 (`button`)**:
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <vertical>
            <button text="确定"/>
        </vertical>
    );
    // 指定按钮点击时要执行的动作
    ui.ok.click(function(){
        toast("确定按钮被点击了");
    });
    ```
- **输入框控件 (`input`)**:
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <vertical padding="16">
            <text textSize="16sp" textColor="black" text="请输入姓名"/>
            <input id="name" text="小明"/>
            <button id="ok" text="确定"/>
        </vertical>
    );
    // 指定确定按钮点击时要执行的动作
    ui.ok.click(function(){
        var name = ui.name.getText();
        toast(name + "您好!");
    });
    ```
- **图片控件 (`img`)**:
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <frame>
            <img src="https://www.baidu.com/img/bd_logo1.png"/>
        </frame>
    );
    ```

#### 布局示例

- **垂直布局 (`vertical`)**:
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <vertical h="100dp">
            <text layout_weight="1" text="控件1" bg="#ff0000"/>
            <text layout_weight="2" text="控件2" bg="#00ff00"/>
            <text layout_weight="1" text="控件3" bg="#0000ff"/>
        </vertical>
    );
    ```
- **水平布局 (`horizontal`)**:
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <horizontal>
            <button text="按钮1"/>
            <button text="按钮2"/>
            <button text="按钮3"/>
        </horizontal>
    );
    ```
- **线性布局 (`linear`)**:
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <linear orientation="vertical">
            <button text="按钮1"/>
            <button text="按钮2"/>
            <button text="按钮3"/>
        </linear>
    );
    ```
- **帧布局 (`frame`)**:
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <frame>
            <button text="按钮1"/>
            <button text="按钮2"/>
            <button text="按钮3"/>
        </frame>
    );
    ```
- **相对布局 (`relative`)**:
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <relative>
            <button text="按钮1" layout_gravity="left"/>
            <button text="按钮2" layout_gravity="right"/>
        </relative>
    );
    ```

#### 动态创建控件

- **动态创建控件**:
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <linear id="container">
        </linear>
    );
    // 动态创建3个文本控件，并加到 container 容器中
    for (let i = 0; i < 3; i++) {
        let textView = $ui.inflate(
            <text textColor="#000000" textSize="14sp"/>
        , $ui.container);
        textView.attr("text", "文本控件" + i);
        $ui.container.addView(textView);
    }
    ```

#### 其他功能

- **注册自定义组件**:
  - 示例:
    ```javascript
    ui.registerWidget("customButton", function(xml) {
        return new Button($context, xml);
    });
    ```
- **UI 线程检查**:
  - 示例:
    ```javascript
    log($ui.isUiThread()); // => true
    threads.start(function () {
        log($ui.isUiThread()); // => false
    });
    ```
- **更新 UI**:
  - 示例:
    ```javascript
    "ui";
    $ui.layout(
        <frame>
            <text id="result"/>
        </frame>
    );
    $ui.result.attr("text", "计算中");
    // 在子线程中计算 1 + ... + 10000000
    threads.start({
        let sum = 0;
        for (let i = 0; i < 1000000; i++) {
            sum += i;
        }
        // 由于不能在子线程操作 UI，所以要抛到 UI 线程执行
        $ui.post(() => {
            $ui.result.attr("text", String(sum));
        });
    });
    ```
- **设置状态栏颜色**:
  - 示例:
    ```javascript
    "ui";
    $ui.statusBarColor("#000000");
    ```
- **启用 Android 资源**:
  - 示例:
    ```json
    {
        "androidResources": {
            "resDir": "res",
            "manifest": "AndroidManifest.xml"
        }
    }
    ```

#### 尺寸单位

- **尺寸单位**:
  - dp: Device-independent pixels。
  - px: Pixels。
  - mm: Millimeters。
  - in: Inches。

#### 颜色

- **颜色**:
  - RGB 格式: `#RRGGBB`。
  - 颜色名称: `red`, `green` 等。

<br/>

### 悬浮窗 (Floaty)

`floaty` 模块提供了悬浮窗的相关函数，可以在屏幕上显示自定义悬浮窗，控制悬浮窗的大小、位置等。悬浮窗在脚本停止运行时会自动关闭，因此，要保持悬浮窗不被关闭，可以使用一个空的 `setInterval` 来实现，例如：

```javascript
setInterval(() => {}, 1000);
```

#### 主要方法

##### floaty.window(layout)

- **参数**:
  - `layout {xml} | {View}` - 悬浮窗界面的 XML 或 View。
- **返回值**:
  - `FloatyWindow` - 创建并显示一个悬浮窗，返回一个 `FloatyWindow` 对象。
- **描述**:
指定悬浮窗的布局，创建并显示一个悬浮窗。该悬浮窗自带关闭、调整大小、调整位置按键，可以根据需要调用 `setAdjustEnabled()` 函数来显示或隐藏这些按键。
- **示例**:
  ```javascript
  var w = floaty.window(
      <frame gravity="center">
          <text id="text">悬浮文字</text>
      </frame>
  );
  setTimeout(() => {
      w.close();
  }, 2000);
  ```

##### floaty.rawWindow(layout)

- **参数**:
  - `layout {xml} | {View}` - 悬浮窗界面的 XML 或 View。
- **返回值**:
  - `FloatyRawWindow` - 创建并显示一个原始悬浮窗，返回一个 `FloatyRawWindow` 对象。
- **描述**:
与 `floaty.window()` 函数不同，该悬浮窗不会增加任何额外设施（例如调整大小、位置按钮），您可以根据自己的需要编写任何布局。而且，该悬浮窗支持完全全屏，可以覆盖状态栏，因此可以用于制作护眼模式之类的应用。
- **示例**:
  ```javascript
  var w = floaty.rawWindow(
      <frame gravity="center">
          <text id="text">悬浮文字</text>
      </frame>
  );
  w.setPosition(500, 500);
  setTimeout(() => {
      w.close();
  }, 2000);
  ```

##### floaty.closeAll()

- **描述**:
关闭所有本脚本的悬浮窗。

#### FloatyWindow 对象

`FloatyWindow` 对象可以通过 `FloatyWindow.{id}` 获取悬浮窗界面上的元素。例如，悬浮窗 `window` 上一个控件的 `id` 为 `aaa`，那么 `window.aaa` 即可获取到该控件，类似于 `ui.window`。

- **方法**:
  - `setAdjustEnabled(enabled)`
    - `enabled {boolean}` - 是否启用悬浮窗调整（大小、位置）。
    - 如果 `enabled` 为 `true`，则在悬浮窗左上角、右上角显示可供位置、大小调整的标示，就像控制台一样；
    - 如果 `enabled` 为 `false`，则隐藏上述标示。
  - `setPosition(x, y)`
    - `x {number}` - 悬浮窗位置的 X 坐标。
    - `y {number}` - 悬浮窗位置的 Y 坐标。
    - 设置悬浮窗位置。
  - `getX()`
    - 返回悬浮窗位置的 X 坐标。
  - `getY()`
    - 返回悬浮窗位置的 Y 坐标。
  - `setSize(width, height)`
    - `width {number}` - 宽度。
    - `height {number}` - 高度。
    - 设置悬浮窗宽高。
  - `getWidth()`
    - 返回悬浮窗宽度。
  - `getHeight()`
    - 返回悬浮窗高度。
  - `close()`
    - 关闭悬浮窗。如果悬浮窗已经是关闭状态，则此函数将不执行任何操作。被关闭后的悬浮窗不能再显示。
  - `exitOnClose()`
    - 使悬浮窗被关闭时自动结束脚本运行。

#### FloatyRawWindow 对象

`FloatyRawWindow` 对象可以通过 `window.{id}` 获取悬浮窗界面上的元素。例如，悬浮窗 `window` 上一个控件的 `id` 为 `aaa`，那么 `window.aaa` 即可获取到该控件，类似于 `ui.window`。

- **方法**:
  - `setTouchable(touchable)`
    - `touchable {Boolean}` - 是否可触摸。
    - 设置悬浮窗是否可触摸。如果为 `true`，则悬浮窗将接收到触摸、点击等事件并且无法继续传递到悬浮窗下面；如果为 `false`，悬浮窗上的触摸、点击等事件将被直接传递到悬浮窗下面。出于安全考虑，被悬浮窗接收的触摸事件无法再继续传递到下层。
    - 可以用此特性来制作护眼模式脚本。
  - `setPosition(x, y)`
    - `x {number}` - 悬浮窗位置的 X 坐标。
    - `y {number}` - 悬浮窗位置的 Y 坐标。
    - 设置悬浮窗位置。
  - `getX()`
    - 返回悬浮窗位置的 X 坐标。
  - `getY()`
    - 返回悬浮窗位置的 Y 坐标。
  - `setSize(width, height)`
    - `width {number}` - 宽度。
    - `height {number}` - 高度。
    - 设置悬浮窗宽高。特别地，如果设置为 `-1`，则为占满全屏；设置为 `-2` 则为根据悬浮窗内容大小而定。
  - `getWidth()`
    - 返回悬浮窗宽度。
  - `getHeight()`
    - 返回悬浮窗高度。
  - `close()`
    - 关闭悬浮窗。如果悬浮窗已经是关闭状态，则此函数将不执行任何操作。被关闭后的悬浮窗不能再显示。
  - `exitOnClose()`
    - 使悬浮窗被关闭时自动结束脚本运行。

#### 示例

```javascript
// 创建一个悬浮窗并显示
var w = floaty.window(
    <frame gravity="center">
        <text id="text">悬浮文字</text>
    </frame>
);
setTimeout(() => {
    w.close();
}, 2000);

// 创建一个原始悬浮窗并显示
var w = floaty.rawWindow(
    <frame gravity="center" bg="#44ffcc00"/>
);
w.setSize(-1, -1);
w.setTouchable(false);
setTimeout(() => {
    w.close();
}, 4000);
```
