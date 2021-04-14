---
order: 3
---

# 快速开始

如果你是在`M1`芯片的`Mac`上安装`Homebrew`，请参考 [M1 芯片安装教程](/guide/m1/)。

## 安装说明

如果之前尝试过其他脚本安装，请移除`Homebrew`后再安装，具体请参考 [FAQ](/guide/faq/#no1-的小秘籍) 。

```shell
/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ineo6/homebrew-install/install.sh)"
```

> 默认使用中科大源，如果需要换源参考 [换源](/guide/change-source/)。

如果命令执行中卡在下面信息：

```shell
==> Tapping homebrew/core
Cloning into '/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core'...
```

请`Control + C`中断脚本执行如下命令：

```shell
cd "$(brew --repo)/Library/Taps/"
mkdir homebrew && cd homebrew
git clone git://mirrors.ustc.edu.cn/homebrew-core.git
```

**安装`cask` 同样也有安装失败或者卡住的问题，解决方法也是一样：**

```shell
cd "$(brew --repo)/Library/Taps/"
cd homebrew
git clone https://mirrors.ustc.edu.cn/homebrew-cask.git
```

成功执行之后继续执行安装命令。

最后看到`==> Installation successful!`就说明安装成功了。

最最后更新下：

```shell
brew update
```

<h2 id='part3'>设置镜像</h2>

> 更新：强烈建议使用 [镜像助手](/guide/change-source/) ，你可以自助获取镜像脚本，目前支持中科大、清华、腾讯、北京外国语镜像源。

### 中科大源

```shell
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git

git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git

brew update
```

### 清华大学源

```shell
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git

brew update
```

至此，安装和设置操作都完成了。

### 恢复默认源

```shell
git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git

git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask.git

brew update
```

## 如何卸载 Homebrew

使用官方脚本同样会遇到`uninstall`地址无法访问问题，可以使用下面脚本：

```shell
/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ineo6/homebrew-install/uninstall.sh)"
```

## 其他相关

### cask

目前`cask`是从`GitHub`上读取软件源，而`GitHub Api`对访问有限制，如果使用比较频繁的话，可以申请`Api Token`，然后在环境变量中配置到`HOMEBREW_GITHUB_API_TOKEN`。

在`.zprofile`中追加，注意替换`yourtoken`:

```shell
echo 'export HOMEBREW_GITHUB_API_TOKEN=yourtoken' >> ~/.zprofile
source ~/.zprofile
```

注意：因为`cask`是从`GitHub`下载软件，所以目前是无法加速的。

## 反馈

非常欢迎你来尝试使用，并提出意见，你可以通过以下方式：

- 通过 [Issue][issues] 报告 bug 或进行咨询
- 微信群(见下图)
- 提交 [Pull Request][pulls] 改进文档

<img src="https://i.loli.net/2021/01/03/sXGryYHa3JhB9QL.png" width="600" alt="湖中剑-homebrew" />

如果安装遇到问题，强烈建议先通过 [FAQ](/guide/faq/) 自查，新问题的解决方案会持续更新。

## 如果对您有帮助

您可以考虑请我喝杯咖啡。

当然分享、收藏，能让更多人能发现文章，这也是对我的认可和鼓励。

![wechat-reward-code-zh.jpg](https://i.loli.net/2021/03/14/GZm6bFKVEjHozke.jpg)

## 参考文章

- [清华大学开源软件镜像站](https://mirror.tuna.tsinghua.edu.cn/help/homebrew/)
- [中科大源](http://mirrors.ustc.edu.cn/help/brew.git.html)

[issues]: https://github.com/ineo6/homebrew-install/issues
[pulls]: https://github.com/ineo6/homebrew-install/pulls
