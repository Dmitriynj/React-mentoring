import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';
import { changeQueryOptions } from '../store/actions';
import { getTotalMoviesAmount, getQueryOptions } from '../store/selectors';

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

const MoviePaginationStateless = ({ totalAmount, queryOptions, updateQueryOptions }) => {
  const { limit, offset } = queryOptions;
  const classes = useStyles();
  const [page, setPage] = React.useState(offset / limit + 1);
  const totalPagesAmount = Math.ceil(totalAmount / limit);

  const handleChange = (event, value) => {
    document.querySelector('#manage-panel').scrollIntoView({
      behavior: 'smooth',
    });
    updateQueryOptions({
      ...queryOptions,
      offset: limit * (value - 1),
    });
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

MoviePaginationStateless.propTypes = {
  totalAmount: PropTypes.number,
  queryOptions: PropTypes.object.isRequired,
  updateQueryOptions: PropTypes.func.isRequired,
};
MoviePaginationStateless.defaultProps = {
  totalAmount: 0,
};

const mapStateToProps = (state) => ({
  totalAmount: getTotalMoviesAmount(state),
  queryOptions: getQueryOptions(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateQueryOptions: (data) => dispatch(changeQueryOptions(data)),
});

const MoviePagination = connect(mapStateToProps, mapDispatchToProps)(MoviePaginationStateless);

export { MoviePagination };
