---
order: 4
---

# FAQ

## No.1 的小秘籍

遇到解决不了的问题，先删除`homebrew`目录再重新运行脚本安装。

删除可以通过脚本或者在文件夹中删除(mac)：

```shell
// 目录替换为真实的brew位置
sudo rm -rf 目录
```

使用`rm -rf`命令是比较危险的行为，请一定要具体指定的、合适的目录。

### macOS

- Intel 上安装目录： `/usr/local/Homebrew/`
- m1 arm 上安装目录： `/opt/homebrew`

另外在终端可以执行`open /usr/local/Homebrew/` 或 `open /opt/homebrew`，打开文件夹通过界面删除。

### Linux

安装目录在`/home/linuxbrew`。

## 安装时 formulae 找不到

如果遇到下面的提示。

```shell
==> Searching for similarly named formulae...
Error: No similarly named formulae found.
Error: No available formula or cask with the name "nasm".
==> Searching for a previously deleted formula (in the last month)...
Error: No previously deleted formula found.
==> Searching taps on GitHub...
Error: No formulae found in taps.
```

尝试执行以下命令：

```shell
rm -rf $(brew --repo homebrew/core)
brew tap homebrew/core
```

如果还不行，请删除`homebrew`目录，再重新安装。

## M1 芯片 Mac 如何安装

`Homebrew`已支持在`arm`上安装，但是一些软件兼容性还有待更新，官方查阅地址可看 [说明](https://github.com/Homebrew/brew/issues/7857) 。

你可以考虑安装`x86`版本保持兼容性。

无论安装哪个版本，强烈建议先参考文档：[M1 芯片 Mac 上 Homebrew 安装](/guide/m1/)。

大部分问题都是资源不稳定导致的，如果可以的话尽量通过代理加速。

代理使用可以参考以下文章：

- [Mac 终端走 ssr 代理](http://onwaier.com/?p=229)
- [如何让 macOS 的「终端」走代理？](https://www.xiaodefa.com/digital/121.html)

## brew install xxx 404 的问题

原因是`bottles`镜像地址更新了，需要在 `~/.zprofile` 或 `~/.bash_profile` 文件更新镜像地址。

至于选择哪个文件来操作，请按照 [判断终端](/guide/faq/#判断终端) 。

1. 找到`HOMEBREW_BOTTLE_DOMAIN`配置，一般是这样的形式：

```shell
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
```

2. 然后使用 [镜像助手](/guide/change-source/) 获取替换的地址，复制 `HOMEBREW_BOTTLE_DOMAIN` 后面链接地址。

比如中科大镜像就是这个了：

```shell
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles/bottles
```

3. 更新环境变量，以 `~/.zprofile` 为例，更新内容后执行：

```shell
source ~/.zprofile
```

## 判断终端

可以先通过以下方式获取：

执行命令`echo $SHELL`，根据结果判断：

- `/bin/zsh` => `zsh` => `.zprofile`
- `/bin/bash` => `bash` => `.bash_profile`

> 注意：文章内如有再次提及编辑`.zprofile`，均按此方法判断具体操作的文件。

## fatal: unable to access xxx

```
HEAD is now at 028e733e7 Merge pull request #10260 from reitermarkus/audit-livecheck

fatal: unable to access 'https://github.com/Homebrew/homebrew-core/': transfer closed with outstanding read data remaining
fatal: ambiguous argument 'refs/remotes/origin/master': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
```

解决方案：

- 删除`/usr/local/Homebrew`重试
- 根据文章 [GitHub 访问加速指南][hosts] ，给`github.com`域名加速
- 通过代理访问

## 设置镜像无效，安装还是很慢

这里说的安装很慢主要是指`brew`本身安装速度慢（镜像地址没有设置成功）。

可以执行命令`echo $SHELL`，先查看终端类型。

- bash: `/bin/bash`
- zsh: `/bin/zsh`

然后根据终端类型设置镜像，参考 [判断终端](/guide/faq/#判断终端) 。

## command not found: brew

一般是环境变量无效，请使用`echo $SHELL`确认终端类型，参考前一段落。

`m1`芯片`Mac`电脑需要手动设置环境变量：

zsh

```shell
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

bash

```shell
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.bash_profile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

非`m1`的话，可以尝试手动加入环境变量：

zsh

```shell
echo 'eval "$(/usr/local/Homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/usr/local/Homebrew/bin/brew shellenv)"
```

bash

```shell
echo 'eval "$(/usr/local/Homebrew/bin/brew shellenv)"' >> ~/.bash_profile
eval "$(/usr/local/Homebrew/bin/brew shellenv)"
```

## SHA256 mismatch

```
Error: An exception occurred within a child process:
  ChecksumMismatchError: SHA256 mismatch
Expected: 01059532335fefc5e0e7a23cc79eeb1dc6fea477606981b89f259aa0e0f9abc1
  Actual: 641ba394c891cee16dfa45873906edab12edfc9befaa121649bb18e7b7d574bf
 Archive: /Users/XXX/Library/Caches/Homebrew/downloads/1124b500fc261f6d9be6193eca8c120f4dfb7ecd3470ac7d8edc1d04ecc5b345--jdk13u-jdk-13.0.2+8.tar.bz2
To retry an incomplete download, remove the file above.
```

遇到该问题时请尝试该方案：https://blog.csdn.net/lemostic/article/details/107101219

## 如何判断终端类型

在终端执行命令`echo $SHELL`，根据显示的结果判断：

- `/bin/bash` => `bash` => `.bash_profile`
- `/bin/zsh` => `zsh` => `.zprofile`

## Xcode Command Line 安装问题

错误如下：

```
xcode-select: error: invalid developer directory '/Library/Developer/CommandLineTools'
Failed during: /usr/bin/sudo /usr/bin/xcode-select --switch /Library/Developer/CommandLineTools
```

这是因为`CommandLineTools`未安装的原因，可以通过命令安装：

```shell
xcode-select --install
```

如果提示"不能下载该软件，因为网络出现问题"，可以在官网下载安装。

1. 打开 https://developer.apple.com/download/more/
2. 搜索 Command Line

因为这里罗列的所有的版本，所以我们还需要确定支持的版本，我们这样操作：

1. 确定当前系统版本
2. 打开`App Store`搜索`Xcode`
   ![WX20210218-184737@2x.png](https://i.loli.net/2021/02/18/9hWIP8sQ7tYFOvS.png)

3. 点击"版本历史记录"找到支持你的系统版本的`Xcode`版本号
   ![WX20210218-184755@2x.png](https://i.loli.net/2021/02/18/4d1wtirp8Wxky5e.png)

举例子我的电脑是`Big Sur 11.2`，在版本记录里看到`12.4`就是`Xcode`对应的版本号，然后我们找到"Command Line Tools for Xcode 12.4"下载。

[hosts]: https://mp.weixin.qq.com/s/gFNP2Pk81vg7nE1XsDingg

## raw.githubusercontent.com 无法访问

这是典型的`GitHub`不稳定的表现，你可以通过设置`hosts`缓解该问题。

参考 [GitHub 加速教程](/guide/github/) 。
