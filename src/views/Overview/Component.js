import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getFundQuote } from '../../services';

async function calculateTotalValue(assets) {
  const assetValues = await Promise.all(assets.map(({ amount, symbol }) => getFundQuote(symbol)
    .then(({ 'Global Quote': { '05. price': price } }) => parseFloat(amount) * parseFloat(price))));
  return assetValues.reduce((acc, value) => acc + value, 0);
}

export default function Overview({
  assets,
}) {
  const [totalValue, setTotalValue] = useState(null);

  useEffect(() => {
    calculateTotalValue(assets).then((val) => {
      setTotalValue(val);
    });
  });

  return (
    <div>
      <h2>
        Overview
      </h2>
      <p>
        Total value:
        {' '}
        {totalValue}
      </p>
    </div>
  );
}

Overview.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      region: PropTypes.string,
    }),
  ).isRequired,
};
