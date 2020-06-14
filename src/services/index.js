import * as Sentry from '@sentry/browser';
import { ReusableRequest } from '../util';

const searchRequest = new ReusableRequest();

export const searchFunds = (term) => searchRequest.makeRequest(
  'https://us-central1-investment-portfolio-manager.cloudfunctions.net/searchFunds',
  { term },
).then(({ bestMatches = [] }) => bestMatches.map((match) => ({
  symbol: match['1. symbol'],
  name: match['2. name'],
  type: match['3. type'],
  region: match['4. region'],
  currency: match['8. currency'],
})));

export const getFundQuote = async (symbol) => {
  const url = new URL('https://us-central1-investment-portfolio-manager.cloudfunctions.net/getFundQuote');
  const params = new URLSearchParams({ symbol });
  url.search = params;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
};
