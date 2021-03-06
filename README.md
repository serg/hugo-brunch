# hugo-brunch
Adds [Hugo](https://gohugo.io) support to [Brunch](http://brunch.io).

## Usage
Install the plugin via npm with `npm install --save-dev hugo-brunch`.

Or, do manual install:

* Add `"hugo-brunch": "x.y.z"` to `package.json` of your brunch app.
* If you want to use git version of plugin, use the GitHub URI
`"hugo-brunch": "git+ssh://git@github.com:serg/hugo-brunch.git"`.

Put the folder with the Hugo assets into the `app/` folder. The path for this folder can be for e.g. `app/your-hugo-folder/`. You can name the Hugo assets folder as you wish.

## Options
By default the Brunch doesn't tracks the changes in folders and files that begins with the `_` (underscore) symbol. The Hugo subfolders and files can have names with underscore at the beginning. These rules are used by the Hugo conventions for templating.
For teach the Brunch to track any Hugo folders and files you need to override the ignore rules for the files and folders in the `brunch-config.js` (or .coffee). Write this rule in the `module.exports` section:

```js
module.exports = {
  ...
  conventions: {
    ignored: [/\/_(?!default|index)/, /vendor\/(node|j?ruby-.+|bundle)\//]
  },
  ...
}
```
By default Brunch has these rules for ignore the tracking of some file types: `[/\/_/, /vendor\/(node|j?ruby-.+|bundle)\//]`. In the configuration above we have updated the `/\/_/` rule and leaves the second rule as is.

To work with the `hugo-brunch` plugin you need to define the required `sourceFolder` field. This field must point to your Hugo folder. You can setup it in this way:

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
The `hugo-brunch` relies on the following default options:
```js
module.exports = {
  ...
  plugins: {
    hugo: {
      sourceFolder: '',
      outputFolder: 'public',
      executablePath: 'node_modules/hugo-bin/vendor/hugo',
      args: ['--buildDrafts','--buildFuture','--verbose'],
      fileExtensions: ['html','toml','yaml','json','md',
                      'svg','png','jpg','jpeg','ico','gif','webp',
                      'eot','ttf','woff','woff2',
                      'mp4','webm','ogg',
                      'mp3','wav',
                      'txt']
    }
  },
  ...
}
```
`sourceFolder` (required) Location of the Hugo website assets.

`outputFolder` (optional) Location for a folder with a website generated by Hugo. By default the `paths.public` value are used from brunch config. Please note, this path needs to be constructed by starting inside the Hugo assets folder or you can use an absolute path.

`executablePath` (optional) Alternative location of the Hugo execution file.

`args` (optional) The arguments, that will be used during Hugo execution. The defaults for development mode is `['--buildDrafts','--buildFuture','--verbose']`, for production - `['--verbose']`. ***Please notice:*** when you override this option your arguments will be applied to both modes - for the development and for the production.

`fileExtensions` (optional) The plugin will watch the changes in files with these extensions. This option will be applied only for files in a folder defined in the `sourceFolder` value.

**Warning**
All changed values in the Brunch config file will override the default values of plugin. In some cases this can lead to unexpected results when the Hugo will generate a website. If you need to expand abilities of options you can combine your values with defaults. Please make sure you know what you are doing by follow the [Hugo docs](https://gohugo.io/commands/hugo/).

## Examples
[`hugo-init`](https://github.com/serg/hugo-init) - a Hugo minimal boilerplate.

## Thanks
- To the [Brunch team](https://github.com/brunch/brunch/graphs/contributors) and all related contributors.
- To the [Hugo folks](https://github.com/gohugoio/hugo/graphs/contributors) and all related contributors.
- To [Shun Sato](https://github.com/satoshun00) for the [`hugo-bin`](https://www.npmjs.com/package/hugo-bin) package.

## License
MIT © [Sergey Furtak](https://sergfurtak.com)

By using this plugin you understand the implications and guarantees of the [MIT license](https://github.com/serg/hugo-brunch/blob/master/LICENSE).