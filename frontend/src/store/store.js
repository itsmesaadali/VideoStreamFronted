import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/atuhSlice'

export const store = configureStore({
    reducer:{
        user: userReducer,
    }
})