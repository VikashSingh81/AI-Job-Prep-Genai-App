const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router();
// import controller (different name!)

// routes
authRouter.post("/register", authController.registerUserController);
authRouter.post("/login", authController.loginUserController);
authRouter.get("/logout",authController.logoutUserController)

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)


module.exports = authRouter;  