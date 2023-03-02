import React, { useState } from 'react';
import { Select, Tooltip, Checkbox } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
// @ts-ignore
import SourceCode from 'dumi-theme-default/src/builtins/SourceCode';

import './SourceGenerate.less';
import { Mirror, mirrorData, Platform } from '../constants';

const Option = Select.Option;

const mirrorConfig = [
  {
    key: Mirror.USTC,
    value: '中科大',
  },
  {
    key: Mirror.Tsinghua,
    value: '清华',
  },
  {
    key: Mirror.BFSU,
    value: '北京外国语',
  },
  {
    key: Mirror.Tencent,
    value: '腾讯',
  },
];

const platformList = [
  {
    key: Platform.MacOS,
    value: 'macOS',
  },
  {
    key: Platform.Windows,
    value: 'Windows',
  },
  {
    key: Platform.Linux,
    value: 'Linux',
  },
];

const SourceGenerate = ({ first }) => {
  const [mirror, setMirror] = useState<Mirror>(Mirror.USTC);
  const [platform, setPlatform] = useState<Platform>(Platform.MacOS);
  const [terminalType, setTerminalType] = useState<string>('zsh');
  const [isJsonApi, setJsonApi] = useState<boolean>(true);

  function generateMirror() {
    const matchMirror = mirrorData[`${mirror}Mirror`] || {};

    const shellArray = ['# 脚本'];

    shellArray.push(
      `git -C "$(brew --repo)" remote set-url origin ${matchMirror.brew}`,
    );

    if (platform === Platform.Linux && matchMirror.linuxCore) {
      shellArray.push(
        `git -C "$(brew --repo homebrew/core)" remote set-url origin ${matchMirror.linuxCore}`,
      );
    } else {
      shellArray.push(
        `git -C "$(brew --repo homebrew/core)" remote set-url origin ${matchMirror.core}`,
      );
    }

    shellArray.push(
      `git -C "$(brew --repo homebrew/cask)" remote set-url origin ${matchMirror.cask}`,
    );

    shellArray.push('brew update');

    shellArray.push('');

    const file = terminalType === 'zsh' ? '.zprofile' : '.bash_profile';

    if (platform === Platform.Linux && matchMirror.linuxBottles) {
      shellArray.push(
        `echo 'export HOMEBREW_BOTTLE_DOMAIN=${matchMirror.linuxBottles}' >> ~/${file}`,
      );
    } else {
      shellArray.push(
        `echo 'export HOMEBREW_BOTTLE_DOMAIN=${matchMirror.bottles}' >> ~/${file}`,
      );
    }

    shellArray.push(`source ~/${file}`);

    return shellArray.join('\n');
  }

  function generateFirstMirrorSet() {
    const matchMirror = mirrorData[`${mirror}Mirror`] || {};

    const shellArray = [];

    shellArray.push(`export HOMEBREW_BREW_GIT_REMOTE="${matchMirror.brew}"`);

    if (platform === Platform.Linux && matchMirror.linuxCore) {
      shellArray.push(
        `export HOMEBREW_CORE_GIT_REMOTE="${matchMirror.linuxCore}"`,
      );
    } else {
      shellArray.push(`export HOMEBREW_CORE_GIT_REMOTE="${matchMirror.core}"`);
    }

    if (isJsonApi) {
      shellArray.push(`export HOMEBREW_API_DOMAIN="${matchMirror.jsonApi}"`);
    } else {
      shellArray.push(`export HOMEBREW_CASK_GIT_REMOTE="${matchMirror.cask}"`);
    }

    shellArray.push(`export HOMEBREW_BOTTLE_DOMAIN="${matchMirror.bottles}"`);

    shellArray.push('');

    shellArray.push(
      '/bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/install.sh)"',
    );
    return shellArray.join('\n');
  }

  return (
    <div className="__dumi-default-source-generate">
      <div className="__dumi-default-source-generate-tool">
        <div className="__dumi-default-source-generate-tool-query">
          <label>镜像：</label>
          <Select
            size="small"
            value={mirror}
            onChange={value => setMirror(value as Mirror)}
            style={{ width: '120px' }}
          >
            {mirrorConfig.map(config => (
              <Option value={config.key} key={config.key}>
                {config.value}
              </Option>
            ))}
          </Select>
        </div>
        <div className="__dumi-default-source-generate-tool-query">
          <label>平台：</label>
          <Select
            size="small"
            value={platform}
            onChange={value => setPlatform((1 * (value as any)) as Platform)}
            style={{ width: '100px' }}
          >
            {platformList.map(config => (
              <Option value={config.key} key={config.key}>
                {config.value}
              </Option>
            ))}
          </Select>
        </div>
        <div className="__dumi-default-source-generate-tool-query">
          <label>终端类型：</label>
          <Select
            size="small"
            value={terminalType}
            onChange={value => setTerminalType(value)}
            style={{ width: '80px' }}
          >
            <Option value="zsh">zsh</Option>
            <Option value="bash">bash</Option>
          </Select>
          <Tooltip
            overlayStyle={{ width: '360px', maxWidth: '360px' }}
            title={
              <div>
                <p>macOS Catalina(10.15.x)以及更高版本默认是zsh</p>
                <p>
                  执行命令echo $SHELL
                  <br />
                  显示/bin/bash则是bash，显示/bin/zsh则是zsh
                </p>
              </div>
            }
          >
            <QuestionCircleOutlined style={{ marginLeft: '8px' }} />
          </Tooltip>
        </div>
        <div className="__dumi-default-source-generate-tool-query">
          <label>JSON Api：</label>
          <Checkbox
            checked={isJsonApi}
            onChange={e => setJsonApi(e.target.checked)}
          ></Checkbox>
        </div>
      </div>
      <SourceCode
        code={first ? generateFirstMirrorSet() : generateMirror()}
        lang="bash"
      />
    </div>
  );
};

export default SourceGenerate;
