# babel-plugin-query-css-module

A babel plugin solve the css-module global import styles problem.

When you use `import '.global.less'`, but get styles modularized not what you'd expect, you need this plugin.

Effects:
```javascript
// origin
import Test from './test.less';

// to
import Test from './test.less?cssModules';
```

# Systerm Requirements

- *Babal.js 7+*;
- *Node.js 10.14+*;

# Installation

> npm i -D babel-plugin-query-css-module

# Usage

`babel.config.json`:
```javascript
// Without options
{
  "presets": ["babel-plugin-query-css-module"]
}

// With options:
{
  "presets": [
    [
        "babel-plugin-query-css-module",
        {
            // Default: cssModules
            flag: 'css_modules' // The query name for resourceQuery match.
        }
    ]
  ]
}
```

Webpack settings  for reference:
```javascript
{
  module: {
    rules: [
      {
        test: /\.less$/,
        oneOf: [
          {
            resourceQuery: /cssModules/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: {
                    localIdentName: '[local]___[hash:base64:5]',
                  },
                },
              },
              {
                loader: 'postcss-loader',
              },
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                  },
                },
              },
            ],
          },
          {
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'postcss-loader',
              },
              {
                loader: 'less-loader',
                options: {
                  lessOptions: {
                    javascriptEnabled: true,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
}
```

# References

https://github.com/umijs/umi/blob/3.x/packages/babel-plugin-auto-css-modules/src/index.ts