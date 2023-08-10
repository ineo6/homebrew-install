---
nav:
  title: 快系列

keywords: [nvm,node,前端,mac]
---

# nvm 快速安装教程

`nvm`作为一款`node`的版本管理工具，在前端开发中是必不可少的，但是因为`GitHub`的特殊性，导致很多人是无法用官方教程安装成功，本文旨在整理出如德芙般丝滑的安装教程。

本文介绍的安装方法，你可以理解为通过仓库镜像的方式安装。

如果你能正常稳定访问`GitHub`，则无需通过本文的加速方式安装，但是仍然可以借鉴安装流程。

## 安装

### 国内加速脚本

```sh
export NVM_SOURCE=https://gitee.com/mirrors/nvm.git
curl -o- https://gitee.com/mirrors/nvm/raw/master/install.sh | bash
```

### 检验安装是否成功

```sh
command -v nvm
```

执行后如果显示`nvm`则表示已经安装成功。

如果遇到`nvm`命令找不到的问题，请查阅文末的“FAQ”。

### 配置

#### 1. 设置为系统默认node

因为`nvm`安装的结果都是下面这样的格式：

```sh
/Users/neo/.nvm/versions/node/v14.17.4/bin/node
```

为了确保在所有的`shell`以及`ide`中都可以正常工作，我们需要设置把`nvm`安装的`node`设置为系统默认。

```sh
nvm alias default node
```

#### 2. 设置node镜像

这里是给安装`node`设置镜像。

```sh
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node
nvm install node

// 或者
NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node nvm install 4.2
```

长期替换可以使用下面的设置：

```sh
echo 'export NVM_NODEJS_ORG_MIRROR="https://npmmirror.com/mirrors/node"' >> ~/.zshrc
```

*注意！* 上面脚本是把配置写入文件`.zshrc`，你如果对此不了解，请参考`FAQ`，确定是否更换为`.bash_profile`。

### 更新

重新执行安装脚本即可。

## 安装node

安装最新版本：

```shell
nvm install node # "node"代表最新版本
```

安装指定版本：

```shell
nvm install 14.16.1 # or 10.10.0, 8.9.1, etc
```

通过`ls-remote`可以查看所有可安装的版本列表：

```shell
nvm ls-remote
```

然后使用`use`启用安装的版本：

```shell
// 最新版本
nvm use node

// 指定版本
nvm use 6.14.4
```

你也可以通过`which`命令查看已安装`node`所在目录：

```shell
nvm which 5.0
```

通过以下命令可以安装最新版`npm`：

```shell
nvm install-latest-npm
```

### 设置终端默认node

`nvm`包含以下几个别名（alias）：

- node: 已安装的`node`最新版
- iojs: 已安装的`io.js`最新版
- stable: 已废弃，现在是`node`的别名
- unstable: 已废弃

当我们安装了新版的`node`之后，`nvm`默认还会指向旧版本，通过执行以下命令将`node`别名指向到最新版。

这样可以解决`node`找不到的问题。

```shell
nvm alias default node
```

如果你不想指向已安装的最新版`node`，可以直接指向版本号，比如：

```sh
nvm alias default 16.20.1
```

## 多node环境下使用

### 在项目中使用不同版本node

你可以在项目根目录中创建`.nvmrc`来指定`node`版本，文件写入想要的版本号。

```
14.16.1
```

然后在根目录使用`nvm use`即可，缺点就是每次都要手动执行，如果想实现自动化可以按照下面的设置。

#### bash

把下面内容追加到`~/.bashrc`：

```shell
cdnvm() {
    cd "$@";
    nvm_path=$(nvm_find_up .nvmrc | tr -d '\n')

    # If there are no .nvmrc file, use the default nvm version
    if [[ ! $nvm_path = *[^[:space:]]* ]]; then

        declare default_version;
        default_version=$(nvm version default);

        # If there is no default version, set it to `node`
        # This will use the latest version on your machine
        if [[ $default_version == "N/A" ]]; then
            nvm alias default node;
            default_version=$(nvm version default);
        fi

        # If the current version is not the default version, set it to use the default version
        if [[ $(nvm current) != "$default_version" ]]; then
            nvm use default;
        fi

        elif [[ -s $nvm_path/.nvmrc && -r $nvm_path/.nvmrc ]]; then
        declare nvm_version
        nvm_version=$(<"$nvm_path"/.nvmrc)

        declare locally_resolved_nvm_version
        # `nvm ls` will check all locally-available versions
        # If there are multiple matching versions, take the latest one
        # Remove the `->` and `*` characters and spaces
        # `locally_resolved_nvm_version` will be `N/A` if no local versions are found
        locally_resolved_nvm_version=$(nvm ls --no-colors "$nvm_version" | tail -1 | tr -d '\->*' | tr -d '[:space:]')

        # If it is not already installed, install it
        # `nvm install` will implicitly use the newly-installed version
        if [[ "$locally_resolved_nvm_version" == "N/A" ]]; then
            nvm install "$nvm_version";
        elif [[ $(nvm current) != "$locally_resolved_nvm_version" ]]; then
            nvm use "$nvm_version";
        fi
    fi
}
alias cd='cdnvm'
cd $PWD
```

#### zsh

把下面内容追加到`~/.zshrc`：

```shell
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```


### 安装时迁移全局npm包

执行时通过`reinstall-packages-from`参数指定旧的`node`版本，这样可以把指定版本内`npm`全局安装的包迁移到当前的`node`版本。

```shelo
nvm install v12.0.0 --reinstall-packages-from=10.0
```


## FAQ

### nvm命令找不到（command not found）

需要手动配置环境变量。

执行命令`echo $SHELL`，根据结果判断写入的文件：

- /bin/zsh => zsh => .zshrc
- /bin/bash => bash => .bash_profile

#### .zshrc

```sh
echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
source ~/.zshrc
```

#### .bash_profile

```sh
echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bash_profile
source ~/.bash_profile
```
