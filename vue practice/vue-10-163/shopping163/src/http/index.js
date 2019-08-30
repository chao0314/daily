import Axios from "axios";
export default Axios.create({
    baseURL: 'http://api.zhinengshe.com/10001-you163/',
    headers:{
        apikey:'299f648e53754c579bb5d142cbcbb115'
    }
})