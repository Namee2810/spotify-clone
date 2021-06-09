import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import spotify from "utils/spotify";

export const getPlaybackState = createAsyncThunk("player/getPlaybackState", async (_, { rejectWithValue }) => {
  const playbackState = await spotify.getMyCurrentPlaybackState();
  return playbackState
})

const slice = createSlice({
  name: "player",
  initialState: {
    playingTrack: null,
    isPlaying: false,
    settings: {
      repeat: false,
      shuffle: false,
      volume: 100,
    },
    time: {
      current: 0,
      duration: 0
    }
  },
  reducers: {
    SET_SETTINGS: (state, { payload }) => {
      switch (payload.type) {
        case "shuffle": {
          state.settings.shuffle = !state.settings.shuffle;
          break;
        }
        case "repeat": {
          state.settings.repeat += 1;
          if (state.settings.repeat > 2) state.settings.repeat = 0;
          break;
        }
        case "volume": {
          state.settings.volume = payload.value;
          break;
        }
        default: break;
      }
    },
    SET_TIME_TRACK: (state, { payload }) => {
      state.time = { ...state.time, ...payload }
    },
    SET_PLAYING: (state, { payload }) => {
      state.isPlaying = !state.isPlaying;
    }
  },
  extraReducers: {
    [getPlaybackState.fulfilled]: (state, { payload }) => {
      if (!payload || payload.currently_playing_type === "ad") return;
      //console.log(payload);
      const item = payload.item;
      if (!item.preview_url) message.warning("This song doesn't have preview!")
      //state.isPlaying = payload.is_playing;
      state.settings = {
        shuffle: payload.shuffle_state,
        repeat: payload.repeat_state === "off" ? 0 : payload.repeat_state === "track" ? 2 : 1,
        volume: payload.device?.volume_percent ?? 100
      }
      state.time = {
        current: Math.round(payload.progress_ms / 1000),
        duration: Math.round(item.duration_ms / 1000)
      }
      state.playingTrack = {
        id: item.id,
        album: {
          id: item.album.id,
          image: item.album.images[2].url
        },
        name: item.name,
        artists: payload.item.artists.map(i => ({ id: i.id, name: i.name })),
        preview_url: item.preview_url
      }
    },
  }
})

const { actions, reducer } = slice;
export default reducer;
export const { SET_SETTINGS, SET_TIME_TRACK, SET_PLAYING } = actions;