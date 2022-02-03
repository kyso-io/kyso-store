import dotenv from 'dotenv';
import { Logger } from "tslog";
export const KYSO_CONFIG = require('process.env.NEXT_PUBLIC_CONFIG_FILE_PATH');

console.log(`Reading configuration from: ${process.env.NEXT_PUBLIC_CONFIG_FILE_PATH}`)
console.log(KYSO_CONFIG)

export const LOGGER: Logger = new Logger({
  minLevel: KYSO_CONFIG?.kyso_store?.ts_log_level ? KYSO_CONFIG.kyso_store.ts_log_level as any : "silly"
});

dotenv.config({
  path: `${__dirname}/../.env`,
});


export * from './store';
