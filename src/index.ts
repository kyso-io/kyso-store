import dotenv from 'dotenv';
import { Logger } from "tslog";

export const LOGGER: Logger = new Logger({
  minLevel: process.env.TSLOG_MIN_LEVEL ? process.env.TSLOG_MIN_LEVEL as any : "fatal"
});

dotenv.config({
  path: `${__dirname}/../.env`,
});

export * from './store';
