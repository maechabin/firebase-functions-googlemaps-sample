import * as functions from 'firebase-functions';
import * as Cors from 'cors';
const cors = Cors();

const googleMapsClient = require('@google/maps').createClient({
  key: 'google maps key'
});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import * as admin from 'firebase-admin';
admin.initializeApp();

export const geocoding: functions.HttpsFunction = functions.https.onRequest(
  (request: functions.Request, response: functions.Response): void => {
    const address = (request.query && request.query.address) || '東京都';

    googleMapsClient.geocode({
      address
    }, function(err, res) {
      if (!err) {
        cors(request, response, () => {
          response.status(200).send({ results: res.json.results });
        });
      }
    });
  },
);

export const directions: functions.HttpsFunction = functions.https.onRequest(
  (request: functions.Request, response: functions.Response): void => {
    const origin = (request.query && request.query.origin) || '東京都中央区';
    const destination = (request.query && request.query.destination) || '東京都渋谷区';

    googleMapsClient.directions({
      origin,
      destination,
    }, function(err, res) {
      if (!err) {
        cors(request, response, () => {
          response.status(200).send({ results: res.json });
        });
      }
    });
  },
);