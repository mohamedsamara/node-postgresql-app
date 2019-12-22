import db from '../models';

const truncateTable = modelName => {
  db[modelName].destroy({
    where: {},
    force: true,
  });
};

const truncate = async model => {
  if (model) {
    return truncateTable(model);
  }
  return Promise.all(
    Object.keys(db).map(key => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      return truncateTable(key);
    }),
  );
};

export default truncate;
