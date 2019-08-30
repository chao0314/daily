import Axios from "axios";

export const taobao = Axios.create({
    baseURL: "http://api.zhinengshe.com/10003-taobao-simple",
    headers:{
        apikey:'299f648e53754c579bb5d142cbcbb115'
    }
});
taobao.interceptors.response.use((response: any) => {
    let {data:{err, msg, data}} = response;
    if (err) throw Error(msg);
    return response;
}, (e: Error) => {
    throw e
});