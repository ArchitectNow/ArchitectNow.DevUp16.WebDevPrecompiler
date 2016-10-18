var path = require('path');
function createPathFn (basePath) {
  return function (args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [basePath].concat(args));
  };
}
var root = createPathFn(path.resolve(__dirname, '..'));
module.exports = {
  root: root,
  config: createPathFn(root('config')),
  src: createPathFn(root('src')),
  build: createPathFn(root('wwwroot')),
  dist: createPathFn(root('wwwroot'))
};