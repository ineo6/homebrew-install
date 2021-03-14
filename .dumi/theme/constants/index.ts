export const tencentMirror = {
  brew: 'https://mirrors.cloud.tencent.com/homebrew/brew.git',
  core: 'https://mirrors.cloud.tencent.com/homebrew/homebrew-core.git',
  linuxCore: 'https://mirrors.cloud.tencent.com/homebrew/linuxbrew-core.git',
  cask: 'https://mirrors.cloud.tencent.com/homebrew/homebrew-cask.git',
  bottles: 'https://mirrors.cloud.tencent.com/homebrew-bottles/bottles',
  linuxBottles: '',
};

export const tsinghuaMirror = {
  brew: 'https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git',
  core: 'https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git',
  linuxCore:
    'https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/linuxbrew-core.git',
  cask: 'https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git',
  bottles: 'https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles',
  linuxBottles: 'https://mirrors.tuna.tsinghua.edu.cn/linuxbrew-bottles',
};

export const ustcMirror = {
  brew: 'https://mirrors.ustc.edu.cn/brew.git',
  core: 'https://mirrors.ustc.edu.cn/homebrew-core.git',
  linuxCore: 'https://mirrors.ustc.edu.cn/linuxbrew-core.git',
  cask: 'https://mirrors.ustc.edu.cn/homebrew-cask.git',
  bottles: 'https://mirrors.ustc.edu.cn/homebrew-bottles',
  linuxBottles: 'https://mirrors.ustc.edu.cn/linuxbrew-bottles',
};

export const bfsuMirror = {
  brew: 'https://mirrors.bfsu.edu.cn/git/homebrew/brew.git',
  core: 'https://mirrors.bfsu.edu.cn/git/homebrew/homebrew-core.git',
  linuxCore: 'https://mirrors.bfsu.edu.cn/git/homebrew/linuxbrew-core.git',
  cask: 'https://mirrors.bfsu.edu.cn/git/homebrew/homebrew-cask.git',
  bottles: 'https://mirrors.bfsu.edu.cn/homebrew-bottles',
  linuxBottles: 'https://mirrors.bfsu.edu.cn/linuxbrew-bottles',
};

export const mirrorData: { [key: string]: any } = {
  bfsuMirror,
  ustcMirror,
  tencentMirror,
  tsinghuaMirror,
};

export enum Mirror {
  BFSU = 'bfsu',
  Tsinghua = 'tsinghua',
  Tencent = 'tencent',
  USTC = 'ustc',
}

export enum Platform {
  MacOS,
  Linux,
  Windows,
}
