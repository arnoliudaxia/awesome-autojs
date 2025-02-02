有两套实现引擎，基于Google ML Kit 的 文字识别 API 及 Baidu PaddlePaddle 的 Paddle Lite。ML Kit的速度快，不过Paddle的准确更好一点。

```jsx
images.requestScreenCapture();
let img = images.captureScreen();
ocr(img);

```

AutoJs6 不支持区域截图.可通过 [**images.captureScreen**](https://docs.autojs6.com/#/image?id=m-capturescreen) 截取屏幕后使用 [**images.clip**](https://docs.autojs6.com/#/image?id=m-clip) 等方法做进一步处理.
