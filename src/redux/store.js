import { configureStore } from '@reduxjs/toolkit'
import composerReducer from './composerSlice'

export default configureStore({
    reducer: {
        name: composerReducer
    }
})