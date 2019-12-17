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

// eslint-disable-next-line import/no-unresolved
import webpackConfig from 'webpack.config';

import routes from './routes';
import db from './models';
import Responder from './helpers/responder.helper';

const app = express();
const PORT = process.env.PORT || 3000;
const responder = new Responder();

console.log('NODE_ENV', process.env.NODE_ENV);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(cors());
app.use(compression());
app.use('api/', routes);

// development || test
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
  app.use(express.static(path.resolve(__dirname, '../client')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/index.html'));
  });
}

app.use((req, res) => {
  responder.setError(
    400,
    'Your request could not be processed. Please try again.',
  );
  responder.send(res);
});

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
