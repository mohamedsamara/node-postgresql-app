import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';

// eslint-disable-next-line import/no-unresolved
import webpackConfig from 'webpack.config';
import initialize from './db/initialize';

const middleware = app => {
  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig);

    (async () => {
      await initialize();
    })();

    app.use(
      historyApiFallback({
        verbose: false,
      }),
    );

    app.use(
      webpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true,
          hash: false,
          timings: true,
          chunks: false,
          chunkModules: false,
          modules: false,
        },
      }),
    );

    app.use(webpackHotMiddleware(compiler));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../client')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/index.html'));
    });
  }
};

export default middleware;
