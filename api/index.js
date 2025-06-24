import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
app.use(express.json());
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
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.listen(8000, () => {
	connect();
	console.log("connected to BackEnd");
});
