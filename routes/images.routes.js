const express = require("express");
const {
  createImage,
  getAllImages,
  getImageById,
  removeImageById,
  updateImageById,
} = require("../controllers/images.controller");

const router = express.Router();

router.post("/create", createImage);
router.get("/stadion/:stadion_id", getAllImages);
router.get("/:id", getImageById);
router.delete("/:id", removeImageById);
router.patch("/:id", updateImageById);

module.exports = router;
