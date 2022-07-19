import dotenv from 'dotenv';

dotenv.config({
  path: `${__dirname}/../.env`,
});

export { Api } from './api';
export * from './store';
