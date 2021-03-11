import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useQuery } from '../hooks/useQuery';

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

const MoviePagination = ({ totalAmount, limit, offset }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(offset / limit + 1);
  const totalPagesAmount = Math.ceil(totalAmount / limit);
  const history = useHistory();
  const { query } = useQuery();

  useEffect(() => {
    setPage(offset / limit + 1);
  }, [offset, limit]);

  const handleChange = (event, value) => {
    document.querySelector('#manage-panel').scrollIntoView({
      behavior: 'smooth',
    });
    query.set('offset', limit * (value - 1));
    history.push({ pathname: '/movies', search: query.toString() });
    setPage(value);
  };

  return (
    <div className={classes.root}>
      {totalAmount > 0 && (
        <Pagination
          count={totalPagesAmount}
          page={page}
          onChange={handleChange}
          className={classes.paginationRoot}
        />
      )}
    </div>
  );
};

MoviePagination.propTypes = {
  totalAmount: PropTypes.number,
  limit: PropTypes.number,
  offset: PropTypes.number,
};
MoviePagination.defaultProps = {
  totalAmount: 0,
  limit: 10,
  offset: 0,
};

export { MoviePagination };
