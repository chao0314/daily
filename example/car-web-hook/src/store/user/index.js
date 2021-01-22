import slice from './slice';
import * as asyncThunk from './asyncThunk'

export const actions = slice.actions;
export const reducer = slice.reducer;
export const asyncActions = asyncThunk;
export const postMessage = asyncThunk.postMessage;
