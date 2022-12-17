const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: 'assets/[hash][ext]'
  },
  devServer: {
    watchFiles: ['./src/*'],
    port: 3000,
    open: true,
    hot: true
  },
  resolve: {
    alias: {
      '@': '.src/',
      images: '.src/assets/images',
      fonts: '.src/assets/fonts'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name][hash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/template.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  }
}
