import path from 'path';
import express from 'express';
import compression from 'compression';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';

// eslint-disable-next-line import/no-unresolved
import webpackConfig from 'webpack.config';
import initialize from './db/initialize';
import Responder from './helpers/responder.helper';

const responder = new Responder();

const middleware = app => {
  app.use(express.static(path.resolve(__dirname, '../client')));

  (async () => {
    await initialize();
  })();

  if (process.env.NODE_ENV === 'production') {
    app.use(compression());
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/index.html'));
    });
  } else {
    const compiler = webpack(webpackConfig);

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

    app.get('*', (req, res) => {
      responder.setError(
        400,
        'Your request could not be processed. Please try again.',
      );
      responder.send(res);
    });
  }
};

export default middleware;
