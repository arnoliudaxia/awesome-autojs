主要方法

##### sensors.register(sensorName[, delay])

- **参数**:
  - `sensorName {string}` - 传感器名称，常用的传感器名称如加速计、方向传感器、陀螺仪等。
  - `delay {number}` - 传感器数据更新频率，默认为 `sensors.delay.normal`。
- **返回值**:
  - `SensorEventEmitter` - 注册一个传感器监听并返回 `SensorEventEmitter`。
- **描述**:
使用 `sensors.register(sensorName)` 注册监听器，之后才能开始监听传感器数据。不需要监听时则调用 `sensors.unregister()` 注销监听器。在脚本结束时会自动注销所有的监听器。这种监听会使脚本保持运行状态，如果不注销监听器，脚本会一直保持运行状态。
- **示例**:
  ```javascript
  // 注册传感器监听
  var sensor = sensors.register("light");
  if(sensor == null){
      toast("不支持光线传感器");
      exit();
  }
  // 监听数据
  sensor.on("change", (event, light) => {
      log("当前光强度为", light);
  });
  ```

##### sensors.unregister(emitter)

- **参数**:
  - `emitter {SensorEventEmitter}` - 需要注销的传感器监听器。
- **描述**:
注销该传感器监听器。被注销的监听器将不再能监听传感器数据。
- **示例**:
  ```javascript
  // 注册一个传感器监听器
  var sensor = sensors.register("gravity");
  if(sensor == null){
      exit();
  }
  // 2秒后注销该监听器
  setTimeout(() => {
      sensors.unregister(sensor);
  }, 2000);
  ```

##### sensors.unregisterAll()

- **描述**:
注销所有传感器监听器。

#### 常用传感器及其事件参数

##### Accelerometer (加速度传感器)

- **参数**:
  - `event {SensorEvent}` - 传感器事件，用于获取传感器数据变化时的所有信息。
  - `ax {number}` - x轴上的加速度，单位 m/s²。
  - `ay {number}` - y轴上的加速度，单位 m/s²。
  - `az {number}` - z轴上的加速度，单位 m/s²。

##### Orientation (方向传感器)

- **参数**:
  - `event {SensorEvent}` - 传感器事件，用于获取传感器数据变化时的所有信息。
  - `azimuth {number}` - 方位角，从地磁指北方向线起，依顺时针方向到 y 轴之间的水平夹角，单位角度，范围 0~359。
  - `pitch {number}` - 绕 x 轴旋转的角度，当设备水平放置时该值为 0，当设备顶部翘起时该值为正数，当设备尾部翘起时该值为负数，单位角度，范围 -180~180。
  - `roll {number}` - 绕 y 轴顺时针旋转的角度，单位角度，范围 -90~90。

##### Gyroscope (陀螺仪传感器)

- **参数**:
  - `event {SensorEvent}` - 传感器事件，用于获取传感器数据变化时的所有信息。
  - `wx {number}` - 绕 x 轴的角速度，单位弧度/s。
  - `wy {number}` - 绕 y 轴的角速度，单位弧度/s。
  - `wz {number}` - 绕 z 轴的角速度，单位弧度/s。

##### Magnetic Field (磁场传感器)

- **参数**:
  - `event {SensorEvent}` - 传感器事件，用于获取传感器数据变化时的所有信息。
  - `bx {number}` - x 轴上的磁场强度，单位 μT。
  - `by {number}` - y 轴上的磁场强度，单位 μT。
  - `bz {number}` - z 轴上的磁场强度，单位 μT。

##### Gravity (重力传感器)

- **参数**:
  - `event {SensorEvent}` - 传感器事件，用于获取传感器数据变化时的所有信息。
  - `gx {number}` - x 轴上的重力加速度，单位 m/s²。
  - `gy {number}` - y 轴上的重力加速度，单位 m/s²。
  - `gz {number}` - z 轴上的重力加速度，单位 m/s²。

##### Linear Acceleration (线性加速度传感器)

- **参数**:
  - `event {SensorEvent}` - 传感器事件，用于获取传感器数据变化时的所有信息。
  - `ax {number}` - x 轴上的线性加速度，单位 m/s²。
  - `ay {number}` - y 轴上的线性加速度，单位 m/s²。
  - `az {number}` - z 轴上的线性加速度，单位 m/s²。

##### Ambient Temperature (环境温度传感器)

- **参数**:
  - `event {SensorEvent}` - 传感器事件，用于获取传感器数据变化时的所有信息。
  - `t {number}` - 环境温度，单位摄氏度。

##### Light (光线传感器)

- **参数**:
  - `event {SensorEvent}` - 传感器事件，用于获取传感器数据变化时的所有信息。
  - `light {number}` - 环境光强度，单位 lux。

##### Pressure (压力传感器)

- **参数**:
  - `event {SensorEvent}` - 传感器事件，用于获取传感器数据变化时的所有信息。
  - `p {number}` - 大气压，单位 hPa。

##### Proximity (距离传感器)

- **参数**:
  - `event {SensorEvent}` - 传感器事件，用于获取传感器数据变化时的所有信息。
  - `distance {number}` - 一般指设备前置摄像头旁边的距离传感器到前方障碍物的距离，范围通常是 0 或 5。

##### Relative Humidity (湿度传感器)

- **参数**:
  - `event {SensorEvent}` - 传感器事件，用于获取传感器数据变化时的所有信息。
  - `rh {number}` - 相对湿度，范围为 0~100（百分比）。

#### 示例

```javascript
// csv 文件路径
const csvPath = "/sdcard/sensors_data.csv";

// 记录光线传感器的数据
var light = 0;

// 记录加速度传感器的数据
var ax = 0;
var ay = 0;
var az = 0;

// 监听光线传感器
sensors.register("light", sensors.delay.fastest)
    .on("change", l => {
        light = l;
    });

// 监听加速度传感器
sensors.register("accelerometer", sensors.delay.fastest)
    .on("change", (ax0, ay0, az0) => {
        ax = ax0;
        ay = ay0;
        az = az0;
    });

var file = open(csvPath, "w");
// 写 csv 表格头
file.writeline("light,ax,ay,az");

// 每 0.5 秒获取一次数据并写入文件
setInterval(() => {
    file.writeline(util.format("%d,%d,%d,%d", light, ax, ay, az));
}, 500);

// 10 秒后退出并打开文件
setTimeout(() => {
    file.close();
    sensors.unregisterAll();
    app.viewFile(csvPath);
}, 10 * 1000);
```

#### 注意事项

- 每个传感器的数据并不相同，因此对其调用 `on()` 监听事件时的回调函数参数也不是相同。
- 在某些设备上的传感器参数有所增加，例如华为手机的距离传感器为三个参数，一般手机只有一个参数。
- 如果不支持 `sensorName` 所指定的传感器，那么 `sensors.register()` 将返回 `null`；但如果 `sensors.ignoresUnsupportedSensor` 的值被设置为 `true`，则该函数会返回一个不会分发任何传感器事件的 `SensorEventEmitter`。
