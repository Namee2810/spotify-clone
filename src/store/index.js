import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import playerReducer from "./slice/player"
import userReducer from "./slice/user"

const reducer = combineReducers({
  user: userReducer,
  player: playerReducer
})
const store = configureStore({
  reducer
})
export default store;