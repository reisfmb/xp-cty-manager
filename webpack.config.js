const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    app: './src/main/resources/admin/tools/vue/main.ts',
    vendor: ['vue', 'vuex', 'vuetify', 'pug', 'ramda', 'sweetalert2'],
  },

  output: {
    path: path.resolve(__dirname, './build/resources/main/assets/js'),
    filename: '[name].js',
    publicPath: path.resolve(__dirname, './build/resources/main/assets'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        loader: 'pug-plain-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.scss', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.common.js',
    },
    fallback: {
      fs: false,
      path: false,
      assert: false,
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
    },
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

  plugins: [
    new VueLoaderPlugin(),
  ],
};
