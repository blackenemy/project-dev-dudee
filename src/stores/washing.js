import { defineStore } from "pinia";
import axios from 'axios'


export const Machine = defineStore({
    id: "Machine",
    state: () => ({
        machine_url: {
            user_data: `https://670e882e3e7151861654f178.mockapi.io/api/user/user`
        },
    }),
    actions: {
        async setMachince() {
            const machince = [
                { id: "1", name: "เครื่องซักผ้าฝาหน้า รุ่น FV1412S2B", status: 'working', time: 600, img: '/src/assets/mac01.png' },
                { id: "2", name: "เครื่องซักผ้า 2 ถัง รุ่น TT15WAPG", status: 'working', time: 1800, img: '/src/assets/mac02.png' },
                { id: "3", name: "เครื่องซักผ้า 15 กก รุ่น F2515STGV", status: 'not working', time: 0, img: '/src/assets/mac03.png' },
                { id: "4", name: "เครื่องซักผ้า 2 ถัง รุ่น TT18NAPG", status: 'working', time: 1200, img: '/src/assets/mac04.png' },
                { id: "5", name: "เครื่องซักผ้า 21 กก. รุ่น TV2521DV7B", status: 'working', time: 300, img: '/src/assets/mac05.png' },
                { id: "6", name: "เครื่องซักผ้าฝาหน้า 13 กก. รุ่น", status: 'working', time: 60, img: '/src/assets/mac06.png' },
            ];
            localStorage.setItem("data-Machince", JSON.stringify(machince));
        }
    }
});

