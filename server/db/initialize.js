import db from '../models';
import seed from './seed';

const syncOptions = { force: false };

if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// Syncing our models
const initialize = async () => {
  console.log('is here');

  await db.sequelize.sync(syncOptions).then(() => {
    seed();
  });
};

export default initialize;
