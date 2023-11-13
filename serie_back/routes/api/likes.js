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

module.exports = router;
