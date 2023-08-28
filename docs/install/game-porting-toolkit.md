---
keywords: [mac,game-porting-toolkit]
---

# Game Porting Toolkit 安装指南

`Game Porting Toolkit`游戏移植工具包于2023年6月6日在`WWDC`大会上发布，`Game Porting Toolkit` 将`Wine`与苹果自家的`D3DMetal`技术相结合，实现对`DirectX` 11和12的支持。

与`CrossOver`或`Parallels`这类结束相比，虽然通过`GPTK`安装`Windows`游戏对用户有使用门槛，但它却有解锁支持更多`DirectX`游戏的能力。

虽说很多游戏都可以通过`GPTK`运行，但是那些包含了反作弊或`DRMs`，以及使用`A1VX`/`AVX 2`指令集的游戏不在可玩范围之内。

## 准备

### 关于支持的系统，macOS 14 beta？

貌似只能使用`macOS Sonoma beta`版本，即 `macOS 14 beta`。但是也有说法是`macOS 13`也是可以的，不愿意尝试的用户可以试下。

另外注意如果遇到问题也可以尝试把系统改为英文。

## Homebrew

只有`x86`版本的`Homebrew`才能满足安装要求，我们需要新安装`x86`版本，如果已经安装过`arm`版本的`Homebrew`，我们是可以让两者同存的。

1. 打开终端
2. 安装`Rosetta`转译
```shell
softwareupdate --install-rosetta
```
1. 打开`x86`模式的`zsh`终端，**注意：教程里的操作都需要在`x86`下操作**
```shell
# 启动 x86 版本的 shell
arch -x86_64 zsh
```
2. 安装`x86`版本`Homebrew`

```shell
/bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/install.sh)"
```
    
请认准 [Homebrew中文网](https://brew.idayer.com/)

1. 设置`brew`环境自动切换
```shell
cat << 'EOF' >> ~/.zshrc
if [ "$(arch)" = "arm64" ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
else
    eval "$(/usr/local/bin/brew shellenv)"
fi
EOF
    
source ~/.zshrc
```
    
后续只需要在终端先执行`arch -x86_64 zsh`，就能自动切换到`x86`，不执行这段命令就会默认用`arm`版本。

安装结束后，执行命令：

```shell
which brew
```

如果看到一下目录就说明`Homebrew`安装对了。

```shell
/usr/local/bin/brew
```

## 构建 game-porting-toolkit

确保还在上述终端里，继续执行命令安装：

```shell
brew tap apple/apple https://gitee.com/ineo6/homebrew-apple.git
```

该`tap`仓库使用的国内镜像，能够安装时不会遇到网络问题。   

然后编译`game-porting-toolkit`，这一步的耗时会很久，请耐心等待。

```shell
brew -v install apple/apple/game-porting-toolkit
```

具体的时间取决于你的电脑性能和网速，以下数据仅供参考。

在`M1`上首次安装可能需要75分钟，更新需要48分钟，在`M2 Max`上首次安装需要36分钟，更新需要19分钟。

### 准备 Game Porting Toolkit

访问 [Apple开发者下载网站](https://developer.apple.com/download/all/)，登录你的苹果帐号后，在输入框搜索`Game Porting Toolkit`。

![](https://s2.loli.net/2023/08/18/C3OidT2a5R48byx.png)


下载好后双击`dmg`进行挂载。

- Game_porting_toolkit_1_beta_3以及之前版本请执行：

请执行：

```shell
ditto /Volumes/Game\ Porting\ Toolkit-1.0/lib/ `brew --prefix game-porting-toolkit`/lib/
```

- Game_porting_toolkit_1_beta_4版本请执行：

```shell
ditto /Volumes/Game\ Porting\ Toolkit-1.0/redist/lib/ `brew --prefix game-porting-toolkit`/lib/
```

继续执行：

```shell
cp /Volumes/Game\ Porting\ Toolkit*/gameportingtoolkit* /usr/local/bin
```

## 配置 Wine prefix

```shell
WINEPREFIX=~/my-game-prefix `brew --prefix game-porting-toolkit`/bin/wine64 winecfg
```

![图片来自网络](https://s2.loli.net/2023/08/19/R7V6Dc1ATFkeHr3.png)

执行后，会弹出`Wine configuration`，我们要把里面的`Windows Version`里面的值改为`Windows 10`，并点击`OK`保存。

如果没有显示`Wine configuration`窗口，在`Dock`里也没有新增的应用，有可能就是因为没有安装上`x86`版本的`Homebrew`以及对应的`game-porting-toolkit`。

请重新检视**构建 game-porting-toolkit**这一章节内容。

如果一切顺利到此，那接下来就可以安装游戏了。

## 下载&安装 Steam

下载 [Steam](https://cdn.cloudflare.steamstatic.com/client/installer/SteamSetup.exe)（Windows）并放放在你的"下载"文件夹内，英文版叫"Downloads"。

### 安装

```shell
gameportingtoolkit ~/my-game-prefix ~/Downloads/SteamSetup.exe
```

这里的`~/Downloads/SteamSetup.exe`就是你要安装或运行的`Windows`程序，如果是其他游戏，可以自己替换。

### 用gptk启动Steam

```shell
gameportingtoolkit ~/my-game-prefix 'C:\Program Files (x86)/Steam/steam.exe'
```

### 登录Steam

启动`Steam`后，很可能会出现黑色的弹窗，无法进行任何操作，这样我们也没法登录帐号，可以参考下面的方案。

#### 解决方案1

换以下启动命令：

```shell
MTL_HUD_ENABLED=1 WINEESYNC=1 WINEPREFIX=~/my-game-prefix /usr/local/Cellar/game-porting-toolkit/1.0.3/bin/wine64 'C:\Program Files (x86)\Steam\steam.exe'
```

#### 解决方案2

安装`mac`版本的`Steam`，登录帐号并保证能看到游戏。

打开以下目录：

```shell
~/Library/Application Support/Steam
```

复制`config`、`userdata`、`registry.vdf`三个文件到下面这个目录：

```shell
~/my-game-prefix/drive_c/Program Files (x86)/Steam
```

重新启动`Windows`版本`Steam`：

```shell
gameportingtoolkit ~/my-game-prefix 'C:\Program Files (x86)/Steam/steam.exe'
```

现在可以正常登录，但是可能还是有黑屏部分，可以通过点击菜单`View`-`Small Model`进行调整。

接下来就可以安装游戏了

### 启动游戏：赛博朋克2077

这里我们以为例，假设你在`Steam`里下载并安装了`赛博朋克2077`，可以尝试直接在`Steam`启动游戏，如果不行的话可以用下面的命令启动游戏。

```shell
MTL_HUD_ENABLED=1 WINEESYNC=1 WINEPREFIX=~/my-game-prefix /usr/local/Cellar/game-porting-toolkit/1.0/bin/wine64 ~/my-game-prefix/drive_c/Program\ Files\ \(x86\)/Steam/steamapps/common/Cyberpunk\ 2077/bin/x64/Cyberpunk2077.exe
```

上面命令的最后部分是你的游戏安装目录，启动不同的游戏可以自行替换游戏启动`exe`的路径。

```shell
~/my-game-prefix/drive_c/Program\ Files\ \(x86\)/Steam/steamapps/common/Cyberpunk\ 2077/bin/x64/Cyberpunk2077.exe
```

## 更多解决方案

### Steam 黑屏解决方案汇总

#### 其他Steam启动命令

1. 关闭终端，重新打开终端和执行启动`Steam`，多尝试几次。
2. 更换启动`Steam`命令：
    ```shell
    MTL_HUD_ENABLED=1 WINEESYNC=1 WINEPREFIX=~/my-game-prefix /usr/local/Cellar/game-porting-toolkit/1.0.3/bin/wine64 'C:\Program Files (x86)/Steam/steam.exe'
    ```
3. 使用`CrossOver`
    ```shell
    WINEPREFIX="/Users/$USER/Library/Application Support/CrossOver/Bottles/Steam/"
    ```

#### 通过mac Steam登录

1. 登录`mac`版`Steam`。
2. 打开`~/Library/Application Support/Steam`，复制这三个文件： `config`, `registry.vdf`, `userdata`。
3. 粘贴到`~/my-game-prefix/drive_c/Program Files (x86)/Steam/`


#### 打开Steam后直接闪退

移除扩展显示器，或者停止屏幕镜像。
