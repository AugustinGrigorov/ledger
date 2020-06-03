import { ReusableRequest } from '../util';

const searchRequest = new ReusableRequest();

export const search = (term) => searchRequest.makeRequest(
  'https://us-central1-investment-portfolio-manager.cloudfunctions.net/search',
  { term },
).then(({ bestMatches = [] }) => bestMatches.map((match) => ({
  symbol: match['1. symbol'],
  name: match['2. name'],
  type: match['3. type'],
  region: match['4. region'],
  currency: match['8. currency'],
})));

export const getPrice = (symbol) => {
  console.log(symbol);
  // TODO: Implement this
};
