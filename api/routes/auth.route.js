import express from "express"
import { google, signin, Signup } from "../controllers/auth.controller.js";

const router=express.Router();

router.post("/signup",Signup)
router.post("/signin",signin)
router.post("/google",google)

export default router
