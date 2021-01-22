import {createSlice} from "@reduxjs/toolkit";
import {isLogin} from "../extraReducers";
import {postMessage} from "./asyncThunk";

export default createSlice({
    name: "user",
    initialState: {
        username: "",
        token: ""
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload.username;
            console.log("user module username : ", state.username)
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
            console.log('user module token : ', state.token, action.payload.token);
        }
    },
    extraReducers: builder => {
        builder.addCase(isLogin, (state, action) => {

            console.log('user module has received login signal');
        }).addCase(postMessage.fulfilled, state => {
            console.log('postMessage fulfilled');
        }).addCase(postMessage.rejected, state => {
            console.log('postMessage rejected');
        })

    }


})