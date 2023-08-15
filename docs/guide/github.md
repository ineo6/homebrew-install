# GitHub 加速方案


## GitHub文件加速

请访问 [https://gh.idayer.com](https://gh.idayer.com)

GitHub 文件 , Releases , archive , gist , raw.githubusercontent.com 文件代理加速下载服务。

支持以下资源：

- Raw 文件：`https://raw.githubusercontent.com/ineo6/hosts/master/hosts`
- 分支源码：`https://github.com/ineo6/hosts/archive/master.zip`
- Releases 源码：`https://github.com/stilleshan/ServerStatus/archive/v1.0.tar.gz`
- Releases 文件：`https://github.com/fatedier/frp/releases/download/v0.33.0/frp_0.33.0_linux_amd64.tar.gz`


## Hosts加速

[GitHub Hosts](https://github.com/ineo6/hosts) 仓库提供最新的`GitHub hosts`地址。

你可以自行配置`hosts`，但是最佳实践是使用 [SwitchHosts!](https://oldj.github.io/SwitchHosts/#cn) 管理你的 `hosts`。

可以阅读文章 [SwitchHosts! 还能这样管理 hosts，后悔没早点用](https://mp.weixin.qq.com/s/A37XnD3HdcGSWUflj6JujQ) 了解详情，里面有介绍以及各个平台刷新 `DNS` 缓存的方法。

安装好 `SwitchHosts!` 后，新建一个规则：

- 方案名：GitHub（可以自行命名）
- 类型：远程
- URL 地址：https://gitlab.com/ineo6/hosts/-/raw/master/hosts <CopyButton content='https://gitlab.com/ineo6/hosts/-/raw/master/hosts' />
- 自动更新：1 小时

这样就可以和仓库中最新的`hosts`保持同步。

![switchhost-github.png](https://i.loli.net/2021/03/28/XnHW5xCEzel36fA.png)
