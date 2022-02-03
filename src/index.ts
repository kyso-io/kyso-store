import dotenv from 'dotenv';
import { Logger } from "tslog";

export const LOGGER: Logger = new Logger({
  minLevel: process.env.TSLOG_MIN_LEVEL ? process.env.TSLOG_MIN_LEVEL as any : "info"
});

dotenv.config({
  path: `${__dirname}/../.env`,
});

console.log(__dirname)

export * from './store';
