import type { HttpError } from "../types/HttpError.js";

export class HttpException extends Error {
	status: number;
	message: string;
	constructor({ status, message }: HttpError) {
		super(message);
		this.status = status;
		this.message = message;
	}
}

export class BadRequestException extends HttpException {
	constructor(message: string) {
		super({ status: 400, message });
	}
}

export class UnauthorizedException extends HttpException {
	constructor(message: string) {
		super({ status: 401, message });
	}
}

export class ForbiddenException extends HttpException {
	constructor(message: string) {
		super({ status: 403, message });
	}
}

export class NotFoundException extends HttpException {
	constructor(message: string) {
		super({ status: 404, message });
	}
}
