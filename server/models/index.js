import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
});

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

// import fs from 'fs';
// import path from 'path';
// import Sequelize from 'sequelize';

// const basename = path.basename(__filename);
// const db = {};

// const sequelize = new Sequelize({
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: 'postgres',
// });

// fs.readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     );
//   })
//   .map(file => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).map(
//   modelName => db[modelName].associate && db[modelName].associate(db),
// );

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;

// import Sequelize from 'sequelize';
// const db = {};

// const sequelize = new Sequelize({
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: 'postgres',
// });

// const context = require.context('.', true, /^\.\/(?!index\.js).*\.js$/, 'sync');
// context
//   .keys()
//   .map(context)
//   .forEach(module => {
//     const sequelizeModel = module(sequelize, Sequelize);
//     db[sequelizeModel.name] = sequelizeModel;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;

// import Sequelize from 'sequelize';

// import bookModel from './book';

// const db = {};

// const sequelize = new Sequelize({
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: 'postgres',
// });

// db.User = sequelize.import('Book', bookModel);
// sequelize.sync();

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// export default db;

// // export { db as Models, sequelize };
