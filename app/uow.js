var folder = 'app';

function getModule(module) {
//   console.log(folder + ':' + module);
  return require('./' + folder + '/' + module);
}

function config(value) {
  folder = value;
}

exports.config = config;
exports.require = getModule;