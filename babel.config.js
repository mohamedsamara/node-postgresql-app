module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    ignore: ['server/**/*.test.js', 'client/**/*.test.js'],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/transform-runtime'],
    env: {
      development: {
        plugins: [
          [
            'module-resolver',
            {
              root: ['.'],
              alias: {
                'webpack.config': './webpack.config',
              },
            },
          ],
        ],
      },
      production: {
        plugins: [
          [
            'module-resolver',
            {
              root: ['.'],
              alias: {
                'webpack.config': '../webpack.config',
              },
            },
          ],
        ],
      },
      test: {
        plugins: [
          [
            'module-resolver',
            {
              root: ['.'],
              alias: {
                'webpack.config': './webpack.config',
              },
            },
          ],
        ],
      },
    },
  };
};
