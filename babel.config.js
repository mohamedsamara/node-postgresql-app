module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
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
        ignore: ['server/**/*.test.js', 'client/**/*.test.js'],
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
