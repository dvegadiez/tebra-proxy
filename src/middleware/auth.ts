import { Request, Response, NextFunction } from 'express';
import basicAuth from 'basic-auth';
import { BASIC_AUTH_USER, BASIC_AUTH_PASS } from '../config';

export function auth(req: Request, res: Response, next: NextFunction) {
  const creds = basicAuth(req);
  if (!creds || creds.name !== BASIC_AUTH_USER || creds.pass !== BASIC_AUTH_PASS) {
    res.set('WWW-Authenticate', 'Basic realm="Protected Area"');
    res.status(401).send('Unauthorized');
  }
  next();
}
