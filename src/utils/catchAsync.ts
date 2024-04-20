import type { NextFunction, Request, Response } from "express";

export const catchAsync =
	// biome-ignore lint/suspicious/noExplicitAny: This is a utility function
		(fn: (...args: any[]) => any) =>
		(req: Request, res: Response, next: NextFunction): void => {
			Promise.resolve(fn(req, res, next)).catch(next);
		};
