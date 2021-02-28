import React, { useRef } from 'react';
import { SnackbarProvider } from 'notistack';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapError } from '../store/selectors';
import { dismissNotification } from '../store/actions';
import { NotificationsList } from './NotificationsList';

const NotificationsProviderStateless = ({ children, error, dismissError }) => {
  const notistackRef = useRef();

  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      maxSnack={3}
      ref={notistackRef}
      action={(key) => (
        <Button color="inherit" onClick={onClickDismiss(key)}>
          Dismiss
        </Button>
      )}
    >
      <NotificationsList error={error} onClose={dismissError}>
        {children}
      </NotificationsList>
    </SnackbarProvider>
  );
};
NotificationsProviderStateless.propTypes = {
  children: PropTypes.element.isRequired,
  error: PropTypes.object,
  dismissError: PropTypes.func.isRequired,
};

NotificationsProviderStateless.defaultProps = {
  error: {},
};

const mapStateToProps = (state) => ({
  error: mapError(state),
});

const mapDispatchToProps = (dispatch) => ({
  dismissError: () => dispatch(dismissNotification()),
});

const NotificationsProvider = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsProviderStateless);

export { NotificationsProvider };
