const { Router } = require("express");
const { login } = require("../controller/user.controller");

const userRouter = Router();

userRouter.post("/login", login);
// userRouter.post("/login", (req , res) =>  login(req , res));

module.exports = userRouter;
