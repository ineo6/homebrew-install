---
order: 3
---

# 快速开始

如果你是在`M1`芯片的`Mac`上安装`Homebrew`，请参考 [M1 芯片安装教程](/guide/m1/)。

## 安装说明

```shell
/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ineo6/homebrew-install/install.sh)"
```

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

### 设置 bottles 镜像

设置环境变量需要注意终端的类型，可以先通过以下方式获取：

执行命令`echo $SHELL`，根据结果判断：

- `/bin/bash` => `bash` => `.bash_profile`
- `/bin/zsh` => `zsh` => `.zprofile`

然后继续正式操作，以**中科大源**为例：

从`macOS Catalina`(10.15.x) 版开始，`Mac`使用`zsh`作为默认`Shell`，对应文件是`.zprofile`，所以命令为：

```shell
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zprofile
source ~/.zprofile
```

如果是`macOS Mojave` 及更低版本，并且没有自己配置过`zsh`，对应文件则是`.bash_profile`：

```shell
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

> 注意：上述区别仅仅是`.zprofile`和`.bash_profile`不同，上下文如有再次提及编辑`.zprofile`，均按此方法判断具体操作的文件。

如果想使用清华源：

```shell
把
https://mirrors.ustc.edu.cn/homebrew-bottles

替换为
https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles
```

至此，安装和设置操作都完成了。

### 恢复默认源

```shell
git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git

git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask.git

brew update
```

`homebrew-bottles`配置只能手动删除，将 `~/.zprofile` 文件中的 `HOMEBREW_BOTTLE_DOMAIN=https://mirrors.xxx.com`内容删除，并执行 `source ~/.zprofile`。

## 如何卸载 Homebrew

使用官方脚本同样会遇到`uninstall`地址无法访问问题，可以使用下面脚本：

```shell
/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ineo6/homebrew-install/uninstall.shell)"
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

## 如果对您有帮助

分享、收藏，能让更多人能发现文章，这也是对我的认可和鼓励，谢谢。

## 参考文章

- [清华大学开源软件镜像站](https://mirror.tuna.tsinghua.edu.cn/help/homebrew/)
- [中科大源](http://mirrors.ustc.edu.cn/help/brew.git.html)

[issues]: https://github.com/ineo6/homebrew-install/issues
