import { connect } from 'react-redux';

import Component from './Component';

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  isFetching: state.user.isFetching,
});

export default connect(
  mapStateToProps,
)(Component);
