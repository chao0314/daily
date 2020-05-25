import axios from 'axios';

export default {

    async getNetworkContent(dispatch, payload) {
        let data = await test();
        dispatch({type: "setNetworkContent", payload: data});
        return data;
    }


}


function test() {
    return new Promise(resolve => {

        setTimeout(() => {
            resolve('hello async')
        }, 2000)


    })
}