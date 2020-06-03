import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function PrivateRoute({
  children,
  isAuthenticated,
  isFetching,
}) {
  const classes = useStyles();

  return (
    <Route
      render={() => {
        if (isFetching) {
          return (
            <Backdrop className={classes.backdrop} open>
              <CircularProgress color="inherit" />
            </Backdrop>
          );
        }
        if (!isAuthenticated) {
          return (
            <p>Unauthenticated</p>
          );
        }
        return children;
      }}
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default PrivateRoute;
