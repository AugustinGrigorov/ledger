import React from 'react';
import PropTypes from 'prop-types';

import AddAsset from './AddAsset';
import AssetTable from './AssetTable';

export default function Configuration({
  userId,
  assets,
  initiateAddAsset,
  initiateRemoveAsset,
}) {
  return (
    <>
      <AddAsset
        userId={userId}
        initiateAddAsset={initiateAddAsset}
      />
      <AssetTable
        userId={userId}
        assets={assets}
        initiateRemoveAsset={initiateRemoveAsset}
      />
    </>
  );
}

Configuration.propTypes = {
  userId: PropTypes.string.isRequired,
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
  initiateAddAsset: PropTypes.func.isRequired,
  initiateRemoveAsset: PropTypes.func.isRequired,
};
