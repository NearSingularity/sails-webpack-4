# Sails Hook for Webpack 4

## Install
```sh
npm install sails-hook-webpacker --save
```
## Setup

### Disable the built-in Grunt hook

```js
// .sailsrc
{
  "hooks": {
    "grunt": false
  }
}
```
### Set your environment

By default `NODE_ENV` is set for you during development...but you should still use something like [dotenv](https://www.npmjs.com/package/dotenv) to do this.

| `NODE_ENV` | webpack mode | description |
|:---|:---|:---|
| `development` | [`webpack.watch()`](https://webpack.github.io/docs/configuration.html#watch) | Rebuilds on file changes during runtime |
| `staging` or `production` | `webpack.run()` | Build bundle once on load. |

### Setup Webpack

Example Config:

```js
// config/webpack.js
const webpack = require('webpack');
const path = require('path');

// compile js assets into a single bundle file
module.exports.webpack = {
  options: {
    entry: {
      app: './assets/js',
    },
    output: {
      path: path.resolve(__dirname, '../.tmp/public/js'),
      filename: '[name].js'
    },
    module: {
      loaders: [
        // put your loaders for different file types here
      ]
    }
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
  },
};
```

My preferred (subject to change) Config:

```js
// config/webpack.js

const options = require(`./webpack/shared`);
const development = require(`./webpack/development`);
const production = require(`./webpack/production`);

module.exports.webpack = {
  options,
  development,
  production
};
```
The rest can be vue'd (pun intended) [here](https://github.com/NearSingularity/sails-vue-webpack/tree/master/config/webpack).

### Add to Layout
```html
<!-- views/layout.ejs -->
<script src="/js/app.js"></script>
```

### Lift!

```sh
sails lift
```

## License
MIT

Inspired by other sails-webpack-hooks like [sails-hook-webpack2](https://github.com/lewebsimple/sails-hook-webpack2) and [sails-hook-webpack3](https://www.npmjs.com/package/sails-hook-webpack3)...just done my way and with Webpack 4 in mind.
