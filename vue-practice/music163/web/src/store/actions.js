import Axios from "axios";

let axios = Axios.create({baseURL: "http://localhost:8081"});
export default {
    async getMusicList({commit}) {
        try {

            let {err, data} = (await axios.get("api/list")).data;
            if (err) return [];
            data.map(v => {
                v.img = `/imgs/${v.img}`;
                v.big_img = `/imgs/${v.big_img}`;
                return v;
            });
            commit("setMusicList", data);
            return data;
        } catch (e) {
            throw new Error("get list error");
        }
    },
    async getDetailById({commit}, id) {
        try {
            let {err, data} = await (await fetch(`http://localhost:8081/api/detail/${id}`)).json();
            if (err) return {};
            data.img = `/imgs/${data.img}`;
            data.big_img = `/imgs/${data.big_img}`;
            return data;
        } catch (e) {
            throw new Error("get detail error");
        }
    }
}