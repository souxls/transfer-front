### 简介

`Transfer` 主要用于临时上传和下载，支持分享给他人。使用 `Vue Naive Admin`的后台管理模板，基于 `Vue3、Vite3、Pinia、Unocss 和 Naive UI` 等前端最新技术栈。

### 功能

- 支持任意文件类型上传，下载。
- 支持历史文件再分享
- 临时文件存储时间，需要管理员权限
- 支持用户管理，需要管理员权限

### 快速开始

```shell
# 推荐配置git autocrlf 为 false（本项目规范使用lf换行符，此配置是为防止git自动将源文件转换为crlf）
# 不清楚为什么要这样做的请参考这篇文章：https://www.freesion.com/article/4532642129
git config --global core.autocrlf false

# 克隆项目
git clone

# 进入项目目录
cd transfer

# 安装依赖(建议使用pnpm: https://pnpm.io/zh/installation)
npm i -g pnpm # 装了可忽略
pnpm i # 或者 npm i

# 启动
pnpm dev
```

### 构建发布

```shell
# 构建测试环境
pnpm build:test

# 构建生产环境
pnpm build
```

### 其他指令

```shell
# eslint代码格式检查
pnpm lint

# 代码检查并修复
pnpm lint:fix

# 预览发布包效果（需先执行构建指令）
pnpm preview

# 提交代码（husky+commitlint）
pnpm cz
```
