import {createStore, combineReducers} from "redux";
import admin from './admin';

// 不同模块的 reducer 如果有相同的 type，均会被触发，若不想触发，可以type前加上模块前缀。

const reducer = combineReducers({admin});

export default createStore(reducer);
