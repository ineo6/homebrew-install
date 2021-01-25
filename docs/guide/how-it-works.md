---
order: 1
---

# 如何工作的？

## 访问脚本

`raw.githubusercontent.com`地址不稳定，导致无法访问官方安装脚本`install.sh`。

```shell
curl: (7) Failed to connect to raw.githubusercontent.com port 443: Operation timed out
```

解决方案就是托管到`jsdelivr`，通过`CDN`加速访问。

> 另外也可以采用写入`hosts`的方式，可以一定程度解决`GitHub`资源无法访问的问题。
>
> 设置方案请阅读 [GitHub 访问加速指南][hosts]

## 安装加速

修改脚本内容，把`brew`、`homebrew-core`到仓库地址为 [中科大镜像](http://mirrors.ustc.edu.cn/help/brew.git.html) 提供的地址。

例如：

```shell
  STAT="stat --printf"
  CHOWN="/bin/chown"
  CHGRP="/bin/chgrp"
  GROUP="$(id -gn)"
  TOUCH="/bin/touch"
fi
# 这里替换了BREW_REPO
BREW_REPO="https://mirrors.ustc.edu.cn/brew.git"
```

[hosts]: https://mp.weixin.qq.com/s/gFNP2Pk81vg7nE1XsDingg
