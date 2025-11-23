---
nav:
  title: 快系列

keywords: [homebrew,开发工具,效率,mac,推荐]
---

# 10个必装的 Homebrew 开发工具推荐

作为开发者，选择合适的工具能够显著提升工作效率。本文精选了 10 个通过 Homebrew 安装的必备开发工具，无论你是前端、后端还是全栈开发者，这些工具都能让你的开发体验更加顺畅。

## 1. Git - 版本控制之王

```shell
# 检查是否已安装
git --version

# 如果需要最新版本或统一管理
brew install git
```

**为什么推荐用 Homebrew 安装：**
- 获取最新版本和功能
- 统一的包管理方式
- 方便升级和维护
- 避免系统版本过旧的问题

**安装说明：**
- Homebrew 版本会与系统 Git 并存，不会删除原版本
- 通过 PATH 优先级使用 Homebrew 版本
- 可用 `which git` 确认当前使用的版本

**实用配置：**
```shell
# 配置用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 设置默认分支名
git config --global init.defaultBranch main

# 启用颜色输出
git config --global color.ui auto
```

**Pro Tips：**
```shell
# 创建常用命令的快捷别名
git config --global alias.st status          # git st = git status
git config --global alias.co checkout        # git co = git checkout
git config --global alias.br branch          # git br = git branch
git config --global alias.cm "commit -m"     # git cm "message" = git commit -m "message"

# 查看已设置的别名
git config --global --get-regexp alias
```
- 配置 SSH 密钥避免每次输入密码

## 2. Node.js (通过 nvm) - 前端开发基石

```shell
# 安装 nvm
brew install nvm

# 配置环境变量
mkdir ~/.nvm
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"' >> ~/.zshrc

# 安装最新 LTS 版本
nvm install --lts
nvm use --lts
nvm alias default node
```

**为什么选择 nvm：**
- 轻松管理多个 Node.js 版本
- 项目间版本隔离
- 避免权限问题

**常用命令：**
```shell
nvm list           # 查看已安装版本
nvm use 16.20.1     # 切换到指定版本
nvm install --lts   # 安装最新 LTS 版本
```

## 3. Visual Studio Code - 现代代码编辑器

```shell
brew install --cask visual-studio-code
```

**为什么必装：**
- 丰富的扩展生态系统
- 优秀的调试功能
- 内置 Git 支持
- 跨平台兼容

**推荐扩展：**
- GitLens：增强 Git 功能
- Prettier：代码格式化
- ESLint：JavaScript 代码检查
- Auto Rename Tag：自动重命名标签

**命令行集成：**
```shell
# 从命令行打开文件
code filename.js

# 打开当前目录
code .
```

## 4. iTerm2 - 终端增强利器

```shell
brew install --cask iterm2
```

**为什么比系统终端更好：**
- 分屏和标签页支持
- 强大的搜索功能
- 丰富的自定义选项
- 支持热键快速调出

**实用配置：**
- 设置热键：Preferences → Keys → Hotkey → Create a Dedicated Hotkey Window
- 启用复制时去除换行符
- 配置主题和字体

## 5. Oh My Zsh - 终端美化神器

```shell
# 安装 Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 安装美化主题
brew install powerlevel10k
echo "source $(brew --prefix)/share/powerlevel10k/powerlevel10k.zsh-theme" >>~/.zshrc
```

**为什么必装：**
- 美观的终端提示符
- 智能补全功能
- 丰富的插件生态
- Git 状态显示

**推荐插件：**
```shell
# 编辑 ~/.zshrc
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  npm
  node
)
```

## 6. Docker - 容器化开发环境

```shell
brew install --cask docker
```

**为什么必装：**
- 统一开发环境
- 微服务架构支持
- 简化部署流程
- 避免"在我机器上可以运行"问题

**常用场景：**
```shell
# 快速启动数据库
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres

# 运行 Redis
docker run -d -p 6379:6379 redis

# 查看运行中的容器
docker ps
```

## 7. Postman - API 开发测试

```shell
brew install --cask postman
```

**为什么必装：**
- 直观的 API 测试界面
- 支持各种 HTTP 方法
- 环境变量管理
- 团队协作功能

**高效使用技巧：**
- 创建环境变量存储 API 基础 URL
- 使用 Collection 组织相关 API
- 编写测试脚本自动验证响应

## 8. HTTPie - 命令行 HTTP 客户端

```shell
brew install httpie
```

**为什么比 curl 更好：**
- 更直观的语法
- 彩色输出
- JSON 支持更好
- 人性化的错误提示

**使用示例：**
```shell
# GET 请求
http GET https://api.github.com/users/octocat

# POST 请求
http POST httpbin.org/post name=John age:=25

# 添加请求头
http GET api.example.com Authorization:"Bearer token"
```

## 9. Tree - 目录结构可视化

```shell
brew install tree
```

**为什么必装：**
- 清晰显示目录结构
- 文档编写好帮手
- 项目结构分析利器
- 支持多种输出格式

**常用参数：**
```shell
tree -a          # 显示隐藏文件
tree -d          # 仅显示目录
tree -L 2        # 限制显示层级
tree -I node_modules  # 忽略特定目录
```

## 10. JQ - JSON 处理利器

```shell
brew install jq
```

**为什么必装：**
- 命令行 JSON 处理
- 美化 JSON 输出
- 强大的过滤功能
- 与其他命令完美结合

**实用示例：**
```shell
# 美化 JSON
echo '{"name":"John","age":30}' | jq .

# 提取特定字段
curl -s https://api.github.com/users/octocat | jq '.name'

# 过滤数组
echo '[{"name":"John","age":30},{"name":"Jane","age":25}]' | jq '.[] | select(.age > 25)'
```

## 额外推荐工具

### 数据库相关
```shell
# MySQL 客户端
brew install mysql-client

# PostgreSQL 客户端
brew install postgresql

# Redis 客户端
brew install redis
```

### 系统监控
```shell
# 更好的 top 命令
brew install htop

# 磁盘使用分析
brew install ncdu
```

### 文本处理
```shell
# 更好的 grep
brew install ripgrep

# 更好的 find
brew install fd
```


## 使用建议

### 1. 创建工作流
将这些工具组合使用，创建高效的开发工作流：
- 使用 Git 管理代码
- 在 VS Code 中编写代码
- 用 HTTPie/Postman 测试 API
- 通过 Docker 统一环境

### 2. 定期更新
```shell
# 更新 Homebrew 和所有包
brew update && brew upgrade

# 更新 VS Code 扩展
code --list-extensions | xargs -L 1 echo code --install-extension
```

### 3. 备份配置
定期备份重要配置文件：
- `~/.zshrc`
- `~/.gitconfig`
- VS Code 设置和扩展列表

## 总结

这 10 个工具涵盖了开发过程中的各个环节：

1. **版本控制**：Git
2. **运行时环境**：Node.js (nvm)
3. **代码编辑**：VS Code
4. **终端增强**：iTerm2 + Oh My Zsh
5. **容器化**：Docker
6. **API 测试**：Postman + HTTPie
7. **文件处理**：Tree + JQ

合理使用这些工具，可以显著提升你的开发效率和体验。记住，工具只是手段，最重要的是理解它们的使用场景，并根据自己的需求进行个性化配置。

## 参考资源

- [Homebrew 官方文档](https://brew.sh/)
- [快速安装 Homebrew](/guide/start/)
- [搭建完整 Web 开发环境](/install/web-dev-environment/)

如果在安装过程中遇到问题，可以查看我们的 [常见问题解答](/guide/faq/) 或提交 Issue 获得帮助。