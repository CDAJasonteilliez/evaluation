const router = require("express").Router();
const connection = require("../../database");
const { uploadAvatar } = require("../../middleware/middleware");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

router.post("/register", uploadAvatar.single("avatar"), async (req, res) => {
  let avatar;
  if (req.file === undefined) {
    avatar = null;
  } else {
    avatar = req.file.filename;
  }
  const { pseudo, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sqlVerify = "SELECT * FROM users WHERE email = ?";
  connection.query(sqlVerify, [email], (err, resultat) => {
    if (err) throw err;
    if (resultat.length) {
      let isEmail = { message: "Email existant" };
      if (avatar) {
        const filePath = path.join(
          __dirname,
          "..",
          "..",
          "/upload/avatars",
          avatar
        );
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("Erreur suppression fichier");
          }
          console.log("Fichier supprimé");
        });
      }
      console.log({ avatar });
      res.status(200).json(isEmail);
    } else {
      const sql =
        "INSERT INTO users (pseudo, email, password, avatar, admin, verify) VALUES (?, ?, ?, ?, ?, ?)";
      connection.query(
        sql,
        [pseudo, email, hashedPassword, avatar, 0, 0],
        (err, result) => {
          if (err) throw err;
          res.status(200).json({
            messageGood: "Inscription réussie ! Vous allez être redirigé(e)",
          });
        }
      );
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  let sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email], async (err, resultat) => {
    if (err) throw err;
    if (resultat.length === 0) {
      res.status(200).json({ message: "Connection refuse" });
    } else {
      const isPasswordValid = await bcrypt.compare(
        password,
        resultat[0].password
      );
      if (!isPasswordValid) {
        res.status(200).json({ message: "Connection refuse" });
      } else {
        // Après confirmation du login on en profite pour récupérer les données 'likes' de l'utilisateurs
        sql = "SELECT * FROM likes WHERE idUser = ?";
        connection.query(
          sql,
          [resultat[0].idUser],
          async (err, resultatLikes) => {
            if (err) throw err;
            res.status(200).json({
              messageGood: "Connection réussie, Vous allez être redirigé(e)",
              idUser: resultat[0].idUser,
              admin: resultat[0].admin,
              likes: resultatLikes,
            });
          }
        );
      }
    }
  });
});

module.exports = router;
