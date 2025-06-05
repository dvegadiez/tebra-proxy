import { CorsOptions } from 'cors';
import { ALLOWED_ORIGIN } from '../config';

export const corsOptions: CorsOptions = {
  origin: '*',
  methods: ['GET','POST'],
  allowedHeaders: ['Content-Type','Authorization']
};
