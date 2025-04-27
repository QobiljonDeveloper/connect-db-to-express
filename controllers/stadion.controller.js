const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getStadionAll = (req, res) => {
  db.query(`SELECT * FROM stadium`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getOneStadionById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM stadium WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result[0] });
  });
};

const createStadion = (req, res) => {
  const { name, location, address, description, price, owner_id } = req.body;
  db.query(
    `INSERT INTO stadium (name, location, address, description, price, owner_id) VALUES (?,?,?,?,?,?)`,
    [name, location, address, description, price, owner_id],
    (error, result) => {
      if (error) {
        console.log(`Error adding new stadion`, error);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      res.status(201).send({
        message: "Yangi stadion qo'shildi",
        stadionId: result.insertId,
      });
    }
  );
};

const updateStadionById = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updateValue = queryGenerate(data);
  const values = Object.values(data);

  db.query(
    `UPDATE stadium SET ${updateValue} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Stadion topilmadi" });
      }
      res.status(200).send({ message: "Stadion yangilandi" });
    }
  );
};

const removeStadionById = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM stadium WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Stadion topilmadi" });
    }
    res.status(200).send({ message: "Stadion o'chirildi" });
  });
};

module.exports = {
  getStadionAll,
  getOneStadionById,
  createStadion,
  updateStadionById,
  removeStadionById,
};
