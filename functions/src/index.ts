import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createClient, GoogleMapsClient } from '@google/maps';
import * as Cors from 'cors';
import { GOOGLE_MAPS_KEY } from '../constants';

const cors = Cors();

const googleMapsClient: GoogleMapsClient = createClient({
  key: GOOGLE_MAPS_KEY,
});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

/**
 * Geocoding
 */
export const geocoding: functions.HttpsFunction = functions.https.onRequest(
  (request: functions.Request, response: functions.Response): void => {
    const address = (request.query && request.query.address) || '東京都';

    googleMapsClient.geocode(
      {
        address,
      },
      (err, res) => {
        if (!err) {
          cors(
            request,
            response,
            (): void => {
              response.status(200).send({ results: res.json.results });
            },
          );
        }
      },
    );
  },
);

/**
 * Directions
 */
export const directions: functions.HttpsFunction = functions.https.onRequest(
  (request: functions.Request, response: functions.Response): void => {
    const origin = (request.query && request.query.origin) || '東京都中央区';
    const destination =
      (request.query && request.query.destination) || '東京都渋谷区';

    googleMapsClient.directions(
      {
        origin,
        destination,
      },
      (err, res) => {
        if (!err) {
          cors(request, response, () => {
            response.status(200).send({ results: res.json });
          });
        }
      },
    );
  },
);

/**
 * DistanceMatrix
 */
export const distanceMatrix: functions.HttpsFunction = functions.https.onRequest(
  (request: functions.Request, response: functions.Response): void => {
    const origins = (request.query && request.query.origin) || '東京都中央区';
    const destinations =
      (request.query && request.query.destination) || '東京都渋谷区';

    googleMapsClient.distanceMatrix(
      {
        units: 'imperial',
        origins,
        destinations,
      },
      (err, res) => {
        if (!err) {
          cors(request, response, () => {
            response.status(200).send({ results: res.json });
          });
/**
 * Elevation
 */
export const elevation: functions.HttpsFunction = functions.https.onRequest(
  (request: functions.Request, response: functions.Response): void => {
    const locations = (request.query && request.query.origin) || [111, 111];

    googleMapsClient.elevation(
      {
        locations,
      },
      (err, res) => {
        if (!err) {
          cors(
            request,
            response,
            (): void => {
              response.status(200).send({ results: res.json });
            },
          );
        }
      },
    );
  },
);
