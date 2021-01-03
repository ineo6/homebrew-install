# Homebrew安装、设置镜像教程

`Homebrew`是一款包管理工具，目前支持`macOS`和`linux`系统。主要有四个部分组成: `brew`、`homebrew-core` 、`homebrew-cask`、`homebrew-bottles`。

| 名称  | 说明 |
| --- | --- |
| brew  | Homebrew 源代码仓库 |
| homebrew-core | Homebrew 核心源 |
| homebrew-cask | 提供 macOS 应用和大型二进制文件的安装 |
| homebrew-bottles | 预编译二进制软件包 |

## Homebrew 安装（简版）

### 安装 Homebrew (macOS)

```bash
/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ineo6/homebrew-install/install.sh)"
```

### 卸载 Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ineo6/homebrew-install/uninstall.sh)"
```

### 沟通反馈

欢迎加入微信群，获得最新动态。

![湖中剑-hb.png](https://i.loli.net/2021/01/03/sXGryYHa3JhB9QL.png)


<h2 id='part1'>1. 脚本说明</h2>

**2020年12月14日更新：升级到shell脚本安装方式。**

`Homebrew`默认安装脚本：

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

如果你等待一段时间之后遇到下面提示，就说明无法访问官方脚本地址：

```sh
curl: (7) Failed to connect to raw.githubusercontent.com port 443: Operation timed out
```

请按照下面 [安装说明](#part2) 步骤执行。

安装使用到的脚本源码在此 [homebrew-install](https://github.com/ineo6/homebrew-install) 。

> 官方脚本无法使用的原因是`raw.githubusercontent.com`访问很不稳定，我上面提供的方案里是采用了`jsdelivr CDN`加速访问。
>
> 另外也可以采用写入`hosts`的方式，可以一定程度解决`GitHub`资源无法访问的问题，我也写了一篇操作文章，有需要可以阅读下。

http://idayer.com/speed-github-githubusercontent-page-with-hosts/

<h2 id='part2'>2. 安装说明</h2>

提前设置`homebrew-core`镜像源并执行：

```sh
# 中科大
HOMEBREW_CORE_GIT_REMOTE=https://mirrors.ustc.edu.cn/homebrew-core.git

/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ineo6/homebrew-install/install.sh)"
```

如果命令执行中卡在下面信息（如提示有差异，请反馈给我）：

```
==> Tapping homebrew/core
Cloning into '/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core'...
```

请`Control + C`中断脚本执行如下命令：

```sh
cd "$(brew --repo)/Library/Taps/"
mkdir homebrew && cd homebrew
git clone git://mirrors.ustc.edu.cn/homebrew-core.git
```

**`cask` 同样也有安装失败或者卡住的问题，解决方法也是一样：**

```shell
cd "$(brew --repo)/Library/Taps/"
cd homebrew
git clone https://mirrors.ustc.edu.cn/homebrew-cask.git
```

成功执行之后继续执行前文的安装命令:

```sh
/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ineo6/homebrew-install/install.sh)"
```

最后看到`==> Installation successful!`就说明安装成功了。

最最后更新下：

```sh
brew update
```

<h2 id='part3'>3. 设置镜像</h2>

`brew`、`homebrew/core`是必备项目，`homebrew/cask`、`homebrew/bottles`按需设置。

通过 `brew config` 命令可以查看相关配置信息。

### 3.1 中科大源

```sh
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git

git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git

brew update

# 长期替换homebrew-bottles
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

注意`bottles`可以临时设置，在终端执行下面命令：

```sh
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
```

### 3.2 清华大学源

```sh
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git

git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git

brew update

# 长期替换homebrew-bottles
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

### 3.3 恢复默认源

```sh
git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git

git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask.git

brew update
```

`homebrew-bottles`配置只能手动删除，将 `~/.bash_profile` 文件中的 `HOMEBREW_BOTTLE_DOMAIN=https://mirrors.xxx.com`内容删除，并执行 `source ~/.bash_profile`。

至此，安装和设置操作都完成了。

## 5. 其他相关

### 5.1 cask

目前`cask`是从`GitHub`上读取软件源，而`GitHub Api`对访问有限制，如果使用比较频繁的话，可以申请`Api Token`，然后在环境变量中配置到`HOMEBREW_GITHUB_API_TOKEN`。

在`.bash_profile`中追加:

```shell
export HOMEBREW_GITHUB_API_TOKEN=yourtoken
```

注意：因为`cask`是从`GitHub`下载软件，所以目前是无法加速的。

### 5.2 如何卸载Homebrew

使用官方脚本同样会遇到`uninstall`地址无法访问问题，可以使用下面脚本：

```sh
/bin/bash -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/ineo6/homebrew-install/uninstall.sh)"
```

### 5.3 反馈问题



## 6. 总结

在前面的过程中我们把`brew`和`homebrew-core`的地址都指向到中科大镜像。

原理是通过修改`install.sh`脚本，在里面预设镜像地址。

```sh
  STAT="stat --printf"
  CHOWN="/bin/chown"
  CHGRP="/bin/chgrp"
  GROUP="$(id -gn)"
  TOUCH="/bin/touch"
fi
# 这里替换了BREW_REPO
BREW_REPO="https://mirrors.ustc.edu.cn/brew.git"
```

更新后的方案使用`HOMEBREW_CORE_GIT_REMOTE`来预设`homebrew-core`源，不过这个设置方法很可能无效，欢迎小伙伴留言反馈你的效果。

## 如果对您有帮助

点赞、分享、收藏，能让更多人能发现文章，这也是对我的认可和鼓励，谢谢。

## 参考文章

- [清华大学开源软件镜像站](https://mirror.tuna.tsinghua.edu.cn/help/homebrew/)
- [中科大源](http://mirrors.ustc.edu.cn/help/brew.git.html)


