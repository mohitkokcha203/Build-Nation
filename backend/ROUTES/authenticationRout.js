const router = require("express").Router();

const authcont = require("../CONTROLLERS/authenticationCont");

router.post("/signup", authcont.signupcontroller);
router.post("/login", authcont.logincontroller);
router.post("/admin", authcont.adminLoginController);

router.get("/refresh", authcont.refreshTokenController);
router.post("/logout", authcont.logoutController);

module.exports = router;
