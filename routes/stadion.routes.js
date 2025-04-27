const {
  getStadionAll,
  getOneStadionById,
  createStadion,
  updateStadionById,
  removeStadionById,
} = require("../controllers/stadion.controller");

const router = require("express").Router();

router.get("/all", getStadionAll);
router.get("/:id", getOneStadionById);
router.post("/create", createStadion);
router.patch("/:id", updateStadionById);
router.delete("/:id", removeStadionById);

module.exports = router;
