const db = require("../config/db");
const queryGenerate = require("../utils/query.generate");

const getAllBookings = (req, res) => {
  db.query(`SELECT * FROM booking`, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result });
  });
};

const getBookingById = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM booking WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    res.status(200).send({ data: result[0] });
  });
};

const createBooking = (req, res) => {
  const {
    stadion_id,
    user_id,
    booking_date,
    start_time,
    end_time,
    total_price,
    status,
  } = req.body;

  db.query(
    `INSERT INTO booking (stadion_id, user_id, booking_date, start_time, end_time, total_price, status) VALUES (?,?,?,?,?,?,?)`,
    [
      stadion_id,
      user_id,
      booking_date,
      start_time,
      end_time,
      total_price,
      status,
    ],
    (err, result) => {
      if (err) {
        console.log(`Error creating booking:`, err);
        return res.status(500).send({ message: "Serverda xatolik!" });
      }
      res.status(201).send({
        message: "Booking muvaffaqiyatli yaratildi",
        bookingId: result.insertId,
      });
    }
  );
};

const updateBookingById = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updateValue = queryGenerate(data);
  const values = Object.values(data);

  db.query(
    `UPDATE booking SET ${updateValue} WHERE id = ?`,
    [...values, id],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }

      res.status(200).send({ message: "Booking yangilandi" });
    }
  );
};

const removeBookingById = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM booking WHERE id = ?`, [id], (err, result) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }

    res.status(200).send({ message: "Booking o'chirildi" });
  });
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingById,
  removeBookingById,
};
