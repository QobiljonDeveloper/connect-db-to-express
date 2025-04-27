const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const createPayment = (req, res) => {
  const { booking_id, amount, payment_time, payment_method } = req.body;

  db.query(
    `INSERT INTO payment (booking_id, amount, payment_time, payment_method) VALUES (?,?,?,?)`,
    [booking_id, amount, payment_time, payment_method],
    (error, result) => {
      if (error) {
        console.log(`Error creating payment:`, error);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      res.status(201).send({
        message: "To'lov muvaffaqiyatli yaratildi",
        paymentId: result.insertId,
      });
    }
  );
};

const getAllPayments = (req, res) => {
  db.query(`SELECT * FROM payment`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getPaymentById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM payment WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    res.status(200).send({ data: result[0] });
  });
};

const updatePaymentById = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updateValue = queryGenerate(data);
  const values = Object.values(data);

  db.query(
    `UPDATE payment SET ${updateValue} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }

      res.status(200).send({ message: "To'lov yangilandi" });
    }
  );
};


const deletePaymentById = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM payment WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ message: "To'lov o'chirildi" });
  });
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
