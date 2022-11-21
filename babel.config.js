module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
            ".vue",
          ],
          alias: {
            screens: "./src/screens",
            mixins: "./src/mixins",
            components: "./src/components",
            store: "./src/store",
            assets: "./assets",
            'native-base-theme': './native-base-theme',
          },
        },
      ],
    ],
  };
};
