var configValues = require('./config');

module.exports = {
  getDbConnectionString: function() {
    return 'mongodb://' + configValues.uname + ':'
    + configValues.pwd + '@ds147080.mlab.com:47080/practicetodo';
  }

}
