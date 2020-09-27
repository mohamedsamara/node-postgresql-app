import db from '../models';
import seed from './seed';

const syncOptions = { force: false };

if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// Syncing our models
const initialize = async () => {
  db.sequelize.sync(syncOptions).then(async () => {
    console.log(`Database & tables created!`);

    seed().then(() => {
      console.log(`Seeds created!`);
    });
  });
};

export default initialize;
