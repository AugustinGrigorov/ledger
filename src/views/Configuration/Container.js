import { connect } from 'react-redux';
import { initiateAddAsset, initiateRemoveAsset } from '../../actions';

import Component from './Component';

const mapStateToProps = (state) => ({
  userId: state.user.details.uid,
  assets: state.assets,
});

const mapDispatchToProps = (dispatch) => ({
  initiateAddAsset: (userId, assetDetails) => dispatch(
    initiateAddAsset(userId, assetDetails),
  ),
  initiateRemoveAsset: (userId, assetDetails) => dispatch(
    initiateRemoveAsset(userId, assetDetails),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
