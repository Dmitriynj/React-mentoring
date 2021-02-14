import { useLocation } from 'react-router-dom';

const SEARCH_OPTIONS = ['search', 'filter', 'sortBy', 'sortOrder', 'searchBy', 'offset', 'limit'];

function useQuery() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  function getQueryOptions() {
    return SEARCH_OPTIONS.reduce((acc, curName) => {
      let value = query.get(curName);
      if (value && curName === 'filter') {
        value = [value];
      }
      if (value) {
        return { ...acc, [curName]: value };
      }
      return acc;
    }, {});
  }

  return { query, search, getQueryOptions };
}

export { useQuery };
