const path = require('path')
module.exports = function override(config, env) {
   config.resolve.alias = {
        src: path.join(path.resolve(__dirname, './src')),
        public: path.join(__dirname, '../public')
    }
  //do stuff with the webpack config...
  return config;
}