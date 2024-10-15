import { defineStore } from "pinia";
import axios from 'axios'


export const Machine = defineStore({
    id: "Machine",
    state: () => ({
        machine_url: {
            user_data: `https://670e882e3e7151861654f178.mockapi.io/api/user/user`
        }
    }),
    actions: {
        async list() {
            try {
                const res = await axios.get(this.machine_url.user_data);
                if (res.status == 200) {
                    return res;
                } else {
                    return false;
                }
            } catch (error) {
                if (error.response.status == 401) {
                    window.open("/", "_self");
                }
            }
        }
    }
});

