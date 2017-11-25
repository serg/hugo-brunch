# hugo-brunch
Adds [Hugo](https://gohugo.io) support to [Brunch](http://brunch.io).
By using this plugin you understand the implications and guarantees of the [MIT license](#license).

## Usage
Install the plugin via npm with `npm install --save-dev hugo-brunch`.

Or, do manual install:

* Add `"hugo-brunch": "x.y.z"` to `package.json` of your brunch app.
* If you want to use git version of plugin, use the GitHub URI
`"hugo-brunch": "git+ssh://git@github.com:sfexample/hugo-brunch.git"`.

Put the folder with the Hugo assets into the `app/` folder. The path for this folder can be for e.g. `app/your-hugo-folder/`. You can name the Hugo assets folder as you wish.

## Options
By default the Brunch doesn't tracks the changes in folders and files that begins with the `_` (underscore) symbol. The Hugo subfolders and files can have names with underscore at the beginning. These rules are used by the Hugo conventions for templating.
For teach the Brunch to track any Hugo folders and files you need to override the ignore rules for the files and folders in the `brunch-config.js` (or .coffee). Write this rule in the `module.exports` section:

```js
module.exports = {
  ...
  conventions: {
    ignored: [/vendor\/(node|j?ruby-.+|bundle)\//]
  },
  ...
}
```
By default Brunch has these rules for ignore the tracking of some file types: `[/\/_/, /vendor\/(node|j?ruby-.+|bundle)\//]`. In this case we omit the `/\/_/` rule and leave the second rule in our configuration above.

To work with the `hugo-brunch` plugin you need to define the required `sourceFolder` field. This field must point to your Hugo folder. You can set it in this way:

```js
module.exports = {
  ...
  plugins: {
    hugo: { sourceFolder: 'app/your-hugo-folder' }
  },
  ...
}
```
**That's all you need for a basic configuration.**
## Defaults
The `brunch-plugin` relies on the following default options:
```js
module.exports = {
  ...
  plugins: {
    hugo: {
      sourceFolder: '',
      outputFolder: 'public',
      executablePath: 'node_modules/hugo-brunch/node_modules/hugo-bin/vendor/hugo',
      args: ['-DFv'],
      fileExtensions: ['html','ace','amber','toml','yaml','json','md','png','jpg','jpeg','ico','eot','svg','ttf','woff']
    }
  },
  ...
}
```
`sourceFolder` (required) Location of the Hugo website assets.

`outputFolder` (optional) Location for a folder with a website generated by Hugo. By default the `paths.public` value are used from brunch config. Please note, this path needs to be constructed by starting from the Hugo assets folder or you can use the absolute path.

`executablePath` (optional) Alternative location of the Hugo execution file.

`args` (optional) The arguments, that will be used during Hugo execution. The defaults for development is `['-DFv']`, for production - `['-v']`.

`fileExtensions` (optional) The plugin will watch the changes in files with these extensions. This option will be applied only for files in a folder defined in the `sourceFolder` value.

**Warning**
All changed values in the Brunch config file will override the default values of plugin. In some cases this can lead to unexpected results when the Hugo will generate a website. If you need to expand abilities of options you can combine your values with defaults. Please make sure you know what you are doing by follow the [Hugo docs](https://gohugo.io/commands/hugo/).

## License
MIT License

Copyright (c) 2017 Sergey Furtak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.