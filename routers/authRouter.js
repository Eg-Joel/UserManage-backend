const { userSignup, userLogin, userLogout } = require("../controllers/authController");

const router = require("express").Router()


router.post("/signup",userSignup)

router.post("/login",userLogin)

router.get("/logout",userLogout)



module.exports = router;