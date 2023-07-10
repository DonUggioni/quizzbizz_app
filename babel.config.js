module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-paper/babel',
      ['module:react-native-dotenv'],
      'react-native-reanimated/plugin',
      require.resolve('expo-router/babel'),
    ],
  };
};
