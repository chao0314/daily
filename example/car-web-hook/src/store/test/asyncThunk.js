import {createAsyncThunk} from "@reduxjs/toolkit";

const baseURL = 'http://localhost:8088/api';

export const getBanner = createAsyncThunk('test/banner', async (payload, thunkAPI) => {

    try {
        let res = await (await fetch(`${baseURL}/banner`).json());
        console.log('test module getBanner is ', res);
        return res;

    } catch (e) {
        console.log('test module asyncThunk has error is', e);
        throw e;
    }

})