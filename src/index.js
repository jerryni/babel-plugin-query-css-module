import { extname } from 'path';

const CSS_EXT_NAMES = ['.css', '.less', '.sass', '.scss', '.stylus', '.styl'];
const typesChecker = {
  isImport: (node) => ['ImportDeclaration', 'Import'].includes(node.type),
  isAwaitExpression: (node) =>
    ['AwaitExpression', 'YieldExpression'].includes(node.type),
  isCallExpression: (node) => node.type === 'CallExpression',
  isStringLiteral: (node) => node.type === 'StringLiteral',
};

/**
 * e.g.
 * import Test from './test.less';
 * => import Test from './test.less?cssModules';
 */
export default () => {
  return {
    visitor: {
      ImportDeclaration(path, { opts }) {
        const { flag = 'cssModules' } = opts;
        const { specifiers = [], source = {} } = path.node || {};
        const { value = '' } = source;

        if (specifiers.length > 0 && CSS_EXT_NAMES.includes(extname(value))) {
          source.value = `${value}?${flag}`;
        }
      },

      // const styles = await import('./index.less');
      VariableDeclarator(path, { opts }) {
        const { node = {} } = path;
        const { flag = 'cssModules' } = opts;

        // const a = import('./test.less');
        if (!node.init) {
          return;
        }

        if (
          typesChecker.isAwaitExpression(node.init) &&
          typesChecker.isCallExpression(node.init.argument) &&
          typesChecker.isImport(node.init.argument.callee) &&
          node.init.argument.arguments.length === 1 &&
          typesChecker.isStringLiteral(node.init.argument.arguments[0]) &&
          CSS_EXT_NAMES.includes(extname(node.init.argument.arguments[0].value))
        ) {
          node.init.argument.arguments[0].value = `${node.init.argument.arguments[0].value}?${flag}`;
        }
      },
    },
  };
};
