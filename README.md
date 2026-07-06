# 鄢如影 · 个人作品集网站

风景园林与数字环境设计的个人作品集网站，展示学术项目、商业委托与技能图谱。

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 4 + 自定义主题变量
- **装饰组件**: 纯 SVG / CSS 原子组件（无第三方 UI 库）

## 快速开始

`ash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build
`

## 项目结构

`
src/
├── app/
│   └── App.tsx          # 主应用组件（含所有页面部分）
├── styles/
│   ├── index.css        # 样式入口
│   ├── fonts.css        # 字体加载
│   ├── tailwind.css     # Tailwind 配置
│   └── theme.css        # 自定义主题变量（shadcn/ui 兼容）
└── main.tsx             # 应用入口
`

## 页面结构

- **关于** — 个人信息与数据统计
- **主要项目作品** — 4 个核心设计项目展示（含图片切换与缩略图导航）
- **其它项目概览** — 3D 封面流式项目轮播
- **技能图谱** — 技能分类 + 教育时间线
- **联系方式** — 社交链接与位置信息

## 设计说明

- 配色方案：米白底色（#F9F7EB）+ 深绿主色（#2A4A38），灵感来源于寒地自然景观
- 字体：Noto Sans SC（中文）+ Courier Prime（英文/等宽）
- 装饰元素：云杉图标（SpruceGlyph）、菱形标记（Diamond）、斜线纹理（HatchRect）
- 响应式：桌面端优先，适配平板与移动端布局
