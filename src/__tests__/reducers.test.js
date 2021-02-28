import { moviesReducer } from '../store/reducers';

describe('The movies reducer', () => {
  const errorResponse = {
    data: 'Not found',
    status: 404,
  };
  const afterFailureCommonState = {
    error: {
      message: errorResponse.data,
      status: errorResponse.status,
      id: `error-1530518207007`,
    },
    loading: false,
  };
  const failedActionTests = [
    [
      {
        type: 'GET_MOVIES_FAILURE',
        payload: { error: { response: errorResponse } },
      },
      afterFailureCommonState,
    ],
    [
      {
        type: 'GET_MOVIE_BY_ID_FAILURE',
        payload: { error: { response: errorResponse } },
      },
      afterFailureCommonState,
    ],
    [
      {
        type: 'UPDATE_MOVIE_FAILURE',
        payload: { error: { request: { some: 'mockPropVal' } } },
      },
      {
        error: {
          message: 'Something went wrong, please check your connection',
          id: `error-1530518207007`,
        },
        loading: false,
      },
    ],
    [
      {
        type: 'REMOVE_MOVIE_FAILURE',
        payload: { error: {} },
      },
      {
        error: { message: 'Something went wrong, please contact admin', id: `error-1530518207007` },
        loading: false,
      },
    ],
    [
      {
        type: 'CREATE_MOVIE_FAILURE',
        payload: { error: { response: errorResponse } },
      },
      afterFailureCommonState,
    ],
  ];

  test.each([
    'GET_MOVIES_IN_PROGRESS',
    'GET_MOVIE_BY_ID_IN_PROGRESS',
    'UPDATE_MOVIE_IN_PROGRESS',
    'REMOVE_MOVIE_IN_PROGRESS',
    'CREATE_MOVIE_IN_PROGRESS',
  ])('should set loading to true when action %s is received', (actionType) => {
    const originalState = {
      loading: false,
    };
    const actual = moviesReducer(originalState, { type: actionType });

    expect(actual).toEqual({
      loading: true,
    });
  });

  test.each(failedActionTests)(
    'should change error when action %s is received',
    (fakeAction, expected) => {
      const originalState = {};
      global.Date.now = jest.fn(() => 1530518207007);

      const actual = moviesReducer(originalState, fakeAction);

      expect(actual).toEqual(expected);
    }
  );

  test('should fill moviesData when action GET_MOVIES_SUCCESS is received', () => {
    const fakeAction = {
      type: 'GET_MOVIES_SUCCESS',
      payload: {
        moviesData: { data: [{ id: 1 }, { id: 2 }], totalAmount: 123, offset: 0, limit: 2 },
      },
    };
    const originalState = {};

    const actual = moviesReducer(originalState, fakeAction);

    expect(actual).toEqual({
      moviesData: fakeAction.payload.moviesData,
      loading: false,
    });
  });

  test('should fill movieDetails when action GET_MOVIE_BY_ID_SUCCESS is received', () => {
    const fakeAction = {
      type: 'GET_MOVIE_BY_ID_SUCCESS',
      payload: {
        movie: { id: 1 },
      },
    };
    const originalState = {};

    const actual = moviesReducer(originalState, fakeAction);

    expect(actual).toEqual({
      movieDetails: fakeAction.payload.movie,
      loading: false,
    });
  });

  test('should update moviesData when action UPDATE_MOVIE_SUCCESS is received', () => {
    const fakeAction = {
      type: 'UPDATE_MOVIE_SUCCESS',
      payload: {
        movie: { id: 1, title: 'changed' },
      },
    };
    const originalState = {
      moviesData: {
        data: [
          { id: 1, title: 'some' },
          { id: 2, title: 'another' },
        ],
        totalAmount: 123,
        offset: 0,
        limit: 2,
      },
    };

    const actual = moviesReducer(originalState, fakeAction);

    expect(actual).toEqual({
      moviesData: {
        data: [
          { id: 1, title: 'changed' },
          { id: 2, title: 'another' },
        ],
        totalAmount: 123,
        offset: 0,
        limit: 2,
      },
      loading: false,
    });
  });

  test('should remove movie from moviesData when action REMOVE_MOVIE_SUCCESS is received', () => {
    const fakeAction = {
      type: 'REMOVE_MOVIE_SUCCESS',
      payload: {
        id: 2,
      },
    };
    const originalState = {
      moviesData: {
        data: [
          { id: 1, title: 'some' },
          { id: 2, title: 'another' },
        ],
        totalAmount: 123,
        offset: 0,
        limit: 2,
      },
    };

    const actual = moviesReducer(originalState, fakeAction);

    expect(actual).toEqual({
      moviesData: {
        data: [{ id: 1, title: 'some' }],
        totalAmount: 123,
        offset: 0,
        limit: 2,
      },
      loading: false,
    });
  });

  test('should delete movieDetails when action CLEAR_MOVIE_DETAILS is received', () => {
    const fakeAction = {
      type: 'CLEAR_MOVIE_DETAILS',
    };
    const originalState = {
      movieDetails: { id: 1, title: 'some' },
    };

    const actual = moviesReducer(originalState, fakeAction);

    expect(actual).toEqual({});
  });

  test('should reset loading when action CREATE_MOVIE_SUCCESS is received', () => {
    const fakeAction = {
      type: 'CREATE_MOVIE_SUCCESS',
    };
    const originalState = {
      loading: true,
    };

    const actual = moviesReducer(originalState, fakeAction);

    expect(actual).toEqual({ loading: false });
  });

  test('should clear error when action DISMISS_NOTIFICATION is received', () => {
    const fakeAction = {
      type: 'DISMISS_NOTIFICATION',
    };
    const originalState = {
      error: { message: 'Not found', status: 404 },
    };

    const actual = moviesReducer(originalState, fakeAction);

    expect(actual).toEqual({ error: {} });
  });
});
