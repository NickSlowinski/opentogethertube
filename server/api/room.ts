import _ from "lodash";
import { getLogger } from '../../logger.js';
import roommanager from "../roommanager";
import { Visibility } from "../../common/models/types";
import { rateLimiter, handleRateLimit, setRateLimitHeaders } from "../rate-limit.js";
import { BadApiArgumentException, OttException } from "../exceptions";
import express, { RequestHandler, ErrorRequestHandler } from "express";

const router = express.Router();
const log = getLogger("api/room");

// These strings are not allowed to be used as room names.
const RESERVED_ROOM_NAMES = [
	"list",
	"create",
	"generate",
];

const VALID_ROOM_VISIBILITY = [
	Visibility.Public,
	Visibility.Unlisted,
	Visibility.Private,
];

router.get("/list", (req, res) => {
	const isAuthorized = req.get("apikey") === process.env.OPENTOGETHERTUBE_API_KEY;
	if (req.get("apikey") && !isAuthorized) {
		log.warn(`Unauthorized request to room list endpoint: ip=${req.ip} forward-ip=${req.headers["x-forwarded-for"]} user-agent=${req.headers["user-agent"]}`);
		res.status(400).json({
			success: false,
			error: "apikey is invalid",
		});
		return;
	}
	let rooms = [];
	for (const room of roommanager.rooms) {
		if (room.visibility !== Visibility.Public && !isAuthorized) {
			continue;
		}
		const obj = {
			name: room.name,
			title: room.title,
			description: room.description,
			isTemporary: room.isTemporary,
			visibility: room.visibility,
			queueMode: room.queueMode,
			currentSource: room.currentSource,
			users: room.users.length,
		};
		// if (isAuthorized) {
		// 	obj.queueLength = room.queue.length;
		// 	obj.isPlaying = room.isPlaying;
		// 	obj.playbackPosition = room.playbackPosition;
		// 	obj.clients = room.clients.map(client => {
		// 		return {
		// 			username: client.username,
		// 			isLoggedIn: client.isLoggedIn,
		// 			ip: client.req_ip,
		// 			forward_ip: client.req_forward_ip,
		// 		};
		// 	});
		// }
		rooms.push(obj);
	}
	rooms = _.orderBy(rooms, ["users", "name"], ["desc", "asc"]);
	res.json(rooms);
});

const createRoom: RequestHandler = async (req, res) => {
	if (!req.body.name) {
		throw new BadApiArgumentException("name", "missing");
	}
	if (RESERVED_ROOM_NAMES.includes(req.body.name)) {
		throw new BadApiArgumentException("name", "not allowed (reserved)");
	}
	if (req.body.name.length < 3) {
		throw new BadApiArgumentException("name", "not allowed (too short, must be at least 3 characters)");
	}
	if (req.body.name.length > 32) {
		throw new BadApiArgumentException("name", "not allowed (too long, must be at most 32 characters)");
	}
	if (!(/^[A-za-z0-9_-]+$/).exec(req.body.name)) {
		throw new BadApiArgumentException("name", "not allowed (invalid characters)");
	}
	if (req.body.visibility && !VALID_ROOM_VISIBILITY.includes(req.body.visibility)) {
		throw new BadApiArgumentException("visibility", `must be one of ${VALID_ROOM_VISIBILITY}`);
	}
	let points = 50;
	if (!req.body.temporary) {
		req.body.temporary = false;
		points *= 4;
	}
	if (!req.body.visibility) {
		req.body.visibility = Visibility.Public;
	}
	try {
		const info = await rateLimiter.consume(req.ip, points);
		setRateLimitHeaders(res, info);
	}
	catch (e) {
		if (e instanceof Error) {
			throw e;
		}
		else {
			handleRateLimit(res, e);
			return;
		}
	}
	if (req.user) {
		await roommanager.CreateRoom({ ...req.body, owner: req.user });
	}
	else {
		await roommanager.CreateRoom(req.body);
	}
	log.info(`${req.body.temporary ? "Temporary" : "Permanent"} room created: name=${req.body.name} ip=${req.ip} user-agent=${req.headers["user-agent"]}`);
	res.json({
		success: true,
	});
};

const errorHandler: ErrorRequestHandler = (err: Error, req, res) => {
	if (err instanceof OttException) {
		log.debug(`OttException: path=${req.path} name=${err.name}`);
		if (err.name === "BadApiArgumentException") {
			const e = err as BadApiArgumentException;
			res.status(400).json({
				success: false,
				error: {
					name: "BadApiArgumentException",
					message: err.message,
					arg: e.arg,
					reason: e.reason,
				},
			});
		}
		else {
			res.status(400).json({
				success: false,
				error: {
					name: err.name,
					message: err.message,
				},
			});
		}
	}
	else {
		log.error(`Unhandled exception: path=${req.path} ${err.name} ${err.message} ${err.stack}`);
		res.status(500).json({
			success: false,
			error: {
				name: "Unknown",
				message: "An unknown error occured. Try again later.",
			},
		});
	}
};

router.post("/create", async (req, res, next) => {
	try {
		await createRoom(req, res, next);
	}
	catch (e) {
		errorHandler(e, req, res, next);
	}
});

export default router;
