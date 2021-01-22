import {createAsyncThunk} from "@reduxjs/toolkit";

const baseURL = 'http://localhost:8088/api';


export const postMessage = createAsyncThunk('user/postMessage', async ({body}, chunkAPI) => {


    try {

        let res = await (await fetch(`${baseURL}/message`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })).json();
        console.log('postMessage', res);
        return res;
    } catch (e) {
        console.log('postMessage request error is ', e);
        throw e
    }


})
