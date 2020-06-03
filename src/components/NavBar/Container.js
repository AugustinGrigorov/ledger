import { connect } from 'react-redux';
import { initiateLogin, initiateLogout } from '../../actions';

import Component from './Component';

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(initiateLogin()),
  logout: () => dispatch(initiateLogout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
