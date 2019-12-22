import 'dotenv/config';
import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import compression from 'compression';

import routes from './routes';
import Responder from './helpers/responder.helper';
import middleware from './middleware';

const app = express();
const PORT = process.env.PORT || 3000;
const responder = new Responder();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(cors());
app.use(compression());
app.use('api/', routes);

// setup middleware
middleware(app);

app.use((req, res) => {
  responder.setError(
    400,
    'Your request could not be processed. Please try again.',
  );
  responder.send(res);
});

// Starting the server
const boot = () => {
  app.listen(PORT, () => {
    console.log(
      `${chalk.green('✓')} ${chalk.greenBright(
        `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`,
      )}`,
    );
  });
};

// ensures that app.listen is only when I'm not testing to avoid EADDRINUSE error when mocha is watchings files
if (process.env.NODE_ENV !== 'test') {
  boot();
}

export { app, PORT };
