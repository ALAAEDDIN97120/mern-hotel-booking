import express from "express";
import {
	createUser,
	updateUser,
	deleteUser,
	getUser,
	getAllUsers,
} from "../controllers/user.controller.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res) => {
// 	res.send("hello user, you are logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res) => {
// 	res.send("hello user, you are logged in and you can delete your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
// 	res.send("hello admin, you are logged in and you can delete all accounts");
// });

//CREATE
router.post("/", verifyUser, createUser);

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GETALL
router.get("/", verifyAdmin, getAllUsers);

export default router;
