import axios from 'axios'

let url;
if (process.env.NODE_ENV  === "development") {
  url = 'http://localhost:5000';
} else {
  // url = 'https://foodly-api.glitch.me/';
  url = 'https://tranquil-falls-99160.herokuapp.com/';
}

export default axios.create({
  baseURL: url
});