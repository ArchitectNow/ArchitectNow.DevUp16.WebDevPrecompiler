var Path = require('path');
function CreatePathFn (basePath) {
  return function (args) {
    args = Array.prototype.slice.call(arguments, 0);
    return Path.join.apply(Path, [basePath].concat(args));
  };
}
var Root = CreatePathFn(Path.resolve(__dirname, '..'));

function HasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function IsWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server$/.exec(process.argv[1]));
}


function CheckNodeImport(context, request, cb) {
  if (!Path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}

module.exports = {
  root: Root,
  config: CreatePathFn(Root('config')),
  src: CreatePathFn(Root('src')),
  build: CreatePathFn(Root('wwwroot')),
  dist: CreatePathFn(Root('wwwroot')),
  hasProcessFlag: HasProcessFlag,
  isWebpackDevServer: IsWebpackDevServer,
  checkNodeImport: CheckNodeImport
};