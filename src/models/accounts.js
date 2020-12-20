const Client = require('mariasql');
const c = new Client({
  host: process.env.APP_DATABASE_HOST,
  user: process.env.APP_DATABASE_USER,
  password: process.env.APP_DATABASE_PASSWORD,
  db: process.env.APP_DATABASE_DB
});

module.exports = {

  /////////////////////////////////////////////////////////////////////////////////////////////
  // ACCOUNT MODELS

  cekLogin: function (id, pass, callback) {
    var req = [id, pass];
    c.query("SELECT * FROM `users` WHERE `id`=? AND `password`=?", req, { metadata: true, useArray: true }, function (err, rows) {
      if (err) {
        res.send({ message: err.message });
        console.log(err);
        return
      }

      var data = [];
      if (rows.info.numRows !== '0') {
        rows.forEach(function (items) {
          data.push({
            id: items[0],
            name: items[1],
            email: items[3],
            photo: items[4],
            registered: items[5],
            updated: items[6]
          });
        });
      }
      callback(err, data);
    });
    c.end();
  },

  /////////////////////////////////////////////////////////////////////////////////////////////
  // CHECK REGISTERED

  checkUserRegistered: function (req, res) {
    c.query("SELECT * FROM `users` WHERE `id`=?", [req.id], { metadata: true, useArray: true }, function (err, rows) {
      if (err) {
        res.send({ message: err.message });
        console.log(err);
        return
      }

      if (rows.info.numRows !== '0') {
        res.json({
          success: true,
          err: null,
          message: "user already registered"
        });
      } else {
        res.json({
          success: false,
          err: null,
          message: "user not registered"
        });
      }
    });
    c.end();
  }

}
