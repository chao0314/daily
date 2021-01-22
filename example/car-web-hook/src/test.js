import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {combineReducers, createStore} from 'redux';


export const fetchUserById = createAsyncThunk(
    'user/fetchUserById',
    async (userId, thunkAPI) => {
        console.log('hello data exc');
        return "hello data";
    }
)

// Then, handle actions in your reducers:
export const user = createSlice({
    name: 'user',
    initialState: {entities: [], loading: 'idle', age: 20},
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [fetchUserById.fulfilled]: (state, action) => {
            // Add user to the state array
            state.entities.push(action.payload)
        }
    }
})


const reducer = combineReducers({

    user: user.reducer,
})

const store = createStore(reducer)
export default store;
// // Later, dispatch the thunk as needed in the app
// store.dispatch(fetchUserById(123))