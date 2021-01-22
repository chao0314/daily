import {configureStore} from "@reduxjs/toolkit";
import {reducer as user} from "./user";
import {reducer as test} from "./test";

export default configureStore({
    reducer: {user, test}
})