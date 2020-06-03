const functions = require('firebase-functions');
const https = require('https');

function makeRequest(address, queryParams) {
  const url = new URL(address);
  const params = new URLSearchParams(queryParams);
  url.search = params;

  const request = new Promise((resolve, reject) => {
    https.get(url, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });

  return request;
}

exports.search = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET');

  makeRequest('https://www.alphavantage.co/query', {
    function: 'SYMBOL_SEARCH',
    keywords: request.query.term,
    apikey: functions.config().alpha_vantage.token,
  }).then((result) => {
    response.send(result);
  }).catch((err) => {
    response.send(err);
  });
});

exports.getPrice = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET');

  makeRequest('https://www.alphavantage.co/query', {
    function: 'GLOBAL_QUOTE',
    symbol: request.query.symbol,
    apikey: functions.config().alpha_vantage.token,
  }).then((result) => {
    response.send(result);
  }).catch((err) => {
    response.send(err);
  });
});
