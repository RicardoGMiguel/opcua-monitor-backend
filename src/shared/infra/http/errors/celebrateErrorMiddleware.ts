import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';

export function celebrateErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void | Response {
  if (isCelebrateError(err)) {
    const xxx = {};
    err.details.forEach(details => Object.assign(xxx, { message: details.details.map(iten => iten.message)[0] }));

    return res.status(400).send(xxx);
  }

  return next(err);
}
