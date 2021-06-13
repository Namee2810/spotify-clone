import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import spotify from "utils/spotify";

const initialState = {
  user: null,
  token: null,
  playlist: [],
  signInLoading: false,
  recentlyPlayed: [],
  featuredPlaylists: []
}

//thunk
export const signIn = createAsyncThunk("user/signIn", async (token) => {
  spotify.setAccessToken(token);
  const user = await spotify.getMe();
  return { token, user }
})
export const getUserPlaylist = createAsyncThunk("user/getUserPlaylist", async () => {
  const playlist = await spotify.getUserPlaylists();
  return playlist
})
export const getUserRecentlyPlayed = createAsyncThunk("user/getUserRecentlyPlayed", async () => {
  const recentlyPlayed = await spotify.getMyRecentlyPlayedTracks({ limit: 8 });
  return recentlyPlayed
})
export const getFeaturedPlaylists = createAsyncThunk("user/getFeaturedPlaylists", async () => {
  const featuredPlaylists = await spotify.getFeaturedPlaylists({ country: "VN" });
  return featuredPlaylists;

})

//slice
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SIGN_OUT(state, { payload }) {
      for (let key in initialState) state[key] = initialState[key];
      localStorage.removeItem("token");
    }
  },
  extraReducers: {
    [signIn.pending]: (state, { payload }) => {
      state.signInLoading = true;
    },
    [signIn.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
      state.signInLoading = false;
    },
    [signIn.rejected]: (state, { payload }) => {
      state.signInLoading = false;
      message.error("This session has expired!");
      localStorage.removeItem("token")
    },
    [getUserPlaylist.fulfilled]: (state, { payload }) => {
      state.playlist = payload.items;
    },
    [getUserRecentlyPlayed.fulfilled]: (state, { payload }) => {
      state.recentlyPlayed = payload.items
    },
    [getFeaturedPlaylists.fulfilled]: (state, { payload }) => {
      state.featuredPlaylists = payload
    }
  }
})
const { reducer, actions } = slice;
export default reducer;
export const { SIGN_OUT } = actions