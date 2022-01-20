import dotenv from 'dotenv';
import { Logger } from "tslog";

export const LOGGER: Logger = new Logger();

dotenv.config({
  path: `${__dirname}/../.env`,
});

export * from './store';
