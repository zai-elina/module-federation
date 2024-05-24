import path from "path"; //модуль node js для корректного обрабатывания пути на разных ос
import webpack from "webpack";
import "webpack-dev-server";
import {
  buildWebpack,
  BuildMode,
  BuildPaths,
  BuildPlatform,
} from "@packages/build-config";
import packageJson from "./package.json";

interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer?: boolean;
  platform: BuildPlatform;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),
    src: path.resolve(__dirname, "src"),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3002,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? "desktop",
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "admin",
      filename: "remoteEntry.js",
      exposes: {
        // что предоставляем приложению контейнеру
        "./Router": "./src/router/Router.tsx",
      },
      shared: {
        // какие библиотеки общие
        ...packageJson.dependencies,
        react: {
          eager: true, // необходимо подгрузить сразу
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-router-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    })
  );

  return config;
};
