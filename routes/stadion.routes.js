const {
  getStadionAll,
  getOneStadionById,
  createStadion,
  updateStadionById,
  removeStadionById,
  getStadionByPriceAndTime,
} = require("../controllers/stadion.controller");

const router = require("express").Router();

router.get("/all", getStadionAll);
router.post("/create", createStadion);
router.post("/pricetime", getStadionByPriceAndTime); 
router.get("/:id", getOneStadionById);
router.patch("/:id", updateStadionById);
router.delete("/:id", removeStadionById);

module.exports = router;
