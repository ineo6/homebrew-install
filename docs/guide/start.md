---
order: 3
---

# 快速开始

如果之前尝试过其他脚本安装，请移除`Homebrew`后再安装，具体请参考 [FAQ](/guide/faq/#如何删除Homebrew) 。

```shell
/bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/install.sh)"
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
git clone https://mirrors.ustc.edu.cn/homebrew-core.git
```

成功执行之后重新执行安装命令。

Homebrew 4.0 版本后默认`JSON API`获取仓库信息，因此在大部分情况下都不再需要处理下面的`cask`。

> **安装`cask` 同样也有安装失败或者卡住的问题，解决方法也是一样：**
>
> ```shell
> cd "$(brew --repo)/Library/Taps/"
> cd homebrew
> git clone https://mirrors.ustc.edu.cn/homebrew-cask.git
> ```
>
> 成功执行之后重新执行安装命令。

最后看到`🎉 恭喜，安装成功！`就说明安装成功了。

然后更新：

```shell
brew update
```

## 如何卸载 Homebrew

使用官方脚本同样会遇到`uninstall`地址无法访问问题，可以使用下面脚本：

```shell
/bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/uninstall.sh)"
```

## 如果对您有帮助

您可以考虑请我喝杯咖啡。

当然分享、收藏，能让更多人能发现文章，这也是对我的认可和鼓励。

![wechat-reward-code-zh.jpg](https://i.loli.net/2021/03/14/GZm6bFKVEjHozke.jpg)

## 反馈

非常欢迎你来尝试使用，并提出意见，你可以通过以下方式：

- 通过 [Issue][issues] 报告 bug 或进行咨询
- 微信群(见下图)
- 提交 [Pull Request][pulls] 改进文档

<img src="https://i.loli.net/2021/01/03/sXGryYHa3JhB9QL.png" width="600" alt="湖中剑-homebrew" />

如果安装遇到问题，强烈建议先通过 [FAQ](/guide/faq/) 自查，新问题的解决方案会持续更新。

## 参考文章

- [清华大学开源软件镜像站](https://mirror.tuna.tsinghua.edu.cn/help/homebrew/)
- [中科大源](http://mirrors.ustc.edu.cn/help/brew.git.html)

[issues]: https://github.com/ineo6/homebrew-install/issues
[pulls]: https://github.com/ineo6/homebrew-install/pulls
