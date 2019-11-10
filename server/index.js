import 'dotenv/config';
import express from 'express';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import compression from 'compression';
import path from 'path';

import webpackConfig from '../webpack.config';

console.log('iss heeree');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if development
if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);

  app.use(
    historyApiFallback({
      verbose: false,
    }),
  );

  app.use(
    webpackMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, '../client/public'),
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
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(compression());
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.blue(
      `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`,
    )}`,
  );
});
