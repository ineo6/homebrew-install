#!/usr/bin/env node
'use strict'

const path = require('path');
const chalk = require('chalk');
const fsExtra = require('fs-extra');
const ora = require('ora');
const download = require('download-git-repo');

const cwd = process.cwd();
const origin = 'Homebrew/install';

const branch = "#master";

const targetPath = path.join(cwd, 'lib');

fsExtra.emptyDirSync(path.join(targetPath));

const spinner = ora(`downloading ${origin}...`);
spinner.start();

download(`${origin}${branch}`, targetPath, {clone: false}, function (err) {
  spinner.stop();
  if (err) {
    console.log(chalk.red(`Failed to download repo https://github.com/${origin}${branch}`, err));
  } else {
    console.log(chalk.green(`Success to download repo https://github.com/${origin}${branch}`));

    try {
      fsExtra.removeSync(path.join(targetPath, '.github/ISSUE_TEMPLATE'));
      fsExtra.removeSync(path.join(targetPath, '.github/workflows/triage-issues.yml'));
      fsExtra.removeSync(path.join(targetPath, '.github/ISSUE_TEMPLATE.md'));

      fsExtra.removeSync(path.join(targetPath, 'install'));
      fsExtra.removeSync(path.join(targetPath, 'uninstall'));
      fsExtra.removeSync(path.join(targetPath, 'LICENSE.txt'));
      fsExtra.removeSync(path.join(targetPath, 'README.md'));

      fsExtra.moveSync(path.join(targetPath, '.github'), path.join(cwd, '.github'), {overwrite: true});

      console.log(chalk.green('Done!'));
    } catch (e) {
      console.log(e.message);
    }
  }
})
