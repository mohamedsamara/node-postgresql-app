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
import db from './models';

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
  app.use(express.static(path.resolve(__dirname, './client')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/index.html'));
  });
}

const syncOptions = { force: false };

// Starting the server, syncing our models
db.sequelize.sync(syncOptions).then(async () => {
  app.listen(PORT, () => {
    console.log(
      `${chalk.green('✓')} ${chalk.greenBright(
        `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`,
      )}`,
    );
  });
});

export default app;
