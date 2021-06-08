import SpotifyWebApi from "spotify-web-api-js";

const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000/signin/"
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initValue, value) => {
      let parts = value.split("=");
      initValue[parts[0]] = parts[1];
      return initValue
    }, {})
};

export const loginUrl = `${authEndpoint}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
const spotify = new SpotifyWebApi();
export default spotify;