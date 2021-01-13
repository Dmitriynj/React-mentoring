import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    color: 'black',
    marginRight: 6,
    marginBottom: 2,
    fontSize: 14,
  },
  select: {
    color: 'white',
    width: 60,
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
}));

const Sorting = () => {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
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
        value={age}
        onChange={handleChange}
      >
        <MenuItem value={10} classes={{ root: classes.menuItem }}>
          RELEASE DATE
        </MenuItem>
        <MenuItem value={20} classes={{ root: classes.menuItem }}>
          PRICE
        </MenuItem>
        <MenuItem value={30} classes={{ root: classes.menuItem }}>
          GENRE
        </MenuItem>
      </Select>
    </div>
  );
};

export { Sorting };
