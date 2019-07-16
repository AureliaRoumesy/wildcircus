import axios from 'axios';

function setHeaderToken(callback) {
  if (localStorage.getItem('id_token')) {
    axios.defaults.headers.common.authorization = `Bearer ${localStorage.getItem('id_token')}`;
    callback();
  }
}

export default setHeaderToken;
