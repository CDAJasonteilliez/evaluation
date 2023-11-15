const router = require("express").Router();
const connection = require("../../database");
const { uploadSerie } = require("../../middleware/middleware");
const fs = require('fs');
const path = require('path');

router.get("/getSeries", (req, res) => {
  const sql = "SELECT * FROM series";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Séries récupérées");
    res.json(result);
  });
});

router.post('/addSerie', uploadSerie.single("poster"), async (req,res) => {
  const poster = req.file.filename;
  const {title, year, resume, numberSeason, still, imdbNote, sensCritiqueNote, country} = req.body;
  let stillBool = still === "true" ? 1: 0;
  const sql = "INSERT INTO series (title, poster, year, resume, numberSeason, still, imdbNote, sensCritiqueNote, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(sql, [title, poster, year, resume, numberSeason, stillBool, imdbNote, sensCritiqueNote, country], (err, result) => {
    if (err) throw err;
    res.status(200).json({ messageGood: "Série ajouté avec succés" });
  });
});

router.put('/updateSerie', uploadSerie.single("poster"), async (req, res) => {
  const {idSerie, title, year, resume, numberSeason, still, imdbNote, sensCritiqueNote, country, oldPoster} = req.body;
  let poster = oldPoster

  // Si nouveau poster
  if (req.file != undefined) {
    // Modifie poster
    poster = req.file.filename;
    // Supprime old poster
    const filePath = path.join(__dirname, '..', '..', "/upload/series", oldPoster);
    fs.unlink(filePath, (err) => {
      if (err) {
      console.log("Erreur suppression fichier");
      }
      console.log("Fichier supprimé");
    });
  }

  let stillBool = still === '1' ? 1: 0;
  const values = [ title, poster, year, resume, numberSeason, stillBool, imdbNote, sensCritiqueNote, country, idSerie]

  const sql = "UPDATE series SET title = ?, poster = ?, year = ?, resume = ?, numberSeason = ?, still = ?, imdbNote = ?, sensCritiqueNote = ?, country = ? WHERE idSerie = ?";
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    res.status(200).json({ messageGood: "Série modifié avec succés" });
  });
});

router.delete("/deleteSerie/:id", async (req, res) => {
  const id = req.params.id;
  const getsql = "SELECT poster FROM series WHERE idSerie = ?"
  connection.query(getsql, [id], async (err,result) => {
    if (err) throw err;

    // Supprimer poster
    const filePath = path.join(__dirname, '..', '..', "/upload/series", result[0].poster);
    fs.unlink(filePath, (err) => {
      if (err) {
      console.log("Erreur suppression fichier");
      }
      console.log("Fichier supprimé");
    });

    // Supprimer DDB
    const deleteSql = "DELETE FROM series WHERE idSerie = ?";
    connection.query(deleteSql, [id], (err, result) => {
      if (err) throw err;
      res.status(200).json({ messageGood: "Série supprimé avec succés" });
    });
  });
});

module.exports = router;
