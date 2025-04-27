const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getAllImages = (req, res) => {
  const { stadion_id } = req.params;
  db.query(
    `SELECT * FROM images WHERE stadion_id = ?`,
    [stadion_id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ data: result });
    }
  );
};

const getImageById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM images WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result[0] });
  });
};

// Create an image
const createImage = (req, res) => {
  const { stadion_id, image_url } = req.body;

  db.query(
    `INSERT INTO images (stadion_id, image_url) VALUES (?,?)`,
    [stadion_id, image_url],
    (err, result) => {
      if (err) {
        console.log("Error creating image:", err);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      res.status(201).send({
        message: "Image muvaffaqiyatli yaratildi",
        imageId: result.insertId,
      });
    }
  );
};

const updateImageById = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updateValue = queryGenerate(data);
  const values = Object.values(data);

  db.query(
    `UPDATE images SET ${updateValue} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Image yangilandi" });
    }
  );
};

const removeImageById = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM images WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ message: "Image o'chirildi" });
  });
};

module.exports = {
  getAllImages,
  getImageById,
  createImage,
  updateImageById,
  removeImageById,
};
