const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../controllers/payment.controller");

const router = require("express").Router();

router.post("/create", createPayment);
router.get("/all", getAllPayments);
router.get("/:id", getPaymentById);
router.patch("/:id", updatePaymentById);
router.delete("/:id", deletePaymentById);

module.exports = router;
