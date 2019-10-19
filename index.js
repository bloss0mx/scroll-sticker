const index = require('./src/index');
const utils = require('./src/utils');
const useful = require('./src/useful');

const { resizeRegister, scrollRegister, ...other } = index;

module.exports = {
  composable: {
    ...other,
    ...utils,
  },
  resizeRegister,
  scrollRegister,
  ...useful,
};
