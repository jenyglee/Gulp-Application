// module.exports = function (api) {
//     api.cache(true);
//     return {
//         presets: ["babel-preset-expo"],
//     };
// };
module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
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
                ],
                alias: {
                    "@": "./src",
                    // "@components": "./src/components",
                    "@components": "./src/common/components",
                    "@screens": "./src/common/screens",
                    "@containers": "./src/containers",
                    "@modules": "./src/modules",
                    "@utils": "./src/utils",
                },
            },
        ],
    ],
};
