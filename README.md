# awesome-autojs

[![Awesome](https://awesome.re/badge-flat.svg)](https://awesome.re)

注意autojs其实有诸多版本。但是他们大体都是基于Rhino引擎（用Java实现的Javascript解释器，可以理解为利用JVM写js）。
- [Auto.js Pro](http://www.autojs.cc/) 曾经实现了一部分Node.js，也拥有最好的开发体验和社区，但是现在整改半死不活了（惨）。（收费）
- 如果你是新手，我推荐[AutoJs6](https://github.com/SuperMonster003/AutoJs6)，并且我推荐去看一下他的repo来了解autojs框架。[AutoJs6 文档](https://docs.autojs6.com/#/)

由于我比较关注autojs用于自动化的部分（其本身是一个近乎完整的ES js实现，且实现了很多Android API的封装，所以用作自动化是其中一个应用而已）。在 [APIdoc](APIdoc.md) 中我将官方文档中和自动化比较相关的部分整合在一起，共14833个字，可能16k的LLM模型塞不下，但是再大一号的模型就能塞得下了。

## 环境搭建相关

- [AutoJs6-TypeScript-Declarations](https://github.com/SuperMonster003/AutoJs6-TypeScript-Declarations) 提供了在IDE中代码提示的支持

## 目录结构
- `main.js`：项目的主入口文件，运行项目时将执行该文件
- `project.json`：项目的配置文件，配置项目的名称、包名、打包配置等（这个配置文件可以让你在打包时无需每次重新填写打包的信息。）

## 常用模块和utilities代码

- OCR
  - [`searchTextInScreen.js`](OCR/searchTextInScreen.js) ：有些App的控件并不是“那么地开放”，常规的找控件click的方法可能不会总是奏效，这个函数利用 OCR 寻找到特定的字符串控件，并点击其中心位置，理论上通用性最高，是杀手锏方案。

## 社区开源脚本
收录规则：最后一次更新在一年之内，代码可以运行在autojs6环境上（至少不用修改太多就能运行）
