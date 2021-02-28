import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

const NotificationsList = ({ children, error, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!isEmpty(error)) {
      const { status, message, id } = error;
      enqueueSnackbar(`${status} error. ${message}`, {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
        key: id,
        onClose,
      });
    }
  }, [error]);

  return children;
};

NotificationsList.propTypes = {
  children: PropTypes.element.isRequired,
  error: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
NotificationsList.defaultProps = {
  error: [],
};

export { NotificationsList };
