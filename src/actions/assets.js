import { nanoid } from 'nanoid';
import * as Sentry from '@sentry/browser';

import { actions } from '../constants';
import { db } from '../firebase';

const { ADD_ASSET, REMOVE_ASSET } = actions;

const addAsset = (assetDetails) => ({
  type: ADD_ASSET,
  assetDetails,
});

const removeAsset = (assetDetails) => ({
  type: REMOVE_ASSET,
  assetDetails,
});

export const subscribeToPortfolioChanges = (userId) => (dispatch) => {
  db.collection('users').doc(userId).collection('assets')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          dispatch(addAsset({
            id: change.doc.id,
            ...change.doc.data(),
          }));
        }
        if (change.type === 'modified') {
          // TODO: Handle this
        }
        if (change.type === 'removed') {
          dispatch(removeAsset({
            id: change.doc.id,
          }));
        }
      });
    });
};

export const initiateRemoveAsset = (userId, assetId) => () => db.collection('users').doc(userId)
  .collection('assets').doc(assetId)
  .delete()
  .catch((error) => Sentry.captureException(error));

export const initiateAddAsset = (userId, assetDetails) => () => db.collection('users').doc(userId)
  .collection('assets').doc(nanoid())
  .set(assetDetails)
  .catch((error) => Sentry.captureException(error));
