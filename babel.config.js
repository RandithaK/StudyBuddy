module.exports = function (api) {
  api.cache(true);
  const envFile = process.env.ENVFILE || '.env';
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: envFile,
        allowUndefined: true,
      }]
    ]
  };
};
