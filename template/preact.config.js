export default function (config, env, helpers) {
  config.module.loaders.push({
    test: /\.elm$/,
    exclude: [/elm-stuff/, /node_modules/],

    use: [
      env.production ? null : { loader: 'elm-hot-webpack-loader' },
      {
        loader: 'elm-webpack-loader',
        options: {
          cwd: __dirname,
          optimize: true
        }
      }
    ].filter(Boolean)
  })
}
