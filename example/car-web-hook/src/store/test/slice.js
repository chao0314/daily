import {createSlice} from "@reduxjs/toolkit";
import {isLogin} from "../extraReducers";
import {postMessage, actions} from "../user";

export default createSlice({
    name: "test",
    initialState: {},
    reducers: {
        'toggle': ((state, action) => console.log('test module is toggled'))
    },

    extraReducers: {
        [isLogin]: state => console.log('test module has received login signal'),
        [postMessage.fulfilled]: state => console.log('test module postMessage '),
        [actions.setToken]: state => console.log('test module setToken')

    }
})