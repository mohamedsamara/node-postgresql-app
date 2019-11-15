import 'dotenv/config';
import express from 'express';
import chalk from 'chalk';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import cors from 'cors';
import compression from 'compression';
import path from 'path';

import webpackConfig from '../webpack.config';

import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(cors());
app.use(compression());
app.use('api/', routes);

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
} else {
  app.get('*', (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../client')));
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(
    `${chalk.green('✓')} ${chalk.greenBright(
      `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`,
    )}`,
  );
});

export default app;
