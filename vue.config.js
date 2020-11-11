const WorkerPlugin = require('worker-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new WorkerPlugin({
        // use "self" as the global object when receiving hot updates.
        globalObject: 'self', // <-- this is the default value
      }),
    ],
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-app/'
    : '/'
};
