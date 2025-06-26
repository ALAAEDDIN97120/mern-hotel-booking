import User from "../models/User.js";

// CREATE
export const createUser = async (req, res, next) => {
	const newHotel = new User(req.body);
	try {
		const savedUser = await newHotel.save();
		res.status(200).json(savedUser);
	} catch (err) {
		next(err);
	}
};

// UPDATE
export const updateUser = async (req, res, next) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedUser);
	} catch (err) {
		next(err);
	}
};

// DELETE
export const deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json("User has been Deleted.");
	} catch (err) {
		next(err);
	}
};

// GET ONE
export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

// GET ALL
export const getAllUsers = async (req, res, next) => {
	try {
		const user = await User.find();
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};
