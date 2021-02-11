import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormField } from '../FormField';

const GENRES = [
  'Drama',
  'Romance',
  'Animation',
  'Adventure',
  'Action',
  'Family',
  'Fantasy',
  'Comedy',
  'Science Fiction',
  'Documentary',
  'War',
  'Thriller',
];

const useStyles = makeStyles(() => ({
  genreItem: {
    '&.Mui-selected': {
      backgroundColor: '#f65261',
    },
    '&.Mui-selected:hover': {
      backgroundColor: '#f50057',
    },
  },
}));

const validationSchema = yup.object({
  title: yup.string('Enter title').required('Title is required'),
  release_date: yup.date('Enter release date').required('Release date is required'),
  poster_path: yup.string('Enter poster path').required('Poster path is required'),
  genres: yup.array().of(yup.mixed().oneOf(GENRES)).min(1, 'Add genre'),
  overview: yup.string('Enter overview').required('Overview is required'),
  runtime: yup.number('Enter runtime').required('Runtime is required'),
});

const ManageMovieForm = ({ onConfirm, initialMovie }) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: initialMovie,
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted', values);
      onConfirm(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField
        alias="title"
        type="text"
        label="Title"
        value={formik.values.title || ''}
        onChange={formik.handleChange}
        touched={formik.touched.title}
        errorMsg={formik.errors.title}
      />
      <FormField
        alias="release_date"
        type="date"
        label="Release date"
        value={formik.values.release_date || ''}
        onChange={formik.handleChange}
        touched={formik.touched.release_date}
        errorMsg={formik.errors.release_date}
      />
      <FormField
        alias="poster_path"
        type="text"
        label="Poster path"
        value={formik.values.poster_path || ''}
        onChange={formik.handleChange}
        touched={formik.touched.poster_path}
        errorMsg={formik.errors.poster_path}
      />
      <FormField
        alias="genres"
        type="genres"
        label="Genres"
        value={formik.values.genres || ''}
        onChange={formik.handleChange}
        touched={formik.touched.genres}
        errorMsg={formik.errors.genres}
        select
        SelectProps={{
          multiple: true,
          MenuProps: {
            PaperProps: {
              style: {
                backgroundColor: '#232323',
                color: 'white',
              },
            },
          },
        }}
      >
        {GENRES.map((option) => (
          <MenuItem key={option} value={option} className={classes.genreItem}>
            {option}
          </MenuItem>
        ))}
      </FormField>
      <FormField
        alias="runtime"
        type="number"
        label="Runtime"
        value={formik.values.runtime}
        onChange={formik.handleChange}
        touched={formik.touched.runtime}
        errorMsg={formik.errors.runtime}
      />
      <FormField
        alias="overview"
        type="text"
        label="Overview"
        value={formik.values.overview || ''}
        onChange={formik.handleChange}
        touched={formik.touched.overview}
        errorMsg={formik.errors.overview}
      />
      <Button color="secondary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
};

ManageMovieForm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  initialMovie: PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    genres: PropTypes.array,
    runtime: PropTypes.number,
    overview: PropTypes.string,
  }),
};
ManageMovieForm.defaultProps = {
  initialMovie: {
    title: '',
    release_date: '',
    poster_path: '',
    genres: [],
    runtime: 0,
    overview: '',
  },
};

export { ManageMovieForm };
