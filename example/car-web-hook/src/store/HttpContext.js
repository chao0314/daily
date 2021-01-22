import React from "react";

const baseURL = 'http://localhost:8088/api';

class Http {

    constructor(baseURl) {
        this.baseURl = baseURl;
    }

    async get(url) {

        return await (await fetch(`${baseURL}${url}`)).json();

    }

    async post(url, payload) {

        return await (await fetch(`${baseURL}${url}`, {
            method: 'POST',
            body: JSON.stringify(payload)
        })).json();


    }

}

export const value = new Http(baseURL);

export default React.createContext(value);






