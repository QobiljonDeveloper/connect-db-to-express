const {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserById,
  getUsersByRole,
  getUsersByDatas,
  findOwnerStadiums,
  findUsersRewievedStadion,
  callProcedures,
} = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/create", createUser);
router.get("/all", getAllUsers);
router.get("/any", getUsersByDatas);
router.get("/role", getUsersByRole);
router.get("/ownerstadion", findOwnerStadiums);
router.get("/proc", callProcedures);
router.post("/rewievedstadion", findUsersRewievedStadion);
router.get("/role", getUsersByRole);
router.get("/:id", getUserById);
router.delete("/:id", removeUserById);
router.patch("/:id", updateUserById);

module.exports = router;
