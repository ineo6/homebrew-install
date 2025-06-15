# 镜像助手

## 针对首次安装换源

脚本默认内置中科大镜像，如果需要换源，请使用小助手获取安装脚本：

<SourceGenerate first="true"></SourceGenerate>

## 安装后替换其他源

### Homebrew Services

最新版Homebrew已经不需要设置该内容。

```bash
brew tap --custom-remote --force-auto-update homebrew/services https://mirrors.ustc.edu.cn/homebrew-services.git
```

### Homebrew Bundle

最新版Homebrew已经不需要设置该内容。

```bash
brew tap --custom-remote --force-auto-update homebrew/bundle https://mirror.sjtu.edu.cn/git/homebrew-bundle.git/
```
