# Lin Sifan · 作品索引

> 网站、像素、游戏，还有一些没做完的实验。

**在线访问：<https://tuxlin123233.github.io/my-works/>**

<p align="center">
  <img src="docs/preview-home.jpg" alt="作品索引首页" width="100%">
</p>

<p align="center">
  <img src="docs/preview-mobile.jpg" alt="作品索引手机端" width="30%">
</p>

## 关于

一个把作品放在一起的入口页。收录 6 个线上网站和 6 个 GitHub 仓库；右侧是 GitHub 头像、公开仓库数、过去一年贡献数和完整的贡献格子。

## 收录

线上网站：

- 私人唱片档案
- 零食柜
- 一事一练
- 像素小镇
- 像素画网站
- 重力 2048

代码项目：

- fly-car
- Minecraft-Save-Manager
- pixel-town
- PixelSpace
- my-play-list
- my-food-list

## 数据更新

GitHub 贡献格子数据缓存在 `data/contributions.json`，来自公开的贡献统计接口；页面构建时生成 `js/data.js`。

```bash
python3 tools/build_site_data.py
```

如果贡献数据需要刷新，替换 `data/contributions.json` 后重新运行构建脚本即可。

## 本地预览

```bash
python3 -m http.server 8000
```

## 技术栈

- 原生 HTML / CSS / JavaScript，无框架、无构建依赖
- 头像本地存放，贡献格子静态渲染，不依赖运行时第三方接口
- 部署：GitHub Pages

## 版权

- 页面文字、视觉设计与 SVG/图形插画：© 2026 Lin Sifan，未经许可请勿转载。
- 代码部分：以 [MIT License](LICENSE) 开源。
