const Client = require('mariasql');
const c = new Client({
  host: process.env.APP_DATABASE_HOST,
  user: process.env.APP_DATABASE_USER,
  password: process.env.APP_DATABASE_PASSWORD,
  db: process.env.APP_DATABASE_DB
});

module.exports = {

  /////////////////////////////////////////////////////////////////////////////////////////////
  // USERS MODELS

  getUserAll: function (req, res) {
    c.query("SELECT * FROM `users`", null, { metadata: true, useArray: true }, function (err, rows) {
      if (err) {
        res.send({ message: err.message });
        console.log(err);
        return
      }

      var data = [];
      rows.forEach(function (items) {
        data.push({
          id: items[0],
          name: items[1],
          // password: items[2],
          email: items[3],
          photo: items[4],
          registered: items[5],
          updated: items[6]
        });
      });
      if (data.length < 1) {
        res.status(404).send('Data not found.');
      } else {
        res.json(data);
      }
    });
    c.end();
  },
  getUser: function (req, res) {
    c.query("SELECT * FROM `users` WHERE `id`=?", [req.id], { metadata: true, useArray: true }, function (err, rows) {
      if (err) {
        res.send({ message: err.message });
        console.log(err);
        return
      }

      var data = [];
      rows.forEach(function (items) {
        data.push({
          id: items[0],
          name: items[1],
          // password: items[2],
          email: items[3],
          photo: items[4],
          registered: items[5],
          updated: items[6]
        });
      });
      if (data.length < 1) {
        res.status(404).send('Data not found.');
      } else {
        res.json(data);
      }
    });
    c.end();
  },
  getUserSearch: function (req, res) {
    var request = ["%" + req.id + "%", "%" + req.id + "%"];
    c.query("SELECT * FROM `users` WHERE `id` LIKE ? OR `name` LIKE ?", request, { metadata: true, useArray: true }, function (err, rows) {
      if (err) {
        res.send({ message: err.message });
        console.log(err);
        return
      }

      var data = [];
      rows.forEach(function (items) {
        data.push({
          id: items[0],
          name: items[1],
          // password: items[2],
          email: items[3],
          photo: items[4],
          registered: items[5],
          updated: items[6]
        });
      });
      if (data.length < 1) {
        res.status(404).send('Data not found.');
      } else {
        res.json(data);
      }
    });
    c.end();
  },
  newUser: function (req, password, res) {
    const waktu = new Date().toISOString();
    var request = [
      req.id,
      req.name,
      password,
      req.email,
      '',
      waktu,
      waktu
    ];
    if (request.includes(undefined)) {
      res.send({ message: 'Bad Request: Parameters cannot empty.' });
      return
    }
    c.query("INSERT INTO `users` (`id`, `name`, `password`, `email`, `photo`, `registered`, `updated`) VALUES (?, ?, ?, ?, ?, ?, ?)", request, { metadata: true, useArray: true }, function (err, rows) {
      if (err) {
        res.send({ message: err.message });
        console.log(err);
        return
      }

      res.json({
        affectedRows: rows.info.affectedRows,
        err: null,
        message: "User has registered successfully",
        success: true
      });
    });
    c.end();
  },
  updateUser: function (req, res) {
    const waktu = new Date().toISOString();
    var request = [
      req.body.name,
      req.body.email,
      waktu,
      req.params.id
    ];
    if (request.includes(undefined)) {
      res.send({ message: 'Bad Request: Parameters cannot empty.' });
      return
    }
    c.query("UPDATE `users` SET `name`=?, `email`=?, `updated`=? WHERE `id`=?", request, { metadata: true, useArray: true }, function (err, rows) {
      if (err) {
        res.send({ message: err.message });
        console.log(err);
        return
      }

      res.json({
        affectedRows: rows.info.affectedRows,
        err: null,
        message: "User has updated successfully",
        success: true
      });
    });
    c.end();
  },
  updateUserPassword: function (req, res) {
    const waktu = new Date().toISOString();
    var request1 = [
      req.params.id,
      req.body.password_old
    ];
    var request2 = [
      req.body.password,
      waktu,
      req.params.id
    ];
    if (request1.includes(undefined) || request2.includes(undefined)) {
      res.send({ message: 'Bad Request: Parameters cannot empty.' });
      return
    }
    c.query("SELECT * FROM `users` WHERE `id`=? AND `password`=?", request1, { metadata: true, useArray: true }, function (err, rows) {
      if (err) {
        res.send({ message: err.message });
        console.log(err);
        return
      }
      if (rows.length < 1) {
        res.send({ message: "Password is incorrect, please try again." });
      } else {
        c.query("UPDATE `users` SET `password`=?, `updated`=? WHERE `id`=?", request2, { metadata: true, useArray: true }, function (err, rows) {
          if (err) {
            res.send({ message: err.message });
            console.log(err);
            return
          }

          res.json({
            affectedRows: rows.info.affectedRows,
            err: null,
            message: "User Password has updated successfully",
            success: true
          });
        });
      }
    });
    c.end();
  },
  updateUserPhoto: function (req, res) {
    const waktu = new Date().toISOString();
    var request = [
      req.body.photo,
      waktu,
      req.params.id
    ];
    if (request.includes(undefined) || request.includes("")) {
      res.send({ message: 'Bad Request: Parameters cannot empty.' });
      return
    }
    c.query("UPDATE `users` SET `photo`=?, `updated`=? WHERE `id`=?", request, { metadata: true, useArray: true }, function (err, rows) {
      if (err) {
        res.send({ message: err.message });
        console.log(err);
        return
      }

      res.json({
        affectedRows: rows.info.affectedRows,
        err: null,
        message: "Profile photo has updated successfully",
        success: true
      });
    });
    c.end();
  },
  deactivateUser: function (req, res) {
    const waktu = new Date().toISOString();
    var request = [
      waktu,
      req.id
    ];
    if (request.includes(undefined) || request.includes("")) {
      res.send({ message: 'Bad Request: Parameters cannot empty.' });
      return
    }
    c.query("UPDATE `users` SET `status`='9', `updated`=? WHERE `id`=?", request, { metadata: true, useArray: true }, function (err, rows) {
      if (err) {
        res.send({ message: err.message });
        console.log(err);
        return
      }

      if (rows.info.affectedRows < 1) {
        res.status(404).send({ message: 'Data not found.' });
      } else {
        res.json({
          affectedRows: rows.info.affectedRows,
          err: null,
          message: "User has deactivate successfully",
          success: true
        });
      }
    });
    c.end();
  },
  deleteUser: function (req, res) {
    var request = [req.id];
    if (request.includes(undefined) || request.includes("")) {
      res.send({ message: 'Bad Request: Parameters cannot empty.' });
      return
    }
    c.query("DELETE FROM `users` WHERE `id`=?", request, { metadata: true, useArray: true }, function (err, rows) {
      if (err) {
        res.send({ message: err.message });
        console.log(err);
        return
      }

      if (rows.info.affectedRows < 1) {
        res.status(404).send({ message: 'Data not found.' });
      } else {
        res.json({
          affectedRows: rows.info.affectedRows,
          err: null,
          message: "User has deleted successfully",
          success: true
        });
      }
    });
    c.end();
  },
  deleteUserAll: function (req, res) {
    c.query("DELETE FROM `users`", null, { metadata: true, useArray: true }, function (err, rows) {
      if (err) {
        res.send({ message: err.message });
        console.log(err);
        return
      }
      console.log(rows.info)
      if (rows.info.affectedRows < 1) {
        res.status(404).send({ message: 'Data not found.' });
      } else {
        res.json({
          affectedRows: rows.info.affectedRows,
          message: "All User has deleted successfully :[",
          success: true
        });
      }
    });
    c.end();
  }
}