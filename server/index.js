import 'dotenv/config';
import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import compression from 'compression';

import routes from './routes';
import Responder from './helpers/responder.helper';
import db from './models';
import middleware from './middleware';

const app = express();
const PORT = process.env.PORT || 3000;
const responder = new Responder();

// setup middleware
middleware(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(cors());
app.use(compression());
app.use('api/', routes);

app.use((req, res) => {
  responder.setError(
    400,
    'Your request could not be processed. Please try again.',
  );
  responder.send(res);
});

const syncOptions = { force: false };
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

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
