import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// CREATE
export const createRoom = async (req, res, next) => {
	const hotelId = req.params.hotelid;
	const newRoom = new Room(req.body);
	try {
		const savedRoom = await newRoom.save();
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$push: { rooms: savedRoom._id },
			});
		} catch (err) {
			next(err);
		}
		res.status(200).json(savedRoom);
	} catch (err) {
		next(err);
	}
};

// UPDATE
export const updateRoom = async (req, res, next) => {
	try {
		const updatedRoom = await Room.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedRoom);
	} catch (err) {
		next(err);
	}
};

// UPDATE Availability
export const updateRoomAvailability = async (req, res, next) => {
	try {
		await Room.updateOne(
			{ "roomNumbers._id": req.params.id },
			{
				$push: {
					"roomNumbers.$.unavailableDates": req.body.dates,
				},
			}
		);
		res.status(200).json("Room status has been updated.");
	} catch (err) {
		next(err);
	}
};

// DELETE
export const deleteRoom = async (req, res, next) => {
	const hotelId = req.params.hotelid;
	try {
		await Room.findByIdAndDelete(req.params.id);
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$pull: { rooms: req.params.id },
			});
		} catch (err) {
			next(err);
		}
		res.status(200).json("Room has been Deleted.");
	} catch (err) {
		next(err);
	}
};

// GET ONE
export const getRoom = async (req, res, next) => {
	try {
		const room = await Room.findById(req.params.id);
		res.status(200).json(room);
	} catch (err) {
		next(err);
	}
};

// GET ALL
export const getAllRooms = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.status(200).json(rooms);
	} catch (err) {
		next(err);
	}
};
