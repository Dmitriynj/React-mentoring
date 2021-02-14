import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useQuery } from '../hooks/useQuery';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    color: 'white',
    marginRight: 6,
    marginBottom: 2,
    fontSize: 14,
  },
  select: {
    color: 'white',
    width: 80,
    fontSize: 14,
  },
  underline: {
    '&::after': {
      borderBottom: '2px solid #f65261',
    },
  },
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  menuItem: {
    fontSize: 14,
  },
  sortDirectionButton: {
    color: '#f65261',
  },
}));

const Sorting = () => {
  const classes = useStyles();
  const [sortBy, setSortBy] = React.useState('');
  const [isAscOrder, setIsAscOrder] = React.useState(true);
  const sortDirection = isAscOrder ? 'asc' : 'desc';
  const history = useHistory();
  const { query } = useQuery();

  const onSort = () => {
    history.push({ pathname: '/movies', search: query.toString() });
  };

  const handleChange = (event) => {
    const newSortBy = event.target.value || 'release_date';
    query.set('sortBy', newSortBy);
    onSort();
    setSortBy(newSortBy);
  };

  const changeSortOrder = () => {
    const newIsAscOrder = !isAscOrder;
    const newSortDirection = newIsAscOrder ? 'asc' : 'desc';
    query.set('sortOrder', newSortDirection);
    onSort();
    setIsAscOrder(newIsAscOrder);
  };

  return (
    <div className={classes.root}>
      <InputLabel id="demo-simple-select-label" className={classes.inputLabel}>
        SORT BY
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        classes={{ root: classes.select }}
        MenuProps={{
          PaperProps: {
            style: {
              backgroundColor: '#232323',
              color: 'white',
            },
          },
        }}
        input={<Input classes={{ underline: classes.underline }} />}
        id="demo-simple-select"
        value={sortBy}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="">
          <em>RELEASE DATE</em>
        </MenuItem>
        <MenuItem value="vote_average" classes={{ root: classes.menuItem }}>
          AVG VOTE
        </MenuItem>
        <MenuItem value="budget" classes={{ root: classes.menuItem }}>
          BUDGET
        </MenuItem>
      </Select>
      <TableSortLabel
        className={classes.sortDirectionButton}
        active
        direction={sortDirection}
        onClick={changeSortOrder}
      />
    </div>
  );
};

export { Sorting };
