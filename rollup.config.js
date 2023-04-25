const { uglify } = require('rollup-plugin-uglify');

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs' // 设置格式为 CommonJS
  },
  plugins: [
    uglify()
  ]
};