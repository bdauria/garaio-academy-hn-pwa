import * as functions from 'firebase-functions';
import { app } from './server';

module.exports.ssr = functions.https.onRequest(app);
