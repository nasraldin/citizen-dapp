const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        METAMASK_PRIVATEKEY: JSON.stringify(process.env.METAMASK_PRIVATEKEY),
      },
    }),
  ],
};
