import axios from 'axios';

export default {

    async getNetworkContent(dispatch, payload) {
        let {data} = await axios.get(payload);
        dispatch({type: "setNetWorkContent", payload: data});
        return data;
    }


}