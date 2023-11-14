const router = require("express").Router();
const connection = require("../../database");

router.post("/changeLikes", (req, res) => {
  const { idUser, idSerie, likes } = req.body;
  let values = [idUser, idSerie, likes, null, 0, 0, 0, likes];
  let newLine = true;
  const data = {
    idUser: idUser,
    idSerie: idSerie,
    likes: likes,
    comments: null,
    maNote: 0,
    enCours: 0,
    wishList: 0,
  };

  let sql = "SELECT * FROM likes WHERE idUser = ? AND idSerie = ?";
  connection.query(sql, [idUser, idSerie], (err, resultat) => {
    if (err) throw err;
    if (resultat.length != 0) {
      newLine = false;
      console.log(resultat[0]);
      data.comments = resultat[0].comments;
      data.maNote = resultat[0].maNote;
      data.enCours = resultat[0].enCours;
      data.wishList = resultat[0].wishList;
    }
    sql =
      "INSERT INTO likes (idUser, idSerie, likes, comments, maNote, enCours, wishList) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE likes = ?";
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      res.status(200).json({
        messageGood: "ok",
        data: data,
      });
    });
  });
});

router.post("/changeMaNote", (req, res) => {
  const { idUser, idSerie, maNote } = req.body;
  let values = [idUser, idSerie, 0, null, maNote, 0, 0, maNote];
  let newLine = true;
  const data = {
    idUser: idUser,
    idSerie: idSerie,
    likes: 0,
    comments: null,
    maNote: maNote,
    enCours: 0,
    wishList: 0,
  };

  let sql = "SELECT * FROM likes WHERE idUser = ? AND idSerie = ?";
  connection.query(sql, [idUser, idSerie], (err, resultat) => {
    if (err) throw err;
    if (resultat.length != 0) {
      newLine = false;
      console.log(resultat[0]);
      data.likes = resultat[0].likes;
      data.comments = resultat[0].comments;
      data.enCours = resultat[0].enCours;
      data.wishList = resultat[0].wishList;
    }
    sql =
      "INSERT INTO likes (idUser, idSerie, likes, comments, maNote, enCours, wishList) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE maNote = ?";
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      res.status(200).json({
        messageGood: "ok",
        data: data,
      });
    });
  });
});

router.post("/changeEnCours", (req, res) => {
  const { idUser, idSerie, enCours } = req.body;
  let values = [idUser, idSerie, 0, null, 0, enCours, 0, enCours];
  let newLine = true;
  const data = {
    idUser: idUser,
    idSerie: idSerie,
    likes: 0,
    comments: null,
    maNote: 0,
    enCours: enCours,
    wishList: 0,
  };

  let sql = "SELECT * FROM likes WHERE idUser = ? AND idSerie = ?";
  connection.query(sql, [idUser, idSerie], (err, resultat) => {
    if (err) throw err;
    if (resultat.length != 0) {
      newLine = false;
      console.log(resultat[0]);
      data.likes = resultat[0].likes;
      data.comments = resultat[0].comments;
      data.maNote = resultat[0].maNote;
      data.wishList = resultat[0].wishList;
    }
    sql =
      "INSERT INTO likes (idUser, idSerie, likes, comments, maNote, enCours, wishList) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE enCours = ?";
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      res.status(200).json({
        messageGood: "ok",
        data: data,
      });
    });
  });
});

router.post("/changeWishList", (req, res) => {
  const { idUser, idSerie, wishList } = req.body;
  let values = [idUser, idSerie, 0, null, 0, 0, wishList, wishList];
  let newLine = true;
  const data = {
    idUser: idUser,
    idSerie: idSerie,
    likes: 0,
    comments: null,
    maNote: 0,
    enCours: 0,
    wishList: wishList,
  };

  let sql = "SELECT * FROM likes WHERE idUser = ? AND idSerie = ?";
  connection.query(sql, [idUser, idSerie], (err, resultat) => {
    if (err) throw err;
    if (resultat.length != 0) {
      newLine = false;
      console.log(resultat[0]);
      data.likes = resultat[0].likes;
      data.comments = resultat[0].comments;
      data.maNote = resultat[0].maNote;
      data.enCours = resultat[0].enCours;
    }
    sql =
      "INSERT INTO likes (idUser, idSerie, likes, comments, maNote, enCours, wishList) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE wishList = ?";
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      res.status(200).json({
        messageGood: "ok",
        data: data,
      });
    });
  });
});

router.post("/changeComments", (req, res) => {
  const { idUser, idSerie, comments } = req.body;
  let values = [idUser, idSerie, 0, comments, 0, 0, 0, comments];
  let newLine = true;
  const data = {
    idUser: idUser,
    idSerie: idSerie,
    likes: 0,
    comments: comments,
    maNote: 0,
    enCours: 0,
    wishList: 0,
  };

  let sql = "SELECT * FROM likes WHERE idUser = ? AND idSerie = ?";
  connection.query(sql, [idUser, idSerie], (err, resultat) => {
    if (err) throw err;
    if (resultat.length != 0) {
      newLine = false;
      console.log(resultat[0]);
      data.likes = resultat[0].likes;
      data.wishList = resultat[0].wishList;
      data.maNote = resultat[0].maNote;
      data.enCours = resultat[0].enCours;
    }
    sql =
      "INSERT INTO likes (idUser, idSerie, likes, comments, maNote, enCours, wishList) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE comments = ?";
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      res.status(200).json({
        messageGood: "ok",
        data: data,
      });
    });
  });
});

router.get("/getComments/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT comments FROM likes WHERE idSerie = ?";
  connection.query(sql, [id], (err, resultat) => {
    if (err) throw err;
    res.status(200).json({
      messageGood: "ok",
      data: resultat
    })
  });
});

module.exports = router;
