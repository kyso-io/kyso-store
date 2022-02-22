import dotenv from 'dotenv';

export const LOGGER_DEBUG = require('debug')('debug')
export const LOGGER_INFO = require('debug')('info')
export const LOGGER_WARN = require('debug')('warn')
export const LOGGER_ERROR = require('debug')('error')

dotenv.config({
  path: `${__dirname}/../.env`,
});

export * from './store';
