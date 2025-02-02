/**
 * 在屏幕上搜索目标字符串并点击其中心位置
 * @param {string} targetString - 需要搜索的目标字符串
 */
function searchTextInScreen(targetString) {
    // 请求屏幕截图权限
    requestScreenCapture();

    // 截取当前屏幕
    let img = captureScreen();

    // 使用 OCR 识别屏幕中的文本
    let results = ocr.detect(img);

    // 遍历识别结果并查找目标字符串
    results.forEach((result) => {
        let text = result.label; // 识别到的文本
        let bounds = result.bounds; // 文本的位置信息

        // 如果识别到的文本包含目标字符串
        if ( text.includes(targetString)) {
            // 获取文本的中心坐标
            let centerX = bounds.centerX();
            let centerY = bounds.centerY();

            console.log(`找到目标文本: "${text}"`);
            console.log(`位置: (${bounds.left}, ${bounds.top}, ${bounds.right}, ${bounds.bottom})`);
            console.log(`中心坐标: (${centerX}, ${centerY})`);
            click(centerX, centerY);
            return;
        }
    });
}
