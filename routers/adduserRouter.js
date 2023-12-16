const { getUser, addUsers, searchUser, deleteUser, editUser } = require("../controllers/addUserContrller");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router()


router.post("/addUser", verifyToken, addUsers)

router.get("/getUser", verifyToken, getUser)

router.get("/searchUsers/:value", verifyToken,searchUser)

router.delete("/deleteUser/:userId", verifyToken,deleteUser)

router.put("/editUser/:userId", verifyToken,editUser)







module.exports = router;