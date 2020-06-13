import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = (state) => ({
  assets: state.assets,
});

export default connect(
  mapStateToProps,
)(Component);
