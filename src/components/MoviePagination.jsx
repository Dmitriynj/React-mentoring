import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: 20,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  paginationRoot: {
    '& .MuiPaginationItem-root': {
      color: 'white',
    },
  },
}));

const MoviePagination = ({ totalAmount, limit, offset, onChangePage }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(offset / limit + 1);
  const totalPagesAmount = Math.ceil(totalAmount / limit);

  const handleChange = (event, value) => {
    document.querySelector('#manage-panel').scrollIntoView({
      behavior: 'smooth',
    });
    onChangePage({ offset: limit * (value - 1) });
    setPage(value);
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={totalPagesAmount}
        page={page}
        onChange={handleChange}
        className={classes.paginationRoot}
      />
    </div>
  );
};

MoviePagination.propTypes = {
  totalAmount: PropTypes.number,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
MoviePagination.defaultProps = {
  totalAmount: 0,
};

export { MoviePagination };
