'use strict';

const {execFile} = require('child_process');
const path = require('path');

const HUGO_ARGS_PER_ENVS = {
  development: ['-DFv'],
  production: ['-v']
};

function escapeRegex(str) {
  return String(str).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

class HugoBrunch {
  constructor(cfg) {
    const defaults = {
      sourceFolder: '',
      outputFolder: path.join(process.cwd(), cfg.paths.public),
      executablePath: require('hugo-bin'),
      args: HUGO_ARGS_PER_ENVS[process.env.NODE_ENV],
      fileExtensions: ['html','ace','amber','toml','yaml','json','md','png','jpg','jpeg','ico','eot','svg','ttf','woff']
    };
    this.config = Object.assign({}, defaults, cfg.plugins.hugo);

    if (!this.config.sourceFolder) {
      throw ("\n>>> ERROR: Please define the required 'sourceFolder' value in the Brunch config file (brunch-config.js)");
    }

    const fileExts = this.config.fileExtensions.join('|');
    const sourceFolder = escapeRegex(this.config.sourceFolder);
    this.pattern = new RegExp(`${sourceFolder}.*\\.(${fileExts})`);

    this.hugoArgs = this._buildArgs();
    this.isBuiltOnce = true;
    this.files = [];
  }

  compile(file) {
    this.files.push(file.path);
    return Promise.resolve(file);
  }

  onCompile(files) {
    if (!this.files.length) return;

    this._hugoBuild(this.config.executablePath, this.hugoArgs);

    if (!this.isBuiltOnce)
      console.info(`>>> changed files: [${this.files.join(', ')}]`);

    this.files = [];
    this.isBuiltOnce = false;
  }

  _buildArgs() {
    // used as environment value in execFile
    process.env.HUGO_ENV = process.env.NODE_ENV;

    let args = this.config.args;
    args = args.concat(['-s', this.config.sourceFolder, '-d', this.config.outputFolder]);

    return args;
  }

  _hugoBuild(command, args) {
    execFile(command, args, (error, stdout) => {
      let output = '\n>>> Hugo output: ';
      output += `${stdout.trim()}\n\n`;
      output += '>>> Hugo build is ' + (error ? 'failed (>_< \")' : 'successful *(^o^ )*');
      console.info(output);
    });
  }
}

HugoBrunch.prototype.brunchPlugin = true;

module.exports = HugoBrunch;