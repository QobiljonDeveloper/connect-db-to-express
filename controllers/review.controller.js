const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getAllReviews = (req, res) => {
  const { stadion_id } = req.params;
  db.query(
    `SELECT * FROM review WHERE stadion_id = ?`,
    [stadion_id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ data: result });
    }
  );
};

const getReviewById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM review WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result[0] });
  });
};

const createReview = (req, res) => {
  const { stadion_id, user_id, rating, comment } = req.body;

  db.query(
    `INSERT INTO review (stadion_id, user_id, rating, comment) VALUES (?,?,?,?)`,
    [stadion_id, user_id, rating, comment],
    (err, result) => {
      if (err) {
        console.log("Error creating review:", err);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      res.status(201).send({
        message: "Review muvaffaqiyatli yaratildi",
        reviewId: result.insertId,
      });
    }
  );
};

const updateReviewById = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updateValue = queryGenerate(data);
  const values = Object.values(data);

  db.query(
    `UPDATE review SET ${updateValue} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({ message: "Review yangilandi" });
    }
  );
};

const removeReviewById = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM review WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ message: "Review o'chirildi" });
  });
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReviewById,
  removeReviewById,
};
