import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
//ROUTERS
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config();

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
		console.log("Conected to mongoDB.");
	} catch (error) {
		throw error;
	}
};

mongoose.connection.on("disconnected", () => {
	console.log("mongoDB disconnected");
});

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "something went wrong!";
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
});

app.listen(8800, () => {
	connect();
	console.log("Server is running on port 8800");
});
