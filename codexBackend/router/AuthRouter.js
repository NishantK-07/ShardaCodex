const express=require("express")
const {signuphandler,loginhandler,protecdrouteMiddleware,profilehandler,logouthandler,forgethandler,resethandler}=require("../controller/AuthController")


const AuthRouter=express.Router();

AuthRouter.patch("/forgetpassword",forgethandler)
AuthRouter.patch("/resetpassword/:userId",resethandler)


AuthRouter.post("/login",loginhandler);
AuthRouter.post("/signup",signuphandler);
AuthRouter.use(protecdrouteMiddleware)

AuthRouter.get("/profile",profilehandler)
AuthRouter.get("/logout",logouthandler)

module.exports= AuthRouter