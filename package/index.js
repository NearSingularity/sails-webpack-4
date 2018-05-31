/**
 * sails-webpack-4 hook
 *
 * @description :: Webpack 4 hook for a sails app
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 *
 */

const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = sails => {

  if (!sails.config.webpack) {
    sails.log.warn('Add a config/webpack.js to your sails app.');
    return {};
  }
  if (!sails.config.webpack.options) {
    sails.log.warn('Add webpack options to your webpack config.');
    return {};
  }

  return {

    initialize: done => {
      const environment = process.env.NODE_ENV;
      const options = merge(sails.config.webpack.options, sails.config.webpack[environment]);

      const log = (err, stats) => {
        if (err) return sails.log.error('Build error:\n', err);

        const s = stats.toJson();

        sails.log.debug(`Webpack Stats: ${stats.toString({ colors: true, chunks: false })}`);
      };

      const compiler = webpack(options, (err, stats) => {
        if (err) return sails.log.error('Webpack configuration error: \n', err);

        sails.log.info('Webpack configuration success.');

        environment === 'development'
        ? compiler.watch(options.watchOptions, log)
        : compiler.run(log);
      });

      return done();
    },
  };

};
