module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            "@components": "./app/components",
            "@hooks": "./app/hooks",
            "@routes": "./app/routes",
            "@screens": "./app/screens",
            "@services": "./app/services",
            "@stores": "./app/stores",
            "@theme": "./app/theme/index",
            "@models": "./app/models",
            "@utils": "./app/utils",
          },
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
          ]
        },
      ],
    ],
  };
};
