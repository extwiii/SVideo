// @flow

import axios from 'axios';
import { SET_SEARCH_TERM, ADD_API_DATA } from './actions';

let URL = '';

if (process.env.NODE_ENV === 'production') {
  URL = 'https://svideo-tlaqcpbnhl.now.sh'
}else {
  URL = 'http://localhost:3000';
}

export function setSearchTerm(searchTerm: string) {
  return { type: SET_SEARCH_TERM, payload: searchTerm };
}

export function addAPIData(apiData: Show) {
  return { type: ADD_API_DATA, payload: apiData };
}

export function getAPIDetails(imdbID: string) {
  return (dispatch: Function) => {
    axios
      .get(`${URL}/${imdbID}`)
      .then(response => {
        dispatch(addAPIData(response.data));
      })
      .catch(error => {
        console.error('axios error', error); // eslint-disable-line no-console
      });
  };
}
