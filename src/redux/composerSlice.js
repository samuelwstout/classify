import { createSlice } from '@reduxjs/toolkit'

export const composerSlice = createSlice({
    name: 'composer',
    initialState: { name: '' },
    reducers: {
        setComposer: (state, action) => {
            state.name = action.payload
        }
    }
})

export const { setComposer } = composerSlice.actions

export const selectName = (state) => state.name.name

export default composerSlice.reducer